"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
    });

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
    };
  }, []);

  return null;
}
