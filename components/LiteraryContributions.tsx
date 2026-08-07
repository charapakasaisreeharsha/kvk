import { ArrowUpRight } from "lucide-react";

type Work = {
  title: string;
  detail?: string;
};

const poetry = {
  Sanskrit: [
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
  ].map((title): Work => {
    const details: Record<string, string> = {
      "Sadguru Swara Gitika": "audio rendering by Sri Rajkumar Bharathi",
      "Rudra Prapancha Stavah": "1,000 verses",
      "Hamsaladivi Venugopala Suprabhatam": "audio rendering by Smt. Sarada",
      "Ganesa Sadguru Stuti Puspa Guchchah": "500 verses, Telugu script",
      "Hymn to Ganesh": "with English translation",
    };
    return { title, detail: details[title] };
  }),
  Telugu: [
    { title: "Rudra Geeti", detail: "classical poetry" },
    { title: "Datta Katha Manjari", detail: "classical poetry" },
    { title: "Padya Parijatamu", detail: "classical poetry" },
    { title: "Natika Saptakam", detail: "a collection of seven playlets" },
  ] satisfies Work[],
};

const prose = [
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
] satisfies { heading: string; works: Work[] }[];

function WorkList({ works }: { works: Work[] }) {
  return <ul className="space-y-3">{works.map((work) => <li key={work.title} className="border-b border-[var(--secondary)]/10 pb-3 text-sm leading-6 text-[var(--secondary)]"><span className="font-medium text-[var(--foreground)]">{work.title}</span>{work.detail && <span className="text-[var(--secondary)]"> — {work.detail}</span>}</li>)}</ul>;
}

export default function LiteraryContributions() {
  return (
    <section id="literary-contributions" className="scroll-mt-24 bg-[#f5f0df] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 border-b border-[var(--secondary)]/15 pb-10 sm:gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">Literary contributions</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl">KVK&apos;s writings</h2>
          <p className="mt-6 text-base leading-8 text-[var(--secondary)] sm:text-lg">A body of work spanning devotional poetry, philosophy, literature, and Vedic science — composed in Sanskrit, Telugu, and English.</p>
          </div>

          <nav aria-label="Explore KVK's writings" className="grid w-full gap-2 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
            {[["Poetry", "#poetry"], ["Prose", "#prose"], ["Scientific", "#scientific"]].map(([label, href]) => (
              <a key={label} href={href} className="group flex items-center justify-between rounded-full border border-[var(--primary)]/25 bg-[var(--background)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--primary)] hover:text-[var(--background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]">
                {label}
                <span className="flex size-7 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--background)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[var(--background)] group-hover:text-[var(--primary)]"><ArrowUpRight className="size-4" aria-hidden="true" /></span>
              </a>
            ))}
          </nav>
        </div>

        <div id="poetry" className="mt-14 scroll-mt-28 pt-2 sm:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">Poetry</p>
          <div className="mt-7 grid gap-6 lg:grid-cols-[1.6fr_0.8fr]">
            {Object.entries(poetry).map(([language, works]) => <article key={language} className="rounded-3xl border border-[var(--secondary)]/15 bg-[var(--background)] p-6 sm:p-8"><h3 className="mb-6 text-2xl font-semibold text-[var(--foreground)]">{language}</h3><WorkList works={works} /></article>)}
          </div>
        </div>

        <div id="prose" className="mt-16 scroll-mt-28 border-t border-[var(--secondary)]/15 pt-12 sm:mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">Prose</p>
          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {prose.map(({ heading, works }) => <article id={heading.startsWith("Telugu") && heading.includes("Scientific") ? "scientific" : undefined} key={heading} className="scroll-mt-28 rounded-3xl border border-[var(--secondary)]/15 bg-[var(--background)] p-6 sm:p-8"><h3 className="mb-6 text-xl font-semibold text-[var(--foreground)]">{heading}</h3><WorkList works={works} /></article>)}
          </div>
        </div>

        <aside className="mt-16 rounded-3xl bg-[var(--primary)] px-7 py-8 text-[var(--background)] sm:mt-20 sm:px-10 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Other literary contributions</p>
          <p className="mt-4 max-w-4xl text-lg leading-8 sm:text-xl">He wrote the dialogues for <span className="font-semibold">Datta Darshanam</span>, a highly successful Telugu film, and remains a much sought-after speaker. His discourses have been featured on ETV, Gemini TV, MAA TV, NTV, and Doordarshan.</p>
        </aside>
      </div>
    </section>
  );
}
