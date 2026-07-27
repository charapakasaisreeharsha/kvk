import Image from "next/image";

export default function Introduction() {
  return (
    <section id="about" className="bg-[#FFFFF0] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-12 px-6 sm:gap-16 lg:flex-row lg:items-center lg:gap-20">
        {/* Left Content */}
        <div className="flex-1">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
            About
          </p>

          <h2 className="text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Sri Kuppa Venkata
            <br />
            Krishna Murthy
          </h2>

          <p className="mt-5 text-base font-medium text-zinc-700 sm:text-xl">
            Sanskrit Scholar • Vedic Science Researcher • Founder of I-SERVE
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 sm:mt-8 sm:text-lg sm:leading-9">
            Prof. K. V. Krishna Murthy is a rare scholar in whom the poet, the
            philosopher, and the scientist coexist in remarkable harmony. For
            more than five decades, he has devoted his life to uncovering the
            scientific wisdom embedded within ancient Sanskrit literature while
            building meaningful bridges between India's timeless heritage and
            modern scientific thought.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex w-full flex-1 justify-center lg:justify-end">
          <div className="relative h-[420px] w-full max-w-[500px] overflow-hidden rounded-[28px] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)] sm:h-[540px] sm:rounded-[40px] lg:h-[650px]">
            <Image
              src="/kvk-garu.jpg"
              alt="Sri Kuppa Venkata Krishna Murthy"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
