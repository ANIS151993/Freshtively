export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-[#bbcabf]/50 bg-white/70 p-5 shadow-ambient">
          <div className="skeleton h-4 w-2/5 rounded-full" />
          <div className="skeleton mt-4 h-3 w-4/5 rounded-full" />
          <div className="skeleton mt-3 h-3 w-3/5 rounded-full" />
        </div>
      ))}
    </div>
  );
}
