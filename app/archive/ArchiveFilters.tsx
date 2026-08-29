"use client";

import { useEffect, useRef, useState } from "react";
import { Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
  const [hasScrolled, setHasScrolled] = useState(false);
  const desktopBarRef = useRef<HTMLElement>(null);
  const mobileBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateScrolledState = () => {
      const activeBar = [desktopBarRef.current, mobileBarRef.current].find(
        (bar) => bar?.offsetParent !== null,
      );

      setHasScrolled((activeBar?.getBoundingClientRect().top ?? 1) <= 0);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    window.addEventListener("resize", updateScrolledState);
    return () => {
      window.removeEventListener("scroll", updateScrolledState);
      window.removeEventListener("resize", updateScrolledState);
    };
  }, []);

  const barBackground = hasScrolled
    ? "bg-[var(--primary)] shadow-[0_8px_24px_rgba(80,25,0,0.2)]"
    : "bg-transparent shadow-none";
  const hasActiveFilters = Boolean(search) || language !== "All" || category !== "All";

  return (
    <>
      <section ref={desktopBarRef} className={`sticky top-0 z-30 mx-auto hidden max-w-7xl px-6 py-3 transition-[background-color,box-shadow] duration-300 md:block ${barBackground}`}>
        <div className="flex items-center gap-3">
          <SearchForm search={search} />
          <FilterSelect label="Language" value={language} options={languages} queryKey="language" />
          <FilterSelect label="Category" value={category} options={categories} queryKey="category" />
          {hasActiveFilters && (
            <Link
              href="/archive"
              scroll={false}
              className="shrink-0 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-black"
            >
              Clear filters
            </Link>
          )}
        </div>
      </section>

      <section ref={mobileBarRef} className={`sticky top-0 z-30 mx-auto max-w-7xl px-6 py-3 transition-[background-color,box-shadow] duration-300 md:hidden ${barBackground}`}>
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
