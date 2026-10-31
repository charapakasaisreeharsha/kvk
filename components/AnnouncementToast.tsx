"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SEEN_ANNOUNCEMENT_KEY = "kvkm-last-seen-announcement";

export type LatestAnnouncement = {
  id: string;
  title: string;
  body: string;
};

function getReadAnnouncementIds() {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(SEEN_ANNOUNCEMENT_KEY) ?? "[]");
    return new Set(Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : []);
  } catch {
    return new Set<string>();
  }
}

export default function AnnouncementToast({ announcements }: { announcements: LatestAnnouncement[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState<LatestAnnouncement[]>([]);

  useEffect(() => {
    const readIds = getReadAnnouncementIds();
    const unread = announcements.filter((announcement) => !readIds.has(announcement.id));
    setUnreadAnnouncements(unread);
    setIsVisible(unread.length > 0);
  }, [announcements]);

  if (!isVisible || unreadAnnouncements.length === 0) return null;

  const announcement = unreadAnnouncements[0];
  const unreadCount = unreadAnnouncements.length;
  const markAllAsRead = () => {
    const readIds = getReadAnnouncementIds();
    unreadAnnouncements.forEach((item) => readIds.add(item.id));
    window.localStorage.setItem(SEEN_ANNOUNCEMENT_KEY, JSON.stringify([...readIds]));
    setIsVisible(false);
  };
  const markCurrentAsRead = () => {
    const readIds = getReadAnnouncementIds();
    readIds.add(announcement.id);
    window.localStorage.setItem(SEEN_ANNOUNCEMENT_KEY, JSON.stringify([...readIds]));
    setUnreadAnnouncements((current) => current.filter((item) => item.id !== announcement.id));
  };

  return (
    <aside
      aria-label="New announcement"
      className="announcement-toast fixed right-3 top-20 z-[60] w-[calc(100%-1.5rem)] max-w-xs rounded-lg border border-[#8b6b2f]/30 bg-[#fffdf3] p-3 text-[#1a1a1a] shadow-[0_12px_28px_rgba(45,35,18,0.22)] sm:right-6 sm:top-24 sm:p-4"
    >
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Hide announcements until the next refresh"
        className="absolute right-2 top-2 rounded-full p-1 text-[#5b4636] transition-colors hover:bg-[#8b6b2f]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b2f]"
      >
        <X className="size-4" />
      </button>
      <p className="pr-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b6b2f]">{unreadCount === 1 ? "New announcement" : `${unreadCount} new announcements`}</p>
      <h2 className="mt-1.5 pr-5 font-serif text-base leading-snug">{announcement.title}</h2>
      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#5b4636]">{announcement.body}</p>
      <Link
        href="/contact#announcements"
        onClick={markCurrentAsRead}
        className="mt-3 inline-flex min-h-9 items-center rounded-full bg-[#8b6b2f] px-3 text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#6f5323] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b2f]"
      >
        Read announcement
      </Link>
      <button
        type="button"
        onClick={markAllAsRead}
        className="ml-3 text-[11px] font-semibold text-[#5b4636] underline underline-offset-4 transition-colors hover:text-[#8b6b2f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b6b2f]"
      >
        Mark all read
      </button>
    </aside>
  );
}
