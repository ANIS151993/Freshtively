import { ChefHat, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { PageHeader } from "../../components/common/PageHeader";

const roles = [
  {
    title: "Food consumer",
    description: "Order nearby homemade cultural food and track delivery.",
    to: "/signup/consumer",
    icon: ShoppingBag,
  },
  {
    title: "Household cooker",
    description: "List your cultural dishes, accept orders, and manage prep.",
    to: "/signup/cooker",
    icon: ChefHat,
  },
  {
    title: "Delivery partner",
    description: "Accept local delivery requests and complete handoffs.",
    to: "/signup/delivery",
    icon: Truck,
  },
];

export default function RoleSelectionPage() {
  return (
    <section className="w-full">
      <PageHeader
        eyebrow="Create your account"
        title="Choose your Freshtively role"
        description="Each role gets a dedicated dashboard connected to the same ordering workflow."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {roles.map((role) => (
          <Link key={role.to} to={role.to}>
            <Card className="h-full transition duration-200 hover:border-emerald">
              <role.icon className="text-emerald" size={32} />
              <h2 className="mt-5 text-xl font-extrabold text-ink">{role.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{role.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
