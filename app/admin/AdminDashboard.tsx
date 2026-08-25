"use client";

import { useState } from "react";
import ArchiveTable, { type ArchiveWork } from "./ArchiveTable";

export default function AdminDashboard({ works }: { works: ArchiveWork[] }) {
  const [archiveWorks, setArchiveWorks] = useState(works);
  const totalViews = archiveWorks.reduce((sum, work) => sum + (work.views ?? 0), 0);
  const totalDownloads = archiveWorks.reduce(
    (sum, work) => sum + (work.downloads ?? 0),
    0
  );

  return (
    <>
      <div className="mb-6 grid grid-cols-3 gap-2.5 sm:mb-8 sm:gap-4">
        <StatCard label="Works" value={archiveWorks.length} accent="bg-black" />
        <StatCard label="Views" value={totalViews} accent="bg-blue-500" />
        <StatCard label="Downloads" value={totalDownloads} accent="bg-emerald-500" />
      </div>

      <section className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-100">
        <ArchiveTable works={archiveWorks} onWorksChange={setArchiveWorks} />
      </section>
    </>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl p-3.5 shadow-sm ring-1 ring-gray-100 sm:rounded-2xl sm:p-5">
      <span className={`absolute inset-x-0 top-0 h-1 ${accent}`} />
      <p className="text-[11px] text-gray-500 sm:text-sm">{label}</p>
      <p className="mt-1 text-xl font-semibold sm:mt-2 sm:text-3xl">{value}</p>
    </div>
  );
}
