export function LoadingSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-muted" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-soft border-t-emerald" />
      <span>{label}</span>
    </div>
  );
}
