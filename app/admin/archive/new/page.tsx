"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ImageOff,
  Upload,
  FileText,
  X,
  Link as LinkIcon,
  AlertCircle,
  Check,
} from "lucide-react";

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

function wordCount(value: string) {
  return value.trim()
    ? value.trim().split(/\s+/).length
    : 0;
}

export default function NewArchiveWork() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [externalUrl, setExternalUrl] = useState("");

  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleCoverChange(file: File | null) {
    setCover(file);

    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverPreview(file ? URL.createObjectURL(file) : null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    // -------------------------
    // VALIDATION
    // -------------------------

    const titleWords = wordCount(cleanTitle);
    const descriptionWords = wordCount(cleanDescription);

    if (titleWords < 1 || titleWords > 15) {
      setError("Title must contain between 1 and 15 words.");
      return;
    }

    if (descriptionWords > 300) {
      setError("Description cannot exceed 300 words.");
      return;
    }

    if (!LANGUAGES.includes(language)) {
      setError("Please select a valid language.");
      return;
    }

    if (!CATEGORIES.includes(category)) {
      setError("Please select a valid category.");
      return;
    }

    if (year) {
      const numericYear = Number(year);

      if (
        !Number.isInteger(numericYear) ||
        numericYear < 1000 ||
        numericYear > new Date().getFullYear()
      ) {
        setError("Please enter a valid year.");
        return;
      }
    }

    if (!cover) {
      setError("Cover image is required.");
      return;
    }

    if (!cover.type.startsWith("image/")) {
      setError("Cover must be an image.");
      return;
    }

    if (!pdf && !externalUrl.trim()) {
      setError(
        "Upload a PDF or provide an external source."
      );
      return;
    }

    if (pdf && pdf.type !== "application/pdf") {
      setError("The document must be a PDF.");
      return;
    }

    if (externalUrl.trim()) {
      try {
        new URL(externalUrl.trim());
      } catch {
        setError("Please enter a valid external URL.");
        return;
      }
    }

    setLoading(true);

    let uploadedCoverPath: string | null = null;
    let uploadedPdfPath: string | null = null;

    try {
      // -------------------------
      // AUTH
      // -------------------------

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      // -------------------------
      // DUPLICATE CHECK
      // -------------------------

      const { data: duplicate } = await supabase
        .from("archive")
        .select("id, title")
        .ilike("title", cleanTitle)
        .maybeSingle();

      if (duplicate) {
        setError(
          `This work already exists in the archive: "${duplicate.title}"`
        );
        setLoading(false);
        return;
      }

      const timestamp = Date.now();

      // Keep filenames deterministic and unique.
      const coverExtension =
        cover.name.split(".").pop()?.toLowerCase() || "jpg";

      uploadedCoverPath =
        `${timestamp}-cover.${coverExtension}`;

      // -------------------------
      // UPLOAD COVER
      // -------------------------

      const { error: coverError } =
        await supabase.storage
          .from("archive-covers")
          .upload(uploadedCoverPath, cover, {
            upsert: false,
          });

      if (coverError) {
        throw new Error(
          `Cover upload failed: ${coverError.message}`
        );
      }

      // -------------------------
      // UPLOAD PDF
      // -------------------------

      if (pdf) {
        uploadedPdfPath =
          `${timestamp}-document.pdf`;

        const { error: pdfError } =
          await supabase.storage
            .from("archive-pdfs")
            .upload(uploadedPdfPath, pdf, {
              upsert: false,
            });

        if (pdfError) {
          throw new Error(
            `PDF upload failed: ${pdfError.message}`
          );
        }
      }

      // -------------------------
      // DATABASE ROW
      // -------------------------

      const { error: dbError } = await supabase
        .from("archive")
        .insert({
          title: cleanTitle,
          description: cleanDescription || null,
          year: year ? Number(year) : null,
          language,
          category,

          // IMPORTANT:
          // These are Storage paths, NOT URLs.
          cover_file: uploadedCoverPath,
          pdf_file: uploadedPdfPath,

          external_url:
            externalUrl.trim() || null,

          views: 0,
          downloads: 0,
        });

      if (dbError) {
        if (dbError.code === "23505") {
          throw new Error(
            "This work already exists in the archive."
          );
        }

        throw new Error(
          `Database error: ${dbError.message}`
        );
      }

      // -------------------------
      // SUCCESS
      // -------------------------

      router.push("/admin");
      router.refresh();

    } catch (err) {
      console.error("Archive upload failed:", err);

      // -------------------------
      // ROLLBACK STORAGE
      // -------------------------

      if (uploadedPdfPath) {
        const { error } = await supabase.storage
          .from("archive-pdfs")
          .remove([uploadedPdfPath]);

        if (error) {
          console.error(
            "Failed to rollback PDF:",
            error
          );
        }
      }

      if (uploadedCoverPath) {
        const { error } = await supabase.storage
          .from("archive-covers")
          .remove([uploadedCoverPath]);

        if (error) {
          console.error(
            "Failed to rollback cover:",
            error
          );
        }
      }

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while adding the work."
      );
    } finally {
      setLoading(false);
    }
  }

  const titleWordCount = wordCount(title);
  const descriptionWordCount = wordCount(description);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Add Archive Work
          </h1>

          <p className="text-gray-500 mt-1.5">
            Add a new work to the archive.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">

            {/* MAIN FIELDS */}

            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6">

              {/* TITLE */}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">
                    Title *
                  </label>

                  <span
                    className={`text-xs ${
                      titleWordCount > 15
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {titleWordCount}/15 words
                  </span>
                </div>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Work title"
                  required
                  className="w-full bg-gray-50 focus:bg-white rounded-lg px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-black/10 transition"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">
                    Description
                  </label>

                  <span
                    className={`text-xs ${
                      descriptionWordCount > 300
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {descriptionWordCount}/300 words
                  </span>
                </div>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={6}
                  placeholder="Brief description of the work"
                  className="w-full bg-gray-50 focus:bg-white rounded-lg px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-black/10 transition resize-none"
                />
              </div>

              {/* YEAR + LANGUAGE + CATEGORY */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Year
                  </label>

                  <input
                    type="number"
                    min="1000"
                    max={new Date().getFullYear()}
                    value={year}
                    onChange={(e) =>
                      setYear(e.target.value)
                    }
                    placeholder="1954"
                    className="w-full bg-gray-50 focus:bg-white rounded-lg px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-black/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language *
                  </label>

                  <select
                    required
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                    className="w-full bg-gray-50 focus:bg-white rounded-lg px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-black/10 transition"
                  >
                    <option value="">
                      Select
                    </option>

                    {LANGUAGES.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>

                  <select
                    required
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="w-full bg-gray-50 focus:bg-white rounded-lg px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-black/10 transition"
                  >
                    <option value="">
                      Select
                    </option>

                    {CATEGORIES.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* PDF */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  PDF
                </label>

                <label
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm cursor-pointer transition ${
                    pdf
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-500"
                  }`}
                >
                  <FileText size={17} strokeWidth={2} className="shrink-0" />

                  <span className="truncate flex-1">
                    {pdf ? pdf.name : "Choose a PDF file"}
                  </span>

                  {pdf ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPdf(null);
                      }}
                      className="shrink-0 rounded-full p-1 hover:bg-white/10 transition"
                      aria-label="Remove PDF"
                    >
                      <X size={14} strokeWidth={2.5} />
                    </button>
                  ) : (
                    <Upload size={15} strokeWidth={2} className="shrink-0" />
                  )}

                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      setPdf(
                        e.target.files?.[0] || null
                      )
                    }
                    className="hidden"
                  />
                </label>

                <p className="text-xs text-gray-400 mt-1.5">
                  Upload the authorized PDF if available.
                </p>
              </div>

              {/* EXTERNAL */}

              <div>
                <label className="block text-sm font-medium mb-2">
                  External Source
                </label>

                <div className="relative">
                  <LinkIcon
                    size={15}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="url"
                    value={externalUrl}
                    onChange={(e) =>
                      setExternalUrl(e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full bg-gray-50 focus:bg-white rounded-lg pl-10 pr-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-black/10 transition"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-1.5">
                  Use this when the work is hosted elsewhere.
                </p>
              </div>

              {/* ERROR */}

              {error && (
                <div className="flex items-start gap-2.5 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                  <AlertCircle size={16} strokeWidth={2} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* ACTIONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => router.push("/admin")}
                  className="rounded-lg px-5 py-3 text-sm font-medium bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-black text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition"
                >
                  {loading ? (
                    "Publishing..."
                  ) : (
                    <>
                      <Check size={15} strokeWidth={2.5} />
                      Publish Work
                    </>
                  )}
                </button>

              </div>

            </div>

            {/* COVER PREVIEW SIDEBAR */}

            <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-6">

              <label className="block text-sm font-medium mb-3">
                Cover *
              </label>

              <label className="group block cursor-pointer">

                <div className="aspect-[4/5] rounded-xl bg-gray-50 overflow-hidden relative ring-1 ring-gray-100">

                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300 group-hover:text-gray-400 transition">
                      <ImageOff size={28} strokeWidth={1.5} />
                      <span className="text-xs font-medium">
                        No cover selected
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 text-white text-xs font-medium">
                      <Upload size={14} strokeWidth={2} />
                      {coverPreview ? "Change image" : "Upload image"}
                    </span>
                  </div>

                </div>

                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    handleCoverChange(e.target.files?.[0] || null)
                  }
                  className="hidden"
                />

              </label>

              {cover && (
                <div className="flex items-center justify-between gap-2 mt-3 text-xs text-gray-500">
                  <span className="truncate">
                    {cover.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCoverChange(null)}
                    className="shrink-0 text-gray-400 hover:text-gray-700 transition"
                    aria-label="Remove cover"
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-3">
                This image appears on the archive card and work page.
              </p>

            </div>

          </div>

        </form>
      </div>
    </main>
  );
}