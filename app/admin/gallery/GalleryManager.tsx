"use client";

import { FormEvent, useState } from "react";

export type ManagedGalleryImage = { id: string; image_path: string; caption: string; alt_text: string; created_at: string; url: string };

export default function GalleryManager({ images: initialImages }: { images: ManagedGalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setIsSaving(true); setMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/admin/gallery", { method: "POST", body: new FormData(form) });
      const result: { image?: ManagedGalleryImage; error?: string } = await response.json();
      if (!response.ok || !result.image) throw new Error(result.error || "Upload failed.");
      setImages((current) => [result.image!, ...current]); form.reset(); setMessage("Image added to the gallery.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed."); }
    finally { setIsSaving(false); }
  }

  async function remove(image: ManagedGalleryImage) {
    if (!window.confirm("Delete this image and its caption? This cannot be undone.")) return;
    setDeletingId(image.id); setMessage("");
    try {
      const response = await fetch(`/api/admin/gallery/${image.id}`, { method: "DELETE" });
      const result: { error?: string } = await response.json();
      if (!response.ok) throw new Error(result.error || "Delete failed.");
      setImages((current) => current.filter((item) => item.id !== image.id));
    } catch (error) { setMessage(error instanceof Error ? error.message : "Delete failed."); }
    finally { setDeletingId(null); }
  }

  return <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
    <form onSubmit={upload} className="h-fit space-y-4 rounded-2xl p-5 shadow-sm ring-1 ring-gray-200">
      <h2 className="font-semibold">Add an image</h2><p className="text-sm text-gray-500">JPG, PNG, or WebP · maximum 10 MB. Portrait and landscape images are laid out automatically.</p>
      <label className="block text-sm font-medium">Image<input required name="image" type="file" accept="image/jpeg,image/png,image/webp" className="mt-1.5 block w-full text-sm" /></label>
      <label className="block text-sm font-medium">Caption<textarea required name="caption" maxLength={1000} rows={5} placeholder="Picture with former Prime Minister…" className="mt-1.5 w-full rounded-lg p-3 text-sm ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-black" /></label>
      <label className="block text-sm font-medium">Image description (for accessibility)<input required name="altText" maxLength={200} placeholder="Prof. Krishna Murthy with…" className="mt-1.5 w-full rounded-lg p-3 text-sm ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-black" /></label>
      <button disabled={isSaving} className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60">{isSaving ? "Uploading…" : "Upload image"}</button>
      {message && <p role="status" className="text-sm text-gray-600">{message}</p>}
    </form>
    <section><h2 className="mb-4 font-semibold">Client-uploaded images ({images.length})</h2>{images.length === 0 ? <div className="rounded-2xl p-8 text-sm text-gray-500 ring-1 ring-gray-200">No client-uploaded images yet.</div> : <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{images.map((image) => <li key={image.id} className="overflow-hidden rounded-xl ring-1 ring-gray-200"><img src={image.url} alt="" className="max-h-80 w-full object-contain bg-gray-50" /><div className="p-3"><p className="line-clamp-3 text-sm text-gray-700">{image.caption}</p><button onClick={() => remove(image)} disabled={deletingId === image.id} className="mt-3 text-sm font-medium text-red-600 disabled:opacity-50">{deletingId === image.id ? "Deleting…" : "Delete"}</button></div></li>)}</ul>}</section>
  </div>;
}
