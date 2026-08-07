"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

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

interface HorizontalLoopConfig {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false;
  paddingRight?: number | string;
  reversed?: boolean;
  center?: boolean;
}

interface HorizontalLoopTimeline extends gsap.core.Timeline {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween;
  times: number[];
  closestIndex: (setCurrent?: boolean) => number;
}

/**
 * GSAP's well-known seamless infinite-loop helper (Zach Saucier / GreenSock).
 * Builds a timeline that loops an array of elements infinitely, with
 * toIndex()/next()/previous() helpers.
 */
function horizontalLoop(
  items: HTMLElement[],
  config: HorizontalLoopConfig = {}
): HorizontalLoopTimeline {
  const timeline = gsap.timeline({
    repeat: config.repeat ?? -1,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      timeline.totalTime(timeline.rawTime() + timeline.duration() * 100);
    },
  }) as HorizontalLoopTimeline;

  const length = items.length;
  const startX = items[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap: (v: number) => number =
    config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1);
  let totalWidth: number;
  let curX: number;
  let distanceToStart: number;
  let distanceToLoop: number;
  let item: HTMLElement;
  let i: number;

  gsap.set(items, {
    xPercent: (i: number, el: HTMLElement) => {
      const w = (widths[i] = parseFloat(
        String(gsap.getProperty(el, "width", "px"))
      ));
      xPercents[i] = snap(
        (parseFloat(String(gsap.getProperty(el, "x", "px"))) / w) * 100 +
          Number(gsap.getProperty(el, "xPercent"))
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      Number(gsap.getProperty(items[length - 1], "scaleX")) +
    (parseFloat(String(config.paddingRight)) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"));

    timeline.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    );
    timeline.fromTo(
      item,
      {
        xPercent: snap(
          ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
        ),
      },
      {
        xPercent: xPercents[i],
        duration:
          (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
    timeline.add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars: gsap.TweenVars = {}) {
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];
    if (time > timeline.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, timeline.duration()) };
      time += timeline.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return timeline.tweenTo(time, vars);
  }

  timeline.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  timeline.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  timeline.current = () => curIndex;
  timeline.toIndex = (index: number, vars?: gsap.TweenVars) =>
    toIndex(index, vars);
  timeline.times = times;
  timeline.progress(1, true).progress(0, true);

  if (config.center) {
    const track = items[0].parentElement;
    let centeredIndex = -1;
    const bringCenteredCardForward = () => {
      if (!track) return;

      const trackBounds = track.getBoundingClientRect();
      const trackCenter = trackBounds.left + trackBounds.width / 2;
      const nextCenteredIndex = items.reduce((closestIndex, card, index) => {
        const closestCard = items[closestIndex].getBoundingClientRect();
        const cardBounds = card.getBoundingClientRect();
        const closestDistance = Math.abs(
          closestCard.left + closestCard.width / 2 - trackCenter
        );
        const cardDistance = Math.abs(
          cardBounds.left + cardBounds.width / 2 - trackCenter
        );
        return cardDistance < closestDistance ? index : closestIndex;
      }, 0);

      if (nextCenteredIndex === centeredIndex) return;
      centeredIndex = nextCenteredIndex;
      gsap.set(items, { zIndex: 0 });
      gsap.set(items[centeredIndex], { zIndex: 1 });
    };

    timeline.eventCallback("onUpdate", bringCenteredCardForward);
    bringCenteredCardForward();
  }

  if (config.reversed) {
    timeline.vars.onReverseComplete?.();
    timeline.reverse();
  }

  timeline.closestIndex = (setCurrent?: boolean) => {
    const time = timeline.time();
    let closest = times[0];
    let index = 0;
    for (i = 1; i < length; i++) {
      if (Math.abs(times[i] - time) < Math.abs(closest - time)) {
        closest = times[i];
        index = i;
      }
    }
    if (setCurrent) curIndex = index;
    return index;
  };

  return timeline;
}

interface InfiniteBookRowProps {
  label: string;
  books: string[];
}

function InfiniteBookRow({ label, books }: InfiniteBookRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HorizontalLoopTimeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        ".book-card",
        rowRef.current
      );
      loopRef.current = horizontalLoop(cards, {
        paused: false,
        center: true,
        speed: 0.7,
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mb-16 last:mb-0">
      <div className="mb-5 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
          {label}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              loopRef.current?.previous({ duration: 0.5, ease: "power2.inOut" })
            }
            aria-label={`Previous ${label} book`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--secondary)]/25 text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() =>
              loopRef.current?.next({ duration: 0.5, ease: "power2.inOut" })
            }
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
        className="relative overflow-hidden py-6"
      >
        <div className="flex flex-nowrap">
          {books.map((title) => (
            <div
              key={title}
              className="book-card relative flex h-48 w-36 shrink-0 overflow-hidden rounded-[1.35rem] border border-black/10 bg-[var(--primary)] shadow-[0_12px_24px_rgba(91,70,54,0.2)] sm:h-56 sm:w-44 lg:h-64 lg:w-52"
              style={{ marginRight: "16px" }}
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
    </div>
  );
}

export default function Books() {
  return (
    <section id="books" className="relative bg-[var(--background)] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl lg:text-6xl">
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
