import { X } from "lucide-react";
import { Button } from "./Button";

export function Toast({
  message,
  tone = "success",
  onClose,
}: {
  message: string;
  tone?: "success" | "error" | "info";
  onClose?: () => void;
}) {
  const toneClass =
    tone === "error"
      ? "border-clay-soft bg-clay-soft text-clay"
      : tone === "info"
        ? "border-saffron-soft bg-saffron-soft text-saffron-dark"
        : "border-emerald-soft bg-emerald-soft text-emerald";

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lift ${toneClass}`}>
      <span>{message}</span>
      {onClose ? (
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={onClose} aria-label="Dismiss notification">
          <X size={16} />
        </Button>
      ) : null}
    </div>
  );
}
