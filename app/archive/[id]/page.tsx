import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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

            <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden">

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

            {/* COUNTERS */}

            <div className="flex gap-6 mt-8 text-sm text-gray-500">

              <span>
                {work.views ?? 0} views
              </span>

              <span>
                {work.downloads ?? 0} downloads
              </span>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-wrap gap-3 mt-8">

              {work.pdf_file && (
                <a
                  href={`/archive/${work.id}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition"
                >
                  Read PDF
                </a>
              )}

              {work.pdf_file && (
                <a
                  href={`/archive/${work.id}/download`}
                  className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-50 transition"
                >
                  Download PDF
                </a>
              )}

              {work.external_url && (
                <a
                  href={work.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border px-6 py-3 font-medium hover:bg-gray-50 transition"
                >
                  Visit Original Source
                </a>
              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
