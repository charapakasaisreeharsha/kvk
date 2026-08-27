export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-5 pt-28" aria-busy="true" aria-label="Loading page">
      <div className="mx-auto max-w-6xl animate-pulse space-y-8">
        <div className="h-10 w-48 rounded-full bg-[var(--secondary)]/10" />
        <div className="h-72 rounded-3xl bg-[var(--secondary)]/10 sm:h-96" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-48 rounded-3xl bg-[var(--secondary)]/10" />
          <div className="h-48 rounded-3xl bg-[var(--secondary)]/10" />
        </div>
      </div>
    </main>
  );
}
