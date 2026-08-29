"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Lenis interpolates native scroll positions on animation frames. Keep GSAP's
    // scrubbed animations in sync with those frames rather than only browser
    // scroll events.
    lenis.on("scroll", ScrollTrigger.update);

    let frameId = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const scrollToHash = (hash = window.location.hash) => {
      const id = hash.replace(/^#/, "");
      const target = id ? document.getElementById(id) : null;
      if (!target) return false;

      lenisRef.current?.scrollTo(target, { offset: -96, duration: 1.1 });
      return true;
    };

    // The root layout persists between routes. Handle a hash and a route change
    // in one pass so a "scroll to top" reset cannot race the requested anchor.
    const frameId = requestAnimationFrame(() => {
      if (!scrollToHash()) {
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    });

    const handleSmoothScroll = (event: Event) => {
      scrollToHash((event as CustomEvent<string>).detail);
    };
    const handleHashChange = () => scrollToHash();
    // `pushState` (used for smooth in-page links) does not emit `hashchange`.
    // Back and Forward do emit `popstate`, so listen for both to keep the URL
    // and the visible section in sync.
    const handlePopState = () => scrollToHash();

    window.addEventListener("smooth-scroll-to", handleSmoothScroll);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handlePopState);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("smooth-scroll-to", handleSmoothScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return null;
}
