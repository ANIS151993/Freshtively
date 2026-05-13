import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block text-sm font-semibold text-ink" htmlFor={inputId}>
      {label ? <span>{label}</span> : null}
      <input
        id={inputId}
        className={`mt-2 min-h-12 w-full rounded-lg border border-[#cfd8d0] bg-white px-4 text-base text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-[#dceee3] ${className}`}
        {...props}
      />
      {error ? <span className="mt-2 block text-xs font-medium text-clay">{error}</span> : null}
    </label>
  );
}
