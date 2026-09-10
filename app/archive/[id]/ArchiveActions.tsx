"use client";

import { useState } from "react";

type ArchiveActionsProps = {
  id: string;
  hasPdf: boolean;
  externalUrl: string | null;
  initialViews: number;
  initialDownloads: number;
};

export default function ArchiveActions({
  id,
  hasPdf,
  externalUrl,
  initialViews,
  initialDownloads,
}: ArchiveActionsProps) {
  const [views, setViews] = useState(initialViews);
  const [downloads, setDownloads] = useState(initialDownloads);
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <>
      <div className="flex gap-6 mt-8 text-sm text-gray-500" aria-live="polite">
        <span>{views} views</span>
        <span>{downloads} downloads</span>
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        {hasPdf && (
          <a
            href={`/archive/${id}/view`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setViews((current) => current + 1)}
            className="rounded-xl bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition"
          >
            Read PDF
          </a>
        )}

        {hasPdf && (
          <a
            href={`/archive/${id}/download`}
            onClick={(event) => {
              if (isDownloading) {
                event.preventDefault();
                return;
              }

              setIsDownloading(true);
              setDownloads((current) => current + 1);
            }}
            aria-disabled={isDownloading}
            className="rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:hover:bg-transparent"
          >
            {isDownloading ? "Downloading…" : "Download PDF"}
          </a>
        )}

        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-50 transition"
          >
            Visit Original Source
          </a>
        )}
      </div>
    </>
  );
}
