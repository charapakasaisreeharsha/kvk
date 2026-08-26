import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import AutoScrollReveal from "@/components/AutoScrollReveal";
import Journey from "@/components/Journey";
import Books from "@/components/Books";
import LiteraryContributions from "@/components/LiteraryContributions";
import GallerySection from "@/components/GallerySection";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore the life, scholarship, publications, awards, and legacy of Prof. K. V. Krishna Murthy.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Journey />
        <LiteraryContributions />
        <Books />
        <Awards />
        <GallerySection />
        <AutoScrollReveal />
      </main>
      <Footer />
    </>
  );
}
