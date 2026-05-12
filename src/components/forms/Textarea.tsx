import { type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="block text-sm font-semibold text-ink" htmlFor={textareaId}>
      {label ? <span>{label}</span> : null}
      <textarea
        id={textareaId}
        className={`mt-2 min-h-32 w-full rounded-2xl border border-[#bbcabf] bg-[#fbfffb] px-4 py-3 text-base text-ink outline-none transition focus:border-emerald focus:ring-4 focus:ring-emerald-soft ${className}`}
        {...props}
      />
      {error ? <span className="mt-2 block text-xs font-medium text-clay">{error}</span> : null}
    </label>
  );
}
