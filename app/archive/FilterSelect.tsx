"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function FilterSelect({
  label,
  values,
  options,
  queryKey,
}: {
  label: string;
  values: string[];
  options: string[];
  queryKey: "language" | "category";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function toggle(option: string) {
    const params = new URLSearchParams(searchParams.toString());
    const nextValues = option === "All"
      ? []
      : values.includes(option)
        ? values.filter((value) => value !== option)
        : [...values, option];

    params.delete(queryKey);
    nextValues.forEach((value) => params.append(queryKey, value));

    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  const buttonValue = values.length === 0
    ? "All"
    : values.length === 1
      ? values[0]
      : `${values.length} selected`;

  return (
    <div ref={ref} className="relative w-full shrink-0 md:w-44">

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-2 rounded-lg pl-4 pr-3 py-3 text-sm transition ${
          open
            ? "bg-white shadow-md ring-1 ring-gray-200"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <span className="text-gray-500">
          {label}
        </span>

        <span className="font-semibold text-gray-900 truncate">
          {buttonValue}
        </span>

        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className={`ml-auto text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute z-20 top-full left-0 mt-2 w-full min-w-52 max-h-72 touch-pan-y overflow-y-auto overscroll-contain rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-black/5"
          onWheel={(event) => event.stopPropagation()}
        >

          {options.map((option) => {
            const checked = option === "All" ? values.length === 0 : values.includes(option);

            return (
            <label
              key={option}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                checked
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option)}
                className="size-4 rounded border-current accent-[var(--primary)]"
              />
              <span>{option}</span>
            </label>
            );
          })}

        </div>
      )}

    </div>
  );
}
