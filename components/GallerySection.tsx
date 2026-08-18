"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  position?: string;
}

const images: GalleryImage[] = [
  {
    src: "/kvk-garu.jpg",
    alt: "Prof. Krishna Murthy",
    title: "A life of learning",
    description: "Scholar, teacher, and lifelong student of the Vedas.",
  },
  {
    src: "/journey-hero.jpg",
    alt: "Prof. Krishna Murthy in a traditional setting",
    title: "Knowledge in practice",
    description: "Bringing traditional scholarship into conversation with modern thought.",
  },
  {
    src: "/i-serve.jpg",
    alt: "I-SERVE research activity",
    title: "Research & service",
    description: "The work of I-SERVE, founded to explore Vedic sciences.",
  },
  {
    src: "/awards-image.png",
    alt: "Prof. Krishna Murthy reading an open book",
    title: "Honours & recognition",
    description: "A journey recognised by institutions across India.",
    position: "object-[40%_center]",
  },
  {
    src: "/gallery/gallery-image-2.png",
    alt: "Gallery moment from Prof. Krishna Murthy's life and work",
    title: "Shared moments",
    description: "Memories from a life devoted to scholarship and service.",
  },
  {
    src: "/gallery/gallery-image-3.png",
    alt: "Gallery moment from Prof. Krishna Murthy's life and work",
    title: "In the community",
    description: "Celebrating meaningful connections through learning and service.",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollToGalleryStart = () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // The track sits inside a padded viewport. Measuring that viewport (rather
      // than the whole section) lets the final card align neatly at every width.
      const getScrollAmount = () => Math.max(track.scrollWidth - track.parentElement!.clientWidth, 0);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        duration: 1,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(getScrollAmount(), 1)}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="relative flex h-screen flex-col overflow-hidden bg-[var(--background)] px-6 py-10 text-[var(--foreground)] sm:px-12 sm:py-14"
    >
      <div className="flex shrink-0 items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Gallery</p>
          <h2 id="gallery-heading" className="mt-3 text-4xl font-normal leading-tight sm:text-5xl">A life in scholarship and service</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--secondary)] sm:text-base">
            Moments from Prof. Krishna Murthy&apos;s work as a teacher, researcher, and scholar.
          </p>
        </div>
        <p className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--secondary)]/60 sm:block">Scroll to explore</p>
      </div>

      <div className="mt-10 flex flex-1 items-center overflow-hidden">
        <div ref={trackRef} className="flex gap-6 will-change-transform">
          {images.map((image, index) => (
            <figure
              key={image.src}
              className="group relative h-[55vh] w-[70vw] shrink-0 overflow-hidden rounded-3xl border border-[var(--secondary)]/15 bg-[var(--secondary)]/5 shadow-[0_12px_30px_rgba(91,70,54,0.08)] sm:w-[38vw] lg:w-[26vw]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 38vw, 70vw"
                className={`object-cover transition duration-500 group-hover:scale-105 ${image.position ?? ""}`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-6 pb-6 pt-20 text-[var(--background)]">
                <span className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                <figcaption className="mt-2 text-xl font-normal">{image.title}</figcaption>
                <p className="mt-1 text-sm leading-5 text-[var(--background)]/75">{image.description}</p>
              </div>
            </figure>
          ))}
          <article className="flex h-[55vh] w-[70vw] shrink-0 flex-col justify-end rounded-3xl border border-[var(--primary)]/25 bg-[var(--primary)] px-6 py-8 text-[var(--background)] shadow-[0_12px_30px_rgba(91,70,54,0.12)] sm:w-[38vw] lg:w-[26vw]">
            <span className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)]">MORE TO EXPLORE</span>
            <h3 className="mt-3 text-3xl font-normal leading-tight">Discover more moments</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--background)]/75">Explore the collection again and revisit the memories that shaped this journey.</p>
            <button
              type="button"
              onClick={scrollToGalleryStart}
              className="group mt-7 inline-flex w-fit items-center justify-between gap-4 rounded-full border border-[var(--background)]/25 bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-transparent hover:text-[var(--background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              View more
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--background)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[var(--background)] group-hover:text-[var(--primary)]">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
