"use client";

import { useEffect } from "react";
import { setupScrollReveal } from "@/lib/scroll-reveal";

export default function AutoScrollReveal() {
  useEffect(() => {
    let cleanup = setupScrollReveal();
    const observeSections = () => {
      cleanup();
      cleanup = setupScrollReveal();
    };
    const contentObserver = new MutationObserver(observeSections);
    const main = document.querySelector("main");
    if (main) contentObserver.observe(main, { childList: true, subtree: true });

    return () => {
      cleanup();
      contentObserver.disconnect();
    };
  }, []);

  return null;
}
