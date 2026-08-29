"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const requestController = useRef<AbortController | null>(null);

  function updateEmail(value: string) {
    // Email addresses never need whitespace or control characters.
    setEmail(value.replace(/[\s\u0000-\u001F\u007F]/g, "").slice(0, 254));
  }

  function updatePassword(value: string) {
    // Keep passwords opaque (do not rewrite valid characters), but reject
    // control characters and unreasonably large submissions while typing.
    setPassword(value.replace(/[\u0000-\u001F\u007F]/g, "").slice(0, 128));
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (loading) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);
    const controller = new AbortController();
    requestController.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: normalizedEmail, password }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setError(result?.error || "Unable to sign in. Please try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (requestError) {
      setError(
        requestError instanceof DOMException && requestError.name === "AbortError"
          ? "Sign-in timed out. Please check your connection and try again."
          : "Unable to sign in. Please try again.",
      );
    } finally {
      window.clearTimeout(timeout);
      requestController.current = null;
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl p-6 shadow-sm ring-1 ring-gray-100 sm:p-8"
      >
        <div className="mb-7 flex flex-col items-center text-center sm:mb-8">
          <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-black text-lg text-white">
            🔒
          </span>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Archive Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to manage the archive.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg px-4 py-3 text-sm outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-black/70"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                maxLength={128}
                autoComplete="current-password"
                value={password}
                onChange={(e) => updatePassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg px-4 py-3 pr-16 text-sm outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-black/70"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
