import { CheckCircle2, PackageCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { PageHeader } from "../../components/common/PageHeader";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { useAuth } from "../../contexts/AuthContext";
import { createNotification, getDeliveryOrders, updateOrderStatus } from "../../services/firestoreService";
import type { Order, OrderStatus } from "../../types/firestore";

export default function ActiveDeliveriesPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getDeliveryOrders(currentUser.uid).then(setOrders).finally(() => setLoading(false));
  }, [currentUser]);

  async function moveOrder(order: Order, status: OrderStatus) {
    await updateOrderStatus(order.orderId, status);
    await Promise.all([
      createNotification({
        userId: order.consumerId,
        title: "Delivery update",
        message: `Your order is now ${status.replace(/_/g, " ")}.`,
        type: "order",
        isRead: false,
        relatedOrderId: order.orderId,
      }),
      createNotification({
        userId: order.cookerId,
        title: "Delivery update",
        message: `Delivery status changed to ${status.replace(/_/g, " ")}.`,
        type: "order",
        isRead: false,
        relatedOrderId: order.orderId,
      }),
    ]);
    setOrders((current) => current.map((item) => item.orderId === order.orderId ? { ...item, status } : item));
  }

  return (
    <section>
      <PageHeader eyebrow="Deliveries" title="Active pickup and drop-off" description="Confirm pickup, mark on the way, and complete delivery." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading deliveries" /></div> : null}
      {!loading && orders.length === 0 ? <div className="mt-8"><EmptyState title="No assigned deliveries" description="Accepted delivery requests appear here." icon={<Truck />} /></div> : null}
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <Card key={order.orderId}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-ink">{order.cookerName}</h2>
                  <StatusBadge status={order.status} />
                </div>
                <p className="mt-2 text-sm text-muted">Pickup: {order.pickupAddress}</p>
                <p className="mt-2 text-sm text-muted">Drop-off: {order.deliveryAddress}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" leftIcon={<PackageCheck size={16} />} onClick={() => void moveOrder(order, "picked_up")}>Confirm pickup</Button>
                <Button leftIcon={<Truck size={16} />} onClick={() => void moveOrder(order, "on_the_way")}>On the way</Button>
                <Button variant="secondary" leftIcon={<CheckCircle2 size={16} />} onClick={() => void moveOrder(order, "delivered")}>Delivered</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
