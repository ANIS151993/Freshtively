import { ChefHat, Clock, MapPin, ShieldCheck, Truck, Users } from "lucide-react";
import { DashboardStatCard } from "../components/dashboard/DashboardStatCard";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/cards/Card";

const iconMap = {
  consumer: <MapPin size={22} />,
  cooker: <ChefHat size={22} />,
  delivery: <Truck size={22} />,
  admin: <Users size={22} />,
  public: <ShieldCheck size={22} />,
  auth: <Clock size={22} />,
};

type PageArea = keyof typeof iconMap;

export function PlaceholderPage({
  area = "public",
  title,
  description,
  badge,
}: {
  area?: PageArea;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow={badge ?? "Phase 1 Foundation"}
        title={title}
        description={description}
        action={<Button>{area === "public" ? "Explore Freshtively" : "View workflow"}</Button>}
      />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <DashboardStatCard label="Role area" value={area} helper="Route and layout are connected." icon={iconMap[area]} />
        <DashboardStatCard label="Status" value="Ready" helper="Placeholder page for Phase 1." icon={<ShieldCheck size={22} />} />
        <DashboardStatCard label="Design" value="System UI" helper="Uses Freshtively visual tokens." icon={<ChefHat size={22} />} />
      </div>

      <Card className="mt-8">
        <div className="flex flex-wrap gap-3">
          <Badge tone="emerald">Firebase-ready</Badge>
          <Badge tone="saffron">Responsive shell</Badge>
          <Badge tone="clay">Role routes</Badge>
        </div>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
          This page is intentionally lightweight for Phase 1. The route, layout, reusable UI components, and
          production app shell are in place so later phases can add authentication, Firestore data, ordering, and
          operational workflows without breaking navigation.
        </p>
      </Card>
    </section>
  );
}
