"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";

export default function FilterSelect({
  label,
  value,
  options,
  queryKey,
}: {
  label: string;
  value: string;
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

  function select(option: string) {
    setOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    if (option === "All") {
      params.delete(queryKey);
    } else {
      params.set(queryKey, option);
    }

    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

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
          {value}
        </span>

        <ChevronDown
          size={14}
          strokeWidth={2.5}
          className={`ml-auto text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-20 top-full left-0 mt-2 w-full min-w-52 bg-white rounded-xl shadow-xl ring-1 ring-black/5 p-1.5 max-h-72 overflow-y-auto">

          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => select(option)}
              className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-left transition ${
                option === value
                  ? "bg-gray-900 text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option}

              {option === value && (
                <Check size={14} strokeWidth={2.5} />
              )}
            </button>
          ))}

        </div>
      )}

    </div>
  );
}
