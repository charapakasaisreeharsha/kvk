"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const LANGUAGES = ["Telugu", "Sanskrit", "English"];
const CATEGORIES = [
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

const countWords = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

export default function NewArchiveWork() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!cover) {
      setCoverPreview(null);
      return;
    }
    const url = URL.createObjectURL(cover);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [cover]);

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function returnToAdmin() {
    setIsReturning(true);
    router.push("/admin");
  }

  function goBack() {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    returnToAdmin();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const errors: Record<string, string> = {};
    if (countWords(title) < 1 || countWords(title) > 15)
      errors.title = "Title must contain between 1 and 15 words.";
    if (countWords(description) > 300)
      errors.description = "Description cannot exceed 300 words.";
    if (
      year &&
      (!Number.isInteger(Number(year)) ||
        Number(year) < 1000 ||
        Number(year) > new Date().getFullYear())
    )
      errors.year = "Please enter a valid year.";
    if (!CATEGORIES.includes(category))
      errors.category = "Please select a valid category.";
    if (!LANGUAGES.includes(language))
      errors.language = "Please select a valid language.";
    if (!cover) errors.cover = "Cover image is required.";
    else if (!cover.type.startsWith("image/"))
      errors.cover = "Cover must be an image file.";
    if (!pdf && !externalUrl.trim())
      errors.pdf = "Upload a PDF or provide an external source URL.";
    if (pdf && pdf.type !== "application/pdf")
      errors.pdf = "The uploaded file must be a PDF.";
    if (externalUrl.trim()) {
      try {
        new URL(externalUrl.trim());
      } catch {
        errors.externalUrl = "Please enter a valid external URL.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix the highlighted fields before publishing.");
      return;
    }

    setFieldErrors({});
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You are not authenticated.");

      const timestamp = Date.now();
      const coverPath = `${timestamp}-cover.${cover!.name.split(".").pop() || "jpg"}`;
      const { error: coverError } = await supabase.storage
        .from("archive-covers")
        .upload(coverPath, cover!);
      if (coverError)
        throw new Error(`Cover upload failed: ${coverError.message}`);

      const {
        data: { publicUrl: coverUrl },
      } = supabase.storage.from("archive-covers").getPublicUrl(coverPath);

      let pdfPath: string | null = null;
      if (pdf) {
        pdfPath = `${timestamp}-document.pdf`;
        const { error: pdfError } = await supabase.storage
          .from("archive-pdfs")
          .upload(pdfPath, pdf);
        if (pdfError)
          throw new Error(`PDF upload failed: ${pdfError.message}`);
      }

      const { error: dbError } = await supabase.from("archive").insert({
        title: title.trim(),
        description: description.trim() || null,
        year: year ? Number(year) : null,
        category,
        language,
        cover_url: coverUrl,
        pdf_url: pdfPath,
        external_url: externalUrl.trim() || null,
      });
      if (dbError) throw new Error(`Save failed: ${dbError.message}`);

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Something went wrong while uploading."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={goBack}
            disabled={loading || isReturning}
            className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <span aria-hidden="true">←</span>
            Back
          </button>
          <h1 className="text-xl font-semibold sm:text-2xl">Add Archive Work</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Add a work to the archive.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
            {/* Left rail: portrait cover preview + PDF */}
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Cover Image *
                </label>
                <CoverDropzone
                  preview={coverPreview}
                  fileName={cover?.name ?? null}
                  onSelect={(f) => {
                    setCover(f);
                    clearFieldError("cover");
                  }}
                  onClear={() => setCover(null)}
                  error={fieldErrors.cover}
                />
              </div>

              <Field label="PDF" error={fieldErrors.pdf}>
                <SlimFileInput
                  accept="application/pdf"
                  file={pdf}
                  onSelect={(f) => {
                    setPdf(f);
                    clearFieldError("pdf");
                  }}
                  onClear={() => setPdf(null)}
                />
                <Hint>Upload the authorized PDF if available.</Hint>
              </Field>
            </div>

            {/* Right: form fields */}
            <div className="space-y-5">
              <Field label="Title *" error={fieldErrors.title}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearFieldError("title");
                  }}
                  placeholder="Enter work title"
                  className={inputClass(!!fieldErrors.title)}
                />
                <Hint>1–15 words</Hint>
              </Field>

              <Field label="Description" error={fieldErrors.description}>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    clearFieldError("description");
                  }}
                  rows={5}
                  placeholder="Brief description of the work"
                  className={inputClass(!!fieldErrors.description)}
                />
                <Hint>Maximum 300 words</Hint>
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <CustomSelect
                  label="Language *"
                  value={language}
                  setValue={(v) => {
                    setLanguage(v);
                    clearFieldError("language");
                  }}
                  placeholder="Select language"
                  options={LANGUAGES}
                  error={fieldErrors.language}
                />
                <CustomSelect
                  label="Category *"
                  value={category}
                  setValue={(v) => {
                    setCategory(v);
                    clearFieldError("category");
                  }}
                  placeholder="Select category"
                  options={CATEGORIES}
                  error={fieldErrors.category}
                />
              </div>

              <Field label="Year" error={fieldErrors.year}>
                <input
                  type="number"
                  min="1000"
                  max={new Date().getFullYear()}
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    clearFieldError("year");
                  }}
                  placeholder="1954"
                  className={`${inputClass(!!fieldErrors.year)} max-w-[160px]`}
                />
              </Field>

              <Field label="External Source" error={fieldErrors.externalUrl}>
                <input
                  type="url"
                  value={externalUrl}
                  onChange={(e) => {
                    setExternalUrl(e.target.value);
                    clearFieldError("externalUrl");
                  }}
                  placeholder="https://example.com/work"
                  className={inputClass(!!fieldErrors.externalUrl)}
                />
                <Hint>Use this when the work is hosted elsewhere.</Hint>
              </Field>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={returnToAdmin}
                  disabled={loading || isReturning}
                  className="rounded-lg px-5 py-3 text-sm font-medium text-gray-600 ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:opacity-50 sm:w-auto"
                >
                  {isReturning ? "Returning..." : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={loading || isReturning}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 sm:w-auto"
                >
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}
                  {loading ? "Uploading..." : "Publish Work"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg px-4 py-3 text-sm outline-none ring-1 transition focus:ring-2 ${
    hasError
      ? "ring-red-400 focus:ring-red-500"
      : "ring-gray-200 focus:ring-black/70"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-gray-500">{children}</p>;
}

/* Portrait cover dropzone with live preview + remove */
function CoverDropzone({
  preview,
  fileName,
  onSelect,
  onClear,
  error,
}: {
  preview: string | null;
  fileName: string | null;
  onSelect: (file: File) => void;
  onClear: () => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onSelect(f);
        }}
        onClick={() => !preview && inputRef.current?.click()}
        className={`relative flex aspect-[3/4] w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl ring-1 transition ${
          error ? "ring-red-400" : dragActive ? "ring-black" : "ring-gray-200"
        } ${!preview ? "cursor-pointer" : ""}`}
      >
        {preview ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Cover preview"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
              aria-label="Remove cover image"
            >
              ×
            </button>
            <div className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs text-white">
              {fileName}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 px-4 text-center">
            <span className="text-2xl">＋</span>
            <span className="text-xs text-gray-500">
              Click or drag a portrait cover here
            </span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onSelect(f);
          }}
          className="hidden"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* Compact cancelable file input for PDF */
function SlimFileInput({
  accept,
  file,
  onSelect,
  onClear,
}: {
  accept: string;
  file: File | null;
  onSelect: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  if (file) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm ring-1 ring-gray-200">
        <span className="truncate text-gray-800">{file.name}</span>
        <button
          type="button"
          onClick={() => {
            onClear();
            if (inputRef.current) inputRef.current.value = "";
          }}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          Remove
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onSelect(f);
          }}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm ring-1 ring-gray-200 transition hover:ring-gray-300">
      <span className="text-gray-400">Choose PDF file...</span>
      <span className="shrink-0 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
        Browse
      </span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onSelect(f);
        }}
        className="hidden"
      />
    </label>
  );
}

/* Fully custom dropdown, not a native <select> */
function CustomSelect({
  label,
  value,
  setValue,
  placeholder,
  options,
  error,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  options: string[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm outline-none ring-1 transition focus:ring-2 ${
          error ? "ring-red-400" : "ring-gray-200 focus:ring-black/70"
        }`}
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <span
          className={`ml-2 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1.5 max-h-56 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-gray-200">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left transition hover:bg-gray-50 ${
                  option === value ? "font-medium text-black" : "text-gray-700"
                }`}
              >
                {option}
                {option === value && <span>✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
