import { CheckCircle2, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { PageHeader } from "../../components/common/PageHeader";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { getOrderById } from "../../services/orderService";
import type { Order, OrderStatus } from "../../types/firestore";

const timeline: Array<{ status: OrderStatus; label: string }> = [
  { status: "placed", label: "Order placed" },
  { status: "cooker_accepted", label: "Cooker accepted" },
  { status: "preparing", label: "Preparing" },
  { status: "delivery_assigned", label: "Delivery assigned" },
  { status: "food_ready", label: "Food ready" },
  { status: "picked_up", label: "Picked up" },
  { status: "on_the_way", label: "On the way" },
  { status: "delivered", label: "Delivered" },
];

export default function OrderTrackingPage() {
  const { orderId = "" } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(orderId)
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return <LoadingSpinner label="Loading order" />;
  if (!order) return <Card>Order not found.</Card>;

  const activeIndex = Math.max(0, timeline.findIndex((step) => step.status === order.status));

  return (
    <section>
      <PageHeader eyebrow="Live tracking" title={`Order ${order.orderId}`} description="Follow your meal from kitchen to delivery." action={<StatusBadge status={order.status} />} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <h2 className="text-xl font-bold text-ink">Timeline</h2>
          <div className="mt-6 space-y-5">
            {timeline.map((step, index) => {
              const complete = index <= activeIndex;
              return (
                <div key={step.status} className="flex items-center gap-3">
                  {complete ? <CheckCircle2 className="text-emerald" /> : <Circle className="text-muted" />}
                  <span className={complete ? "font-bold text-ink" : "font-semibold text-muted"}>{step.label}</span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-ink">Order details</h2>
          <p className="mt-3 text-sm text-muted">Cooker: {order.cookerName}</p>
          <p className="mt-2 text-sm text-muted">Delivery: {order.deliveryPersonName || "Searching"}</p>
          <p className="mt-2 text-sm text-muted">Ready time: {order.estimatedReadyTime}</p>
          <p className="mt-5 text-2xl font-extrabold text-clay">${order.total.toFixed(2)}</p>
        </Card>
      </div>
    </section>
  );
}
