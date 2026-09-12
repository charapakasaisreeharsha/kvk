"use client";

import { FormEvent, useState } from "react";

export type ManagedGalleryImage = { id: string; image_path: string; caption: string; alt_text: string; display_layout: "landscape" | "portrait"; created_at: string; url: string };

export default function GalleryManager({ images: initialImages }: { images: ManagedGalleryImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [selectedImage, setSelectedImage] = useState<ManagedGalleryImage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<"landscape" | "portrait">("landscape");

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setIsSaving(true); setMessage(""); setIsError(false);
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/admin/gallery", { method: "POST", body: new FormData(form) });
      const result: { image?: ManagedGalleryImage; error?: string } = await response.json();
      if (!response.ok || !result.image) throw new Error(result.error || "Upload failed.");
      setImages((current) => [...current, result.image!]); form.reset(); setSelectedLayout("landscape"); setMessage("Image added to the public gallery.");
    } catch (error) { setIsError(true); setMessage(error instanceof Error ? error.message : "Upload failed."); }
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
      setSelectedImage((current) => current?.id === image.id ? null : current);
    } catch (error) { setIsError(true); setMessage(error instanceof Error ? error.message : "Delete failed."); }
    finally { setDeletingId(null); }
  }

  return <><div className="grid gap-7 xl:grid-cols-[320px_minmax(0,1fr)]">
    <section className="h-fit overflow-hidden rounded-3xl border border-[#ddd5c3] bg-[#f8f4e9] shadow-[0_12px_35px_rgba(67,55,31,0.08)]"><div className="border-b border-[#ded5bf] bg-[#ece4d1] px-5 py-4"><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7147]">New gallery entry</p><h2 className="mt-1 font-serif text-2xl text-[#2d291f]">Add an image</h2><p className="mt-1 text-sm leading-5 text-[#746a58]">JPG, PNG, or WebP · maximum 10 MB.</p></div><form onSubmit={upload} className="space-y-4 p-5"><label className="block"><span className="mb-1.5 block text-sm font-semibold text-[#423b2e]">Image file</span><input required name="image" type="file" accept="image/jpeg,image/png,image/webp" className="block w-full cursor-pointer rounded-xl border border-[#d9d0bd] bg-white px-2 py-2 text-xs text-[#625b4c] file:mr-2 file:rounded-md file:border-0 file:bg-[#332f26] file:px-2.5 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-[#514936]" /></label><fieldset><legend className="mb-1.5 text-sm font-semibold text-[#423b2e]">Collage layout</legend><div className="grid grid-cols-2 gap-2"><LayoutOption name="landscape" label="Landscape" selected={selectedLayout} onChange={setSelectedLayout} /><LayoutOption name="portrait" label="Portrait" selected={selectedLayout} onChange={setSelectedLayout} /></div></fieldset><label className="block"><span className="mb-1.5 block text-sm font-semibold text-[#423b2e]">Caption</span><textarea required name="caption" maxLength={200} rows={3} placeholder="Describe the moment, people, and occasion..." className="w-full resize-y rounded-xl border border-[#d9d0bd] bg-white px-3 py-2 text-sm leading-5 text-[#40392c] outline-none placeholder:text-[#a69b87] focus:border-[#9a8050] focus:ring-2 focus:ring-[#c7b58b]/40" /></label><button disabled={isSaving} className="inline-flex w-full items-center justify-center rounded-xl bg-[#302c23] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4c4534] disabled:cursor-wait disabled:opacity-60">{isSaving ? "Uploading image..." : "Upload to gallery"}</button>{message && <p role="status" className={`rounded-lg px-3 py-2.5 text-sm ${isError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{message}</p>}</form></section>
    <section className="min-w-0"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a7147]">Public gallery</p><h2 className="mt-1 font-serif text-2xl text-[#2d291f]">Client-uploaded images</h2></div><span className="rounded-full bg-[#eee5d1] px-3 py-1 text-sm font-semibold text-[#66583d]">{images.length} {images.length === 1 ? "image" : "images"}</span></div>{images.length === 0 ? <div className="rounded-3xl border border-dashed border-[#d6cab2] bg-[#fbf9f3] p-12 text-center"><p className="font-serif text-xl text-[#4d4535]">No uploaded images yet</p><p className="mt-2 text-sm text-[#7a705f]">Use the form to add the first client-managed image.</p></div> : <ul className="overflow-hidden rounded-2xl border border-[#e1dac9] bg-white shadow-[0_8px_24px_rgba(66,53,29,0.06)]">{images.map((image) => <li key={image.id} className="border-b border-[#eee8dc] last:border-b-0"><div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4"><button type="button" onClick={() => setSelectedImage(image)} aria-label={`Preview ${image.caption}`} className={`shrink-0 overflow-hidden rounded-lg bg-[#eee8da] ${image.display_layout === "portrait" ? "h-16 w-12" : "h-12 w-16"}`}><img src={image.url} alt="" className="h-full w-full object-cover" /></button><button type="button" onClick={() => setSelectedImage(image)} className="min-w-0 flex-1 text-left"><p className="truncate text-sm font-medium text-[#433b2d]">{image.caption}</p><p className="mt-1 text-xs capitalize text-[#8a7a5c]">{image.display_layout} · Click to preview</p></button><button type="button" onClick={() => remove(image)} disabled={deletingId === image.id} className="shrink-0 rounded-lg px-2 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-800 disabled:opacity-50">{deletingId === image.id ? "Deleting..." : "Delete"}</button></div></li>)}</ul>}</section>
  </div>{selectedImage && <Preview image={selectedImage} onClose={() => setSelectedImage(null)} />}</>;
}

function LayoutOption({ name, label, selected, onChange }: { name: "landscape" | "portrait"; label: string; selected: "landscape" | "portrait"; onChange: (value: "landscape" | "portrait") => void }) { const active = selected === name; return <label className={`cursor-pointer rounded-lg border p-2 text-center text-xs font-semibold transition ${active ? "border-[#b8a37a] bg-[#eee5ce] text-[#493e2a]" : "border-[#d9d0bd] bg-white text-[#6b6250] hover:border-[#b8a37a]"}`}><input type="radio" name="displayLayout" value={name} checked={active} onChange={() => onChange(name)} className="sr-only" /><span className={`mx-auto mb-1.5 block rounded border-2 border-current ${name === "portrait" ? "h-8 w-5" : "h-5 w-10"}`} />{label}</label>; }

function Preview({ image, onClose }: { image: ManagedGalleryImage; onClose: () => void }) { return <div role="dialog" aria-modal="true" aria-label="Image preview" onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"><div onClick={(event) => event.stopPropagation()} className="max-h-[90vh] max-w-4xl overflow-auto rounded-xl bg-[#faf7ee] shadow-2xl"><img src={image.url} alt={image.alt_text} className="max-h-[74vh] w-auto max-w-full object-contain" /><div className="flex items-start justify-between gap-5 p-4"><div><p className="text-sm leading-6 text-[#4f4636]">{image.caption}</p><p className="mt-1 text-xs capitalize text-[#8a7a5c]">{image.display_layout} collage tile</p></div><button type="button" onClick={onClose} className="rounded-lg px-2 py-1 text-xl text-[#4f4636] hover:bg-[#ece4d1]" aria-label="Close preview">×</button></div></div></div>; }
