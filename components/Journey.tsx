import Milestones from "@/components/Milestones";

export default function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 bg-[var(--background)] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Heading — content left, image spans the full height of the text block on the right */}
        <div className="mb-16 grid gap-8 border-b border-[var(--secondary)]/15 pb-12 sm:mb-24 sm:gap-10 sm:pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              Journey &amp; Legacy · Part I
            </p>
            <h2 className="max-w-3xl text-4xl font-normal leading-[1.15] text-[var(--foreground)] sm:text-5xl">
              A life spent reading the Vedas
              <br />
              in the language of mathematics
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--secondary)] sm:mt-8 sm:text-lg sm:leading-8">
              Trained under some of the last great traditional masters of Sanskrit
              grammar, Vedanta and astronomy, and armed with a modern postgraduate
              degree in Mathematics, Prof. Krishna Murthy occupies a rare middle
              ground — equally credible to traditional pandits and to university
              scientists.
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

        {/* Education — unchanged */}
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

        {/* Roles & Milestones — candy-crush style level map, no images: numbered nodes with curved connectors */}
        <Milestones />

        {false && <div className="mb-24">
          <p className="mb-12 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            Roles &amp; Milestones
          </p>

          <div className="relative">
            {(() => {
              const roles = [
                { role: "Chief Editor", org: "Bhaktimala — monthly magazine, Avadhoota Datta Peetham, Mysore", years: "since 1986" },
                { role: "Trustee", org: "Avadhoota Datta Peetham, Mysore", years: "1986–2000" },
                { role: "Sanskrit Teacher", org: "SGS Veda Sastra Pathasala, Mysore", years: "1986–2004" },
                { role: "Educational Officer (Vidyadhikari)", org: "Avadhoota Datta Peetham, Mysore", years: "since 1990" },
                { role: "Executive Trustee", org: "Sri Bhaktimala Trust, Mysore", years: "1991–2002" },
                { role: "Member, Veda Sastra Pandit Selection Committee", org: "A.P. Endowments Department", years: "2002" },
                { role: "Member", org: "TTD's Sri Venkateswara Institute of Higher Vedic Studies", years: "2003" },
                { role: "Chairman & Managing Trustee", org: "Institute of Scientific Research on Vedas (I-SERVE)", years: "2004–2016" },
                { role: "Member, Board of Ayurveda Studies", org: "Dr. N.T.R. University of Medical Sciences, Vijayawada", years: "2008–2009" },
                { role: "Professor", org: "School of Vedic Studies & Research, JNIAS, Hyderabad", years: "" },
              ];

              return roles.map((item, i) => {
                const isLeft = i % 2 === 0;
                const isLast = i === roles.length - 1;
                return (
                  <div key={item.role} className="relative pb-8 last:pb-0">
                    {!isLast && (
                      <span className="absolute left-8 top-16 h-[calc(100%-4rem)] border-l-2 border-dashed border-[var(--accent)]/50 sm:hidden" />
                    )}
                    <div
                      className={`flex items-start gap-4 sm:items-center sm:gap-6 ${
                        isLeft ? "sm:flex-row" : "sm:flex-row-reverse sm:text-right"
                      }`}
                    >
                      {/* node — numbered badge, no image needed */}
                      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-lg font-bold text-[var(--background)] shadow-md ring-4 ring-[var(--background)]">
                        {i + 1}
                      </div>

                      {/* label */}
                      <div className={isLeft ? "" : "sm:flex sm:flex-col sm:items-end"}>
                        <span className="text-sm font-semibold text-[var(--primary)]">
                          {item.years || "—"}
                        </span>
                        <p className="mt-1 leading-6 text-[var(--foreground)]">
                          <span className="font-semibold">{item.role}</span>
                          <br />
                          <span className="text-sm text-[var(--secondary)]">{item.org}</span>
                        </p>
                      </div>
                    </div>

                    {/* curved connector to next node — S-curve like a level map path */}
                    {!isLast && (
                      <svg
                        className="mx-auto -my-2 hidden h-16 w-40 text-[var(--accent)]/50 sm:block"
                        viewBox="0 0 160 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d={
                            isLeft
                              ? "M20 0 C 20 32, 140 32, 140 64"
                              : "M140 0 C 140 32, 20 32, 20 64"
                          }
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="2 10"
                          strokeLinecap="round"
                        />
                        <path
                          d={
                            isLeft
                              ? "M133 58 L140 64 L147 58"
                              : "M13 58 L20 64 L27 58"
                          }
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>}

        {/* Founding I-SERVE — image floats left, text wraps beside it, then continues full-width below once past image height */}
        <div className="mb-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Founded 2004
          </p>
          <h3 className="mb-8 max-w-lg text-3xl font-normal leading-tight text-[var(--foreground)] sm:text-4xl">
            Founding I-SERVE
          </h3>

          <div className="text-[var(--secondary)] leading-8">
            <div className="float-left mb-4 mr-8 w-full max-w-[460px] overflow-hidden rounded-3xl bg-[var(--foreground)]/5 sm:w-1/2">
              <img
                src="/i-serve.jpg"
                alt="I-SERVE — Institute of Scientific Research on Vedas"
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mb-6">
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
            <div className="clear-both" />
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

        {/* Mentorship line */}
        <div className="mb-24 border-y border-[var(--secondary)]/15 py-10 text-center">
          <p className="text-2xl font-semibold leading-relaxed text-[var(--foreground)] sm:text-3xl">
            Over 50 students guided to the advanced Alankaranta level,
            <br className="hidden sm:block" />
            5 scholars mentored through their M.A. in Sanskrit.
          </p>
        </div>

        {/* Gurus — text-only mosaic cards, no images, no flowchart */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--secondary)]/60">
            About His Gurus
          </p>
          <p className="mb-10 max-w-2xl text-[var(--secondary)] leading-7">
            Prof. Krishna Murthy&rsquo;s scholarship rests on rigorous,
            traditional training received directly from eminent gurus across
            multiple disciplines.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            ].map((guru) => (
              <div
                key={guru.name}
                className="rounded-3xl border border-[var(--secondary)]/15 p-6 transition-colors hover:border-[var(--accent)]/50"
              >
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
            ))}
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
