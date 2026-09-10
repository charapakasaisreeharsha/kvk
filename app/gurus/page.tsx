"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";

type Text = { en: string; te: string };
type Guru = { name: Text; group: Text; body: Text; image?: string };

const labels = {
  en: { label: "Spiritual Lineage", hero: "Supreme Spiritual Leader", more: "Gurus, Parents & Teachers", heading: "The guides who shaped a life of learning" },
  te: { label: "ఆధ్యాత్మిక పరంపర", hero: "పరమ ఆధ్యాత్మిక గురువు", more: "గురువులు, తల్లిదండ్రులు & విద్యాగురువులు", heading: "జ్ఞాన జీవితాన్ని మలిచిన మార్గదర్శకులు" },
};

const hero: Guru = {
  name: { en: "Jagadguru Param Pujya Sri Avadhoota Datta Peethadhipati Sri Sri Sri Ganapathy Sachchidananda Swamiji", te: "జగద్గురు పరమపూజ్య శ్రీ అవధూత దత్తపీఠాధిపతి శ్రీశ్రీశ్రీ గణపతి సచ్చిదానంద స్వామీజీ" },
  group: { en: "Supreme Spiritual Leader", te: "పరమ ఆధ్యాత్మిక గురువు" },
  body: {
    en: "A radiant ascetic presence in today’s spiritual firmament, Swamiji has revitalised the path of devotion to Lord Dattatreya and inspired the establishment of more than seventy Datta temples in India and over thirty abroad. Through his spiritual music and Datta Kriya Yoga, he has guided countless seekers towards inner peace and transformation. For Kuppa Venkata Krishnamurthy garu, Swamiji was not merely a guide but the elder of the family; their bond transcended that of guru and disciple and became a profound bond of the soul.",
    te: "వీరు ఈనాటి ఆధ్యాత్మిక దివ్యాకాశంలో మంధ్యందిన మార్తాండ మండలమై దేదీప్యమానంగా ప్రకాశిస్తున్న తపోనిధి! దత్తాత్రేయ భక్తిమార్గాన్ని పునరుద్ధరిస్తూ స్వదేశంలో  70కిపైగానూ; విదేశాలలో 30కి పైగానూ దత్తమందిరాలను నిర్మించిన దివ్యశక్తి! తన అద్వితీయ యోగశక్తితో ఆర్తుల ఆధివ్యాధులను తొలగించి, వారిలో అనూహ్యమైన ఆధ్యాత్మిక పరివర్తనలను తీసుకువస్తున్న యోగబ్రహ్మ! తన నాదప్రసారాలతో విశ్వశాంతికి ఊపిరులూదుతున్న నాదబ్రహ్మ!! తన దత్త క్రియాయోగ తరంగాలతో భక్తుల అంతరంగాలను వినూత్న ఆధ్యాత్మిక విహంగాలుగా శిల్పీకరిస్తున్న శాంతిబ్రహ్మ!!! వీరు కుప్పావేంకట కృష్ణమూర్తిగారికి బహిరంతర్మార్గ దర్శకులు మాత్రమే కాదు, వారికి శ్రీ స్వామీజీవారే కుటుంబ పెద్ద. శ్రీస్వామీజీకి – కుప్పా వేంకట కృష్ణమూర్తిగారికీ మధ్యగల సంబంధం గురుశిష్య సంబంధానికీ, ఉపాస్య ఉపాసక సంబంధానికీ మించిన ఆత్మబంధం అనటం సముచితం!!!",
  },
  image: "/gurus/Sri%20Ganapathy%20Sachchidananda%20Swamiji%2C.png",
};

const gurus: Guru[] = [
  {
    name: { en: "Sri Sri Sri Janardanananda Saraswati Swamiji", te: "శ్రీశ్రీశ్రీ జనార్దనానంద సరస్వతీ స్వామివారు" },
    group: { en: "Spiritual Guru", te: "ఆధ్యాత్మిక గురువు" },
    body: { en: "An extraordinary Advaita yogi, Sri Janardanananda Saraswati Swamiji rose from the life of a householder-scholar to the highest states of yogic attainment. Untouched by pleasure, fame, attachment, or aversion, his life was a living demonstration of spiritual discipline. To Kuppa Venkata Krishnamurthy garu, he was his heart, confidant, friend, challenger, guide, and life’s highest purpose.", te: "వీరు సామాన్య సాంసారిక పండిత జీవనస్థాయి నుంచి – మత్తుమందు అవసరం లేకుండానే శస్త్రచికిత్స జరిపించుకోగల స్థాయికి ఎదిగిన అపూర్వ అద్వైత యోగి. కేవలకుంభక విద్యలో పరాకాష్ఠ స్థితిలో వుండి గూడా భోగాలకు, కీర్తికి, మమకారాలకు, ద్వేషాలకు – దూరంగా జీవించటం ఎలాగో తన శిష్యులకు ప్రత్యక్షంగా ప్రదర్శించిన సాధనకు సాక్ష్యం; సిద్ధికి శిఖరం !! కుప్పావేంకట కృష్ణమూర్తిగారికి వీరే మనసు; వీరే అలుసు; వీరే మిత్రులు; వీరే పోటీదారు; వీరే మార్గదర్శకులు; వీరే జీవిత పరమలక్ష్యం !!!" },
    image: "/gurus/Sri%20Janardanananda%20Saraswathi%20Swami.jpeg",
  },
  {
    name: { en: "Sri Nanduri Veeraraja Rao garu", te: "శ్రీ నండూరి వీరరాజారావుగారు" },
    group: { en: "Spiritual Guru", te: "ఆధ్యాత్మిక గురువు" },
    body: { en: "Outwardly stern yet inwardly tender, Sri Nanduri Veeraraja Rao garu was a sage capable of remaining in yogic absorption for more than twelve hours a day. His penetrating analysis helped Kuppa Venkata Krishnamurthy garu find his intellectual and spiritual direction, and he became the divine messenger who brought him into the fold of Sri Ganapathy Sachchidananda Swamiji.", te: "పైకి పోట్ల ఎద్దు! లోపల అమృతపు ముద్ద! పైకి గడుసు మాటల గోష్ఠి! లోపల యోగ దీక్షకు పరాకాష్ఠ! రోజుకు 12 గంటలకు పైగా యోగసమాధిలో వుండగల మహర్షి. అధునాతన సనాతన వాదాలను అన్నింటినీ ఆకళించుకొనివున్న మహా మనీషి. వామపక్ష వాదాల వ్యామోహంలో కొట్టుకుపోతున్న కుప్పా వేంకట కృష్ణమూర్తి గారిని నిలబెట్టి “నీ తర్కమేదో, నీ సైన్సు ఏమిటో నాకు చూపించు” అని సవాలు విసిరి, తన విశ్లేషణ వైభవంతో కుప్పావేంకట కృష్ణమూర్తిగారిచేత “నా తండ్రి వాదమే సత్యం” అనిపించిన జగజ్జెట్టి! అంతమాత్రమే కాదు, కుప్పావేంకట కృష్ణమూర్తిని శ్రీశ్రీశ్రీ గణపతి సచ్చిదానందుల ఒడిలోకి చేర్చిన దేవదూత గూడా వీరే!!!" },
  },
  {
    name: { en: "Brahmasri Kuppa Sri Anjaneya Sastry garu and Smt. Rajyalakshmi garu", te: "బ్రహ్మశ్రీ కుప్పా శ్రీ ఆంజనేయశాస్త్రిగారు మరియు శ్రీమతి రాజ్యలక్ష్మీ కుటుంబ గార్లు" },
    group: { en: "Parents & Early Teachers", te: "తల్లిదండ్రులు & విద్యాగురువులు" },
    body: { en: "The foster parents of Kuppa Krishnamurthy garu, Sri Anjaneya Sastry garu was a scholar of exceptional brilliance, honoured as Sarva Shastra Visharada and Vyakarana Sthapanacharya. His mastery of Sanskrit and Telugu literature, criticism, grammar, poetics, and original composition shaped generations of scholars. A conversation with him was itself a lesson.", te: "వీరు కుప్పాకృష్ణమూర్తిగారి దత్త మాతాపితరులు. బంధుత్వంలో స్వయానా పెదనాన్న. అమ్మక్కయ్యలు. శ్రీ ఆంజనేయశాస్త్రిగారు సాంప్రదాయికమైన ఆరు శాస్త్రాలలోనూ అఖండ పాండిత్యం సంపాదించి “సర్వశాస్త్ర విశారద” అనే బిరుదునందుకొన్న ధీశాలి. తన అభిమాన శాస్త్రమైన వ్యాకరణ శాస్త్రంలో ఆత్మసమానులైన ఉద్దండ పండితులను డజనులగొద్దీ తయారుచేసి “వ్యాకరణ స్థాపనాచార్య” అన్న బిరుదునందుకొన్న మహాగురువు. వీరితో సంభాషణే ఒక నూతన పాఠంగా వుండేది." },
    image: "/gurus/Kuppa%20Sri%20Anjaneya%20Sastry%20garu%20and%20Rajyalakshi%20garu.jpeg",
  },
  {
    name: { en: "Brahmasri Kuppa Lakshmavadhani garu and Smt. Bhanumathamma garu", te: "బ్రహ్మశ్రీ కుప్పా లక్ష్మావధానిగారు మరియు శ్రీమతి భానుమతమ్మగార్లు" },
    group: { en: "Parents & Early Teachers", te: "తల్లిదండ్రులు & విద్యాగురువులు" },
    body: { en: "The parents of Kuppa Venkata Krishnamurthy garu and companions in spiritual practice, they rose together through many stages of inner discipline. Sri Lakshmavadhani garu was the first to pass the demanding Sanga Swadhyaya Bhaskara examination and later served for forty years as an examiner in Vedic interpretation for the Kanchi Kamakoti Peetham. For Krishnamurthy garu, he was a guru greater than a conventional teacher—the guru bestowed by birth.", te: "వీరు కుప్పావేంకట కృష్ణమూర్తిగారి జననీ జనకులు. ఒకరికొకకరు చేయూతగా ఆధ్యాత్మిక సోపానాలెన్నో అధిరోహించిన సాధనా సహచరులు. శ్రీ అవధానిగారు తిండికి గడవని రోజులలో గూడా చేయిజాచి యెరుగని ధీరులు. వేదం చదువుకొని గూడా ప్రింటింగ్ ప్రెస్ లో కార్మికుడుగా జీవిస్తూ, వేదార్థ విద్యా శిఖరాలను దాటుకొని, దాటుకొని, “సాంగ స్వాధ్యాయ భాస్కర” అన్న అతి సంకట పరీక్షలో విజయం సాధించిన ప్రప్రథమ విజేత. ఆ తరువాత శ్రీకాంచీ కామకోటి సర్వజ్ఞ పీఠాధిపతులు శ్రీశ్రీశ్రీ చంద్రశేఖరేంద్ర సరస్వతీ మహాస్వామివారిచేత తమ పీఠ వేదార్థ పరిక్షాధికారిగా నియమితులై, 40 ఏళ్ళపాటు అకుంఠితంగా ఆ పదవిని నిర్వహించిన మేధానిధి! కుప్పావేంకట కృష్ణమూర్తిగారికి వీరు గురువులకు మించిన జన్మ గురువు." },
    image: "/gurus/Kuppa%20Lakshmavadhani%20garu%20%26%20Smt.%20Bhanumathi%20garu.jpeg",
  },
  {
    name: { en: "Brahmasri Kappagantula Veerabhadra Sastry garu and Smt. Rajyalakshmi garu", te: "బ్రహ్మశ్రీ కప్పగంతుల వీరభద్ర శాస్త్రిగారు మరియు శ్రీమతి రాజ్యలక్ష్మిగార్లు" },
    group: { en: "Educational Guru", te: "విద్యాగురువు" },
    body: { en: "A master of the Vedas, Vedic interpretation, mathematics, astrology, Sanskrit literature, and poetry, Sri Veerabhadra Sastry garu lived with dignity and independence despite modest means. During Krishnamurthy garu’s formative years, he used his extraordinary power of synthesis to guide him firmly towards the Vedic path. More than an educational teacher, he remained a beloved uncle and an inner guide throughout his life.", te: "వీరు వేద, వేదార్థ, గణిత, జ్యోతిష విద్యలలో మేటి అని కొంతమందికైనా తెలుసు. కానీ వీరి సంస్కృత సాహిత్య ప్రావీణ్యము, కవితారసపానంలో వీరికి గల పిపాస – పక్కవారికి గూడా తెలియదు. చాలీ చాలని జీవనంలో వుంటూ గూడా పేదరికానికి ఓడిపోకుండా; కాసుల గలగలకు దాసోహం కాకుండా; జీవించటం ఎలాగో, ఎవరైనా సరే, వీరిని చూసి నేర్చుకోవాల్సిందే! యౌవనారంభదశలో కుప్పా వేంకట కృష్ణమూర్తిగారిని వైదిక మార్గంలో నిలబెట్టిన వెలుగుదివ్వె వీరే!" },
    image: "/gurus/Brahmasti%20Sri%20Kappagantula%20Veera%20Bhadra%20Sastry%20garu.png",
  },
  {
    name: { en: "Brahmasri Ananta Narayana Ghanapathi garu", te: "బ్రహ్మశ్రీ అనంత నారాయణ ఘనపాఠీగారు" },
    group: { en: "Educational Guru", te: "విద్యాగురువు" },
    body: { en: "At nineteen, Sri Ananta Narayana Ghanapathi garu came from Tamil Nadu to teach at the Sanga Veda Pathashala in Machilipatnam and devoted the rest of his life to it. A master of Vedic, Shrauta, and Smarta learning, he never commercialised his knowledge. His exacting discipline, punctuality, and lifelong vow of daily study and non-acceptance of gifts made him an embodiment of dharma.", te: "వీరు తమ 19వ ఏట తమిళదేశంనుంచి మచిలీపట్నంలోని సాంగవేద పాఠశాలలో (శంకరమఠంలో) వేదోపాధ్యాయులుగా వచ్చిన వేదపండితులు. ఇక తమ జీవితాంతం దాకా ఆ పాఠశాలను వారు వదలలేదు. వేదమేగాక శ్రౌతస్మార్తాది విద్యలలో అఖండులు. ఐనా సరే, వీరు తమ విద్యలను ధనంగా మార్చుకోవటానికి అంగీకరించలేదు. గడియారాలు తక్కువగా వుండే ఆ రోజులలో, వీరి విథిలోని చాలామంది వీరి రాకపోకలను బట్టి తమ గడియారాలలో టైము సరిదిద్దుకొనేవారు. అంతటి క్రమశిక్షణ ఆయనకు ఆజీవనవ్రతం." },
    image: "/gurus/Sri%20Narayana%20Ghanapathi.png",
  },
  {
    name: { en: "Brahmasri Kuppa Dakshinamurthy garu", te: "బ్రహ్మశ్రీ కుప్పా దక్షిణామూర్తిగారు" },
    group: { en: "Educational Guru", te: "విద్యాగురువు" },
    body: { en: "The elder brother of Kuppa Venkata Krishnamurthy garu, Sri Dakshinamurthy garu lived simply as an income-tax practitioner in Palamuru while quietly carrying out extraordinary acts of charity. A close devotee of Sri Chandrasekharendra Saraswati Mahaswamiji, he shared with his younger brother profound connections across many disciplines, especially the deeper principles of Jyotisha.", te: "వీరు కుప్పావేంకట కృష్ణమూర్తిగారి పెద్ద అన్నగారు. తెలంగాణాలోని పాలమూరు (మెహబూబు నగరులో) ఇన్కమ్ టాక్సు ప్రాక్టీషనర్ గా సాధారణ జీవితం గడిపిన వీరు, అసాధారణ గుప్తదానాలకు నిధి కావటం ఒక వింతైతే, కంచికామకోటి సర్వజ్ఞపీఠ జగద్గురువులు, నడచే దైవంగా ప్రసిద్ధులు, ఐన శ్రీశ్రీశ్రీ చంద్రశేఖరేంద్ర సరస్వతీ మహాస్వామివారికి ఆంతరంగికులు కావటం మరో విశేషం! కలిసినప్పుడల్లా అనేక శాస్త్ర సమన్వయాలను, విశేషించి జోతిర్విద్యా రహస్యాలను, కుప్పావేంకట కృష్ణమూర్తిగారికి నూరిపోస్తూ వుండేవారు." },
    image: "/gurus/Kuppa%20dakshina%20murthy%20garu.jpeg",
  },
  {
    name: { en: "Brahmasri Kuppa Subrahmanya Sastry garu and Smt. Meenakshi garu", te: "బ్రహ్మశ్రీ కుప్పా సుబ్రహ్మణ్య శాస్త్రిగారు మరియు శ్రీమతి మీనాక్షిగారు" },
    group: { en: "Educational Guru", te: "విద్యాగురువు" },
    body: { en: "The second elder brother of Kuppa Venkata Krishnamurthy garu, Sri Subrahmanya Sastry garu was a man of profound detachment and exceptional intellectual power. The portrait also includes his wife, Smt. Meenakshi garu. Though he held an M.Sc. in Applied Mathematics and served the Water Works Department, his interests ranged across ancient and modern knowledge. A lifelong debating counterpart, he demonstrated that ideas considered modern were already rooted in the Sanatana tradition, and he remained a guiding star in difficult times.", te: "వీరు కుప్పావేంకట కృష్ణమూర్తిగారి రెండవ అన్నగారు. వీరి సతీమణి శ్రీమతి మీనాక్షిగారు కూడా ఈ చిత్రంలో ఉన్నారు. మట్టిలోని మాణిక్యంగా మిగిలిపోవటమే జీవన వ్రతంగా పెట్టుకొన్న వైరాగ్యనిధి. చదివింది Applied Mathematics లో M.Sc అయినా, తన పనితీరుతో మెరుగులు దిద్దినది అప్పటి A.P. PWD లోని Water works శాఖకు! కుప్పావేంకట కృష్ణమూర్తిగారికి వీరు చిన్నప్పటినుంచే నిత్యవాద ప్రతిద్వంది. అత్యాధునికమని కుప్పావేంకట కృష్ణమూర్తిగారరు భావించినవన్నీ సనాతనంలోనే ఉన్నాయని నిరూపించిన బోధకుడు! అతిథి సత్కారాన్ని అనంత సౌభాగ్యంగా భావించే యీ అన్నగారు కుప్పావేంకట కృష్ణమూర్తిగారికి అనేక సంకట సన్నివేశాలలో వినూత్న మార్గదర్శనాలు చేసిన ధ్రువతార !!!" },
    image: "/gurus/Kuppa%20Subramanya%20Sastry.jpeg",
  },
];

export default function GurusPage() {
  const { language } = useLanguage();
  const t = labels[language];
  const card = (guru: Guru, index: number) => {
    const right = index % 2 === 0;
    return <article key={guru.name.en} className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-10">
      <div className={right ? "order-2 sm:order-1" : "order-2 sm:order-2"}><span className="mb-4 inline-block h-1 w-10 rounded-full bg-[var(--accent)]" /><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">{guru.group[language]}</p><h2 className="mt-2 text-xl font-normal leading-snug text-[var(--foreground)] sm:text-2xl">{guru.name[language]}</h2><p className="mt-4 text-base leading-8 text-[var(--secondary)]">{guru.body[language]}</p></div>
      <div className={right ? "relative order-1 aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:order-2" : "relative order-1 aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:order-1"}>{guru.image ? <Image src={guru.image} alt={guru.name[language]} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" /> : <div className="grid h-full place-items-center text-xs text-[var(--secondary)]">Portrait forthcoming</div>}</div>
    </article>;
  };
  return <><Navbar /><main><section className="relative bg-[var(--background)] pb-16 pt-24 sm:pb-24 sm:pt-28 lg:pb-28 lg:pt-32"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:aspect-[16/9]"><Image src={hero.image!} alt={hero.name[language]} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" /></div><div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:items-center sm:gap-10"><div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">{t.hero}</p><h1 className="mt-3 text-2xl font-normal leading-tight text-[var(--foreground)] sm:text-3xl lg:text-4xl">{hero.name[language]}</h1><p className="mt-6 text-base leading-8 text-[var(--secondary)] sm:text-lg sm:leading-9">{hero.body[language]}</p></div><div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--foreground)]/5"><Image src="/gurus/kvk%20with%20swamiji.png" alt="Prof. Krishna Murthy with Sri Ganapathy Sachchidananda Swamiji" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" /></div></div><div className="mt-16 border-t border-[var(--secondary)]/15 pt-14 sm:mt-24 sm:pt-16"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">{t.more}</p><h2 className="mb-12 max-w-xl text-2xl font-normal leading-tight text-[var(--foreground)] sm:mb-16 sm:text-3xl">{t.heading}</h2><div className="flex flex-col gap-14 sm:gap-20">{gurus.map(card)}</div></div></div></section></main><Footer /></>;
}
