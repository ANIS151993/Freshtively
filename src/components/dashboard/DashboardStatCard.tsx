import { type ReactNode } from "react";
import { Card } from "../cards/Card";

export function DashboardStatCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
          {helper ? <p className="mt-2 text-sm text-muted">{helper}</p> : null}
        </div>
        {icon ? <div className="rounded-lg bg-[#edf6ef] p-3 text-emerald">{icon}</div> : null}
      </div>
    </Card>
  );
}
