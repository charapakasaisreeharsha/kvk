"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Milestones from "@/components/Milestones";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const content = {
  en: {
    label: "Journey & Legacy",
    heading: "A life spent reading the Vedas in the language of mathematics",
    intro:
      "Trained under some of the last great traditional masters of Sanskrit grammar, Vedanta and astronomy, and armed with a modern postgraduate degree in Mathematics, Prof. Krishna Murthy occupies a rare middle ground — equally credible to traditional pandits and to university scientists.",

    sections: [
      {
        no: "01",
        tag: "Education",
        title: "A formal grounding in the sciences",
        body:
          "B.Sc. in Mathematics, Physics & Chemistry (1969) and M.A. in Pure Mathematics (1972), both from Andhra University. Yet his specialisation never wavered from a single throughline — Sanskrit literature, read against the grain of modern science.",
        meta: ["1969 — B.Sc., Andhra University", "1972 — M.A. Mathematics, Andhra University"],
      },
      {
        no: "03",
        tag: "Scholarship",
        title: "Advanced texts, lifelong study",
        body:
          "His reading extended into classic literary-critical works — Dhvanyaloka, Rasagangadhara — alongside scientific Sanskrit texts such as Brihat Samhita and Adbhuta Sagara, tying poetics, astronomy and natural science together within a single tradition.",
        meta: [],
      },
      {
        no: "04",
        tag: "Mentorship",
        title: "Passing it forward",
        body:
          "Over 50 students guided to the advanced Alankaranta level. Five scholars mentored through their M.A. in Sanskrit — a quiet, ongoing practice alongside the research and the writing.",
        meta: [],
      },
    ],

    iserve: {
      no: "02",
      tag: "Founded 2004",
      title: "Founding I-SERVE",
      body:
        "The Institute of Scientific Research on Vedas (I-SERVE) was founded in 2004 as a joint initiative of scholars and scientists working across ancient and modern disciplines, with the blessings of His Holiness Sri Sri Ganapathi Sachchidananda Swamiji. Under his leadership it has run roughly 50 national and international conferences, publishing volumes now used as reference material across Indian and international universities.",
      recognition:
        "I-SERVE is recognised as a Scientific and Industrial Research Organisation (SIRO) by the Department of Scientific & Industrial Research (DSIR), Ministry of Science & Technology, Government of India, and is approved under Section 35(1)(ii) of the Income-tax Act, 1961 (Gazette Notification No. 90/2009, dated 26 November 2009).",
      research:
        "Its research spans Ayurveda, Vedic Astronomy, Vedic Geology & Environment, Ancient Mathematics, New Computer Logic, and the study of ancient scientific texts — including the Vedas, Puranas and Atharva Veda — pursued in service of a non-hazardous, non-polluting science for all of humanity.",
      mous:
        "Formal MOUs link I-SERVE to the Central University of Hyderabad, Dr. B.R. Ambedkar Open University, S.V. Ayurvedic Medical College, the Sanskrit Academy at Osmania University, GITAM University, AAPNA (USA) and the Indic Studies Foundation (USA).",
      meta: ["Est. 2004", "DSIR-recognised SIRO", "12 years as Chairman", "50+ conferences"],
      photoCaption: "With Dr. A.P.J. Abdul Kalam, former President of India",
    },

    gurusTag: "His Teachers",
    gurusTitle: "Six gurus, one tradition",
    gurusBody:
      "Grammar, Vedanta, astronomy, astrology and Vedic recitation — each discipline handed down by a different eminent teacher.",
    gurusCta: "Meet his gurus",
  },
  te: {
    label: "ప్రయాణం & వారసత్వం",
    heading: "గణితం భాషలో వేదాలను చదివిన జీవితం",
    intro:
      "సంస్కృత వ్యాకరణం, వేదాంతం మరియు జ్యోతిష శాస్త్రంలో చివరి తరం మహాన్ సాంప్రదాయిక గురువుల వద్ద శిక్షణ పొంది, గణితంలో ఆధునిక స్నాతకోత్తర పట్టా కూడా కలిగిన ప్రొ. కృష్ణమూర్తి గారు సాంప్రదాయ పండితులకు మరియు విశ్వవిద్యాలయ శాస్త్రవేత్తలకు సమానంగా ఆమోదయోగ్యమైన అరుదైన మధ్యస్థానంలో నిలుస్తారు.",

    sections: [
      {
        no: "01",
        tag: "విద్య",
        title: "శాస్త్రాలలో అధికారిక పునాది",
        body:
          "గణితం, భౌతిక శాస్త్రం & రసాయన శాస్త్రంలో బి.ఎస్సి. (1969) మరియు స్వచ్ఛ గణితంలో ఎం.ఎ. (1972), రెండూ ఆంధ్ర విశ్వవిద్యాలయం నుండి. అయినా ఆయన నిపుణత ఒకే దారి నుండి ఎప్పుడూ మళ్లలేదు — సంస్కృత సాహిత్యం, ఆధునిక శాస్త్రానికి ఎదురుగా చదవడం.",
        meta: ["1969 — బి.ఎస్సి., ఆంధ్ర విశ్వవిద్యాలయం", "1972 — ఎం.ఎ. గణితం, ఆంధ్ర విశ్వవిద్యాలయం"],
      },
      {
        no: "03",
        tag: "పాండిత్యం",
        title: "అధునాతన గ్రంథాలు, జీవితాంత అధ్యయనం",
        body:
          "ఆయన అధ్యయనం ధ్వన్యాలోకం, రసగంగాధరం వంటి సాహిత్య-విమర్శ గ్రంథాలకు, అలాగే బృహత్ సంహిత, అద్భుత సాగరం వంటి శాస్త్రీయ సంస్కృత రచనలకు కూడా విస్తరించింది — ఒకే సంప్రదాయంలో కావ్యశాస్త్రం, ఖగోళశాస్త్రం మరియు ప్రకృతి శాస్త్రాన్ని ముడిపెడుతూ.",
        meta: [],
      },
      {
        no: "04",
        tag: "మెంటర్‌షిప్",
        title: "ముందుకు అందించడం",
        body:
          "50 మందికి పైగా విద్యార్థులను అలంకారాంత స్థాయి వరకు మార్గనిర్దేశం చేశారు. ఐదుగురు పండితులను సంస్కృతంలో ఎం.ఎ. పూర్తయ్యేలా మెంటర్ చేశారు — పరిశోధన, రచనల పక్కనే నిశ్శబ్దంగా కొనసాగుతున్న ఆచరణ.",
        meta: [],
      },
    ],

    iserve: {
      no: "02",
      tag: "స్థాపన 2004",
      title: "I-SERVE స్థాపన",
      body:
        "ఇన్‌స్టిట్యూట్ ఆఫ్ సైంటిఫిక్ రీసెర్చ్ ఆన్ వేదాస్ (I-SERVE) — DSIR గుర్తింపు పొందిన శాస్త్రీయ మరియు పారిశ్రామిక పరిశోధన సంస్థ — ఆయన నాయకత్వంలో సుమారు 50 జాతీయ, అంతర్జాతీయ సదస్సులు నిర్వహించింది, భారతదేశ మరియు అంతర్జాతీయ విశ్వవిద్యాలయాలలో సూచికగా ఉపయోగించే సంపుటాలను ప్రచురించింది.",
      recognition:
        "I-SERVE భారత ప్రభుత్వ శాస్త్ర సాంకేతిక మంత్రిత్వ శాఖ (DSIR) ద్వారా శాస్త్రీయ మరియు పారిశ్రామిక పరిశోధన సంస్థ (SIRO)గా గుర్తింపు పొందింది, మరియు ఆదాయపు పన్ను చట్టం 1961లోని సెక్షన్ 35(1)(ii) కింద ఆమోదం పొందింది (గెజిట్ నోటిఫికేషన్ నం. 90/2009, తేదీ 26 నవంబర్ 2009).",
      research:
        "దీని పరిశోధన ఆయుర్వేదం, వేద ఖగోళశాస్త్రం, వేద భూగర్భశాస్త్రం & పర్యావరణం, ప్రాచీన గణితం, నూతన కంప్యూటర్ లాజిక్, మరియు వేదాలు, పురాణాలు, అథర్వ వేదం వంటి ప్రాచీన శాస్త్రీయ గ్రంథాల అధ్యయనానికి విస్తరించింది — మానవాళి అందరికీ హానికరం కాని, కాలుష్యరహిత శాస్త్రం కోసం.",
      mous:
        "హైదరాబాద్ కేంద్రీయ విశ్వవిద్యాలయం, డా. బి.ఆర్. అంబేద్కర్ ఓపెన్ యూనివర్సిటీ, ఎస్.వి. ఆయుర్వేదిక్ మెడికల్ కాలేజీ, ఉస్మానియా విశ్వవిద్యాలయంలోని సంస్కృత అకాడమీ, గీతం విశ్వవిద్యాలయం, AAPNA (USA) మరియు ఇండిక్ స్టడీస్ ఫౌండేషన్ (USA) లతో అధికారిక ఒప్పందాలు (MOUs) I-SERVE ను అనుసంధానిస్తాయి.",
      meta: ["స్థాపన 2004", "DSIR గుర్తింపు పొందిన SIRO", "12 సంవత్సరాలు చైర్మన్‌గా", "50+ సదస్సులు"],
      photoCaption: "డా. ఎ.పి.జె. అబ్దుల్ కలామ్‌తో, భారత మాజీ రాష్ట్రపతి",
    },

    gurusTag: "ఆయన గురువులు",
    gurusTitle: "ఆరుగురు గురువులు, ఒక సంప్రదాయం",
    gurusBody:
      "వ్యాకరణం, వేదాంతం, ఖగోళశాస్త్రం, జ్యోతిషం మరియు వేద పఠనం — ప్రతి విభాగం వేరొక ప్రముఖ గురువు నుండి అందించబడింది.",
    gurusCta: "ఆయన గురువులను తెలుసుకోండి",
  },
};

export default function JourneyPage() {
  const { language } = useLanguage();
  const t = content[language];
  const iserve = t.iserve;

  return (
    <>
      <Navbar />
      <main>
    <section className="relative bg-[var(--background)] pb-20 pt-24 sm:pb-28 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-20 sm:mb-28">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            {t.label}
          </p>
          <h1 className="text-4xl font-normal leading-[1.15] text-[var(--foreground)] sm:text-5xl">
            {t.heading}
          </h1>
          <p className="mt-6 text-justify text-base leading-7 text-[var(--secondary)] sm:mt-8 sm:text-lg sm:leading-8">
            {t.intro}
          </p>
        </div>

        {/* Education */}
        <div className="border-t border-[var(--secondary)]/15 py-12 sm:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            {t.sections[0].tag}
          </p>
          <h2 className="mb-4 text-2xl font-normal leading-snug text-[var(--foreground)] sm:text-3xl">
            {t.sections[0].title}
          </h2>
          <p className="w-full text-justify text-base leading-8 text-[var(--secondary)]">
            {t.sections[0].body}
          </p>
          {t.sections[0].meta.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {t.sections[0].meta.map((m) => (
                <span key={m} className="text-sm font-medium text-[var(--foreground)]/70">
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* I-SERVE — photo first, then tag/title/body and the rest of the detail together */}
        <div className="border-t border-[var(--secondary)]/15 py-12 sm:py-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[var(--secondary)]/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">
            <Image
              src="/i-serve.jpg"
              alt={iserve.photoCaption}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--secondary)]/80">
            {iserve.photoCaption}
          </p>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              {iserve.tag}
            </p>
            <h2 className="mb-4 text-2xl font-normal leading-snug text-[var(--foreground)] sm:text-3xl">
              {iserve.title}
            </h2>
            <p className="w-full text-justify text-base leading-8 text-[var(--secondary)]">
              {iserve.body}
            </p>
            <p className="mt-4 w-full text-justify text-base leading-8 text-[var(--secondary)]">
              {iserve.recognition}
            </p>
            <p className="mt-4 w-full text-justify text-base leading-8 text-[var(--secondary)]">
              {iserve.research}
            </p>
            <p className="mt-4 w-full text-justify text-base leading-8 text-[var(--secondary)]">
              {iserve.mous}
            </p>

            {iserve.meta.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                {iserve.meta.map((m) => (
                  <span key={m} className="text-sm font-medium text-[var(--foreground)]/70">
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scholarship */}
        <div className="border-t border-[var(--secondary)]/15 py-12 sm:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            {t.sections[1].tag}
          </p>
          <h2 className="mb-4 text-2xl font-normal leading-snug text-[var(--foreground)] sm:text-3xl">
            {t.sections[1].title}
          </h2>
          <p className="w-full text-justify text-base leading-8 text-[var(--secondary)]">
            {t.sections[1].body}
          </p>
        </div>

        {/* Mentorship */}
        <div className="border-t border-b border-[var(--secondary)]/15 py-12 sm:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
            {t.sections[2].tag}
          </p>
          <h2 className="mb-4 text-2xl font-normal leading-snug text-[var(--foreground)] sm:text-3xl">
            {t.sections[2].title}
          </h2>
          <p className="w-full text-justify text-base leading-8 text-[var(--secondary)]">
            {t.sections[2].body}
          </p>
        </div>

        {/* Milestones — kept as-is, its own component */}
        <div className="my-20 sm:my-28">
          <Milestones />
        </div>

        {/* Gurus teaser */}
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-[var(--secondary)]/15 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
              {t.gurusTag}
            </p>
            <h3 className="mb-2 text-xl font-normal text-[var(--foreground)] sm:text-2xl">
              {t.gurusTitle}
            </h3>
            <p className="max-w-xl text-justify text-[var(--secondary)] leading-7">{t.gurusBody}</p>
          </div>
          <Link
            href="/gurus"
            className="group inline-flex shrink-0 items-center gap-5 rounded-full bg-[#9a762e] py-1.5 pl-6 pr-2 text-base font-semibold text-white shadow-[0_6px_14px_rgba(91,70,54,0.2)] transition-colors hover:bg-[#805f22] sm:text-lg"
          >
            {t.gurusCta}
            <span className="grid size-10 place-items-center rounded-full bg-white text-[#9a762e] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="size-5" strokeWidth={2} aria-hidden="true" />
            </span>
          </Link>
        </div>

      </div>
    </section>
      </main>
      <Footer />
    </>
  );
}
