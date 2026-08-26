import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

type Attempt = { count: number; resetAt: number };

// This is deliberately module-scoped so it is never exposed to the browser.
// For multi-instance deployments, replace this with a shared store (for
// example, Upstash Redis) so limits apply across every server instance.
const failedAttempts = new Map<string, Attempt>();

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function getAttempt(key: string, now: number) {
  const attempt = failedAttempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    failedAttempts.delete(key);
    return undefined;
  }
  return attempt;
}

function retryAfterSeconds(attempt: Attempt, now: number) {
  return Math.max(1, Math.ceil((attempt.resetAt - now) / 1000));
}

function tooManyRequests(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many sign-in attempts. Please try again later." },
    {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": String(retryAfter),
      },
    },
  );
}

function registerFailure(key: string, now: number) {
  const attempt = getAttempt(key, now);
  const next = {
    count: (attempt?.count || 0) + 1,
    resetAt: attempt?.resetAt || now + WINDOW_MS,
  };
  failedAttempts.set(key, next);
  return next;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid request format." }, { status: 415 });
  }

  const payload: unknown = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid sign-in details." }, { status: 400 });
  }

  const { email, password } = payload as { email?: unknown; password?: unknown };
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return NextResponse.json({ error: "Invalid sign-in details." }, { status: 400 });
  }

  const now = Date.now();
  const ipKey = `ip:${getClientIp(request)}`;
  const emailKey = `email:${email.trim().toLowerCase()}`;
  const activeLimit = [getAttempt(ipKey, now), getAttempt(emailKey, now)].find(
    (attempt) => attempt && attempt.count >= MAX_FAILED_ATTEMPTS,
  );

  if (activeLimit) return tooManyRequests(retryAfterSeconds(activeLimit, now));

  const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error) {
    failedAttempts.delete(ipKey);
    failedAttempts.delete(emailKey);
    return response;
  }

  const ipAttempt = registerFailure(ipKey, now);
  const emailAttempt = registerFailure(emailKey, now);
  const limit = [ipAttempt, emailAttempt].find((attempt) => attempt.count >= MAX_FAILED_ATTEMPTS);

  if (limit) return tooManyRequests(retryAfterSeconds(limit, now));
  return NextResponse.json(
    { error: "Invalid email or password." },
    { status: 401, headers: { "Cache-Control": "no-store" } },
  );
}
