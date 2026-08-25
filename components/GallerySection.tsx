"use client";

import { useLayoutEffect, useRef } from "react";
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 0px)", () => {
      // Measure the visible viewport, not the page. This keeps the final card
      // aligned after a resize, orientation change, or ScrollTrigger refresh.
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
    });

    ScrollTrigger.refresh();

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-heading"
      className="relative flex min-h-screen flex-col overflow-x-hidden bg-[var(--background)] px-5 py-12 text-[var(--foreground)] sm:px-12 sm:py-14"
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

      <div className="mt-8 flex items-start overflow-x-hidden sm:mt-10">
        <div ref={trackRef} className="flex shrink-0 gap-5 will-change-transform sm:gap-6">
          {images.map((image, index) => (
            <figure
              key={image.src}
              className="group relative aspect-[3/4] w-[clamp(18rem,78vw,28rem)] shrink-0 overflow-hidden rounded-3xl border border-[var(--secondary)]/15 bg-[var(--secondary)]/5 shadow-[0_12px_30px_rgba(91,70,54,0.08)] sm:w-[clamp(20rem,44vw,28rem)] lg:w-[clamp(22rem,26vw,28rem)]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 38vw, 70vw"
                className={`object-cover transition duration-500 group-hover:scale-105 ${image.position ?? ""}`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-5 pt-20 text-[var(--background)] sm:px-6 sm:pb-6">
                <span className="text-xs font-semibold tracking-[0.16em] text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                <figcaption className="mt-2 text-xl font-normal">{image.title}</figcaption>
                <p className="mt-1 text-sm leading-5 text-[var(--background)]/75">{image.description}</p>
              </div>
            </figure>
          ))}
          <article className="flex aspect-[3/4] w-[clamp(18rem,78vw,28rem)] shrink-0 flex-col justify-end rounded-3xl border border-[var(--primary)]/25 bg-[var(--primary)] px-6 py-8 text-[var(--background)] shadow-[0_12px_30px_rgba(91,70,54,0.12)] sm:w-[clamp(20rem,44vw,28rem)] lg:w-[clamp(22rem,26vw,28rem)]">
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
