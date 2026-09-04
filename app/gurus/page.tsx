"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";

const content = {
  en: {
    label: "Journey & Legacy",
    swamijiTitle: "Supreme Spiritual Leader",
    swamijiName: "Sri Ganapathy Sachchidananda Swamiji",
    meetingBody:
      "It was during a quiet visit to the ashram that Prof. Krishna Murthy, along with his wife, had the fortune of meeting Sri Ganapathy Sachchidananda Swamiji in person. What began as a courtesy visit turned into hours of conversation on Sanskrit, Vedanta, and the sciences hidden within ancient texts — a meeting that Prof. Krishna Murthy would later describe as one of the most formative encounters of his scholarly life. The Swamiji's blessings and guidance continue to shape the values and direction of his work to this day.",
    gurusLabel: "Other Gurus",
    gurusHeading: "Teachers across many disciplines",
  },
  te: {
    label: "ప్రయాణం & వారసత్వం",
    swamijiTitle: "పరమ ఆధ్యాత్మిక గురువు",
    swamijiName: "సత్యానంద స్వామిజీ",
    meetingBody:
      "ఆశ్రమానికి చేసిన ఒక ప్రశాంతమైన సందర్శన సందర్భంగా, ప్రొ. కృష్ణమూర్తి గారు తన సతీమణితో కలిసి సత్యానంద స్వామిజీని వ్యక్తిగతంగా కలిసే అదృష్టం పొందారు. మర్యాదపూర్వక సందర్శనగా మొదలైనది సంస్కృతం, వేదాంతం మరియు ప్రాచీన గ్రంథాలలో దాగి ఉన్న శాస్త్రాలపై గంటల తరబడి సంభాషణగా మారింది — ఇది తన పండిత జీవితంలో అత్యంత ప్రభావవంతమైన సమావేశాలలో ఒకటిగా ప్రొ. కృష్ణమూర్తి గారు తరువాత అభివర్ణించారు. స్వామిజీ ఆశీర్వాదం మరియు మార్గదర్శకత్వం నేటికీ ఆయన కృషి యొక్క విలువలు మరియు దిశను రూపొందిస్తూనే ఉన్నాయి.",
    gurusLabel: "ఇతర గురువులు",
    gurusHeading: "అనేక విభాగాలలో గురువులు",
  },
};

const gurus = [
  {
    name: { en: "Brahmasti Sri Kappagantula Veera Bhadra Sastry garu", te: "శ్రీ కప్పగంతుల వీరభద్ర శాస్త్రి" },
    subject: { en: "Sanskrit & Telugu Sahitya", te: "సంస్కృత & తెలుగు సాహిత్యం" },
    title: { en: "", te: "" },
    desc: {
      en: "A foundational teacher in Prof. Krishna Murthy's early years, guiding him through classical Sanskrit and Telugu literary works and instilling a lifelong discipline of close textual reading.",
      te: "ప్రొ. కృష్ణమూర్తి గారి తొలినాళ్లలో పునాదిగా నిలిచిన గురువు, సంస్కృత మరియు తెలుగు సాహిత్య గ్రంథాలలో మార్గదర్శనం చేసి, జీవితాంతం కొనసాగే సూక్ష్మ పఠన శిక్షణను నాటారు.",
    },
    image: "/gurus/Brahmasti%20Sri%20Kappagantula%20Veera%20Bhadra%20Sastry%20garu.png",
  },
  {
    name: { en: "Sri K. Sri Anjaneya Sastry", te: "శ్రీ కె. శ్రీ ఆంజనేయ శాస్త్రి" },
    subject: { en: "Vyakarana Sastra (Grammar)", te: "వ్యాకరణ శాస్త్రం" },
    title: { en: "revered as \u201cVyaakarana Sthaapanaacharya\u201d", te: "\u201cవ్యాకరణ స్థాపనాచార్య\u201dగా గౌరవించబడ్డారు" },
    desc: {
      en: "Under this revered grammarian, Prof. Krishna Murthy undertook rigorous training in Panini's Vyakarana, developing the precision of language analysis that would later define his scholarly method.",
      te: "ఈ గౌరవనీయ వ్యాకరణ పండితుడి వద్ద ప్రొ. కృష్ణమూర్తి గారు పాణిని వ్యాకరణంలో కఠోర శిక్షణ పొంది, తర్వాత తన పండిత పద్ధతిని నిర్వచించిన భాషా విశ్లేషణ ఖచ్చితత్వాన్ని అభివృద్ధి చేసుకున్నారు.",
    },
    image: "/gurus/Kuppa%20Sri%20Anjaneya%20Sastry%20garu%20and%20Rajyalakshi%20garu.jpeg",
  },
  {
    name: { en: "Sri Kuppa Lakshmavadhani", te: "శ్రీ కుప్పా లక్ష్మావధాని" },
    subject: { en: "Vedanta Sastra & Puranas", te: "వేదాంత శాస్త్రం & పురాణాలు" },
    title: { en: "known as \u201cSanga Swadhyaya Bhaskara\u201d", te: "\u201cసంఘ స్వాధ్యాయ భాస్కర\u201dగా ప్రసిద్ధి" },
    desc: {
      en: "A master of Vedanta and the Puranic corpus, he introduced Prof. Krishna Murthy to philosophical traditions that would later inform his comparative work between Sanskrit thought and modern science.",
      te: "వేదాంత మరియు పురాణ సాహిత్యంలో నిపుణుడైన ఈ గురువు, ప్రొ. కృష్ణమూర్తి గారికి తత్వశాస్త్ర సంప్రదాయాలను పరిచయం చేశారు, ఇవి తర్వాత సంస్కృత ఆలోచన మరియు ఆధునిక విజ్ఞానం మధ్య తులనాత్మక కృషికి పునాదిగా నిలిచాయి.",
    },
    image: "/gurus/Kuppa%20Lakshmavadhani%20garu%20%26%20Smt.%20Bhanumathi%20garu.jpeg",
  },
  {
    name: { en: "Sri K. Subrahmanya Sastry", te: "శ్రీ కె. సుబ్రహ్మణ్య శాస్త్రి" },
    subject: { en: "Ancient Astronomy & Vedic Sciences", te: "ప్రాచీన ఖగోళశాస్త్రం & వేద విజ్ఞానం" },
    title: { en: "retired Statistician, Dept. of Irrigation, Govt. of A.P.", te: "పదవీ విరమణ చేసిన స్టాటిస్టీషియన్, నీటిపారుదల శాఖ, ఆంధ్రప్రదేశ్ ప్రభుత్వం" },
    desc: {
      en: "A rare bridge between statistical rigor and ancient astronomical texts, he mentored Prof. Krishna Murthy in reading Vedic astronomy through a quantitative, evidence-based lens.",
      te: "గణాంక కచ్చితత్వం మరియు ప్రాచీన ఖగోళ గ్రంథాల మధ్య అరుదైన వారధిగా నిలిచిన ఈ గురువు, వేద ఖగోళశాస్త్రాన్ని పరిమాణాత్మక, ఆధార-ఆధారిత దృక్కోణంలో చదవడంలో ప్రొ. కృష్ణమూర్తి గారికి మార్గదర్శకత్వం వహించారు.",
    },
    image: "/gurus/Kuppa%20Subramanya%20Sastry.jpeg",
  },
  {
    name: { en: "Sri K. Dakshina Murthy", te: "శ్రీ కె. దక్షిణ మూర్తి" },
    subject: { en: "Jyothisha Sastra (Astrology)", te: "జ్యోతిష శాస్త్రం" },
    title: { en: "Income Tax Practitioner, Mahabubnagar", te: "ఆదాయపు పన్ను ప్రాక్టీషనర్, మహబూబ్‌నగర్" },
    desc: {
      en: "Balancing a professional career with deep traditional scholarship, he trained Prof. Krishna Murthy in classical Jyothisha, emphasizing its mathematical and observational foundations.",
      te: "వృత్తిపరమైన కెరీర్‌ను లోతైన సాంప్రదాయ పాండిత్యంతో సమతుల్యం చేసుకున్న ఈ గురువు, శాస్త్రీయ జ్యోతిషంలో ప్రొ. కృష్ణమూర్తి గారికి శిక్షణ ఇచ్చారు, దాని గణిత మరియు పరిశీలనాత్మక పునాదులను నొక్కిచెప్పారు.",
    },
    image: "/gurus/Kuppa%20dakshina%20murthy%20garu.jpeg",
  },
  {
    name: { en: "Sri Narayana Ghanapathi", te: "శ్రీ నారాయణ ఘనపాఠి" },
    subject: { en: "Krishna Yajurveda (Partial)", te: "కృష్ణ యజుర్వేదం (పాక్షికం)" },
    title: { en: "Machilipatnam", te: "మచిలీపట్నం" },
    desc: {
      en: "A traditional Vedic reciter from Machilipatnam, he introduced Prof. Krishna Murthy to sections of the Krishna Yajurveda, preserving oral recitation methods passed down through generations.",
      te: "మచిలీపట్నానికి చెందిన సాంప్రదాయ వేద పఠనాచార్యుడు, ప్రొ. కృష్ణమూర్తి గారికి కృష్ణ యజుర్వేదంలోని కొన్ని భాగాలను పరిచయం చేసి, తరతరాలుగా వస్తున్న మౌఖిక పఠన పద్ధతులను కాపాడారు.",
    },
    image: "/gurus/Sri%20Narayana%20Ghanapathi.png",
  },
];

export default function GurusPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      <Navbar />
      <main>
        <section className="relative bg-[var(--background)] pb-16 pt-24 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Swamiji hero image — full width, curved edges */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:aspect-[16/9]">
          <Image
            src="/gurus/Sri%20Ganapathy%20Sachchidananda%20Swamiji%2C.png"
            alt={t.swamijiName}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Single row: title + name + meeting text (left) / client+wife image (right, half width) */}
        <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:items-center sm:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              {t.swamijiTitle}
            </p>
            <h1 className="mt-3 text-2xl font-normal leading-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">
              {t.swamijiName}
            </h1>
            <p className="mt-6 text-base leading-8 text-[var(--secondary)] sm:text-lg sm:leading-9">
              {t.meetingBody}
            </p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[var(--foreground)]/5">
            <Image
              src="/gurus/kvk%20with%20swamiji.png"
              alt="Prof. Krishna Murthy with Sri Ganapathy Sachchidananda Swamiji"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Other Gurus — same image+text template, alternating sides, repeated per guru */}
        <div className="mt-16 border-t border-[var(--secondary)]/15 pt-14 sm:mt-24 sm:pt-16">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            {t.gurusLabel}
          </p>
          <h2 className="mb-12 max-w-xl text-2xl font-normal leading-tight text-[var(--foreground)] sm:mb-16 sm:text-3xl">
            {t.gurusHeading}
          </h2>

          <div className="flex flex-col gap-14 sm:gap-20">
            {gurus.map((guru, i) => {
              const imageOnRight = i % 2 === 0;
              return (
                <div
                  key={guru.name.en}
                  className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-10"
                >
                  <div
                    className={
                      imageOnRight
                        ? "order-2 sm:order-1"
                        : "order-2 sm:order-2"
                    }
                  >
                    <span className="mb-4 inline-block h-1 w-10 rounded-full bg-[var(--accent)]" />
                    <h3 className="text-xl font-normal leading-snug text-[var(--foreground)] sm:text-2xl">
                      {guru.name[language]}
                    </h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                      {guru.subject[language]}
                    </p>
                    {guru.title[language] && (
                      <p className="mt-2 text-sm text-[var(--secondary)]">{guru.title[language]}</p>
                    )}
                    <p className="mt-4 text-base leading-7 text-[var(--secondary)]">
                      {guru.desc[language]}
                    </p>
                  </div>
                  <div
                    className={
                      imageOnRight
                        ? "relative order-1 aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:order-2"
                        : "relative order-1 aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:order-1"
                    }
                  >
                    {guru.image ? (
                      <Image
                        src={guru.image}
                        alt={guru.name[language]}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]/50">
                        Portrait forthcoming
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
