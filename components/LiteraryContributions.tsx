"use client";

import { ArrowUpRight } from "lucide-react";
import SmoothAnchorLink from "@/components/SmoothAnchorLink";
import { useLanguage } from "@/components/LanguageProvider";

type Work = {
  title: string;
  detail?: string;
};

const detailsByLang: Record<"en" | "te", Record<string, string>> = {
  en: {
    "Sadguru Swara Gitika": "audio rendering by Sri Rajkumar Bharathi",
    "Rudra Prapancha Stavah": "1,000 verses",
    "Hamsaladivi Venugopala Suprabhatam": "audio rendering by Smt. Sarada",
    "Ganesa Sadguru Stuti Puspa Guchchah": "500 verses, Telugu script",
    "Hymn to Ganesh": "with English translation",
  },
  te: {
    "Sadguru Swara Gitika": "శ్రీ రాజ్‌కుమార్ భారతి గానం చేసిన ఆడియో",
    "Rudra Prapancha Stavah": "1,000 శ్లోకాలు",
    "Hamsaladivi Venugopala Suprabhatam": "శ్రీమతి శారద గానం చేసిన ఆడియో",
    "Ganesa Sadguru Stuti Puspa Guchchah": "500 శ్లోకాలు, తెలుగు లిపి",
    "Hymn to Ganesh": "ఆంగ్ల అనువాదంతో",
  },
};

const sanskritPoetryTitles = [
  "Ganapathi Sachchidananda Sadguru Charitra Samgraha",
  "Sri Guru Panchashat",
  "Kirita Manimalika",
  "Sadguru Paadapuja Vidhih",
  "Sadguru Swara Gitika",
  "Adhyaya Slokavali",
  "Ganesha Sarvaangina Stuti",
  "Rudra Prapancha Stavah",
  "Hamsaladivi Venugopala Suprabhatam",
  "Nimishamba Suprabhatam",
  "Ganesa Sadguru Stuti Puspa Guchchah",
  "Hymn to Ganesh",
];

function getPoetry(lang: "en" | "te"): Record<string, Work[]> {
  const details = detailsByLang[lang];
  return {
    [lang === "en" ? "Sanskrit" : "సంస్కృతం"]: sanskritPoetryTitles.map(
      (title): Work => ({ title, detail: details[title] }),
    ),
    [lang === "en" ? "Telugu" : "తెలుగు"]: [
      { title: "Rudra Geeti", detail: lang === "en" ? "classical poetry" : "శాస్త్రీయ కవిత్వం" },
      { title: "Datta Katha Manjari", detail: lang === "en" ? "classical poetry" : "శాస్త్రీయ కవిత్వం" },
      { title: "Padya Parijatamu", detail: lang === "en" ? "classical poetry" : "శాస్త్రీయ కవిత్వం" },
      { title: "Natika Saptakam", detail: lang === "en" ? "a collection of seven playlets" : "ఏడు నాటికల సంపుటి" },
    ],
  };
}

function getProse(lang: "en" | "te"): { heading: string; scientificAnchor?: boolean; works: Work[] }[] {
  if (lang === "en") {
    return [
      {
        heading: "Telugu — Poetic & Literary",
        works: [
          { title: "Sri Ganapathi Sachchidananda Swamiji's Life History", detail: "also translated into English, German, French, Kannada, Hindi, Marathi and Gujarati" },
          { title: "Aatmadaanamu", detail: "novel" },
          { title: "Aalochanalu", detail: "collection of essays" },
        ],
      },
      {
        heading: "Telugu — Philosophical",
        works: [
          { title: "Yoga Vasistha Hridayam", detail: "6 volumes, Telugu & English; Kannada translation in progress" },
          { title: "Yoga Taaravali", detail: "also translated into English" },
          { title: "Guru Tatvam" }, { title: "Sambhormurty" },
          { title: "Vedanta Paribhasha", detail: "translated from Sanskrit" },
          { title: "Bhagavadgita Sangrahamu — Vivaranam" },
          { title: "Sri Satyanarayana Swami Vratha Kalpamu — Vyakhyanam" },
          { title: "Dharma Sandehaalu" }, { title: "Jaimini Bharatamu" },
        ],
      },
      {
        heading: "Telugu — Scientific",
        scientificAnchor: true,
        works: [
          { title: "Sanatana Desamlo Adhunatana Vignanam", detail: "ancient science" },
          { title: "Vedaalalo Science Vunda?", detail: "translated from English" },
          { title: "Vedalalo Vignanika Viseshaalu" }, { title: "Samskrutha Prayogika Vyakaranamu" },
          { title: "Amsubodhini of Bharadwaja", detail: "a Sanskrit work on solar energy, translated into Telugu (unpublished)" },
        ],
      },
      {
        heading: "English — Philosophical",
        works: [{ title: "Musings on Yogavasistha", detail: "6 volumes" }, { title: "Yoga Taaravali" }],
      },
      {
        heading: "English — Scientific",
        works: [
          { title: "Glimpses of Vedic Mathematics for Quicker Calculations" },
          { title: "Modern Science in Ancient Land" }, { title: "Spectrum of Vedic Sciences" },
          { title: "Scope and Extent of Ancient Indian Sciences" }, { title: "Glimpses of Vedic Geometry" },
          { title: "English Grammar for Sanskrit Students", detail: "unpublished" },
        ],
      },
    ];
  }
  return [
    {
      heading: "తెలుగు — కావ్య & సాహిత్యం",
      works: [
        { title: "Sri Ganapathi Sachchidananda Swamiji's Life History", detail: "ఆంగ్లం, జర్మన్, ఫ్రెంచ్, కన్నడ, హిందీ, మరాఠీ, గుజరాతీలలోకి కూడా అనువదించబడింది" },
        { title: "Aatmadaanamu", detail: "నవల" },
        { title: "Aalochanalu", detail: "వ్యాస సంపుటి" },
      ],
    },
    {
      heading: "తెలుగు — తాత్విక గ్రంథాలు",
      works: [
        { title: "Yoga Vasistha Hridayam", detail: "6 సంపుటాలు, తెలుగు & ఆంగ్లం; కన్నడ అనువాదం పురోగతిలో ఉంది" },
        { title: "Yoga Taaravali", detail: "ఆంగ్లంలోకి కూడా అనువదించబడింది" },
        { title: "Guru Tatvam" }, { title: "Sambhormurty" },
        { title: "Vedanta Paribhasha", detail: "సంస్కృతం నుండి అనువదించబడింది" },
        { title: "Bhagavadgita Sangrahamu — Vivaranam" },
        { title: "Sri Satyanarayana Swami Vratha Kalpamu — Vyakhyanam" },
        { title: "Dharma Sandehaalu" }, { title: "Jaimini Bharatamu" },
      ],
    },
    {
      heading: "తెలుగు — శాస్త్రీయ గ్రంథాలు",
      scientificAnchor: true,
      works: [
        { title: "Sanatana Desamlo Adhunatana Vignanam", detail: "ప్రాచీన శాస్త్రం" },
        { title: "Vedaalalo Science Vunda?", detail: "ఆంగ్లం నుండి అనువదించబడింది" },
        { title: "Vedalalo Vignanika Viseshaalu" }, { title: "Samskrutha Prayogika Vyakaranamu" },
        { title: "Amsubodhini of Bharadwaja", detail: "సౌర శక్తిపై సంస్కృత గ్రంథం, తెలుగులోకి అనువదించబడింది (అముద్రితం)" },
      ],
    },
    {
      heading: "ఆంగ్లం — తాత్విక గ్రంథాలు",
      works: [{ title: "Musings on Yogavasistha", detail: "6 సంపుటాలు" }, { title: "Yoga Taaravali" }],
    },
    {
      heading: "ఆంగ్లం — శాస్త్రీయ గ్రంథాలు",
      works: [
        { title: "Glimpses of Vedic Mathematics for Quicker Calculations" },
        { title: "Modern Science in Ancient Land" }, { title: "Spectrum of Vedic Sciences" },
        { title: "Scope and Extent of Ancient Indian Sciences" }, { title: "Glimpses of Vedic Geometry" },
        { title: "English Grammar for Sanskrit Students", detail: "అముద్రితం" },
      ],
    },
  ];
}

function WorkList({ works }: { works: Work[] }) {
  return (
    <ul className="space-y-3">
      {works.map((work) => (
        <li key={work.title} className="border-b border-[var(--secondary)]/10 pb-3 text-sm leading-6 text-[var(--secondary)]">
          <span className="font-medium text-[var(--foreground)]">{work.title}</span>
          {work.detail && <span className="text-[var(--secondary)]"> — {work.detail}</span>}
        </li>
      ))}
    </ul>
  );
}

const content = {
  en: {
    eyebrow: "Literary contributions",
    heading: "Kuppa Venkata Krishna Murthy's writings",
    intro:
      "A body of work spanning devotional poetry, philosophy, literature, and Vedic science — composed in Sanskrit, Telugu, and English.",
    nav: [
      ["Poetry", "#poetry"],
      ["Prose", "#prose"],
      ["Scientific", "#scientific"],
    ],
    poetryLabel: "Poetry",
    proseLabel: "Prose",
    asideLabel: "Other literary contributions",
    asideText: (
      <>
        He wrote the dialogues for <span className="font-semibold">Datta Darshanam</span>, a
        highly successful Telugu film, and remains a much sought-after speaker. His discourses
        have been featured on ETV, Gemini TV, MAA TV, NTV, and Doordarshan.
      </>
    ),
  },
  te: {
    eyebrow: "సాహిత్య రచనలు",
    heading: "శ్రీ కుప్పా వేంకటకృష్ణమూర్తి రచనలు",
    intro:
      "సంస్కృతం, తెలుగు మరియు ఆంగ్లంలో రచించిన భక్తి కవిత్వం, తత్వశాస్త్రం, సాహిత్యం మరియు వేద విజ్ఞానాన్ని ఆవరించిన రచనల సమాహారం.",
    nav: [
      ["కవిత్వం", "#poetry"],
      ["గద్యం", "#prose"],
      ["శాస్త్రీయం", "#scientific"],
    ],
    poetryLabel: "కవిత్వం",
    proseLabel: "గద్యం",
    asideLabel: "ఇతర సాహిత్య రచనలు",
    asideText: (
      <>
        ఆయన అత్యంత విజయవంతమైన తెలుగు చిత్రం <span className="font-semibold">దత్త దర్శనం</span>కు
        సంభాషణలు రచించారు, మరియు అత్యంత కోరదగిన వక్తగా కొనసాగుతున్నారు. ఆయన ప్రసంగాలు ETV, జెమిని
        TV, MAA TV, NTV మరియు దూరదర్శన్‌లలో ప్రసారమయ్యాయి.
      </>
    ),
  },
};

export default function LiteraryContributions() {
  const { language } = useLanguage();
  const t = content[language];
  const poetry = getPoetry(language);
  const prose = getProse(language);

  return (
    <section id="literary-contributions" className="scroll-mt-24 bg-[#f5f0df] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 border-b border-[var(--secondary)]/15 pb-10 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">{t.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-normal leading-tight text-[var(--foreground)] sm:text-5xl">{t.heading}</h2>
            <p className="mt-6 text-base leading-8 text-[var(--secondary)] sm:text-lg">{t.intro}</p>
          </div>

          <nav aria-label="Explore KVKM's writings" className="grid w-full gap-2 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
            {t.nav.map(([label, href]) => (
              <SmoothAnchorLink key={href} href={href} className="group flex items-center justify-between rounded-full border border-[var(--primary)]/25 bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--primary)] hover:text-[var(--background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
                {label}
                <span className="flex size-7 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--background)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[var(--background)] group-hover:text-[var(--primary)]">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </SmoothAnchorLink>
            ))}
          </nav>
        </div>

        <div id="poetry" className="mt-14 scroll-mt-28 pt-2 sm:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">{t.poetryLabel}</p>
          <div className="mt-7 grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
            {Object.entries(poetry).map(([label, works]) => (
              <article key={label} className="rounded-3xl border border-[var(--secondary)]/15 bg-[var(--background)] p-6 sm:p-8">
                <h3 className="mb-6 text-2xl font-normal text-[var(--foreground)]">{label}</h3>
                <WorkList works={works} />
              </article>
            ))}
          </div>
        </div>

        <div id="prose" className="mt-16 scroll-mt-28 border-t border-[var(--secondary)]/15 pt-12 sm:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">{t.proseLabel}</p>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {prose.map(({ heading, works, scientificAnchor }) => (
              <article
                id={scientificAnchor ? "scientific" : undefined}
                key={heading}
                className="scroll-mt-28 rounded-3xl border border-[var(--secondary)]/15 bg-[var(--background)] p-6 sm:p-8"
              >
                <h3 className="mb-6 text-xl font-normal text-[var(--foreground)]">{heading}</h3>
                <WorkList works={works} />
              </article>
            ))}
          </div>
        </div>

        <aside className="mt-16 rounded-3xl bg-[var(--primary)] px-7 py-8 text-[var(--background)] sm:mt-20 sm:px-10 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">{t.asideLabel}</p>
          <p className="mt-4 max-w-4xl text-lg leading-8 sm:text-xl">{t.asideText}</p>
        </aside>
      </div>
    </section>
  );
}