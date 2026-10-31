"use client";

import { useEffect, useState } from "react";

const MINIMUM_DISPLAY_TIME = 850;
const EXIT_DURATION = 650;
export default function PageLoader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    document.body.classList.add("site-is-loading");

    // Never gate the whole site on media. On a slow connection this previously
    // waited for every image (including a gallery) and could hide the page for
    // four seconds or more.
    const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - (performance.now() - startedAt));
    const leaveTimer = window.setTimeout(() => setIsLeaving(true), remainingTime);

    return () => {
      window.clearTimeout(leaveTimer);
      document.body.classList.remove("site-is-loading");
    };
  }, []);

  useEffect(() => {
    if (!isLeaving) return;

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.classList.remove("site-is-loading");
    }, EXIT_DURATION);

    return () => window.clearTimeout(hideTimer);
  }, [isLeaving]);

  if (!isVisible) return null;

  return (
    <div
      className={`page-loader ${isLeaving ? "page-loader--leaving" : ""}`}
      aria-busy={!isLeaving}
      aria-label="Loading site content"
      role="status"
    >
      <div className="page-loader__circle" aria-hidden="true">
        <div className="page-loader__inner">
          <span></span>
        </div>
      </div>
      <p className="page-loader__label">Loading</p>
    </div>
  );
}
