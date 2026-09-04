import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KVKM Legacy.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-[var(--background)] px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <section className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-normal text-[var(--foreground)] sm:text-4xl">Contact</h1>
          <a
            href="mailto:karthikeya.kuppa78@gmail.com"
            className="mt-6 inline-block text-lg text-[var(--primary)] underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
          >
            karthikeya.kuppa78@gmail.com
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
