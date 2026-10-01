import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const rejection = await authorize(request);
  if (rejection) return rejection;

  const payload = await readPayload(request);
  if (payload instanceof NextResponse) return payload;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .insert(payload)
    .select("id, title, body, published_at, created_at, updated_at")
    .single();

  if (error) return NextResponse.json({ error: "Unable to publish the announcement." }, { status: 500 });
  return NextResponse.json({ announcement: data }, { status: 201 });
}

export async function authorize(request: Request) {
  // Reject cross-site browser requests before accepting the authenticated cookie.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function readPayload(request: Request) {
  let value: unknown;
  try { value = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }); }
  if (!value || typeof value !== "object") return NextResponse.json({ error: "Invalid announcement." }, { status: 400 });
  const record = value as Record<string, unknown>;
  const title = typeof record.title === "string" ? record.title.trim() : "";
  const body = typeof record.body === "string" ? record.body.trim() : "";
  if (!title || title.length > 120) return NextResponse.json({ error: "Title must be between 1 and 120 characters." }, { status: 400 });
  if (!body || body.length > 2000) return NextResponse.json({ error: "Announcement text must be between 1 and 2,000 characters." }, { status: 400 });
  return { title, body };
}
