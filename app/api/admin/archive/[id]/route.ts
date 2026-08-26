import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(_request: Request, { params }: RouteContext<"/api/admin/archive/[id]">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { data: work, error: fetchError } = await supabase.from("archive").select("id, cover_file, pdf_file").eq("id", id).single();
  if (fetchError || !work) return NextResponse.json({ error: "Work not found." }, { status: 404 });

  if (work.pdf_file) {
    const { error } = await supabase.storage.from("archive-pdfs").remove([work.pdf_file]);
    if (error) return NextResponse.json({ error: "Failed to delete the PDF file." }, { status: 500 });
  }
  if (work.cover_file) {
    const { error } = await supabase.storage.from("archive-covers").remove([work.cover_file]);
    if (error) return NextResponse.json({ error: "Failed to delete the cover image." }, { status: 500 });
  }

  // With Row Level Security, Supabase returns a successful response when a
  // DELETE matches zero permitted rows. Request the deleted id so the UI is
  // only updated after the database row has actually been removed.
  const { data: deletedWorks, error: deleteError } = await supabase.from("archive").delete().eq("id", id).select("id");
  if (deleteError) {
    console.error("Database deletion error:", deleteError);
    return NextResponse.json({ error: "Failed to delete archive work." }, { status: 500 });
  }
  if (!deletedWorks?.length) {
    return NextResponse.json({ error: "This account does not have permission to delete archive works." }, { status: 403 });
  }
  return NextResponse.json({ success: true });
}
