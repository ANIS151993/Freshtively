import { ChefHat, Clock, DollarSign, ToggleLeft, ToggleRight, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { DashboardStatCard } from "../../components/dashboard/DashboardStatCard";
import { useAuth } from "../../contexts/AuthContext";
import { getCookerDishes, getCookerOrders, getCookerProfile, updateCookerProfile } from "../../services/firestoreService";
import type { CookerProfile, Dish, Order } from "../../types/firestore";

export default function CookerDashboardPage() {
  const { currentUser, profile } = useAuth();
  const [cooker, setCooker] = useState<CookerProfile | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    Promise.all([getCookerProfile(currentUser.uid), getCookerDishes(currentUser.uid), getCookerOrders(currentUser.uid)]).then(
      ([nextCooker, nextDishes, nextOrders]) => {
        setCooker(nextCooker);
        setDishes(nextDishes);
        setOrders(nextOrders);
      },
    );
  }, [currentUser]);

  async function toggleAvailability() {
    if (!currentUser || !cooker) return;
    const nextValue = !cooker.isAvailable;
    await updateCookerProfile(currentUser.uid, { isAvailable: nextValue });
    setCooker({ ...cooker, isAvailable: nextValue });
  }

  const activeOrders = orders.filter((order) => !["delivered", "cancelled", "refunded"].includes(order.status));
  const earnings = orders
    .filter((order) => order.status === "delivered")
    .reduce((total, order) => total + order.subtotal + order.cookerTip, 0);

  return (
    <section>
      <PageHeader
        eyebrow="Cooker dashboard"
        title={`Kitchen dashboard${profile?.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}`}
        description="Manage availability, incoming orders, active dishes, and kitchen readiness."
        action={
          <Button leftIcon={cooker?.isAvailable ? <ToggleRight size={18} /> : <ToggleLeft size={18} />} onClick={toggleAvailability}>
            {cooker?.isAvailable ? "Available" : "Unavailable"}
          </Button>
        }
      />

      {cooker && cooker.missedRequestCount > 0 ? (
        <Card className="mt-6 border-clay/40 bg-clay-soft">
          <div className="flex gap-3">
            <TriangleAlert className="shrink-0 text-clay" />
            <div>
              <h2 className="font-bold text-ink">Missed request warning</h2>
              <p className="mt-1 text-sm text-muted">
                {cooker.missedRequestCount >= 3
                  ? "Third missed request: account should be reviewed for suspension."
                  : cooker.missedRequestCount === 2
                    ? "Second missed request: lower priority warning."
                    : "First missed request: respond quickly when available."}
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <DashboardStatCard label="Active orders" value={String(activeOrders.length)} helper="Needs kitchen action" icon={<Clock />} />
        <DashboardStatCard label="Menu items" value={String(dishes.length)} helper="Published dishes" icon={<ChefHat />} />
        <DashboardStatCard label="Earnings" value={`$${earnings.toFixed(2)}`} helper="Delivered order subtotal + tips" icon={<DollarSign />} />
        <DashboardStatCard label="Verification" value={cooker?.verificationStatus ?? "pending"} helper="Kitchen review status" icon={<TriangleAlert />} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/cooker/orders"><Button>View orders</Button></Link>
        <Link to="/cooker/menu/new"><Button variant="secondary">Add dish</Button></Link>
        <Link to="/cooker/verification"><Button variant="ghost">Upload documents</Button></Link>
      </div>
    </section>
  );
}
