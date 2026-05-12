import { X } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "../common/Button";

export function Modal({
  isOpen,
  title,
  children,
  onClose,
}: {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-lift">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-ink">{title}</h2>
          <Button variant="ghost" className="h-10 w-10 p-0" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </Button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
