"use client";

import { useEffect, useState } from "react";

const MINIMUM_DISPLAY_TIME = 850;
const EXIT_DURATION = 650;
const ASSET_LOAD_TIMEOUT = 4000;

function waitForImage(image: HTMLImageElement) {
  if (image.complete) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const finish = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    const timeout = window.setTimeout(finish, ASSET_LOAD_TIMEOUT);

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
  });
}

function waitForVideo(video: HTMLVideoElement) {
  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const finish = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    const timeout = window.setTimeout(finish, ASSET_LOAD_TIMEOUT);

    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
  });
}

export default function PageLoader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    document.body.classList.add("site-is-loading");

    const waitForContent = async () => {
      const images = Array.from(document.images).map(waitForImage);
      const videos = Array.from(document.querySelectorAll("video")).map(waitForVideo);
      await Promise.all([...images, ...videos]);

      const remainingTime = Math.max(0, MINIMUM_DISPLAY_TIME - (performance.now() - startedAt));
      window.setTimeout(() => setIsLeaving(true), remainingTime);
    };

    void waitForContent();

    return () => {
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
