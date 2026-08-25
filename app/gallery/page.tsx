"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  // grid placement, tuned to tile edge-to-edge like a mosaic wall
  colSpan: string;
  rowSpan: string;
};

const photos: Photo[] = [
  { src: "/gallery/gallery-image-1.png", alt: "Early years", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-2.png", alt: "Teaching", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-3.png", alt: "I-SERVE founding", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { src: "/gallery/gallery-image-4.png", alt: "Conference", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { src: "/gallery/gallery-image-5.png", alt: "With scholars", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-6.png", alt: "Television appearance", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-7.png", alt: "Family", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-8.png", alt: "Manuscript work", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-9.png", alt: "Award ceremony", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-10.png", alt: "Publication", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-11.png", alt: "Moment eleven", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { src: "/gallery/gallery-image-12.png", alt: "Moment twelve", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-13.png", alt: "Moment thirteen", colSpan: "col-span-2", rowSpan: "row-span-4" },
  { src: "/gallery/gallery-image-14.png", alt: "Moment fourteen", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { src: "/gallery/gallery-image-15.png", alt: "Moment fifteen", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-16.png", alt: "Moment sixteen", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { src: "/gallery/gallery-image-17.png", alt: "Moment seventeen", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-18.png", alt: "Moment eighteen", colSpan: "col-span-2", rowSpan: "row-span-2" },
  { src: "/gallery/gallery-image-19.png", alt: "Moment nineteen", colSpan: "col-span-2", rowSpan: "row-span-3" },
  { src: "/gallery/gallery-image-20.png", alt: "Moment twenty", colSpan: "col-span-2", rowSpan: "row-span-2" },
];

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    []
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, showPrev, showNext]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#efe9d3] px-5 pb-16 pt-28 sm:px-10 sm:pb-24 sm:pt-32 lg:px-16 xl:px-24">
        {/* Title + subtitle */}
        <div className="mb-10 sm:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a7a4f]">
            A life in fragments
          </p>
          <h1 className="mt-3 font-serif text-5xl font-normal tracking-tight text-[#1a1a1a] sm:text-7xl">
            Gallery
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-[#2a2a2a]/80 sm:text-base">
            A scrapbook of decades spent between palm-leaf manuscripts and
            lecture halls, gathered here as they were lived.
          </p>
        </div>

        {/* Tight tessellating mosaic — tiles fill their cells edge-to-edge
           with a thin gutter, like a photo wall. */}
        <div className="grid grid-cols-4 gap-[3px] sm:grid-cols-6 sm:gap-1 [grid-auto-rows:80px] sm:[grid-auto-rows:100px] lg:[grid-auto-rows:120px]">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View ${photo.alt} in full size`}
              className={`group relative cursor-zoom-in overflow-hidden rounded-[5px] bg-[#d8d2b4] ${photo.colSpan} ${photo.rowSpan}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </button>
          ))}
        </div>
      </main>

      {activeIndex !== null && (
        <Lightbox
          photo={photos[activeIndex]}
          onClose={close}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </>
  );
}

function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/92 px-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:right-8 sm:top-8"
      >
        ×
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
        className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:left-6"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
        className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:right-6"
      >
        ›
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] max-w-3xl"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1000}
          height={1250}
          sizes="90vw"
          className="max-h-[85vh] w-auto rounded-sm object-contain shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}