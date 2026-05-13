import { type ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-[#d8dfd8] pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <p className="text-sm font-extrabold uppercase tracking-wide text-emerald">{eyebrow}</p> : null}
        <h1 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
