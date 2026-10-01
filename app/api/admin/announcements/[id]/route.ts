import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { authorize, readPayload } from "../route";

export async function PATCH(request: Request, context: RouteContext<"/api/admin/announcements/[id]">) {
  const rejection = await authorize(request);
  if (rejection) return rejection;
  const payload = await readPayload(request);
  if (payload instanceof NextResponse) return payload;
  const { id } = await context.params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid announcement." }, { status: 400 });
  const supabase = await createClient();
  const { data, error } = await supabase.from("announcements").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", id).select("id, title, body, published_at, created_at, updated_at").maybeSingle();
  if (error) return NextResponse.json({ error: "Unable to update the announcement." }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Announcement not found." }, { status: 404 });
  return NextResponse.json({ announcement: data });
}

export async function DELETE(request: Request, context: RouteContext<"/api/admin/announcements/[id]">) {
  const rejection = await authorize(request);
  if (rejection) return rejection;
  const { id } = await context.params;
  if (!isUuid(id)) return NextResponse.json({ error: "Invalid announcement." }, { status: 400 });
  const supabase = await createClient();
  const { data, error } = await supabase.from("announcements").delete().eq("id", id).select("id").maybeSingle();
  if (error) return NextResponse.json({ error: "Unable to remove the announcement." }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Announcement not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}

function isUuid(value: string) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
