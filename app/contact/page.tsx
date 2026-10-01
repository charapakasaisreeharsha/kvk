import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KVKM Legacy.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: announcements } = await supabase
    .from("announcements")
    .select("id, title, body, published_at")
    .order("published_at", { ascending: false });

  return (
    <>
      <Navbar hideWhenFooterVisible={false} />
      <main className="min-h-[60vh] bg-[var(--background)] px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <section className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-normal text-[var(--foreground)] sm:text-4xl">Contact</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--secondary)] sm:text-lg">
            This legacy grows richer through shared memories and thoughtful voices. We would be grateful for your feedback, suggestions, or any stories you would like to share.
          </p>
          <a
            href="mailto:Kvkmlegacy@gmail.com"
            className="mt-6 inline-block text-lg text-[var(--primary)] underline underline-offset-4 transition-colors hover:text-[var(--accent)]"
          >
            Kvkmlegacy@gmail.com
          </a>
          {announcements && announcements.length > 0 && (
            <section aria-labelledby="announcements-heading" className="mt-14 border-t border-[var(--secondary)]/20 pt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Latest updates</p>
              <h2 id="announcements-heading" className="mt-2 text-2xl font-normal text-[var(--foreground)]">Announcements</h2>
              <div className="mt-6 space-y-4">
                {announcements.map((announcement) => (
                  <article key={announcement.id} className="rounded-xl border border-[var(--secondary)]/20 bg-white/40 p-5">
                    <h3 className="text-lg font-medium text-[var(--foreground)]">{announcement.title}</h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--secondary)]">{announcement.body}</p>
                    <time dateTime={announcement.published_at} className="mt-3 block text-xs text-[var(--secondary)]/75">
                      {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(announcement.published_at))}
                    </time>
                  </article>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
