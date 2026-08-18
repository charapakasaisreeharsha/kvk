const selector = "main > section:not(#hero), main > [data-scroll-reveal]";

const observerOptions: IntersectionObserverInit = {
  rootMargin: "0px 0px -10%",
  threshold: 0.08,
};

/** Applies the same once-only reveal to every marked page section. */
export function setupScrollReveal(root: ParentNode = document) {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("scroll-reveal--pending");
      entry.target.classList.add("scroll-reveal--visible");
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (element.dataset.revealReady) {
      if (element.classList.contains("scroll-reveal--pending")) observer.observe(element);
      return;
    }
    element.dataset.revealReady = "true";
    element.classList.add("scroll-reveal");

    // Do not hide content that is already on screen when JavaScript starts.
    if (element.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      element.classList.add("scroll-reveal--visible");
      return;
    }

    element.classList.add("scroll-reveal--pending");
    observer.observe(element);
  });

  // A browser or layout edge case must never leave a whole section invisible.
  const fallbackTimer = window.setTimeout(() => {
    root.querySelectorAll<HTMLElement>(".scroll-reveal--pending").forEach((element) => {
      element.classList.remove("scroll-reveal--pending");
      element.classList.add("scroll-reveal--visible");
      observer.unobserve(element);
    });
  }, 1500);

  return () => {
    window.clearTimeout(fallbackTimer);
    observer.disconnect();
  };
}
