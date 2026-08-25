"use client";

import { useState } from "react";
import AddWorkButton from "./AddWorkButton";

export type ArchiveWork = { id: string; title: string; year: number | null; category: string | null; language: string | null; views: number | null; downloads: number | null; pdf_url: string | null; external_url: string | null; created_at: string };

export default function ArchiveTable({ works, onWorksChange }: { works: ArchiveWork[]; onWorksChange?: (works: ArchiveWork[]) => void }) {
  const [items, setItems] = useState(works);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const languages = [...new Set(items.map((work) => work.language).filter((value): value is string => Boolean(value)))].sort();
  const categories = [...new Set(items.map((work) => work.category).filter((value): value is string => Boolean(value)))].sort();
  const filteredItems = items.filter((work) => work.title.toLowerCase().includes(search.trim().toLowerCase()) && (!language || work.language === language) && (!category || work.category === category));
  const hasFilters = Boolean(search || language || category);

  async function deleteWork(work: ArchiveWork) {
    if (!window.confirm(`Are you sure you want to delete "${work.title}"?\n\nThis will permanently remove the archive entry and its uploaded files.`)) return;
    setDeletingId(work.id); setError("");
    try {
      const response = await fetch(`/api/admin/archive/${work.id}`, { method: "DELETE" });
      const result: { error?: string } = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to delete work.");
      const nextItems = items.filter((item) => item.id !== work.id);
      setItems(nextItems);
      onWorksChange?.(nextItems);
    } catch (err) { setError(err instanceof Error ? err.message : "Failed to delete work."); }
    finally { setDeletingId(null); }
  }

  return <>
    <div className="border-b border-gray-100 p-4 sm:p-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div><h2 className="font-semibold">Published Works</h2><p className="mt-1 text-sm text-gray-500">{filteredItems.length} of {items.length} work{items.length === 1 ? "" : "s"} shown</p></div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search works..." aria-label="Search archive works" className="w-full rounded-lg px-3 py-2.5 text-sm outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-black/70 sm:w-44" />
            <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Filter by language" className="rounded-lg bg-white px-3 py-2.5 text-sm text-gray-700 outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-black/70"><option value="">All languages</option>{languages.map((option) => <option key={option} value={option}>{option}</option>)}</select>
            <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category" className="rounded-lg bg-white px-3 py-2.5 text-sm text-gray-700 outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-black/70"><option value="">All categories</option>{categories.map((option) => <option key={option} value={option}>{option}</option>)}</select>
            {hasFilters && <button type="button" onClick={() => { setSearch(""); setLanguage(""); setCategory(""); }} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">Clear</button>}
          </div>
          <AddWorkButton />
        </div>
      </div>
    </div>
    {error && <div role="alert" className="mx-4 mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-5 sm:mt-5">{error}</div>}
    {filteredItems.length === 0 ? <EmptyState hasWorks={items.length > 0} /> : <ArchiveRows works={filteredItems} deletingId={deletingId} onDelete={deleteWork} />}
  </>;
}

function EmptyState({ hasWorks }: { hasWorks: boolean }) { return <div className="flex flex-col items-center gap-2 px-6 py-16 text-center"><span className="text-3xl">{hasWorks ? "⌕" : "📚"}</span><p className="font-medium text-gray-800">{hasWorks ? "No matching works" : "No works yet"}</p><p className="text-sm text-gray-500">{hasWorks ? "Try changing or clearing the filters." : "Add the first work to your archive."}</p></div>; }

function ArchiveRows({ works, deletingId, onDelete }: { works: ArchiveWork[]; deletingId: string | null; onDelete: (work: ArchiveWork) => void }) {
  const headings = ["Work", "Year", "Category", "Language", "Views", "Downloads", "Source"];
  return <><ul className="divide-y divide-gray-100 md:hidden">{works.map((work) => <li key={work.id} className="p-4"><div className="flex items-start justify-between gap-3"><p className="min-w-0 flex-1 truncate font-medium text-gray-900">{work.title}</p><SourceBadge work={work} /></div><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500"><span>{work.year ?? "—"}</span><span>·</span><span>{work.category ?? "—"}</span><span>·</span><span>{work.language ?? "—"}</span></div><div className="mt-3 flex items-center justify-between"><div className="flex gap-4 text-xs text-gray-500"><span>Views {work.views ?? 0}</span><span>Downloads {work.downloads ?? 0}</span></div><DeleteButton work={work} deletingId={deletingId} onDelete={onDelete} /></div></li>)}</ul>
  <div className="hidden overflow-x-auto md:block"><table className="w-full text-sm"><thead className="border-b border-gray-100 bg-gray-50"><tr className="text-left">{headings.map((heading) => <th key={heading} className="px-5 py-3.5 font-medium text-gray-600">{heading}</th>)}<th className="px-5 py-3.5 text-right font-medium text-gray-600">Action</th></tr></thead><tbody className="divide-y divide-gray-100">{works.map((work) => <tr key={work.id} className="transition hover:bg-gray-50"><td className="max-w-[280px] truncate px-5 py-4 font-medium text-gray-900">{work.title}</td><td className="px-5 py-4 text-gray-600">{work.year ?? "—"}</td><td className="px-5 py-4 text-gray-600">{work.category ?? "—"}</td><td className="px-5 py-4 text-gray-600">{work.language ?? "—"}</td><td className="px-5 py-4 text-gray-600">{work.views ?? 0}</td><td className="px-5 py-4 text-gray-600">{work.downloads ?? 0}</td><td className="px-5 py-4"><SourceBadge work={work} /></td><td className="px-5 py-4 text-right"><DeleteButton work={work} deletingId={deletingId} onDelete={onDelete} /></td></tr>)}</tbody></table></div></>;
}

function DeleteButton({ work, deletingId, onDelete }: { work: ArchiveWork; deletingId: string | null; onDelete: (work: ArchiveWork) => void }) { return <button type="button" onClick={() => onDelete(work)} disabled={deletingId === work.id} className="font-medium text-red-600 transition hover:text-red-800 disabled:opacity-40">{deletingId === work.id ? "Deleting..." : "Delete"}</button>; }
function SourceBadge({ work }: { work: ArchiveWork }) { if (work.pdf_url) return <span className="inline-flex shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">PDF</span>; if (work.external_url) return <span className="inline-flex shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">External</span>; return <span className="text-gray-400">—</span>; }
