import { type ReactNode } from "react";

type BadgeTone = "emerald" | "saffron" | "clay" | "neutral";

const tones: Record<BadgeTone, string> = {
  emerald: "bg-emerald-soft text-emerald",
  saffron: "bg-saffron-soft text-saffron-dark",
  clay: "bg-clay-soft text-clay",
  neutral: "bg-cream-dim text-muted",
};

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: BadgeTone }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}
