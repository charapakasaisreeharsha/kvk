"use client";

import { useRef } from "react";
import Image from "next/image";

const ENGLISH_BOOKS: string[] = [
  "Two Facets of Geometry — Dr. G. S. Murty",
  "Vedic Administration (Collective & Individual)",
  "Exploring Hidden Aspects of Ayurveda",
  "Science – Spirituality",
  "Ancient Indian Astronomy and Cosmology",
  "Agriculture & Environment: Glimpses of Ancient Indian Thought",
  "Ancient Indian Agriculture Techniques and Green Vegetation",
  "Indian Sciences in the Pre–Adi Sankara Period",
  "Ancient Indian Mathematicians",
  "Outlines of Science in the Vedic Period",
  "Environmental Science in the Puranas and Vedas",
  "Panchanga Siddhanta",
  "Computation of Planetary Positions and Almanac",
  "Proceedings, National Conference on Ayurvedic Medicare as Evidence-Based Medicine",
  "Proceedings, National Seminar on Vedic Astronomy & Cosmology",
  "Vedic Mathematics",
  "Glimpses of Vedic Mathematics",
  "Ancient Indian Astronomy & Cosmology",
  "Silent Thunder",
  "Acharya Jagadish Chandra Bose and Ancient Indian Scientific Thought",
  "And numerous other national and international conference volumes",
];

const TELUGU_BOOKS: string[] = [
  "Guru Bhakthavali",
  "Bharatiya – Paschatya Ganithalu",
  "Puranalu – Paryavaranam",
  "Intinti Vaidyam",
  "Tantram – Vaidyam",
  "Vrukshaayurvedamu",
  "Sankhya Darshanamu",
  "Yaaska Niruktamu",
];

interface InfiniteBookRowProps {
  label: string;
  books: string[];
}

function InfiniteBookRow({ label, books }: InfiniteBookRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-5 flex items-center justify-between px-1">
        <h3 className="text-sm font-normal uppercase tracking-[0.25em] text-[var(--secondary)]/60">
          {label}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={`Previous ${label} book`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--secondary)]/25 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={`Next ${label} book`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--secondary)]/25 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            →
          </button>
        </div>
      </div>

      {/* Track — normal flex children (NOT absolute), GSAP moves them via transforms */}
      <div
        ref={rowRef}
        className="book-scroll relative flex snap-x snap-mandatory gap-4 overflow-x-auto py-6 scroll-smooth"
      >
          {books.map((title) => (
            <div
              key={title}
              className="relative flex h-48 w-36 shrink-0 snap-start overflow-hidden rounded-[1.35rem] border border-black/10 bg-[var(--primary)] shadow-[0_12px_24px_rgba(91,70,54,0.2)] sm:h-56 sm:w-44 lg:h-64 lg:w-52"
            >
              {title === ENGLISH_BOOKS[0] ? (
                <Image
                  src="/book-covers/the_two_facts_of_geometry.png"
                  alt="Cover of Two Facets of Geometry"
                  fill
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px"
                  className="object-cover"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Cover placeholder for ${title}`}
                  className="absolute inset-1 grid place-items-center rounded-[1rem] border border-dashed border-[var(--background)]/45 bg-[var(--background)]/10 text-[var(--background)]/65"
                >
                  <span className="text-[0.5rem] font-bold uppercase tracking-[0.16em]">
                    Cover
                  </span>
                </div>
              )}
              <p className="relative mt-auto rounded-b-[1.3rem] bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 text-xs font-semibold leading-snug text-[var(--background)] sm:px-4 sm:pb-4 sm:text-sm lg:text-base">
                {title}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function Books() {
  return (
    <section id="books" className="relative bg-[var(--background)] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl font-normal text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Books
          </h2>
          <p className="mt-3 text-base text-[var(--secondary)] sm:text-lg">
            Edited by KVK
          </p>
        </div>

        <InfiniteBookRow label="English" books={ENGLISH_BOOKS} />
        <InfiniteBookRow label="Telugu" books={TELUGU_BOOKS} />
      </div>
    </section>
  );
}
