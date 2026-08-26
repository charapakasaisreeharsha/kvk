import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

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
      .createSignedUrl(work.pdf_file, 60 * 10, {
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

  await supabase.rpc("increment_archive_downloads", {
    archive_id: id,
  });

  return NextResponse.redirect(signedUrl.signedUrl);
}
