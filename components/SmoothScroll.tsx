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
    // Root layouts persist across navigations. Reset Lenis itself (rather than
    // only the browser scroll position) so its internal target cannot restore
    // the previous page's position on the next animation frame.
    const frameId = requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  useEffect(() => {
    const scrollToHash = (hash = window.location.hash) => {
      const id = hash.replace(/^#/, "");
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      lenisRef.current?.scrollTo(target, { offset: -96, duration: 1.1 });
    };

    const frameId = requestAnimationFrame(() => scrollToHash());
    const handleSmoothScroll = (event: Event) => {
      scrollToHash((event as CustomEvent<string>).detail);
    };

    window.addEventListener("smooth-scroll-to", handleSmoothScroll);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("smooth-scroll-to", handleSmoothScroll);
    };
  }, [pathname]);

  return null;
}
