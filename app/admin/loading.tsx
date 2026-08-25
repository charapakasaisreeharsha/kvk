export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-white" aria-busy="true" aria-label="Loading admin dashboard">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-10 flex items-start justify-between"><div className="space-y-3"><div className="h-4 w-36 animate-pulse rounded bg-gray-100" /><div className="h-9 w-28 animate-pulse rounded bg-gray-100" /><div className="h-5 w-64 animate-pulse rounded bg-gray-100" /></div><div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" /></div>
        <div className="mb-8 grid grid-cols-3 gap-2.5 sm:gap-4">{[0, 1, 2].map((item) => <div key={item} className="h-24 animate-pulse rounded-xl bg-gray-100 sm:h-28 sm:rounded-2xl" />)}</div>
        <section className="overflow-hidden rounded-2xl ring-1 ring-gray-100"><div className="flex items-center justify-between p-5"><div className="space-y-2"><div className="h-5 w-32 animate-pulse rounded bg-gray-100" /><div className="h-4 w-44 animate-pulse rounded bg-gray-100" /></div><div className="h-10 w-28 animate-pulse rounded-lg bg-gray-100" /></div><div className="space-y-px border-t border-gray-100 p-5">{[0, 1, 2].map((item) => <div key={item} className="h-14 animate-pulse rounded bg-gray-50" />)}</div></section>
      </div>
    </main>
  );
}
