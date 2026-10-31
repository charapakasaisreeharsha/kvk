"use client";

import { useEffect, useState } from "react";

const SEEN_ANNOUNCEMENT_KEY = "kvkm-last-seen-announcement";

export type Announcement = {
  id: string;
  title: string;
  body: string;
  published_at: string;
};

function getReadIds() {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(SEEN_ANNOUNCEMENT_KEY) ?? "[]");
    return new Set(Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : []);
  } catch {
    return new Set<string>();
  }
}

export default function AnnouncementsList({ announcements }: { announcements: Announcement[] }) {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => setReadIds(getReadIds()), []);

  const markAsRead = (id: string) => {
    setReadIds((current) => {
      const next = new Set(current);
      next.add(id);
      window.localStorage.setItem(SEEN_ANNOUNCEMENT_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  return (
    <section id="announcements" aria-labelledby="announcements-heading" className="mt-14 scroll-mt-28 border-t border-[var(--secondary)]/20 pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Latest updates</p>
      <h2 id="announcements-heading" className="mt-2 text-2xl font-normal text-[var(--foreground)]">Announcements</h2>
      <div className="mt-6 space-y-4">
        {announcements.map((announcement) => {
          const isRead = readIds.has(announcement.id);
          return (
            <article key={announcement.id} className="rounded-xl border border-[var(--secondary)]/20 bg-white/40 p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium text-[var(--foreground)]">{announcement.title}</h3>
                <button type="button" onClick={() => markAsRead(announcement.id)} disabled={isRead} className="shrink-0 rounded-full border border-[var(--primary)]/40 px-3 py-1.5 text-xs font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white disabled:border-transparent disabled:bg-[var(--primary)]/10 disabled:text-[var(--secondary)]" aria-label={isRead ? `Marked ${announcement.title} as read` : `Mark ${announcement.title} as read`}>{isRead ? "Marked read" : "Mark as read"}</button>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--secondary)]">{announcement.body}</p>
              <time dateTime={announcement.published_at} className="mt-3 block text-xs text-[var(--secondary)]/75">{new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(announcement.published_at))}</time>
            </article>
          );
        })}
      </div>
    </section>
  );
}
