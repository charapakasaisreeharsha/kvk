import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnnouncementToast, { type LatestAnnouncement } from "@/components/AnnouncementToast";
import { createClient } from "@/lib/supabase/server";
// import Introduction from "@/components/Introduction";
// import AutoScrollReveal from "@/components/AutoScrollReveal";
// import Journey from "@/components/Journey";
// import Books from "@/components/Books";
// import LiteraryContributions from "@/components/LiteraryContributions";
// import GallerySection from "@/components/GallerySection";
// import Awards from "@/components/Awards";
// import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore the life, scholarship, publications, awards, and legacy of Prof. K. V. Krishna Murthy.",
  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("id, title, body")
    .order("published_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/*
          Landing-page sections are retained for later use. The client-approved
          landing-page design currently displays only the hero.
          <Introduction />
          <Journey />
          <LiteraryContributions />
          <Books />
          <Awards />
          <GallerySection />
          <AutoScrollReveal />
        */}
      </main>
      {/* <Footer /> */}
      <AnnouncementToast announcements={(data ?? []) as LatestAnnouncement[]} />
    </>
  );
}
