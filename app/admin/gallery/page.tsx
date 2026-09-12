import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import GalleryManager, { type ManagedGalleryImage } from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function GalleryManagerPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, image_path, caption, alt_text, display_layout, created_at")
    .order("created_at", { ascending: false });
  const images: ManagedGalleryImage[] = (data ?? []).map((image) => ({
    ...image,
    url: supabase.storage.from("gallery-images").getPublicUrl(image.image_path).data.publicUrl,
  }));

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-black">← Archive manager</Link>
        <header className="mb-8 mt-5"><p className="text-xs font-medium uppercase tracking-wide text-gray-400">Gallery Management</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">Gallery</h1><p className="mt-2 text-sm text-gray-500">Upload images and captions for the public gallery.</p></header>
        {error ? <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">Unable to load gallery images. {error.message}</p> : <GalleryManager images={images} />}
      </div>
    </main>
  );
}
