import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Keep the authentication check tied to the current request cookies.
export const dynamic = "force-dynamic";

export default async function NewArchiveWorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return children;
}
