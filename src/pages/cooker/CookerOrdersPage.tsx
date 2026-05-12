import { CheckCircle2, Clock, PackageCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { PageHeader } from "../../components/common/PageHeader";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { useAuth } from "../../contexts/AuthContext";
import { createNotification, getCookerOrders, updateOrderStatus } from "../../services/firestoreService";
import type { Order, OrderStatus } from "../../types/firestore";

export default function CookerOrdersPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getCookerOrders(currentUser.uid).then(setOrders).finally(() => setLoading(false));
  }, [currentUser]);

  async function moveOrder(order: Order, status: OrderStatus) {
    await updateOrderStatus(order.orderId, status);
    await createNotification({
      userId: order.consumerId,
      title: status === "food_ready" ? "Food is ready" : "Order updated",
      message: `Your order with ${order.cookerName} is now ${status.replace(/_/g, " ")}.`,
      type: "order",
      isRead: false,
      relatedOrderId: order.orderId,
    });
    setOrders((current) => current.map((item) => item.orderId === order.orderId ? { ...item, status } : item));
  }

  return (
    <section>
      <PageHeader eyebrow="Orders" title="Cooker orders" description="Accept, reject, prepare, and mark food ready for delivery handoff." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading orders" /></div> : null}
      {!loading && orders.length === 0 ? <div className="mt-8"><EmptyState title="No orders yet" description="Incoming consumer requests will appear here." /></div> : null}
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <Card key={order.orderId}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-ink">{order.consumerName}</h2>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-2 text-sm text-muted">{order.items.map((item) => `${item.quantity} x ${item.name}`).join(", ")}</p>
                <p className="mt-2 text-sm font-bold text-clay">${order.total.toFixed(2)} · {order.deliveryAddress}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" leftIcon={<CheckCircle2 size={16} />} onClick={() => void moveOrder(order, "cooker_accepted")}>Accept</Button>
                <Button variant="ghost" leftIcon={<Clock size={16} />} onClick={() => void moveOrder(order, "preparing")}>Preparing</Button>
                <Button leftIcon={<PackageCheck size={16} />} onClick={() => void moveOrder(order, "food_ready")}>Food ready</Button>
                <Button variant="danger" leftIcon={<XCircle size={16} />} onClick={() => void moveOrder(order, "cooker_rejected")}>Reject</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
