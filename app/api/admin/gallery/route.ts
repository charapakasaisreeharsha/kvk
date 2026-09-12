import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "gallery-images";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const image = formData.get("image");
  const caption = text(formData, "caption").trim();
  // The public caption is also the accessibility description. Keeping one
  // field avoids asking the gallery editor to describe the same photo twice.
  const altText = text(formData, "altText").trim() || caption.slice(0, 200);
  const displayLayout = text(formData, "displayLayout");
  const validationError = validate(image, caption, altText, displayLayout);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const file = image as File;
  const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return NextResponse.json({ error: `Image upload failed: ${uploadError.message}` }, { status: 500 });

  const { data, error: insertError } = await supabase
    .from("gallery_images")
    .insert({ image_path: path, caption, alt_text: altText, display_layout: displayLayout })
    .select("id, image_path, caption, alt_text, display_layout, created_at")
    .single();
  if (insertError) {
    await supabase.storage.from(BUCKET).remove([path]);
    return NextResponse.json({ error: `Image could not be saved: ${insertError.message}` }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(data.image_path);
  return NextResponse.json({ image: { ...data, url: publicUrl.publicUrl } }, { status: 201 });
}

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function validate(image: FormDataEntryValue | null, caption: string, altText: string, displayLayout: string) {
  if (!(image instanceof File) || image.size === 0) return "Please choose an image.";
  if (!ALLOWED_TYPES.has(image.type)) return "Use a JPG, PNG, or WebP image.";
  if (image.size > MAX_FILE_SIZE) return "Images must be 10 MB or smaller.";
  if (!caption || caption.length > 1000) return "Caption must be between 1 and 1,000 characters.";
  if (!altText || altText.length > 200) return "Caption is required and must be no more than 200 characters for image accessibility.";
  if (displayLayout !== "landscape" && displayLayout !== "portrait") return "Choose landscape or portrait layout.";
  return null;
}
