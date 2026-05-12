import { type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ label: string; value: string }>;
}

export function Select({ label, id, options, className = "", ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="block text-sm font-semibold text-ink" htmlFor={selectId}>
      {label ? <span>{label}</span> : null}
      <select
        id={selectId}
        className={`mt-2 min-h-12 w-full rounded-2xl border border-[#bbcabf] bg-[#fbfffb] px-4 text-base text-ink outline-none transition focus:border-emerald focus:ring-4 focus:ring-emerald-soft ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
