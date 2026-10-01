import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AnnouncementsManager, { type Announcement } from "./AnnouncementsManager";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("announcements").select("id, title, body, published_at, created_at, updated_at").order("published_at", { ascending: false });
  return <main className="min-h-screen bg-gray-50"><div className="mx-auto max-w-6xl px-4 py-8 sm:px-6"><Link href="/admin" className="text-sm font-medium text-gray-600 hover:text-black">← Admin dashboard</Link><header className="mb-8 mt-5"><p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Contact page</p><h1 className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">Announcements</h1><p className="mt-2 text-sm text-gray-500">Publish, update, or remove messages shown to visitors.</p></header>{error ? <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">Unable to load announcements. {error.message}</p> : <AnnouncementsManager announcements={(data ?? []) as Announcement[]} />}</div></main>;
}
