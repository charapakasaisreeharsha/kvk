"use client";

import SmoothAnchorLink from "@/components/SmoothAnchorLink";
import { useLanguage } from "@/components/LanguageProvider";

const content = {
  en: {
    eyebrow: "Sanskrit Scholar • Vedic Science Researcher",
    nameLine1: "Sri Kuppa Venkata",
    nameLine2: "Krishna Murthy",
    subtitle:
      "Founder of I-SERVE, dedicated to bridging the timeless wisdom of the Vedas with modern scientific inquiry.",
    cta: "Explore Journey",
  },
  te: {
    eyebrow: "సంస్కృత పండితులు • వేద విజ్ఞాన పరిశోధకులు",
    nameLine1: "శ్రీ కుప్ప వేంకట",
    nameLine2: "కృష్ణమూర్తి",
    subtitle:
      "I-SERVE వ్యవస్థాపకులు, వేదాల శాశ్వత జ్ఞానాన్ని ఆధునిక శాస్త్రీయ పరిశోధనతో అనుసంధానించడానికి అంకితమయ్యారు.",
    cta: "ప్రయాణాన్ని అన్వేషించండి",
  },
};

export default function Hero() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 z-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.45),inset_0_-80px_90px_rgba(0,0,0,0.35)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full max-w-4xl translate-y-8 flex-col items-start justify-center px-6 text-left text-white sm:translate-y-12 md:px-12 lg:px-20">
        <p className="mb-3 max-w-xs text-xs uppercase tracking-[0.2em] text-zinc-300 sm:max-w-none sm:tracking-[0.35em]">
          {t.eyebrow}
        </p>

        <h1 className="max-w-2xl text-3xl font-normal leading-tight md:text-5xl lg:text-6xl">
          {t.nameLine1}
          <br />
          {t.nameLine2}
        </h1>

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-200 md:text-base">
          {t.subtitle}
        </p>

        <SmoothAnchorLink href="/#about" className="mt-8 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-widest backdrop-blur-md transition hover:bg-white hover:text-black sm:mt-10 sm:px-8 sm:text-sm">
          {t.cta}
        </SmoothAnchorLink>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
