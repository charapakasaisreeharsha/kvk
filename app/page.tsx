import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import ScrollReveal from "@/components/ScrollReveal";
import Journey from "@/components/Journey";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ScrollReveal>
        <Introduction />
      </ScrollReveal>
      <ScrollReveal>
        <Journey />
      </ScrollReveal>
    </>
  );
}
