"use client";

import Milestones from "@/components/Milestones";
import { useLanguage } from "@/components/LanguageProvider";
import Image from "next/image";
import Link from "next/link";
import ImageLoadingFrame from "@/components/ImageLoadingFrame";
import { ArrowUpRight } from "lucide-react";

const content = {
  en: {
    partLabel: "Journey & Legacy · Part I",
    heading1: "A life spent reading the Vedas",
    heading2: "in the language of mathematics",
    intro:
      "Trained under some of the last great traditional masters of Sanskrit grammar, Vedanta and astronomy, and armed with a modern postgraduate degree in Mathematics, Prof. Krishna Murthy occupies a rare middle ground — equally credible to traditional pandits and to university scientists.",
    educationLabel: "Education",
    edu1Year: "1969",
    edu1Degree: "B.Sc.",
    edu1Desc: "Mathematics, Physics & Chemistry — Andhra University",
    edu2Year: "1972",
    edu2Degree: "M.A.",
    edu2Desc: "Pure Mathematics — Andhra University",
    eduNote:
      "His area of specialization has remained constant throughout his career: Sanskrit literature, and correlating it with modern science.",
    foundedLabel: "Founded 2004",
    foundingTitle: "Founding I-SERVE",
    foundingP1:
      "In 2004, Prof. Krishna Murthy founded the Institute of Scientific Research on Vedas (I-SERVE), a registered charitable trust dedicated to scientific research into the sciences embedded in ancient Sanskrit literature. The institute is recognised by India's Department of Scientific and Industrial Research (DSIR) as a Scientific and Industrial Research Organisation (SIRO).",
    foundingP2:
      "Under his leadership, I-SERVE has organised around 50 national and international conferences, and produced numerous conference volumes and publications now used as reference material by universities and research institutes across India and abroad. I-SERVE has forged formal research collaborations (MOUs) with institutions including the Central University of Hyderabad, Dr. B.R. Ambedkar Open University, S.V. Ayurvedic Medical College (Tirupati), the Sanskrit Academy at Osmania University, GITAM University, the Association of Ayurvedic Practitioners of North America (AAPNA, USA), and the Indic Studies Foundation (California, USA), among others.",
    stats: [
      ["50+", "national conferences"],
      ["DSIR", "recognised SIRO"],
      ["Global", "research collaborations"],
      ["12", "years as Chairman"],
    ],
    mentorship1: "Over 50 students guided to the advanced Alankaranta level,",
    mentorship2: "5 scholars mentored through their M.A. in Sanskrit.",
    gurusLabel: "About His Gurus",
    gurusIntro:
      "Prof. Krishna Murthy's scholarship rests on rigorous, traditional training received directly from eminent gurus across multiple disciplines.",
    gurus: [
      { name: "Brahmasti Sri Kappagantula Veera Bhadra Sastry garu", subject: "Sanskrit & Telugu Sahitya", title: "" },
      { name: "Sri K. Sri Anjaneya Sastry", subject: "Vyakarana Sastra (Grammar)", title: "revered as \u201cVyaakarana Sthaapanaacharya\u201d" },
      { name: "Sri Kuppa Lakshmavadhani", subject: "Vedanta Sastra & Puranas", title: "known as \u201cSanga Swadhyaya Bhaskara\u201d" },
      { name: "Sri K. Subrahmanya Sastry", subject: "Ancient Astronomy & Vedic Sciences", title: "retired Statistician, Dept. of Irrigation, Govt. of A.P." },
      { name: "Sri K. Dakshina Murthy", subject: "Jyothisha Sastra (Astrology)", title: "Income Tax Practitioner, Mahabubnagar" },
      { name: "Sri Narayana Ghanapathi", subject: "Krishna Yajurveda (Partial)", title: "Machilipatnam" },
    ],
    gurusOutro:
      "His advanced studies also extended to classic texts such as Dhvanyaloka and Rasagangadhara, alongside scientific Sanskrit works including Brihat Samhita and Adbhuta Sagara.",
  },
  te: {
    partLabel: "ప్రయాణం & వారసత్వం · భాగం I",
    heading1: "గణితం భాషలో వేదాలను చదివిన జీవితం",
    heading2: "",
    intro:
      "సంస్కృత వ్యాకరణం, వేదాంతం మరియు జ్యోతిష శాస్త్రంలో చివరి తరం మహాన్ సాంప్రదాయిక గురువుల వద్ద శిక్షణ పొంది, గణితంలో ఆధునిక స్నాతకోత్తర పట్టా కూడా కలిగిన ప్రొ. కృష్ణమూర్తి గారు సాంప్రదాయ పండితులకు మరియు విశ్వవిద్యాలయ శాస్త్రవేత్తలకు సమానంగా ఆమోదయోగ్యమైన అరుదైన మధ్యస్థానంలో నిలుస్తారు.",
    educationLabel: "విద్య",
    edu1Year: "1969",
    edu1Degree: "బి.ఎస్సి.",
    edu1Desc: "గణితం, భౌతిక శాస్త్రం & రసాయన శాస్త్రం — ఆంధ్ర విశ్వవిద్యాలయం",
    edu2Year: "1972",
    edu2Degree: "ఎం.ఎ.",
    edu2Desc: "స్వచ్ఛ గణితం — ఆంధ్ర విశ్వవిద్యాలయం",
    eduNote:
      "ఆయన నిపుణత రంగం కెరీర్ మొత్తంలో స్థిరంగా ఉంది: సంస్కృత సాహిత్యం, దానిని ఆధునిక శాస్త్రంతో అనుసంధానించడం.",
    foundedLabel: "స్థాపన 2004",
    foundingTitle: "I-SERVE స్థాపన",
    foundingP1:
      "2004లో, ప్రొ. కృష్ణమూర్తి గారు ప్రాచీన సంస్కృత సాహిత్యంలో నిక్షిప్తమైన శాస్త్రాలపై శాస్త్రీయ పరిశోధన కోసం అంకితమైన నమోదిత ధార్మిక ట్రస్ట్ అయిన ఇన్‌స్టిట్యూట్ ఆఫ్ సైంటిఫిక్ రీసెర్చ్ ఆన్ వేదాస్ (I-SERVE) ను స్థాపించారు. ఈ సంస్థ భారత శాస్త్ర, సాంకేతిక పరిశోధన విభాగం (DSIR) చే శాస్త్రీయ మరియు పారిశ్రామిక పరిశోధన సంస్థ (SIRO)గా గుర్తింపు పొందింది.",
    foundingP2:
      "ఆయన నాయకత్వంలో, I-SERVE సుమారు 50 జాతీయ మరియు అంతర్జాతీయ సదస్సులను నిర్వహించింది, మరియు భారతదేశం మరియు విదేశాలలోని విశ్వవిద్యాలయాలు, పరిశోధన సంస్థలు ప్రస్తుతం సూచిక సామగ్రిగా ఉపయోగించే అనేక సదస్సు సంపుటాలు మరియు ప్రచురణలను రూపొందించింది. I-SERVE హైదరాబాద్ కేంద్రీయ విశ్వవిద్యాలయం, డా. బి.ఆర్. అంబేద్కర్ ఓపెన్ యూనివర్సిటీ, ఎస్.వి. ఆయుర్వేదిక్ మెడికల్ కాలేజీ (తిరుపతి), ఉస్మానియా విశ్వవిద్యాలయంలోని సంస్కృత అకాడమీ, గీతం విశ్వవిద్యాలయం, అసోసియేషన్ ఆఫ్ ఆయుర్వేదిక్ ప్రాక్టీషనర్స్ ఆఫ్ నార్త్ అమెరికా (AAPNA, USA), మరియు ఇండిక్ స్టడీస్ ఫౌండేషన్ (కాలిఫోర్నియా, USA) వంటి సంస్థలతో అధికారిక పరిశోధన సహకారాలను (MOUs) ఏర్పరచుకుంది.",
    stats: [
      ["50+", "జాతీయ సదస్సులు"],
      ["DSIR", "గుర్తింపు పొందిన SIRO"],
      ["ప్రపంచవ్యాప్తం", "పరిశోధన సహకారాలు"],
      ["12", "చైర్మన్‌గా సంవత్సరాలు"],
    ],
    mentorship1: "50 మందికి పైగా విద్యార్థులను అలంకారాంత స్థాయి వరకు మార్గనిర్దేశం చేశారు,",
    mentorship2: "5 మంది పండితులను సంస్కృతంలో ఎం.ఎ. పూర్తయ్యేలా మెంటర్ చేశారు.",
    gurusLabel: "ఆయన గురువుల గురించి",
    gurusIntro:
      "ప్రొ. కృష్ణమూర్తి గారి పాండిత్యం అనేక విభాగాలలో ప్రముఖ గురువుల నుండి నేరుగా పొందిన కఠోర, సాంప్రదాయ శిక్షణపై ఆధారపడి ఉంది.",
    gurus: [
      { name: "శ్రీ కప్పగంతుల వీరభద్ర శాస్త్రి", subject: "సంస్కృత & తెలుగు సాహిత్యం", title: "" },
      { name: "శ్రీ కె. శ్రీ ఆంజనేయ శాస్త్రి", subject: "వ్యాకరణ శాస్త్రం", title: "\u201cవ్యాకరణ స్థాపనాచార్య\u201dగా గౌరవించబడ్డారు" },
      { name: "శ్రీ కుప్పా లక్ష్మావధాని", subject: "వేదాంత శాస్త్రం & పురాణాలు", title: "\u201cసంఘ స్వాధ్యాయ భాస్కర\u201dగా ప్రసిద్ధి" },
      { name: "శ్రీ కె. సుబ్రహ్మణ్య శాస్త్రి", subject: "ప్రాచీన ఖగోళశాస్త్రం & వేద విజ్ఞానం", title: "పదవీ విరమణ చేసిన స్టాటిస్టీషియన్, నీటిపారుదల శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం" },
      { name: "శ్రీ కె. దక్షిణ మూర్తి", subject: "జ్యోతిష శాస్త్రం", title: "ఆదాయపు పన్ను ప్రాక్టీషనర్, మహబూబ్‌నగర్" },
      { name: "శ్రీ నారాయణ ఘనపాఠి", subject: "కృష్ణ యజుర్వేదం (పాక్షికం)", title: "మచిలీపట్నం" },
    ],
    gurusOutro:
      "ఆయన అధునాతన అధ్యయనాలు ధ్వన్యాలోకం, రసగంగాధరం వంటి సాంప్రదాయిక గ్రంథాలతో పాటు బృహత్ సంహిత, అద్భుత సాగరం వంటి శాస్త్రీయ సంస్కృత రచనలకు కూడా విస్తరించాయి.",
  },
};

const guruImages = [
  "/gurus/Brahmasti%20Sri%20Kappagantula%20Veera%20Bhadra%20Sastry%20garu.png",
  "/gurus/Kuppa%20Sri%20Anjaneya%20Sastry%20garu%20and%20Rajyalakshi%20garu.jpeg",
  "/gurus/Kuppa%20Lakshmavadhani%20garu%20%26%20Smt.%20Bhanumathi%20garu.jpeg",
  "/gurus/Kuppa%20Subramanya%20Sastry.jpeg",
  "/gurus/Kuppa%20dakshina%20murthy%20garu.jpeg",
  "/gurus/Sri%20Narayana%20Ghanapathi.png",
] as const;

export default function Journey() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="journey" className="relative scroll-mt-24 bg-[var(--background)] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Heading — content left, image spans the full height of the text block on the right */}
        <div className="mb-16 grid gap-8 border-b border-[var(--secondary)]/15 pb-12 sm:mb-24 sm:gap-10 sm:pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              {t.partLabel}
            </p>
            <h2 className="max-w-3xl text-4xl font-normal leading-[1.15] text-[var(--foreground)] sm:text-5xl">
              {t.heading1}
              {t.heading2 && (
                <>
                  <br />
                  {t.heading2}
                </>
              )}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--secondary)] sm:mt-8 sm:text-lg sm:leading-8">
              {t.intro}
            </p>
          </div>

          {/* image — stretches to match the height of the text column beside it */}
          <div className="h-full min-h-[280px] w-full overflow-hidden rounded-3xl bg-[var(--foreground)]/5">
            <img
              src="/journey-hero.jpg"
              alt="Prof. Krishna Murthy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Education */}
        <div className="mb-24 grid gap-10 sm:grid-cols-[120px_1fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            {t.educationLabel}
          </p>

          <div className="space-y-6 border-l-2 border-[var(--accent)]/40 pl-8">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="text-sm font-semibold text-[var(--primary)]">{t.edu1Year}</span>
              <span className="text-xl font-semibold text-[var(--foreground)]">{t.edu1Degree}</span>
              <span className="text-[var(--secondary)]">{t.edu1Desc}</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="text-sm font-semibold text-[var(--primary)]">{t.edu2Year}</span>
              <span className="text-xl font-semibold text-[var(--foreground)]">{t.edu2Degree}</span>
              <span className="text-[var(--secondary)]">{t.edu2Desc}</span>
            </div>
            <p className="pt-2 text-[var(--secondary)]">{t.eduNote}</p>
          </div>
        </div>

        {/* Roles & Milestones — candy-crush style level map, no images: numbered nodes with curved connectors */}
        <Milestones />

        {/* Founding I-SERVE — image floats left, text wraps beside it, then continues full-width below once past image height */}
        <div className="mb-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            {t.foundedLabel}
          </p>
          <h3 className="mb-8 max-w-lg text-3xl font-normal leading-tight text-[var(--foreground)] sm:text-4xl">
            {t.foundingTitle}
          </h3>

          <div className="text-[var(--secondary)] leading-8">
            <div className="float-left mb-4 mr-8 w-full max-w-[460px] overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:w-1/2">
              <img
                src="/i-serve.jpg"
                alt="I-SERVE — Institute of Scientific Research on Vedas"
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mb-6">{t.foundingP1}</p>
            <p>{t.foundingP2}</p>
            <div className="clear-both" />
          </div>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-[var(--secondary)]/15 pt-8">
            {t.stats.map(([n, label]) => (
              <div key={label}>
                <p className="text-3xl font-semibold text-[var(--primary)]">{n}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--secondary)]/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship line */}
        <div className="mb-24 border-y border-[var(--secondary)]/15 py-10 text-center">
          <p className="text-2xl font-semibold leading-relaxed text-[var(--foreground)] sm:text-3xl">
            {t.mentorship1}
            <br className="hidden sm:block" />
            {t.mentorship2}
          </p>
        </div>

        {/* Gurus — text-only mosaic cards, no images, no flowchart */}
        <div id="gurus" className="scroll-mt-24">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            {t.gurusLabel}
          </p>
          <p className="mb-10 max-w-2xl text-[var(--secondary)] leading-7">{t.gurusIntro}</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.gurus.map((guru, index) => (
              <div
                key={guru.name}
                className="overflow-hidden rounded-3xl border border-[var(--secondary)]/15 transition-colors hover:border-[var(--accent)]/50"
              >
                <div className="relative aspect-[4/5] bg-[var(--foreground)]/5">
                  {guruImages[index] ? (
                    <ImageLoadingFrame>
                      <Image src={guruImages[index]} alt={guru.name} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                    </ImageLoadingFrame>
                  ) : (
                    <div className="grid h-full place-items-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]/50">
                      Portrait forthcoming
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="mb-4 inline-block h-1 w-10 rounded-full bg-[var(--accent)]" />
                  <h4 className="text-lg font-normal leading-snug text-[var(--foreground)]">
                    {guru.name}
                  </h4>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                    {guru.subject}
                  </p>
                  {guru.title && (
                    <p className="mt-2 text-sm text-[var(--secondary)]">{guru.title}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <p className="max-w-2xl text-[var(--secondary)] leading-7">{t.gurusOutro}</p>
            <Link
              href="/gurus"
              className="group inline-flex shrink-0 items-center gap-5 self-end rounded-full bg-[#9a762e] py-1.5 pl-6 pr-2 text-base font-semibold text-white shadow-[0_6px_14px_rgba(91,70,54,0.2)] transition-colors hover:bg-[#805f22] sm:text-lg"
            >
              {language === "en" ? "Know more" : "మరిన్నీ చూడండి"}
              <span className="grid size-10 place-items-center rounded-full bg-white text-[#9a762e] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="size-5" strokeWidth={2} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
