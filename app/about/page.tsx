"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

type ChildFamily = {
  photo: string;
  label: string;
  coupleEn: string;
  coupleTe: string;
  kidsEn?: string;
  kidsTe?: string;
};

// TODO: replace each photo path with the actual uploaded image for that child/spouse pair
const childrenFamilies: ChildFamily[] = [
  {
    photo: "/family/son-1.png",
    label: "son1",
    coupleEn: "Kuppa Karthikeya Sharma & Lakshmi Sailaja",
    coupleTe: "కుప్ప కార్తికేయ శర్మ & లక్ష్మీ శైలజ",
  },
  {
    photo: "/family/son-2.png",
    label: "son2",
    coupleEn: "Kuppa Viswanatha Sharma & Tara",
    coupleTe: "కుప్ప విశ్వనాథ శర్మ & తార",
    kidsEn: "Gouthama Sharma & Venkata Vagdevi",
    kidsTe: "గౌతమ శర్మ & వేంకట వాగ్దేవి",
  },
  {
    photo: "/family/son-3.png",
    label: "son3",
    coupleEn: "Kuppa Sri Guru Bilwesha Sharma & Naga Shravani",
    coupleTe: "కుప్ప శ్రీ గురు బిల్వేష శర్మ & నాగ శ్రావణి",
    kidsEn: "Bharati & Bhamathi",
    kidsTe: "భారతి & భామతి",
  },
  {
    photo: "/family/son-4.png",
    label: "son4",
    coupleEn: "Kuppa Narasimha & Yagnapriya",
    coupleTe: "కుప్ప నరసింహ & యజ్ఞప్రియ",
    kidsEn: "Puruhutika",
    kidsTe: "పురుహూతిక",
  },
  {
    photo: "/family/daughter.png",
    label: "daughter",
    coupleEn: "Rajalakshmi Sridatta & Lolla Srinivasan",
    coupleTe: "రాజలక్ష్మి శ్రీదత్త & లొల్ల శ్రీనివాసన్",
    kidsEn: "Lolla Rohit Datta & Srivani",
    kidsTe: "లొల్ల రోహిత్ దత్త & శ్రీవాణి",
  },
];

const content = {
  en: {
    name: "Kuppa Venkata Krishna Murthy",
    intro1:
      "Prof. K. V. Krishna Murthy is a rare scholar in whom the poet, the philosopher and the scientist coexist in unusual harmony. For over five decades, he has devoted himself to uncovering the scientific depth hidden within ancient Sanskrit literature, building bridges between India's timeless wisdom and the discoveries of modern science. Equally at home reciting classical Telugu verse or discussing astronomy, mathematics and Ayurveda on national television, he has emerged as one of the most respected voices connecting Vedic knowledge with contemporary scholarship.",
    intro2:
      "Trained under some of the last great traditional masters of Sanskrit grammar, Vedanta and astronomy, and armed with a modern postgraduate degree in Mathematics, Prof. Krishna Murthy occupies a rare middle ground, equally credible to traditional pandits and to university scientists. This unusual combination has defined his life's work and shaped a body of scholarship spanning poetry, prose, translation and scientific research.",
    p1: "His area of specialization has remained constant throughout his career: Sanskrit literature, and correlating it with modern science. Education: B.Sc. (Mathematics, Physics & Chemistry), Andhra University, 1969; M.A. (Pure Mathematics), Andhra University, 1972.",
    p2: "Across a life of scholarship, he has served as Chairman & Managing Trustee of the Institute of Scientific Research on Vedas (I-SERVE) from 2004 to 2016, Professor at the School of Vedic Studies & Research, Jawaharlal Nehru Institute for Advanced Studies (JNIAS), Hyderabad, and Chief Editor of Bhaktimala, the monthly magazine of Avadhoota Datta Peetham, Mysore, since 1986, alongside roles as Trustee and Educational Officer at the Peetham, Sanskrit Teacher at SGS Veda Sastra Pathasala, Mysore, and memberships on the Board of Ayurveda Studies at Dr. N.T.R. University of Medical Sciences and TTD's Sri Venkateswara Institute of Higher Vedic Studies. Beyond formal roles, he has personally guided over 50 students to the advanced Alankaranta level and mentored numerous scholars through M.A., M.Phil. and Ph.D. research bridging Sanskrit and modern science.",
    p3: "In 2004, Prof. Krishna Murthy founded I-SERVE, a registered charitable trust recognised by India's Department of Scientific and Industrial Research (DSIR) as a Scientific and Industrial Research Organisation. Under his leadership, I-SERVE has organised around 50 national and international conferences and forged research collaborations with institutions including the Central University of Hyderabad, Dr. B.R. Ambedkar Open University, S.V. Ayurvedic Medical College (Tirupati), the Sanskrit Academy at Osmania University, GITAM University, AAPNA (USA) and the Indic Studies Foundation (California, USA).",
    p4: "His scholarship rests on rigorous, traditional training received directly from eminent gurus across disciplines: Sanskrit & Telugu Sahitya under Sri Kappagantula Virabhadra Sastry, Vyakarana Sastra under Sri K. Sri Anjaneya Sastry, Vedanta Sastra & Puranas under Sri Kuppa Lakshmavadhani, Ancient Astronomy & Vedic Sciences under Sri K. Subrahmanya Sastry, Jyothisha Sastra under Sri K. Dakshina Murthy, and Krishna Yajurveda under Sri Narayana Ghanapathi, extending also to classic texts such as Dhvanyaloka and Rasagangadhara, alongside scientific Sanskrit works including Brihat Samhita and Adbhuta Sagara.",
    familyHeading: "Family",
    family1:
      "Behind Prof. Krishna Murthy's decades of scholarship has stood the quiet steadiness of his family. His wife, Smt. Shanta, has been a constant presence through the long years of research, travel and teaching that his work has demanded, holding the home together so that his scholarship could flourish.",
    family2:
      "Her support has run through every phase of his career, from the early years of study under his gurus to the founding and growth of I-SERVE, and it remains woven into the life of learning and service that the family continues to uphold today.",
    familyImgAlt: "Prof. K. V. Krishna Murthy with Smt. Shanta",
    childrenHeading: "The Children",
    childrenIntro: "Four sons and a daughter, each carrying the family forward in their own way.",
    ordinals: ["First-born", "Second-born", "Third-born", "Fourth-born", "Daughter"],
    kidsLabel: "Children:",
    legacyHeading: "Legacy",
    legacy1:
      "Prof. Krishna Murthy's legacy continues through his children and their families. Across the generations that have followed, the family's commitment to learning and service remains very much alive.",
    wholeFamilyAlt: "The Kuppa family",
  },
  te: {
    name: "కుప్ప వేంకట కృష్ణమూర్తి",
    intro1:
      "ప్రొ. కె. వి. కృష్ణమూర్తి గారు కవి, తత్వవేత్త మరియు శాస్త్రవేత్త అసాధారణ సామరస్యంతో సహజీవనం చేసే అరుదైన పండితులు. ఐదు దశాబ్దాలకు పైగా, ఆయన ప్రాచీన సంస్కృత సాహిత్యంలో దాగిన శాస్త్రీయ లోతును వెలికితీస్తూ, భారతదేశపు శాశ్వత జ్ఞానానికి మరియు ఆధునిక శాస్త్ర ఆవిష్కరణలకు మధ్య వారధులు నిర్మిస్తున్నారు. సాంప్రదాయ తెలుగు పద్యాలను పఠించడంలోనూ, జాతీయ టెలివిజన్‌లో ఖగోళశాస్త్రం, గణితం మరియు ఆయుర్వేదంపై చర్చించడంలోనూ సమానంగా నిష్ణాతులైన ఆయన, వేద జ్ఞానాన్ని సమకాలీన పాండిత్యంతో అనుసంధానించే అత్యంత గౌరవనీయమైన స్వరాలలో ఒకరిగా ఎదిగారు.",
    intro2:
      "సంస్కృత వ్యాకరణం, వేదాంతం మరియు జ్యోతిష శాస్త్రంలో చివరి తరం మహాన్ సాంప్రదాయిక గురువుల వద్ద శిక్షణ పొంది, గణితంలో ఆధునిక స్నాతకోత్తర పట్టా కూడా కలిగిన ప్రొ. కృష్ణమూర్తి గారు సాంప్రదాయ పండితులకు మరియు విశ్వవిద్యాలయ శాస్త్రవేత్తలకు సమానంగా ఆమోదయోగ్యమైన అరుదైన మధ్యస్థానంలో నిలుస్తారు. ఈ అసాధారణ మేళవింపు ఆయన జీవిత కృషిని నిర్వచించింది మరియు కవిత్వం, గద్యం, అనువాదం, శాస్త్రీయ పరిశోధనలను ఆవరించిన పాండిత్య సంపదను రూపొందించింది.",
    p1: "ఆయన నిపుణత రంగం కెరీర్ మొత్తంలో స్థిరంగా ఉంది: సంస్కృత సాహిత్యం, దానిని ఆధునిక శాస్త్రంతో అనుసంధానించడం. విద్య: బి.ఎస్సి. (గణితం, భౌతిక శాస్త్రం & రసాయన శాస్త్రం), ఆంధ్ర విశ్వవిద్యాలయం, 1969; ఎం.ఎ. (స్వచ్ఛ గణితం), ఆంధ్ర విశ్వవిద్యాలయం, 1972.",
    p2: "పాండిత్య జీవితంలో, ఆయన 2004 నుండి 2016 వరకు ఇన్‌స్టిట్యూట్ ఆఫ్ సైంటిఫిక్ రీసెర్చ్ ఆన్ వేదాస్ (I-SERVE)కు చైర్మన్ & మేనేజింగ్ ట్రస్టీగా, హైదరాబాద్‌లోని జవహర్‌లాల్ నెహ్రూ ఇన్‌స్టిట్యూట్ ఫర్ అడ్వాన్స్‌డ్ స్టడీస్ (JNIAS)లోని వేద అధ్యయన & పరిశోధన విభాగంలో ప్రొఫెసర్‌గా, మరియు 1986 నుండి మైసూర్‌లోని అవధూత దత్త పీఠం మాసపత్రిక భక్తిమాలకు చీఫ్ ఎడిటర్‌గా సేవలందించారు, అలాగే పీఠంలో ట్రస్టీ, విద్యాధికారి పాత్రలు, మైసూర్‌లోని SGS వేద శాస్త్ర పాఠశాలలో సంస్కృత ఉపాధ్యాయుడిగా, డా. ఎన్.టి.ఆర్. వైద్య విశ్వవిద్యాలయంలోని ఆయుర్వేద అధ్యయనాల బోర్డు మరియు TTD యొక్క శ్రీ వేంకటేశ్వర ఉన్నత వేద అధ్యయన సంస్థలో సభ్యత్వాలు కూడా నిర్వహించారు. అధికారిక పాత్రలకు మించి, ఆయన స్వయంగా 50 మందికి పైగా విద్యార్థులను అలంకారాంత స్థాయి వరకు మార్గనిర్దేశం చేశారు మరియు సంస్కృతం, ఆధునిక శాస్త్రాన్ని అనుసంధానించే ఎం.ఎ., ఎం.ఫిల్. మరియు పిహెచ్‌డి పరిశోధనల ద్వారా అనేక మంది పండితులను మెంటర్ చేశారు.",
    p3: "2004లో, ప్రొ. కృష్ణమూర్తి గారు I-SERVEను స్థాపించారు, ఇది భారత శాస్త్ర, సాంకేతిక పరిశోధన విభాగం (DSIR) చే శాస్త్రీయ మరియు పారిశ్రామిక పరిశోధన సంస్థగా గుర్తింపు పొందిన నమోదిత ధార్మిక ట్రస్ట్. ఆయన నాయకత్వంలో, I-SERVE సుమారు 50 జాతీయ మరియు అంతర్జాతీయ సదస్సులను నిర్వహించింది మరియు హైదరాబాద్ కేంద్రీయ విశ్వవిద్యాలయం, డా. బి.ఆర్. అంబేద్కర్ ఓపెన్ యూనివర్సిటీ, ఎస్.వి. ఆయుర్వేదిక్ మెడికల్ కాలేజీ (తిరుపతి), ఉస్మానియా విశ్వవిద్యాలయంలోని సంస్కృత అకాడమీ, గీతం విశ్వవిద్యాలయం, AAPNA (USA) మరియు ఇండిక్ స్టడీస్ ఫౌండేషన్ (కాలిఫోర్నియా, USA) వంటి సంస్థలతో పరిశోధన సహకారాలను ఏర్పరచుకుంది.",
    p4: "ఆయన పాండిత్యం వివిధ విభాగాలలో ప్రముఖ గురువుల నుండి నేరుగా పొందిన కఠోర, సాంప్రదాయ శిక్షణపై ఆధారపడి ఉంది: శ్రీ కప్పగంతుల వీరభద్ర శాస్త్రి వద్ద సంస్కృత & తెలుగు సాహిత్యం, శ్రీ కె. శ్రీ ఆంజనేయ శాస్త్రి వద్ద వ్యాకరణ శాస్త్రం, శ్రీ కుప్ప లక్ష్మావధాని వద్ద వేదాంత శాస్త్రం & పురాణాలు, శ్రీ కె. సుబ్రహ్మణ్య శాస్త్రి వద్ద ప్రాచీన ఖగోళశాస్త్రం & వేద విజ్ఞానం, శ్రీ కె. దక్షిణ మూర్తి వద్ద జ్యోతిష శాస్త్రం, మరియు శ్రీ నారాయణ ఘనపాఠి వద్ద కృష్ణ యజుర్వేదం, అలాగే ధ్వన్యాలోకం, రసగంగాధరం వంటి సాంప్రదాయిక గ్రంథాలు మరియు బృహత్ సంహిత, అద్భుత సాగరం వంటి శాస్త్రీయ సంస్కృత రచనలకు కూడా విస్తరించింది.",
    familyHeading: "కుటుంబం",
    family1:
      "ప్రొ. కృష్ణమూర్తి గారి దశాబ్దాల పాండిత్యం వెనుక ఆయన కుటుంబం నిశ్శబ్ద స్థిరత్వంతో నిలిచింది. ఆయన పత్ని, శ్రీమతి శాంత, ఆయన పనికి అవసరమైన సుదీర్ఘ పరిశోధన, ప్రయాణం మరియు బోధన సంవత్సరాలలో నిరంతర ఉనికిగా నిలిచారు, ఆయన పాండిత్యం వర్ధిల్లడానికి ఇంటిని కలిపి ఉంచారు.",
    family2:
      "ఆమె మద్దతు ఆయన కెరీర్‌లోని ప్రతి దశలోనూ ప్రవహించింది, గురువుల వద్ద అధ్యయనం చేసిన తొలి సంవత్సరాల నుండి I-SERVE స్థాపన, వృద్ధి వరకు, మరియు నేటికీ కుటుంబం కొనసాగిస్తున్న అభ్యాసం, సేవా జీవితంలో అల్లుకుపోయి ఉంది.",
    familyImgAlt: "శ్రీమతి శాంతతో ప్రొ. కె. వి. కృష్ణమూర్తి",
    childrenHeading: "పిల్లలు",
    childrenIntro: "నలుగురు కుమారులు మరియు ఒక కుమార్తె, ఒక్కొక్కరూ తమదైన రీతిలో కుటుంబాన్ని ముందుకు తీసుకెళ్తున్నారు.",
    ordinals: ["మొదటి సంతానం", "రెండవ సంతానం", "మూడవ సంతానం", "నాలుగవ సంతానం", "కుమార్తె"],
    kidsLabel: "పిల్లలు:",
    legacyHeading: "వారసత్వం",
    legacy1:
      "ప్రొ. కృష్ణమూర్తి గారి వారసత్వం ఆయన పిల్లలు, వారి కుటుంబాల ద్వారా కొనసాగుతోంది. తరతరాలుగా, అభ్యాసం మరియు సేవ పట్ల కుటుంబ నిబద్ధత నేటికీ సజీవంగా ఉంది.",
    wholeFamilyAlt: "కుప్ప కుటుంబం",
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fdfdea] px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:px-10 lg:px-16 lg:pb-20 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10">
          <div className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(26,26,26,0.2)] sm:h-[380px] lg:h-[440px]">
            <Image
              src="/about-1.png"
              alt="Prof. K. V. Krishna Murthy"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover"
            />
          </div>

          {/* Heading + intro */}
          <div>
            <h1 className="break-words text-center text-4xl font-normal leading-tight tracking-tight text-[#1a1a1a] sm:text-5xl lg:text-right lg:text-6xl">
              {t.name}
            </h1>

            <div className="mt-5 space-y-4 text-left text-sm leading-7 text-[#2a2a2a] sm:mt-6 sm:space-y-5 sm:text-[15px] sm:leading-[1.9] md:text-justify md:text-base">
              <p>{t.intro1}</p>
              <p>{t.intro2}</p>
            </div>
          </div>
        </div>

        {/* Full-width continuation */}
        <div className="mt-8 space-y-4 text-left text-sm leading-7 text-[#2a2a2a] sm:mt-10 sm:space-y-5 sm:text-[15px] sm:leading-[1.9] md:text-justify md:text-base">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
          <p>{t.p4}</p>
        </div>

        {/* Family section */}
        <div className="mt-12 border-t border-[#1a1a1a]/10 pt-10 sm:mt-16 sm:pt-12 lg:mt-20 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
            <div className="order-2 text-left text-sm leading-7 text-[#2a2a2a] lg:order-1 lg:flex lg:flex-col lg:justify-center sm:text-[15px] sm:leading-[1.9] md:text-justify md:text-base">
              <h2 className="text-left text-3xl font-normal leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl">
                {t.familyHeading}
              </h2>
              <div className="mt-5 space-y-5">
                <p>{t.family1}</p>
                <p>{t.family2}</p>
              </div>
            </div>

            <div className="order-1 relative h-[260px] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(26,26,26,0.2)] sm:h-[360px] lg:order-2 lg:h-[380px]">
              <Image
                src="/about-2.png"
                alt={t.familyImgAlt}
                fill
              sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Legacy and children */}
        <div className="mt-12 border-t border-[#1a1a1a]/10 pt-10 sm:mt-16 sm:pt-12 lg:mt-20 lg:pt-16">
          <h2 className="text-3xl font-normal leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl">
            {t.legacyHeading}
          </h2>
          <div className="mt-5 max-w-3xl space-y-5 text-left text-sm leading-7 text-[#2a2a2a] sm:text-[15px] sm:leading-[1.9] md:text-justify md:text-base">
            <p>{t.legacy1}</p>
          </div>

          <div className="relative mt-8 h-[320px] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(26,26,26,0.2)] sm:h-[480px] lg:mt-10 lg:h-[640px]">
            <Image
              src="/family/whole-family.png"
              alt={t.wholeFamilyAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <section aria-label={t.childrenHeading} className="mt-10 sm:mt-12 lg:mt-16">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
                {childrenFamilies.map((child, index) => {
                  const couple = language === "en" ? child.coupleEn : child.coupleTe;
                  const kids = language === "en" ? child.kidsEn : child.kidsTe;

                  return (
                    <article key={child.label} className="w-full overflow-hidden rounded-2xl border border-[#1a1a1a]/10 bg-white/40 md:w-[calc(50%-0.625rem)]">
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={child.photo}
                          alt={couple}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 text-center sm:p-5">
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a1a1a]/40">
                          {t.ordinals[index]}
                        </span>
                        <h3 className="mt-2 break-words text-lg font-normal leading-snug text-[#1a1a1a] sm:text-xl">
                          {couple}
                        </h3>
                        {kids && (
                          <p className="mt-3 text-sm leading-6 text-[#2a2a2a]/75">
                            {t.kidsLabel} {kids}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
          </section>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
