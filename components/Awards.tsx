"use client";

import Image from "next/image";
import { Award, GraduationCap, Landmark, Star, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const content = {
  en: {
    badge: "Honours",
    heading: "Awards & Recognition",
    intro:
      "A life of scholarship, teaching, and spiritual service recognised by institutions across India.",
    statNumber: "10+",
    statLabel: (
      <>
        Notable honours
        <br />
        listed here
      </>
    ),
    groups: [
      {
        icon: Award,
        heading: "Early Recognition",
        items: [
          { title: "Ugadi Puraskar", meta: "Chief Minister of Andhra Pradesh · 2002" },
          { title: "Jnana Saraswathi Puraskar", meta: "Saraswathi Temple, Basara, Telangana · 2002" },
          { title: "Jnana Kulapati Puraskar", meta: "Maharshi Vignana Peetham, Vijayawada · 2003" },
        ],
      },
      {
        icon: Star,
        heading: "Peetham Honours",
        items: [
          { title: "Sri Kalyanananda Bharathi Prathibha Puraskar", meta: "Sri Maha Kameswari Peetham, Visakhapatnam · 2003" },
          { title: "Sri Ramachandra Pura Pitha Puraskar", meta: "Karnataka · 2004" },
        ],
      },
      {
        icon: GraduationCap,
        heading: "Scholarly Titles",
        items: [
          { title: "Veda Sastra Abhigna", meta: "Sarvaartha Sankshema Samiti, Hyderabad · 2006 · Title" },
          { title: "Dr. Paidi Lakshmaiah Prathibha Puraskar", meta: "Hyderabad · 2007" },
          { title: "Dharma Nidhi Puraskar", meta: "Sri Potti Sriramulu Telugu University, Hyderabad · 2007" },
        ],
      },
      {
        icon: Landmark,
        heading: "National Honours",
        items: [
          { title: "Sri Ganapathi Sachchidananda Puraskar", meta: "Mysore · 2014" },
          { title: "Purna Vidyanidhi Puraskar", meta: "Avadhoota Datta Peetham, Mysore · 2016" },
        ],
      },
    ],
  },
  te: {
    badge: "గౌరవాలు",
    heading: "అవార్డులు & గుర్తింపు",
    intro:
      "భారతదేశవ్యాప్తంగా సంస్థల గుర్తింపు పొందిన పాండిత్యం, బోధన మరియు ఆధ్యాత్మిక సేవా జీవితం.",
    statNumber: "10+",
    statLabel: (
      <>
        ఇక్కడ పేర్కొన్న
        <br />
        ప్రముఖ గౌరవాలు
      </>
    ),
    groups: [
      {
        icon: Award,
        heading: "తొలి గుర్తింపు",
        items: [
          { title: "ఉగాది పురస్కారం", meta: "ఆంధ్రప్రదేశ్ ముఖ్యమంత్రి · 2002" },
          { title: "జ్ఞాన సరస్వతి పురస్కారం", meta: "సరస్వతీ దేవాలయం, బాసర, తెలంగాణ · 2002" },
          { title: "జ్ఞాన కులపతి పురస్కారం", meta: "మహర్షి విజ్ఞాన పీఠం, విజయవాడ · 2003" },
        ],
      },
      {
        icon: Star,
        heading: "పీఠ గౌరవాలు",
        items: [
          { title: "శ్రీ కళ్యాణానంద భారతి ప్రతిభా పురస్కారం", meta: "శ్రీ మహా కామేశ్వరీ పీఠం, విశాఖపట్నం · 2003" },
          { title: "శ్రీ రామచంద్రపుర పీఠ పురస్కారం", meta: "కర్ణాటక · 2004" },
        ],
      },
      {
        icon: GraduationCap,
        heading: "పాండిత్య బిరుదులు",
        items: [
          { title: "వేద శాస్త్ర అభిజ్ఞ", meta: "సర్వార్థ సంక్షేమ సమితి, హైదరాబాద్ · 2006 · బిరుదు" },
          { title: "డా. పైడి లక్ష్మయ్య ప్రతిభా పురస్కారం", meta: "హైదరాబాద్ · 2007" },
          { title: "ధర్మ నిధి పురస్కారం", meta: "శ్రీ పొట్టి శ్రీరాములు తెలుగు విశ్వవిద్యాలయం, హైదరాబాద్ · 2007" },
        ],
      },
      {
        icon: Landmark,
        heading: "జాతీయ గౌరవాలు",
        items: [
          { title: "శ్రీ గణపతి సచ్చిదానంద పురస్కారం", meta: "మైసూర్ · 2014" },
          { title: "పూర్ణ విద్యానిధి పురస్కారం", meta: "అవధూత దత్త పీఠం, మైసూర్ · 2016" },
        ],
      },
    ],
  },
};

export default function Awards() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="awards" className="bg-[var(--background)]" aria-labelledby="awards-heading">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left panel */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[var(--primary)] px-8 py-20 text-[var(--background)] sm:px-12 sm:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_15%,var(--accent),transparent_25%),radial-gradient(circle_at_90%_90%,#fff,transparent_20%)]" />
          <div className="relative w-full max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--background)]/25 bg-[var(--background)]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
              <Award className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
              {t.badge}
            </div>
            <h2 id="awards-heading" className="mt-5 text-4xl font-normal leading-tight sm:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--background)]/75 sm:text-lg">
              {t.intro}
            </p>

            {/* Portrait with subtle offset accent circles */}
            <div className="relative mx-auto mt-12 aspect-square w-full max-w-sm">
              <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-[var(--background)]/30 bg-[var(--background)]/10">
                <Image
                  src="/awards-image.png"
                  alt="Scholar holding an open book"
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, calc(100vw - 4rem)"
                  className="object-cover object-[40%_center]"
                />
              </div>
              <div className="absolute -right-3 -top-3 flex size-16 items-center justify-center rounded-full bg-[var(--background)]">
                <span className="size-3 rounded-full bg-[var(--primary)]" />
              </div>
              <div className="absolute -bottom-6 -left-6 size-24 rounded-full bg-[var(--accent)]" />
            </div>

            <div className="mt-10 flex w-fit items-center gap-3 rounded-2xl border border-[var(--background)]/20 bg-black/10 px-4 py-3">
              <span className="text-3xl font-normal text-[var(--accent)]">{t.statNumber}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--background)]/70">
                {t.statLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Right grid */}
        <div className="grid gap-x-10 gap-y-10 bg-[var(--background)] p-8 sm:grid-cols-2 sm:p-12 lg:py-28">
          {t.groups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <div key={groupIndex}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)]/15">
                  <Icon className="size-5 text-[var(--accent)]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-[var(--primary)]/60">
                  {group.heading}
                </h3>

                <ul className="mt-3 divide-y divide-[var(--primary)]/10">
                  {group.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2.5 py-3">
                      <ArrowRight className="mt-1 size-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                      <div>
                        <p className="text-[15px] font-medium leading-snug text-[var(--primary)]">{item.title}</p>
                        <p className="mt-0.5 text-sm leading-5 text-[var(--primary)]/55">{item.meta}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
