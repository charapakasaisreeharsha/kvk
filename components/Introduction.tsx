import Image from "next/image";

export default function Introduction() {
  return (
    <section id="about" className="scroll-mt-24 bg-[#fffff0] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] border border-[var(--secondary)]/10 bg-[#fffff7] shadow-[0_18px_55px_rgba(91,70,54,0.08)] sm:rounded-[38px] lg:min-h-[620px] lg:grid-cols-[1.7fr_0.75fr]">
        <div className="flex flex-col justify-center px-6 py-14 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--primary)]">
            About
          </p>
          <h2 className="mt-5 text-3xl font-normal tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Sri Kuppa Venkata Krishna Murthy
          </h2>
          <p className="mt-3 text-sm font-medium text-[var(--secondary)] sm:text-base">
            Vedic Science Researcher &middot; Founder of I-SERVE
          </p>
          <span className="mx-auto mt-8 h-px w-14 bg-[var(--accent)]/70" />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[var(--secondary)] sm:text-xl sm:leading-9">
            Prof. K. V. Krishna Murthy is a rare scholar in whom the poet, the
            philosopher, and the scientist coexist in remarkable harmony. For
            more than five decades, he has devoted his life to uncovering the
            scientific wisdom embedded within ancient Sanskrit literature while
            building meaningful bridges between India&apos;s timeless heritage and
            modern scientific thought.
          </p>
        </div>

        <div className="relative min-h-[450px] overflow-hidden bg-[#97742e] sm:min-h-[500px] lg:min-h-0">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
          <Image
            src="/kvk-garu.jpg"
            alt="Sri Kuppa Venkata Krishna Murthy"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 38vw"
            className="-translate-y-6 scale-[1.22] object-contain object-bottom px-4 pt-5 sm:-translate-y-5 sm:scale-110 sm:px-14 lg:-translate-y-8 lg:scale-125 lg:px-4"
          />
        </div>
      </div>
    </section>
  );
}
