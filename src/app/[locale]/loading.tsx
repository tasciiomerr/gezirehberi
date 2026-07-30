export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="animate-pulse space-y-8">
        <div className="h-10 w-2/3 rounded-lg bg-ink/10" />
        <div className="h-4 w-full max-w-xl rounded bg-ink/10" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 rounded-xl bg-ink/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
