import { DollarSign, Package, ToggleLeft, ToggleRight, TriangleAlert, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { DashboardStatCard } from "../../components/dashboard/DashboardStatCard";
import { useAuth } from "../../contexts/AuthContext";
import { getDeliveryOrders, getDeliveryPersonProfile, updateDeliveryPersonProfile } from "../../services/firestoreService";
import type { DeliveryPersonProfile, Order } from "../../types/firestore";

export default function DeliveryDashboardPage() {
  const { currentUser, profile } = useAuth();
  const [deliveryProfile, setDeliveryProfile] = useState<DeliveryPersonProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    Promise.all([getDeliveryPersonProfile(currentUser.uid), getDeliveryOrders(currentUser.uid)]).then(
      ([nextProfile, nextOrders]) => {
        setDeliveryProfile(nextProfile);
        setOrders(nextOrders);
      },
    );
  }, [currentUser]);

  async function toggleAvailability() {
    if (!currentUser || !deliveryProfile) return;
    const nextValue = !deliveryProfile.isAvailable;
    await updateDeliveryPersonProfile(currentUser.uid, { isAvailable: nextValue });
    setDeliveryProfile({ ...deliveryProfile, isAvailable: nextValue });
  }

  const activeOrders = orders.filter((order) => ["delivery_assigned", "food_ready", "picked_up", "on_the_way"].includes(order.status));
  const delivered = orders.filter((order) => order.status === "delivered");
  const earnings = delivered.reduce((total, order) => total + order.deliveryFee + order.deliveryTip, 0);

  return (
    <section>
      <PageHeader
        eyebrow="Delivery dashboard"
        title={`Local logistics${profile?.fullName ? `, ${profile.fullName.split(" ")[0]}` : ""}`}
        description="Manage availability, delivery requests, active pickups, drop-offs, documents, and earnings."
        action={
          <Button leftIcon={deliveryProfile?.isAvailable ? <ToggleRight size={18} /> : <ToggleLeft size={18} />} onClick={toggleAvailability}>
            {deliveryProfile?.isAvailable ? "Available" : "Unavailable"}
          </Button>
        }
      />

      {deliveryProfile && deliveryProfile.missedRequestCount > 0 ? (
        <Card className="mt-6 border-clay/40 bg-clay-soft">
          <div className="flex gap-3">
            <TriangleAlert className="shrink-0 text-clay" />
            <div>
              <h2 className="font-bold text-ink">Missed request warning</h2>
              <p className="mt-1 text-sm text-muted">
                {deliveryProfile.missedRequestCount >= 3
                  ? "Third missed request: account should be reviewed for suspension."
                  : deliveryProfile.missedRequestCount === 2
                    ? "Second missed request: lower priority warning."
                    : "First missed request: stay responsive while available."}
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <DashboardStatCard label="Active" value={String(activeOrders.length)} helper="Pickup/drop-off" icon={<Truck />} />
        <DashboardStatCard label="Completed" value={String(delivered.length)} helper="Delivered orders" icon={<Package />} />
        <DashboardStatCard label="Earnings" value={`$${earnings.toFixed(2)}`} helper="Fees + tips" icon={<DollarSign />} />
        <DashboardStatCard label="Verification" value={deliveryProfile?.verificationStatus ?? "pending"} helper="Document status" icon={<TriangleAlert />} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/delivery/requests"><Button>View requests</Button></Link>
        <Link to="/delivery/deliveries"><Button variant="secondary">Active deliveries</Button></Link>
        <Link to="/delivery/documents"><Button variant="ghost">Upload documents</Button></Link>
      </div>
    </section>
  );
}
