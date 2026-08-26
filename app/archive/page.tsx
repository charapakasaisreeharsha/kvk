import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  FileText,
  ImageOff,
  X,
} from "lucide-react";
import ArchiveFilters from "./ArchiveFilters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Browse the digital archive of Prof. K. V. Krishna Murthy's books, poetry, essays, research papers, and other writings.",
  alternates: {
    canonical: "/archive",
  },
};

const PAGE_SIZE = 12;

const LANGUAGES = ["All", "Telugu", "Sanskrit", "English"];

const CATEGORIES = [
  "All",
  "Prose",
  "Poetry",
  "Research Papers",
  "Scientific",
  "Books",
  "Essays",
  "Articles",
  "Speeches",
  "Other",
];

type SearchParams = {
  search?: string;
  language?: string;
  category?: string;
  page?: string;
};

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const search = params.search?.trim() || "";
  const language = params.language || "All";
  const category = params.category || "All";

  let page = Number(params.page || "1");

  if (!Number.isInteger(page) || page < 1) {
    page = 1;
  }

  const supabase = await createClient();

  let query = supabase
    .from("archive")
    .select(
      `
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
      `,
      { count: "exact" }
    )
    .order("year", {
      ascending: false,
      nullsFirst: false,
    });

  // Search
  if (search) {
    const safeSearch = search.replace(/[%_]/g, "\\$&");

    query = query.or(
      `title.ilike.%${safeSearch}%,description.ilike.%${safeSearch}%`
    );
  }

  // Language
  if (language !== "All") {
    query = query.eq("language", language);
  }

  // Category
  if (category !== "All") {
    query = query.eq("category", category);
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: rawWorks,
    error,
    count,
  } = await query.range(from, to);

  const works =
    rawWorks?.map((work) => {
      let coverUrl: string | null = null;

      if (work.cover_file) {
        const { data } = supabase.storage
          .from("archive-covers")
          .getPublicUrl(work.cover_file);

        coverUrl = data.publicUrl;
      }

      return {
        ...work,
        coverUrl,
      };
    }) ?? [];

  const totalWorks = count || 0;
  const totalPages = Math.max(
    1,
    Math.ceil(totalWorks / PAGE_SIZE)
  );

  if (page > totalPages && totalWorks > 0) {
    page = totalPages;
  }

  function buildUrl(
    overrides: Partial<SearchParams>
  ) {
    const next = {
      search,
      language,
      category,
      page: String(page),
      ...overrides,
    };

    const query = new URLSearchParams();

    if (next.search) {
      query.set("search", next.search);
    }

    if (next.language && next.language !== "All") {
      query.set("language", next.language);
    }

    if (next.category && next.category !== "All") {
      query.set("category", next.category);
    }

    if (next.page && next.page !== "1") {
      query.set("page", next.page);
    }

    const queryString = query.toString();

    return queryString
      ? `/archive?${queryString}`
      : "/archive";
  }

  return (
    <>
      <Navbar sticky={false} />

      <main className="min-h-screen">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">

        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Archive
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3">
            A life in works.
          </h1>

          <p className="text-gray-500 text-lg mt-5 max-w-2xl">
            Explore the writings, research, poetry, books,
            and other works preserved in the archive.
          </p>

        </div>

      </section>

      {/* FILTERS */}

      <ArchiveFilters
        search={search}
        language={language}
        category={category}
        languages={LANGUAGES}
        categories={CATEGORIES}
      />

      {/* RESULTS */}

      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              Works
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {totalWorks}{" "}
              {totalWorks === 1 ? "work" : "works"}
              {search && ` matching "${search}"`}
            </p>
          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="bg-red-50 rounded-2xl p-5 text-red-700">
            Unable to load the archive.
          </div>
        )}

        {/* EMPTY */}

        {!error && works.length === 0 && (
          <div className="rounded-2xl p-12 text-center">

            <h3 className="font-semibold text-lg">
              No works found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search or remove one of the filters.
            </p>

            <Link
              href="/archive"
              className="inline-flex items-center gap-1.5 mt-5 bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 transition"
            >
              <X size={15} strokeWidth={2} />
              Clear filters
            </Link>

          </div>
        )}

        {/* CARDS */}

        {!error && works.length > 0 && (

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">

            {works.map((work) => (

              <Link
                key={work.id}
                href={`/archive/${work.id}`}
                className="group flex overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md sm:block"
              >

                {/* COVER */}

                <div className="relative aspect-[4/5] w-[38%] shrink-0 overflow-hidden bg-gray-100 sm:w-full">

                  {work.coverUrl ? (
                    <img
                      src={work.coverUrl}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                      <ImageOff size={28} strokeWidth={1.5} />
                    </div>
                  )}

                  {work.pdf_file && (
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                      <FileText size={13} strokeWidth={2} className="text-gray-700" />
                    </div>
                  )}

                </div>

                {/* CONTENT */}

                <div className="flex min-w-0 flex-1 flex-col p-3.5">

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-1.5">

                    {work.year && (
                      <span>
                        {work.year}
                      </span>
                    )}

                    {work.year && work.category && (
                      <span className="w-0.5 h-0.5 rounded-full bg-gray-300" />
                    )}

                    {work.category && (
                      <span className="truncate">
                        {work.category}
                      </span>
                    )}

                  </div>

                  <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-gray-900">
                    {work.title}
                  </h3>

                  <div className="mt-auto flex items-center gap-3 pt-3 text-[11px] text-gray-400 sm:mt-3 sm:pt-0">

                    <span className="inline-flex items-center gap-1">
                      <Eye size={12} strokeWidth={2} />
                      {work.views ?? 0}
                    </span>

                    <span className="inline-flex items-center gap-1">
                      <Download size={12} strokeWidth={2} />
                      {work.downloads ?? 0}
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

        {/* PAGINATION */}

        {totalPages > 1 && (

          <div className="flex items-center justify-center gap-2 mt-12">

            {page > 1 ? (
              <Link
                href={buildUrl({
                  page: String(page - 1),
                })}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </Link>
            ) : (
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-300">
                <ChevronLeft size={16} strokeWidth={2} />
              </span>
            )}

            <div className="flex items-center gap-1">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .filter((number) => {
                  return (
                    number === 1 ||
                    number === totalPages ||
                    Math.abs(number - page) <= 2
                  );
                })
                .reduce<(number | "ellipsis")[]>((acc, number, i, arr) => {
                  if (i > 0 && number - arr[i - 1] > 1) {
                    acc.push("ellipsis");
                  }
                  acc.push(number);
                  return acc;
                }, [])
                .map((entry, i) =>
                  entry === "ellipsis" ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="min-w-9 h-9 flex items-center justify-center text-sm text-gray-300"
                    >
                      ···
                    </span>
                  ) : (
                    <Link
                      key={entry}
                      href={buildUrl({
                        page: String(entry),
                      })}
                      className={`min-w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                        entry === page
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                    >
                      {entry}
                    </Link>
                  )
                )}

            </div>

            {page < totalPages ? (
              <Link
                href={buildUrl({
                  page: String(page + 1),
                })}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                aria-label="Next page"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </Link>
            ) : (
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-300">
                <ChevronRight size={16} strokeWidth={2} />
              </span>
            )}

          </div>

        )}

      </section>

      </main>
    </>
  );
}
