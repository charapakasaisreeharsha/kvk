"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Filter, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import FilterSelect from "./FilterSelect";
import { archiveSearchMaxLength, sanitizeArchiveSearch } from "@/lib/archive/search";

type ArchiveFiltersProps = {
  search: string;
  languagesSelected: string[];
  categoriesSelected: string[];
  source?: "emesco";
  languages: string[];
  categories: string[];
};

type QuickLink = {
  label: string;
  href: string;
  language?: string;
  category?: string;
  source?: "emesco";
};

const quickLinks: QuickLink[] = [
  { label: "All works", href: "/archive" },
  { label: "Emesco Publications", href: "/archive?source=emesco", source: "emesco" },
  { label: "Books", href: "/archive?category=Books", category: "Books" },
  { label: "Poetry", href: "/archive?category=Poetry", category: "Poetry" },
  { label: "Research papers", href: "/archive?category=Research+Papers", category: "Research Papers" },
  { label: "Telugu books", href: "/archive?language=Telugu&category=Books", language: "Telugu", category: "Books" },
];

function QuickLinks({
  languagesSelected,
  categoriesSelected,
  source,
  onStickyBackground,
}: Pick<ArchiveFiltersProps, "languagesSelected" | "categoriesSelected" | "source"> & {
  onStickyBackground: boolean;
}) {
  return (
    <nav aria-label="Archive quick links" className="mt-3 flex justify-center gap-x-5 gap-y-2 overflow-x-auto pb-1">
      {quickLinks.map((link) => {
        const isActive =
          (link.source ?? undefined) === source &&
          (link.language ? languagesSelected.length === 1 && languagesSelected[0] === link.language : languagesSelected.length === 0) &&
          (link.category ? categoriesSelected.length === 1 && categoriesSelected[0] === link.category : categoriesSelected.length === 0);

        return (
          <Link
            key={link.label}
            href={link.href}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-1 text-xs font-medium underline decoration-1 underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
              isActive
                ? onStickyBackground
                  ? "text-white decoration-white"
                  : "text-[var(--foreground)] decoration-[var(--foreground)]"
                : onStickyBackground
                  ? "text-[var(--background)]/75 decoration-[var(--background)]/45 hover:text-white hover:decoration-white"
                  : "text-[var(--secondary)] decoration-[var(--secondary)]/45 hover:text-[var(--foreground)] hover:decoration-[var(--foreground)]"
            }`}
          >
            {link.label}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </Link>
        );
      })}
    </nav>
  );
}

function SearchForm({
  search,
}: Pick<ArchiveFiltersProps, "search">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState(search);

  useEffect(() => {
    setValue(search);
  }, [search]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function updateSearch(nextTerm: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const normalizedTerm = sanitizeArchiveSearch(nextTerm);

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
    }, 500);
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
        value={value}
        maxLength={archiveSearchMaxLength}
        onChange={(event) => {
          const nextTerm = sanitizeArchiveSearch(event.target.value);
          setValue(nextTerm);
          updateSearch(nextTerm);
        }}
        placeholder="Search works, titles, descriptions..."
        className="w-full rounded-lg bg-gray-100 py-3 pl-10 pr-4 text-sm outline-none transition focus:bg-gray-50 focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

export default function ArchiveFilters({
  search,
  languagesSelected,
  categoriesSelected,
  source,
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
  const hasActiveFilters = Boolean(search) || languagesSelected.length > 0 || categoriesSelected.length > 0 || Boolean(source);

  return (
    <>
      <section ref={desktopBarRef} className={`sticky top-0 z-30 mx-auto hidden max-w-7xl px-6 py-3 transition-[background-color,box-shadow] duration-300 md:block ${barBackground}`}>
        <div className="flex items-center gap-3">
          <SearchForm search={search} />
          <FilterSelect label="Language" values={languagesSelected} options={languages} queryKey="language" />
          <FilterSelect label="Category" values={categoriesSelected} options={categories} queryKey="category" />
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
        <QuickLinks languagesSelected={languagesSelected} categoriesSelected={categoriesSelected} source={source} onStickyBackground={hasScrolled} />
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
                <FilterSelect label="Language" values={languagesSelected} options={languages} queryKey="language" />
                <FilterSelect label="Category" values={categoriesSelected} options={categories} queryKey="category" />
              </div>
            </div>
          )}
          </div>
          <QuickLinks languagesSelected={languagesSelected} categoriesSelected={categoriesSelected} source={source} onStickyBackground={hasScrolled} />
      </section>
    </>
  );
}
