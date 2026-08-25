import Footer from "@/components/Footer";
import LiteraryContributions from "@/components/LiteraryContributions";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Archive | KVK Legacy",
  description: "An archive of the writings and literary contributions of Prof. K. V. Krishna Murthy.",
};

export default function ArchivePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24">
        <LiteraryContributions />
      </main>
      <Footer />
    </>
  );
}
