import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(_request: Request, { params }: RouteContext<"/api/admin/archive/[id]">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { data: work, error: fetchError } = await supabase.from("archive").select("id, cover_url, pdf_url").eq("id", id).single();
  if (fetchError || !work) return NextResponse.json({ error: "Work not found." }, { status: 404 });

  // With Row Level Security, Supabase returns a successful response when a
  // DELETE matches zero permitted rows. Request the deleted id so the UI is
  // only updated after the database row has actually been removed.
  const { data: deletedWorks, error: deleteError } = await supabase
    .from("archive")
    .delete()
    .eq("id", id)
    .select("id");
  if (deleteError) {
    console.error("Database deletion error:", deleteError);
    return NextResponse.json({ error: "Failed to delete archive work." }, { status: 500 });
  }
  if (!deletedWorks?.length) {
    console.warn(`Archive delete blocked by database permissions for work ${id}.`);
    return NextResponse.json(
      { error: "This account does not have permission to delete archive works." },
      { status: 403 }
    );
  }

  // Keep file cleanup after a confirmed database deletion. This prevents a
  // failed database mutation from removing files while leaving its row behind.
  if (work.pdf_url) {
    const { error } = await supabase.storage.from("archive-pdfs").remove([work.pdf_url]);
    if (error) console.error("PDF deletion error:", error);
  }
  const coverPath = getStoragePath(work.cover_url, "archive-covers");
  if (coverPath) {
    const { error } = await supabase.storage.from("archive-covers").remove([coverPath]);
    if (error) console.error("Cover deletion error:", error);
  }
  return NextResponse.json({ success: true });
}

function getStoragePath(url: string | null, bucket: string) {
  if (!url) return null;
  const marker = `/${bucket}/`; const index = url.indexOf(marker);
  return index === -1 ? null : decodeURIComponent(url.slice(index + marker.length));
}
