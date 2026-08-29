import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gurus",
  description: "The revered teachers who guided Prof. K. V. Krishna Murthy's scholarship.",
  alternates: { canonical: "/gurus" },
};

const gurus = [
  { name: "Sri Kappagantula Virabhadra Sastry", subject: "Sanskrit & Telugu Sahitya", image: null },
  { name: "Sri K. Sri Anjaneya Sastry", subject: "Vyakarana Sastra (Grammar)", image: "/gurus/Kuppa%20Sri%20Anjaneya%20Sastry%20garu%20and%20Rajyalakshi%20garu.jpeg" },
  { name: "Sri Kuppa Lakshmavadhani", subject: "Vedanta Sastra & Puranas", image: "/gurus/Kuppa%20Lakshmavadhani%20garu%20%26%20Smt.%20Bhanumathi%20garu.jpeg" },
  { name: "Sri K. Subrahmanya Sastry", subject: "Ancient Astronomy & Vedic Sciences", image: "/gurus/Kuppa%20Subramanya%20Sastry.jpeg" },
  { name: "Sri K. Dakshina Murthy", subject: "Jyothisha Sastra (Astrology)", image: "/gurus/Kuppa%20dakshina%20murthy%20garu.jpeg" },
  { name: "Sri Narayana Ghanapathi", subject: "Krishna Yajurveda (Partial)", image: null },
];

export default function GurusPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar sticky={false} />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Link href="/#gurus" className="text-sm font-medium text-[var(--secondary)] transition hover:text-[var(--primary)]">← Back to home</Link>
        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">Teachers & mentors</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-normal leading-tight text-[var(--foreground)] sm:text-6xl">His revered gurus</h1>
        <p className="mt-5 max-w-2xl leading-7 text-[var(--secondary)]">Prof. Krishna Murthy&apos;s scholarship was shaped by rigorous, direct traditional training across Sanskrit literature, grammar, Vedanta, astronomy, Jyothisha, and the Krishna Yajurveda.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gurus.map((guru) => (
            <article key={guru.name} className="overflow-hidden rounded-3xl border border-[var(--secondary)]/15 bg-white">
              <div className="relative aspect-[4/5] bg-[var(--foreground)]/5">
                {guru.image ? (
                  <Image src={guru.image} alt={guru.name} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--secondary)]/50">Portrait forthcoming</div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-medium text-[var(--foreground)]">{guru.name}</h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">{guru.subject}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
