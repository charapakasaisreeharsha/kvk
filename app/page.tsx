import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import AutoScrollReveal from "@/components/AutoScrollReveal";
import Journey from "@/components/Journey";
import Books from "@/components/Books";
import LiteraryContributions from "@/components/LiteraryContributions";

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
        <AutoScrollReveal />
      </main>
    </>
  );
}
