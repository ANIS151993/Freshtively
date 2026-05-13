import { ChefHat, Heart, ShoppingBag, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { DashboardStatCard } from "../../components/dashboard/DashboardStatCard";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export default function ConsumerHomePage() {
  const { profile } = useAuth();
  const { itemCount, subtotal } = useCart();

  return (
    <section>
      <div className="rounded-lg border border-[#d8dfd8] bg-white p-6 shadow-sm md:p-8">
        <PageHeader
          eyebrow="Consumer dashboard"
          title={`Welcome${profile?.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}`}
          description="Discover nearby homemade cultural food, manage your cart, and track active orders."
          action={
            <Link to="/consumer/discover">
              <Button leftIcon={<ShoppingBag size={18} />}>Find food</Button>
            </Link>
          }
        />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["Search local kitchens", "Add meals to cart", "Track handoff status"].map((item) => (
            <div key={item} className="rounded-lg border border-[#e2e8e2] bg-[#fbfcfa] px-4 py-3 text-sm font-bold text-ink">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <DashboardStatCard label="Cart items" value={String(itemCount)} helper={`$${subtotal.toFixed(2)} subtotal`} icon={<ShoppingBag />} />
        <DashboardStatCard label="Favorite cuisines" value="Cultural" helper="Personalization expands next." icon={<Heart />} />
        <DashboardStatCard label="Nearby cooks" value="Live" helper="Loaded from available dishes." icon={<ChefHat />} />
        <DashboardStatCard label="Tracking" value="Ready" helper="Order timelines included." icon={<Truck />} />
      </div>
      <Card className="mt-8">
        <h2 className="text-xl font-extrabold text-ink">Recommended workflow</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Search dishes, open details, add items to cart, review checkout, place a Firestore order, then track status
          from order placement through delivery.
        </p>
      </Card>
    </section>
  );
}
