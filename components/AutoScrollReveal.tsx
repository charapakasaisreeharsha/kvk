"use client";

import { useEffect } from "react";

const selector = "main > section:not(#hero), main > [data-scroll-reveal]";

export default function AutoScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("scroll-reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.1 },
    );

    const observeSections = () => {
      document.querySelectorAll<HTMLElement>(selector).forEach((section) => {
        if (section.id === "hero" || section.dataset.revealReady) return;
        section.dataset.revealReady = "true";
        section.classList.add("scroll-reveal");
        observer.observe(section);
      });
    };

    observeSections();
    const contentObserver = new MutationObserver(observeSections);
    const main = document.querySelector("main");
    if (main) contentObserver.observe(main, { childList: true });

    return () => {
      observer.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  return null;
}
