import { type HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-[#bbcabf]/70 bg-white/90 p-6 shadow-ambient ${className}`}
      {...props}
    />
  );
}
