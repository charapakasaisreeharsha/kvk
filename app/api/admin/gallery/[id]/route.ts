import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(_request: Request, context: RouteContext<"/api/admin/gallery/[id]">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const { data: image, error: findError } = await supabase
    .from("gallery_images")
    .select("id, image_path")
    .eq("id", id)
    .maybeSingle();
  if (findError) return NextResponse.json({ error: findError.message }, { status: 500 });
  if (!image) return NextResponse.json({ error: "Image not found." }, { status: 404 });

  const { error: deleteError } = await supabase.from("gallery_images").delete().eq("id", id);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });
  const { error: storageError } = await supabase.storage.from("gallery-images").remove([image.image_path]);
  if (storageError) console.error("Gallery storage cleanup failed:", storageError.message);
  return NextResponse.json({ success: true });
}
