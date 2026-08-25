"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [error, setError] = useState("");
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isConfirmOpen) cancelButtonRef.current?.focus();
  }, [isConfirmOpen]);

  async function logout() {
    setIsLoggingOut(true);
    setError("");
    try {
      const { error: signOutError } = await createClient().auth.signOut();
      if (signOutError) throw signOutError;
      router.replace("/admin/login");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign out.");
      setIsLoggingOut(false);
    }
  }

  function closeConfirmation() {
    if (!isLoggingOut) setIsConfirmOpen(false);
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button type="button" onClick={() => { setError(""); setIsConfirmOpen(true); }} disabled={isLoggingOut} className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:opacity-50">
        Sign out
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={closeConfirmation}>
          <div role="dialog" aria-modal="true" aria-labelledby="signout-title" aria-describedby="signout-description" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onMouseDown={(event) => event.stopPropagation()}>
            <h2 id="signout-title" className="text-lg font-semibold text-gray-900">Sign out of admin?</h2>
            <p id="signout-description" className="mt-2 text-sm text-gray-600">You will need to sign in again to manage the archive.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button ref={cancelButtonRef} type="button" onClick={closeConfirmation} disabled={isLoggingOut} className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:opacity-50">Cancel</button>
              <button type="button" onClick={logout} disabled={isLoggingOut} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50">
                {isLoggingOut && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                {isLoggingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
