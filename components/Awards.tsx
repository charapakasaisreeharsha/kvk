import Image from "next/image";
import { Award, GraduationCap, Landmark, Star, ArrowRight } from "lucide-react";

const groups = [
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
];

export default function Awards() {
  return (
    <section id="awards" className="bg-[var(--background)]" aria-labelledby="awards-heading">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left panel */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[var(--primary)] px-8 py-20 text-[var(--background)] sm:px-12 sm:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_15%,var(--accent),transparent_25%),radial-gradient(circle_at_90%_90%,#fff,transparent_20%)]" />
          <div className="relative w-full max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--background)]/25 bg-[var(--background)]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]">
              <Award className="size-3.5 text-[var(--accent)]" aria-hidden="true" />
              Honours
            </div>
            <h2 id="awards-heading" className="mt-5 text-4xl font-normal leading-tight sm:text-5xl">
              Awards &amp; Recognition
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--background)]/75 sm:text-lg">
              A life of scholarship, teaching, and spiritual service recognised by institutions across India.
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
              <span className="text-3xl font-normal text-[var(--accent)]">10+</span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--background)]/70">
                Notable honours
                <br />
                listed here
              </span>
            </div>
          </div>
        </div>

        {/* Right grid */}
        <div className="grid gap-x-10 gap-y-10 bg-[var(--background)] p-8 sm:grid-cols-2 sm:p-12 lg:py-28">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.heading}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)]/15">
                  <Icon className="size-5 text-[var(--accent)]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-[0.14em] text-[var(--primary)]/60">
                  {group.heading}
                </h3>

                <ul className="mt-3 divide-y divide-[var(--primary)]/10">
                  {group.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5 py-3">
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
