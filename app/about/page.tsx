import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Read the biography of Prof. K. V. Krishna Murthy, Sanskrit scholar, poet, philosopher, and researcher of Vedic sciences.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fdfdea] px-6 pb-16 pt-28 sm:px-16 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-[340px_1fr] sm:gap-10">
          <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(26,26,26,0.2)] sm:h-[440px]">
            <Image
              src="/about-1.png"
              alt="Prof. K. V. Krishna Murthy"
              fill
              sizes="(max-width: 640px) 100vw, 340px"
              className="object-cover"
            />
          </div>

          {/* Heading + intro */}
          <div>
            <h1 className="text-right text-5xl font-normal tracking-tight text-[#1a1a1a] sm:text-6xl">
              Kuppa Venkata Krishna Murthy
            </h1>

            <div className="mt-6 space-y-5 text-justify text-[15px] leading-[1.9] text-[#2a2a2a] sm:text-base">
              <p>
                Prof. K. V. Krishna Murthy is a rare scholar in whom the poet, the philosopher and the
                scientist coexist in unusual harmony. For over five decades, he has devoted himself to
                uncovering the scientific depth hidden within ancient Sanskrit literature, building
                bridges between India&apos;s timeless wisdom and the discoveries of modern science.
                Equally at home reciting classical Telugu verse or discussing astronomy, mathematics
                and Ayurveda on national television, he has emerged as one of the most respected
                voices connecting Vedic knowledge with contemporary scholarship.
              </p>
              <p>
                Trained under some of the last great traditional masters of Sanskrit grammar, Vedanta
                and astronomy, and armed with a modern postgraduate degree in Mathematics, Prof.
                Krishna Murthy occupies a rare middle ground, equally credible to traditional pandits
                and to university scientists. This unusual combination has defined his life&apos;s work
                and shaped a body of scholarship spanning poetry, prose, translation and scientific
                research.
              </p>
            </div>
          </div>
        </div>

        {/* Full-width continuation */}
        <div className="mt-10 space-y-5 text-justify text-[15px] leading-[1.9] text-[#2a2a2a] sm:text-base">
          <p>
            His area of specialization has remained constant throughout his career: Sanskrit literature,
            and correlating it with modern science. Education: B.Sc. (Mathematics, Physics &amp;
            Chemistry), Andhra University, 1969; M.A. (Pure Mathematics), Andhra University, 1972.
          </p>
          <p>
            Across a life of scholarship, he has served as Chairman &amp; Managing Trustee of the
            Institute of Scientific Research on Vedas (I-SERVE) from 2004 to 2016, Professor at the
            School of Vedic Studies &amp; Research, Jawaharlal Nehru Institute for Advanced Studies
            (JNIAS), Hyderabad, and Chief Editor of Bhaktimala, the monthly magazine of Avadhoota Datta
            Peetham, Mysore, since 1986, alongside roles as Trustee and Educational Officer at the
            Peetham, Sanskrit Teacher at SGS Veda Sastra Pathasala, Mysore, and memberships on the
            Board of Ayurveda Studies at Dr. N.T.R. University of Medical Sciences and TTD&apos;s Sri
            Venkateswara Institute of Higher Vedic Studies. Beyond formal roles, he has personally
            guided over 50 students to the advanced Alankaranta level and mentored numerous scholars
            through M.A., M.Phil. and Ph.D. research bridging Sanskrit and modern science.
          </p>
          <p>
            In 2004, Prof. Krishna Murthy founded I-SERVE, a registered charitable trust recognised by
            India&apos;s Department of Scientific and Industrial Research (DSIR) as a Scientific and
            Industrial Research Organisation. Under his leadership, I-SERVE has organised around 50
            national and international conferences and forged research collaborations with institutions
            including the Central University of Hyderabad, Dr. B.R. Ambedkar Open University, S.V.
            Ayurvedic Medical College (Tirupati), the Sanskrit Academy at Osmania University, GITAM
            University, AAPNA (USA) and the Indic Studies Foundation (California, USA).
          </p>
          <p>
            His scholarship rests on rigorous, traditional training received directly from eminent
            gurus across disciplines: Sanskrit &amp; Telugu Sahitya under Sri Kappagantula Virabhadra
            Sastry, Vyakarana Sastra under Sri K. Sri Anjaneya Sastry, Vedanta Sastra &amp; Puranas under
            Sri Kuppa Lakshmavadhani, Ancient Astronomy &amp; Vedic Sciences under Sri K. Subrahmanya
            Sastry, Jyothisha Sastra under Sri K. Dakshina Murthy, and Krishna Yajurveda under Sri
            Narayana Ghanapathi, extending also to classic texts such as Dhvanyaloka and
            Rasagangadhara, alongside scientific Sanskrit works including Brihat Samhita and Adbhuta
            Sagara.
          </p>
        </div>

        {/* Family section */}
        <div className="mt-16 border-t border-[#1a1a1a]/10 pt-12 sm:mt-20 sm:pt-16">
          <div className="grid gap-8 sm:grid-cols-[1fr_420px] sm:gap-10">
            <div className="order-2 text-justify text-[15px] leading-[1.9] text-[#2a2a2a] sm:order-1 sm:flex sm:flex-col sm:justify-center sm:text-base">
              <h2 className="text-left text-3xl font-normal leading-tight tracking-tight text-[#1a1a1a] sm:text-4xl">
                Family
              </h2>
              <div className="mt-5 space-y-5">
                <p>
                  Behind Prof. Krishna Murthy&apos;s decades of scholarship has stood the quiet steadiness
                  of his family. His wife, Smt. Shanta, has been a constant presence through the long years
                  of research, travel and teaching that his work has demanded, holding the home together
                  so that his scholarship could flourish.
                </p>
                <p>
                  Her support has run through every phase of his career, from the early years of study
                  under his gurus to the founding and growth of I-SERVE, and it remains woven into the life
                  of learning and service that the family continues to uphold today.
                </p>
              </div>
            </div>

            <div className="order-1 relative h-[320px] w-full overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(26,26,26,0.2)] sm:order-2 sm:h-[380px]">
              <Image
                src="/about-2.png"
                alt="Prof. K. V. Krishna Murthy with Smt. Shanta"
                fill
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
