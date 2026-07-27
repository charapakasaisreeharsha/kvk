export default function Journey() {
  return (
    <section id="journey" className="relative bg-[var(--background)] py-28">
      <div className="mx-auto max-w-5xl px-6">

        {/* Heading — set like a title page, not a hero card */}
        <div className="mb-24 border-b border-[var(--secondary)]/15 pb-16">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Journey &amp; Legacy · Part I
          </p>
          <h2 className="max-w-3xl text-[2.5rem] font-semibold leading-[1.15] text-[var(--foreground)] sm:text-5xl">
            A life spent reading the Vedas
            <br />
            in the language of mathematics
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--secondary)]">
            Trained under some of the last great traditional masters of Sanskrit
            grammar, Vedanta and astronomy, and armed with a modern postgraduate
            degree in Mathematics, Prof. Krishna Murthy occupies a rare middle
            ground — equally credible to traditional pandits and to university
            scientists.
          </p>
        </div>

        {/* Education — set as a colophon line, not cards */}
        <div className="mb-24 grid gap-10 sm:grid-cols-[120px_1fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            Education
          </p>

          <div className="space-y-6 border-l-2 border-[var(--accent)]/40 pl-8">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="text-sm font-semibold text-[var(--primary)]">1969</span>
              <span className="text-xl font-semibold text-[var(--foreground)]">B.Sc.</span>
              <span className="text-[var(--secondary)]">
                Mathematics, Physics &amp; Chemistry — Andhra University
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className="text-sm font-semibold text-[var(--primary)]">1972</span>
              <span className="text-xl font-semibold text-[var(--foreground)]">M.A.</span>
              <span className="text-[var(--secondary)]">
                Pure Mathematics — Andhra University
              </span>
            </div>
            <p className="pt-2 text-[var(--secondary)]">
              His area of specialization has remained constant throughout his
              career: Sanskrit literature, and correlating it with modern
              science.
            </p>
          </div>
        </div>

        {/* Career — ledger rows with year margin, no card boxes */}
        <div className="mb-24 grid gap-10 sm:grid-cols-[120px_1fr]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            Roles &amp;
            <br />
            Milestones
          </p>

          <div>
            {[
              { role: "Chairman & Managing Trustee", org: "Institute of Scientific Research on Vedas (I-SERVE)", years: "2004–2016" },
              { role: "Professor", org: "School of Vedic Studies & Research, JNIAS, Hyderabad", years: "" },
              { role: "Chief Editor", org: "Bhaktimala — monthly magazine, Avadhoota Datta Peetham, Mysore", years: "since 1986" },
              { role: "Trustee", org: "Avadhoota Datta Peetham, Mysore", years: "1986–2000" },
              { role: "Educational Officer (Vidyadhikari)", org: "Avadhoota Datta Peetham, Mysore", years: "since 1990" },
              { role: "Sanskrit Teacher", org: "SGS Veda Sastra Pathasala, Mysore", years: "1986–2004" },
              { role: "Executive Trustee", org: "Sri Bhaktimala Trust, Mysore", years: "1991–2002" },
              { role: "Member, Board of Ayurveda Studies", org: "Dr. N.T.R. University of Medical Sciences, Vijayawada", years: "2008–2009" },
              { role: "Member", org: "TTD's Sri Venkateswara Institute of Higher Vedic Studies", years: "2003" },
              { role: "Member, Veda Sastra Pandit Selection Committee", org: "A.P. Endowments Department", years: "2002" },
            ].map((item, i) => (
              <div
                key={item.role}
                className={`flex flex-col gap-x-6 gap-y-1 py-5 sm:flex-row sm:items-baseline ${
                  i !== 0 ? "border-t border-[var(--secondary)]/10" : ""
                }`}
              >
                <span className="w-28 shrink-0 text-sm font-semibold text-[var(--primary)]">
                  {item.years || "—"}
                </span>
                <p className="leading-7 text-[var(--foreground)]">
                  <span className="font-semibold">{item.role}</span>
                  <span className="text-[var(--secondary)]">, {item.org}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Founding I-SERVE — text + image, curved-edge frame */}
        <div className="mb-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Founded 2004
          </p>
          <h3 className="mb-8 max-w-lg text-3xl font-semibold leading-tight text-[var(--foreground)] sm:text-4xl">
            Founding I-SERVE
          </h3>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-6 text-[var(--secondary)] leading-8">
              <p>
                In 2004, Prof. Krishna Murthy founded the Institute of Scientific
                Research on Vedas (I-SERVE), a registered charitable trust
                dedicated to scientific research into the sciences embedded in
                ancient Sanskrit literature. The institute is recognised by
                India&rsquo;s Department of Scientific and Industrial Research
                (DSIR) as a Scientific and Industrial Research Organisation
                (SIRO).
              </p>
              <p>
                Under his leadership, I-SERVE has organised around 50 national
                and international conferences, and produced numerous conference
                volumes and publications now used as reference material by
                universities and research institutes across India and abroad.
                I-SERVE has forged formal research collaborations (MOUs) with
                institutions including the Central University of Hyderabad, Dr.
                B.R. Ambedkar Open University, S.V. Ayurvedic Medical College
                (Tirupati), the Sanskrit Academy at Osmania University, GITAM
                University, the Association of Ayurvedic Practitioners of North
                America (AAPNA, USA), and the Indic Studies Foundation
                (California, USA), among others.
              </p>
            </div>

            {/* image slot — curved edges */}
            <div className="overflow-hidden rounded-3xl bg-[var(--foreground)]/5">
              <img
                src="/journey/i-serve.jpg"
                alt="I-SERVE — Institute of Scientific Research on Vedas"
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-[var(--secondary)]/15 pt-8">
            {[
              ["50+", "national conferences"],
              ["DSIR", "recognised SIRO"],
              ["Global", "research collaborations"],
              ["12", "years as Chairman"],
            ].map(([n, label]) => (
              <div key={label}>
                <p className="text-3xl font-semibold text-[var(--primary)]">{n}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--secondary)]/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship line — a single stated fact, given room rather than a card */}
        <div className="mb-24 border-y border-[var(--secondary)]/15 py-10 text-center">
          <p className="text-2xl font-semibold leading-relaxed text-[var(--foreground)] sm:text-3xl">
            Over 50 students guided to the advanced Alankaranta level,
            <br className="hidden sm:block" />
            5 scholars mentored through their M.A. in Sanskrit.
          </p>
        </div>

        {/* Gurus — a parampara (lineage) chain, with portrait, not a card grid */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            About His Gurus
          </p>
          <p className="mb-10 max-w-2xl text-[var(--secondary)] leading-7">
            Prof. Krishna Murthy&rsquo;s scholarship rests on rigorous,
            traditional training received directly from eminent gurus across
            multiple disciplines.
          </p>

          <div className="relative">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[var(--accent)]/40 sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-12">
              {[
                {
                  name: "Sri Kappagantula Virabhadra Sastry",
                  subject: "Sanskrit & Telugu Sahitya",
                  title: "",
                },
                {
                  name: "Sri K. Sri Anjaneya Sastry",
                  subject: "Vyakarana Sastra (Grammar)",
                  title: "revered as \u201cVyaakarana Sthaapanaacharya\u201d",
                },
                {
                  name: "Sri Kuppa Lakshmavadhani",
                  subject: "Vedanta Sastra & Puranas",
                  title: "known as \u201cSanga Swadhyaya Bhaskara\u201d",
                },
                {
                  name: "Sri K. Subrahmanya Sastry",
                  subject: "Ancient Astronomy & Vedic Sciences",
                  title: "retired Statistician, Dept. of Irrigation, Govt. of A.P.",
                },
                {
                  name: "Sri K. Dakshina Murthy",
                  subject: "Jyothisha Sastra (Astrology)",
                  title: "Income Tax Practitioner, Mahabubnagar",
                },
                {
                  name: "Sri Narayana Ghanapathi",
                  subject: "Krishna Yajurveda (Partial)",
                  title: "Machilipatnam",
                },
              ].map((guru, i) => (
                <div
                  key={guru.name}
                  className={`relative flex items-start gap-6 pl-16 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0
                      ? "sm:pr-14 sm:text-right"
                      : "sm:ml-auto sm:pl-14"
                  }`}
                >
                  {/* portrait placeholder — curved edges */}
                  <div
                    className={`absolute top-0 h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[var(--foreground)]/5 ring-2 ring-[var(--background)]
                    left-0 sm:left-auto ${i % 2 === 0 ? "sm:right-[-70px]" : "sm:left-[-70px]"}`}
                  >
                    <img
                      src={`/journey/gurus/${i + 1}.jpg`}
                      alt={guru.name}
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  </div>

                  <div className="w-full">
                    <h4 className="text-xl font-semibold text-[var(--foreground)]">{guru.name}</h4>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
                      {guru.subject}
                    </p>
                    {guru.title && (
                      <p className="mt-2 text-sm text-[var(--secondary)]">{guru.title}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-14 max-w-2xl text-[var(--secondary)] leading-7">
            His advanced studies also extended to classic texts such as
            Dhvanyaloka and Rasagangadhara, alongside scientific Sanskrit works
            including Brihat Samhita and Adbhuta Sagara.
          </p>
        </div>

      </div>
    </section>
  );
}