import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const LANGUAGES = ["Telugu", "Sanskrit", "English"];
const CATEGORIES = ["Prose", "Poetry", "Research Papers", "Scientific", "Books", "Essays", "Articles", "Speeches", "Other"];

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const title = getText(formData, "title").trim();
  const description = getText(formData, "description").trim();
  const year = getText(formData, "year").trim();
  const category = getText(formData, "category");
  const language = getText(formData, "language");
  const externalUrl = getText(formData, "externalUrl").trim();
  const cover = getFile(formData, "cover");
  const pdf = getFile(formData, "pdf");
  const validationError = validateWork({ title, description, year, category, language, externalUrl, cover, pdf });
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  // This happens before any Storage write, so duplicates cannot create orphan files.
  const { data: existingWork, error: duplicateCheckError } = await supabase
    .from("archive").select("id").ilike("title", escapeIlikePattern(title)).limit(1).maybeSingle();
  if (duplicateCheckError) {
    console.error("Archive duplicate check error:", duplicateCheckError);
    return NextResponse.json({ error: "Unable to verify the work title." }, { status: 500 });
  }
  if (existingWork) return NextResponse.json({ error: "This work already exists in the archive." }, { status: 409 });

  const timestamp = Date.now();
  const coverPath = `${timestamp}-cover.${fileExtension(cover!.name, "jpg")}`;
  const pdfPath = pdf ? `${timestamp}-document.pdf` : null;
  let uploadedCoverPath: string | null = null;
  let uploadedPdfPath: string | null = null;
  try {
    const { error: coverError } = await supabase.storage.from("archive-covers").upload(coverPath, cover!);
    if (coverError) throw new Error(`Cover upload failed: ${coverError.message}`);
    uploadedCoverPath = coverPath;
    if (pdf && pdfPath) {
      const { error: pdfError } = await supabase.storage.from("archive-pdfs").upload(pdfPath, pdf);
      if (pdfError) throw new Error(`PDF upload failed: ${pdfError.message}`);
      uploadedPdfPath = pdfPath;
    }
    const { error: insertError } = await supabase.from("archive").insert({ title, description: description || null, year: year ? Number(year) : null, category, language, cover_file: coverPath, pdf_file: pdfPath, external_url: externalUrl || null });
    if (insertError) throw new Error(`Save failed: ${insertError.message}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    const cleanupErrors = await removeUploadedFiles(supabase, uploadedPdfPath, uploadedCoverPath);
    if (cleanupErrors.length) console.error("Archive upload cleanup errors:", cleanupErrors);
    console.error("Archive upload error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Something went wrong while uploading." }, { status: 500 });
  }
}

function getText(formData: FormData, key: string) { const value = formData.get(key); return typeof value === "string" ? value : ""; }
function getFile(formData: FormData, key: string) { const value = formData.get(key); return value instanceof File && value.size > 0 ? value : null; }
function wordCount(value: string) { return value ? value.split(/\s+/).length : 0; }
function fileExtension(name: string, fallback: string) { const extension = name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, ""); return extension || fallback; }
function escapeIlikePattern(value: string) { return value.replace(/[\\%_]/g, "\\$&"); }

function validateWork({ title, description, year, category, language, externalUrl, cover, pdf }: { title: string; description: string; year: string; category: string; language: string; externalUrl: string; cover: File | null; pdf: File | null }) {
  if (wordCount(title) < 1 || wordCount(title) > 15) return "Title must contain between 1 and 15 words.";
  if (wordCount(description) > 300) return "Description cannot exceed 300 words.";
  if (year && (!Number.isInteger(Number(year)) || Number(year) < 1000 || Number(year) > new Date().getFullYear())) return "Please enter a valid year.";
  if (!CATEGORIES.includes(category)) return "Please select a valid category.";
  if (!LANGUAGES.includes(language)) return "Please select a valid language.";
  if (!cover) return "Cover image is required.";
  if (!cover.type.startsWith("image/")) return "Cover must be an image file.";
  if (!pdf && !externalUrl) return "Upload a PDF or provide an external source URL.";
  if (pdf && pdf.type !== "application/pdf") return "The uploaded file must be a PDF.";
  if (externalUrl) {
    try {
      const url = new URL(externalUrl);
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        return "External URLs must use HTTP or HTTPS.";
      }
    } catch {
      return "Please enter a valid external URL.";
    }
  }
  return null;
}

async function removeUploadedFiles(supabase: Awaited<ReturnType<typeof createClient>>, pdfPath: string | null, coverPath: string | null) {
  const errors: unknown[] = [];
  if (pdfPath) { const { error } = await supabase.storage.from("archive-pdfs").remove([pdfPath]); if (error) errors.push(error); }
  if (coverPath) { const { error } = await supabase.storage.from("archive-covers").remove([coverPath]); if (error) errors.push(error); }
  return errors;
}
