import { Badge } from "../common/Badge";

const statusTone = {
  pending: "saffron",
  approved: "emerald",
  active: "emerald",
  suspended: "clay",
  rejected: "clay",
  unavailable: "neutral",
} as const;

type Status = keyof typeof statusTone;

export function StatusBadge({ status }: { status: Status | string }) {
  const tone = status in statusTone ? statusTone[status as Status] : "neutral";
  const label = status.replace(/_/g, " ");

  return <Badge tone={tone}>{label}</Badge>;
}
