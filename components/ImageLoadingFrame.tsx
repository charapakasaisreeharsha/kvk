"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export default function ImageLoadingFrame({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = frameRef.current?.querySelector("img");
    if (image?.complete) setLoading(false);
  }, []);

  return (
    <div ref={frameRef} className="absolute inset-0" onLoadCapture={() => setLoading(false)} onErrorCapture={() => setLoading(false)}>
      {loading && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-black/5" aria-label="Loading image" role="status">
          <span className="size-7 animate-spin rounded-full border-2 border-white/70 border-t-[var(--primary)]" />
          <span className="sr-only">Loading image</span>
        </div>
      )}
      {children}
    </div>
  );
}
