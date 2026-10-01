"use client";

import { FormEvent, useState } from "react";

export type Announcement = { id: string; title: string; body: string; published_at: string; created_at: string; updated_at: string };
const emptyDraft = { title: "", body: "" };

export default function AnnouncementsManager({ announcements: initial }: { announcements: Announcement[] }) {
  const [announcements, setAnnouncements] = useState(initial);
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(""); setIsError(false);
    try {
      const endpoint = editingId ? `/api/admin/announcements/${editingId}` : "/api/admin/announcements";
      const response = await fetch(endpoint, { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) });
      const result: { announcement?: Announcement; error?: string } = await response.json();
      if (!response.ok || !result.announcement) throw new Error(result.error || "Unable to save the announcement.");
      setAnnouncements((current) => editingId ? current.map((item) => item.id === editingId ? result.announcement! : item) : [result.announcement!, ...current]);
      setDraft(emptyDraft); setEditingId(null); setMessage(editingId ? "Announcement updated." : "Announcement published.");
    } catch (error) { setIsError(true); setMessage(error instanceof Error ? error.message : "Unable to save the announcement."); }
    finally { setBusy(false); }
  }

  async function remove(item: Announcement) {
    if (!window.confirm(`Remove “${item.title}”? This cannot be undone.`)) return;
    setRemovingId(item.id); setMessage(""); setIsError(false);
    try {
      const response = await fetch(`/api/admin/announcements/${item.id}`, { method: "DELETE" });
      const result: { error?: string } = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to remove the announcement.");
      setAnnouncements((current) => current.filter((announcement) => announcement.id !== item.id));
      if (editingId === item.id) { setEditingId(null); setDraft(emptyDraft); }
      setMessage("Announcement removed.");
    } catch (error) { setIsError(true); setMessage(error instanceof Error ? error.message : "Unable to remove the announcement."); }
    finally { setRemovingId(null); }
  }

  function edit(item: Announcement) { setEditingId(item.id); setDraft({ title: item.title, body: item.body }); setMessage(""); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
    <section className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Publisher</p>
      <h2 className="mt-1 text-xl font-semibold text-gray-900">{editingId ? "Edit announcement" : "New announcement"}</h2>
      <form onSubmit={save} className="mt-5 space-y-4">
        <label className="block"><span className="mb-1.5 block text-sm font-medium text-gray-700">Title</span><input required value={draft.title} maxLength={120} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label>
        <label className="block"><span className="mb-1.5 block text-sm font-medium text-gray-700">Message</span><textarea required value={draft.body} maxLength={2000} rows={7} onChange={(event) => setDraft((current) => ({ ...current, body: event.target.value }))} className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label>
        <div className="flex gap-3"><button disabled={busy} className="rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60">{busy ? "Saving…" : editingId ? "Save changes" : "Publish"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setDraft(emptyDraft); }} className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>}</div>
        {message && <p role="status" className={`rounded-lg px-3 py-2 text-sm ${isError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{message}</p>}
      </form>
    </section>
    <section><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Public contact page</p><h2 className="mt-1 text-xl font-semibold text-gray-900">Published announcements</h2></div><span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">{announcements.length}</span></div>
      {announcements.length === 0 ? <p className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">No announcements have been published yet.</p> : <ul className="space-y-3">{announcements.map((item) => <li key={item.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"><div className="flex gap-4"><div className="min-w-0 flex-1"><h3 className="font-semibold text-gray-900">{item.title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{item.body}</p><p className="mt-3 text-xs text-gray-400">Published {new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(item.published_at))}</p></div><div className="flex shrink-0 flex-col gap-2"><button type="button" onClick={() => edit(item)} className="rounded-md px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100">Edit</button><button type="button" disabled={removingId === item.id} onClick={() => remove(item)} className="rounded-md px-2 py-1 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50">{removingId === item.id ? "Removing…" : "Remove"}</button></div></div></li>)}</ul>}
    </section>
  </div>;
}
