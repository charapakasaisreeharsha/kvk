import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./AdminDashboard";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: works, error } = await supabase
    .from("archive")
    .select(
      "id, title, year, category, language, views, downloads, pdf_url, external_url, created_at"
    )
    .order("created_at", { ascending: false });

  const archiveWorks = works ?? [];
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400 sm:text-sm sm:normal-case sm:tracking-normal">
              Archive Management
            </p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Archive
            </h1>
            <p className="mt-1 text-sm text-gray-500 sm:mt-2">
              Manage published works and archive files.
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <LogoutButton />
          </div>
        </header>

        {error ? (
          <section className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-100">
            <div className="p-6 text-sm text-red-600">
              Unable to load archive. {error.message}
            </div>
          </section>
        ) : (
          <AdminDashboard works={archiveWorks} />
        )}
      </div>
    </main>
  );
}
