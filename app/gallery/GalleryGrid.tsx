"use client";

import { useCallback, useEffect, useState } from "react";

export type GalleryPhoto = { id: string; src: string; alt: string; caption: string; colSpan: string; rowSpan: string };

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => setActiveIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setActiveIndex((index) => index === null ? null : (index + 1) % photos.length), [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, next, previous]);

  return <><div className="grid grid-cols-4 gap-[3px] [grid-auto-rows:80px] sm:grid-cols-6 sm:gap-1 sm:[grid-auto-rows:100px] lg:[grid-auto-rows:120px]">{photos.map((photo, index) => <button key={photo.id} type="button" onClick={() => setActiveIndex(index)} aria-label={`View ${photo.alt} in full size`} className={`group relative cursor-zoom-in overflow-hidden rounded-[5px] bg-[#d8d2b4] ${photo.colSpan} ${photo.rowSpan}`}><img src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" /><span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" /></button>)}</div>{activeIndex !== null && <Lightbox photo={photos[activeIndex]} onClose={close} onPrevious={previous} onNext={next} />}</>;
}

function Lightbox({ photo, onClose, onPrevious, onNext }: { photo: GalleryPhoto; onClose: () => void; onPrevious: () => void; onNext: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/95 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={photo.alt}><button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-3xl text-white/90 hover:text-white">×</button><button type="button" onClick={(event) => { event.stopPropagation(); onPrevious(); }} aria-label="Previous image" className="absolute left-3 text-5xl text-white/80 hover:text-white">‹</button><button type="button" onClick={(event) => { event.stopPropagation(); onNext(); }} aria-label="Next image" className="absolute right-3 text-5xl text-white/80 hover:text-white">›</button><div className="max-h-[90vh] max-w-4xl overflow-auto rounded-sm bg-[#f4efd9] shadow-2xl" onClick={(event) => event.stopPropagation()}><img src={photo.src} alt={photo.alt} className="max-h-[72vh] w-full object-contain" /><p className="p-4 text-sm leading-6 text-[#302c22] sm:px-6 sm:py-5 sm:text-base">{photo.caption}</p></div></div>;
}
