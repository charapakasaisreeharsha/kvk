"use client";

import { FormEvent, useState } from "react";
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
  const [pdf, setPdf] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Add Archive Work
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new work to the archive.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Title *
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Work title"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <p className="text-xs text-gray-500 mt-1">
              1–15 words
            </p>
          </div>

          {/* DESCRIPTION */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={6}
              placeholder="Brief description of the work"
              className="w-full border rounded-lg px-4 py-3"
            />

            <p className="text-xs text-gray-500 mt-1">
              Maximum 300 words
            </p>
          </div>

          {/* YEAR */}

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
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* LANGUAGE */}

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
              className="w-full border rounded-lg px-4 py-3 bg-white"
            >
              <option value="">
                Select language
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

          {/* CATEGORY */}

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
              className="w-full border rounded-lg px-4 py-3 bg-white"
            >
              <option value="">
                Select category
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

          {/* COVER */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Cover *
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setCover(
                  e.target.files?.[0] || null
                )
              }
            />
          </div>

          {/* PDF */}

          <div>
            <label className="block text-sm font-medium mb-2">
              PDF
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setPdf(
                  e.target.files?.[0] || null
                )
              }
            />

            <p className="text-xs text-gray-500 mt-1">
              Upload the authorized PDF if available.
            </p>
          </div>

          {/* EXTERNAL */}

          <div>
            <label className="block text-sm font-medium mb-2">
              External Source
            </label>

            <input
              type="url"
              value={externalUrl}
              onChange={(e) =>
                setExternalUrl(e.target.value)
              }
              placeholder="https://..."
              className="w-full border rounded-lg px-4 py-3"
            />

            <p className="text-xs text-gray-500 mt-1">
              Use this when the work is hosted elsewhere.
            </p>
          </div>

          {/* ERROR */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ACTIONS */}

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="border rounded-lg px-5 py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white rounded-lg px-5 py-3 disabled:opacity-50"
            >
              {loading
                ? "Publishing..."
                : "Publish Work"}
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}