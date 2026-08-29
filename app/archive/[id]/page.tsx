import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ArchiveActions from "./ArchiveActions";

export const dynamic = "force-dynamic";

function safeExternalUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default async function ArchiveWorkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: work, error } = await supabase
    .from("archive")
    .select(`
      id,
      title,
      description,
      year,
      language,
      category,
      cover_file,
      pdf_file,
      external_url,
      views,
      downloads
    `)
    .eq("id", id)
    .single();

  if (error || !work) {
    notFound();
  }

  const coverUrl = work.cover_file
    ? supabase.storage
        .from("archive-covers")
        .getPublicUrl(work.cover_file).data.publicUrl
    : null;
  const externalUrl = safeExternalUrl(work.external_url);

  return (
    <main className="min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* BACK */}

        <Link
          href="/archive"
          className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-10"
        >
          ← Back to Archive
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12">

          {/* COVER */}

          <div>

            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 shadow-lg">

              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No cover available
                </div>
              )}

            </div>

          </div>

          {/* DETAILS */}

          <div className="max-w-2xl">

            <div className="flex flex-wrap gap-2 mb-4">

              {work.year && (
                <span className="text-sm text-gray-500">
                  {work.year}
                </span>
              )}

              {work.language && (
                <span className="text-sm text-gray-500">
                  • {work.language}
                </span>
              )}

              {work.category && (
                <span className="text-sm text-gray-500">
                  • {work.category}
                </span>
              )}

            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {work.title}
            </h1>

            {work.description && (
              <p className="text-gray-600 text-lg leading-relaxed mt-6">
                {work.description}
              </p>
            )}

            <ArchiveActions
              id={work.id}
              hasPdf={Boolean(work.pdf_file)}
              externalUrl={externalUrl}
              initialViews={work.views ?? 0}
              initialDownloads={work.downloads ?? 0}
            />

          </div>

        </div>

      </div>

    </main>
  );
}
