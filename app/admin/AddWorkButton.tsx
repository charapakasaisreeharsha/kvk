"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddWorkButton() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  function openNewWorkForm() {
    setIsNavigating(true);
    router.push("/admin/archive/new");
  }

  return (
    <button type="button" onClick={openNewWorkForm} disabled={isNavigating} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-wait disabled:opacity-70">
      {isNavigating ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <span className="text-base leading-none">+</span>}
      {isNavigating ? "Opening form..." : "Add Work"}
    </button>
  );
}
