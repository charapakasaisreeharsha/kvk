"use client";

import { useEffect, useRef, useState } from "react";
import { Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterSelect from "./FilterSelect";

type ArchiveFiltersProps = {
  search: string;
  language: string;
  category: string;
  languages: string[];
  categories: string[];
};

function SearchForm({
  search,
}: Pick<ArchiveFiltersProps, "search">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function updateSearch(nextTerm: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedTerm = nextTerm.trim();

      if (normalizedTerm) {
        params.set("search", normalizedTerm);
      } else {
        params.delete("search");
      }

      params.delete("page");
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }, 300);
  }

  return (
    <div className="relative min-w-0 flex-1">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={16}
        strokeWidth={2}
      />
      <input
        type="search"
        defaultValue={search}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Search works, titles, descriptions..."
        className="w-full rounded-lg bg-gray-100 py-3 pl-10 pr-4 text-sm outline-none transition focus:bg-gray-50 focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

export default function ArchiveFilters({
  search,
  language,
  category,
  languages,
  categories,
}: ArchiveFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <section className="sticky top-0 z-30 mx-auto hidden max-w-7xl bg-white/95 px-6 py-3 shadow-sm backdrop-blur md:block">
        <div className="flex items-center gap-3">
          <SearchForm search={search} />
          <FilterSelect label="Language" value={language} options={languages} queryKey="language" />
          <FilterSelect label="Category" value={category} options={categories} queryKey="category" />
        </div>
      </section>

      <section className="sticky top-0 z-30 mx-auto max-w-7xl bg-white/95 px-6 py-3 shadow-sm backdrop-blur md:hidden">
        <div className="relative flex items-stretch gap-3">
          <SearchForm search={search} />
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-gray-100 px-4 text-gray-700 transition hover:bg-gray-200"
            aria-label="Open filters"
            aria-expanded={filtersOpen}
          >
            <Filter size={18} />
          </button>

          {filtersOpen && (
            <div className="absolute left-0 top-full z-40 w-full pt-3">
              <div className="grid gap-3">
                <FilterSelect label="Language" value={language} options={languages} queryKey="language" />
                <FilterSelect label="Category" value={category} options={categories} queryKey="category" />
              </div>
            </div>
          )}
          </div>
      </section>
    </>
  );
}
