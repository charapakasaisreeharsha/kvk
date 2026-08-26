import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const MAX_DOWNLOADS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const downloadAttempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function getDownloadLimit(key: string, now: number) {
  const attempt = downloadAttempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    downloadAttempts.delete(key);
    return undefined;
  }
  return attempt;
}

function tooManyDownloads(resetAt: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return NextResponse.json(
    { error: "Too many PDF downloads. Please try again later." },
    {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": String(retryAfter),
      },
    },
  );
}

function registerDownload(key: string, now: number) {
  const previous = getDownloadLimit(key, now);
  const next = {
    count: (previous?.count || 0) + 1,
    resetAt: previous?.resetAt || now + WINDOW_MS,
  };
  downloadAttempts.set(key, next);
  return next;
}

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const now = Date.now();
  const ip = getClientIp(request);
  const ipLimit = getDownloadLimit(`ip:${ip}`, now);
  const workLimit = getDownloadLimit(`work:${ip}:${id}`, now);

  if (ipLimit && ipLimit.count >= MAX_DOWNLOADS) return tooManyDownloads(ipLimit.resetAt);
  if (workLimit && workLimit.count >= MAX_DOWNLOADS) return tooManyDownloads(workLimit.resetAt);

  const supabase = await createClient();

  const { data: work, error } = await supabase
    .from("archive")
    .select("title, pdf_file")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Archive lookup error:", error);

    return NextResponse.json(
      { error: "Archive work not found." },
      { status: 404 }
    );
  }

  if (!work?.pdf_file) {
    return NextResponse.json(
      { error: "This work does not have a PDF." },
      { status: 404 }
    );
  }

  let signedUrl;
  let signedUrlError;

  try {
    ({ data: signedUrl, error: signedUrlError } = await createAdminClient()
      .storage
      .from("archive-pdfs")
      .createSignedUrl(work.pdf_file, 60, {
        download: `${work.title}.pdf`,
      }));
  } catch (error) {
    console.error("PDF signing configuration error:", error);

    return NextResponse.json(
      { error: "PDF access is not configured." },
      { status: 500 }
    );
  }

  if (signedUrlError || !signedUrl?.signedUrl) {
    console.error("Signed URL error:", signedUrlError);

    return NextResponse.json(
      { error: "Unable to access PDF." },
      { status: 500 }
    );
  }

  // Record only successful download requests, never missing files or errors.
  const nextIpLimit = registerDownload(`ip:${ip}`, now);
  const nextWorkLimit = registerDownload(`work:${ip}:${id}`, now);
  if (nextIpLimit.count > MAX_DOWNLOADS) return tooManyDownloads(nextIpLimit.resetAt);
  if (nextWorkLimit.count > MAX_DOWNLOADS) return tooManyDownloads(nextWorkLimit.resetAt);

  await supabase.rpc("increment_archive_downloads", {
    archive_id: id,
  });

  return NextResponse.redirect(signedUrl.signedUrl, {
    headers: { "Cache-Control": "no-store" },
  });
}
