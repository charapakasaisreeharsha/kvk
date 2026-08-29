"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

const content = {
  en: {
    label: "About",
    name: "Sri Kuppa Venkata Krishna Murthy",
    title: "Vedic Science Researcher · Founder of I-SERVE",
    bio: `Prof. K. V. Krishna Murthy is a rare scholar in whom the poet, the
philosopher, and the scientist coexist in remarkable harmony. For
more than five decades, he has devoted his life to uncovering the
scientific wisdom embedded within ancient Sanskrit literature while
building meaningful bridges between India's timeless heritage and
modern scientific thought.`,
  },
  te: {
    label: "మా గురించి",
    name: "శ్రీ కుప్ప వేంకట కృష్ణమూర్తి",
    title: "వేద విజ్ఞాన పరిశోధకులు · I-SERVE వ్యవస్థాపకులు",
    bio: `ప్రొ. కె. వి. కృష్ణమూర్తి గారు కవి, తత్వవేత్త మరియు శాస్త్రవేత్త
ముగ్గురూ అపురూపమైన సామరస్యంతో సహజీవనం చేసే అరుదైన పండితులు. ఐదు
దశాబ్దాలకు పైగా, ఆయన ప్రాచీన సంస్కృత సాహిత్యంలో నిక్షిప్తమైన
శాస్త్రీయ జ్ఞానాన్ని వెలికితీస్తూ, భారతదేశపు శాశ్వత వారసత్వానికి
మరియు ఆధునిక శాస్త్రీయ ఆలోచనలకు మధ్య అర్థవంతమైన వారధులు నిర్మించడానికి
తన జీవితాన్ని అంకితం చేశారు.`,
  },
};

export default function Introduction() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="about" className="scroll-mt-24 bg-[#fffff0] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] border border-[var(--secondary)]/10 bg-[#fffff7] shadow-[0_18px_55px_rgba(91,70,54,0.08)] sm:rounded-[38px] lg:min-h-[620px] lg:grid-cols-[1.7fr_0.75fr]">
        <div className="flex flex-col justify-center px-6 py-14 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--primary)]">
            {t.label}
          </p>
          <h2 className="mt-5 text-3xl font-normal tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {t.name}
          </h2>
          <p className="mt-3 text-sm font-medium text-[var(--secondary)] sm:text-base">
            {t.title}
          </p>
          <span className="mx-auto mt-8 h-px w-14 bg-[var(--accent)]/70" />
          <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-base leading-7 text-[var(--secondary)] sm:text-xl sm:leading-9">
            {t.bio}
          </p>
        </div>

        <div className="relative min-h-[450px] overflow-hidden bg-[#97742e] sm:min-h-[500px] lg:min-h-0">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
          <Image
            src="/kvk-garu.jpg"
            alt={t.name}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 38vw"
            className="-translate-y-6 scale-[1.22] object-contain object-bottom px-4 pt-5 sm:-translate-y-5 sm:scale-110 sm:px-14 lg:-translate-y-8 lg:scale-125 lg:px-4"
          />
        </div>
      </div>
    </section>
  );
}
