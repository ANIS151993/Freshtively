import { CheckCircle2, MapPin, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { PageHeader } from "../../components/common/PageHeader";
import { useAuth } from "../../contexts/AuthContext";
import { acceptDeliveryRequest, createNotification, getOpenDeliveryRequests } from "../../services/firestoreService";
import type { Order } from "../../types/firestore";

export default function DeliveryRequestsPage() {
  const { currentUser, profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpenDeliveryRequests().then(setOrders).finally(() => setLoading(false));
  }, []);

  async function accept(order: Order) {
    if (!currentUser) return;
    await acceptDeliveryRequest(order, currentUser.uid, profile?.fullName ?? "Delivery partner");
    await Promise.all([
      createNotification({
        userId: order.consumerId,
        title: "Delivery accepted",
        message: `${profile?.fullName ?? "A delivery partner"} accepted your delivery.`,
        type: "order",
        isRead: false,
        relatedOrderId: order.orderId,
      }),
      createNotification({
        userId: order.cookerId,
        title: "Delivery accepted",
        message: `${profile?.fullName ?? "A delivery partner"} accepted pickup for this order.`,
        type: "order",
        isRead: false,
        relatedOrderId: order.orderId,
      }),
    ]);
    setOrders((current) => current.filter((item) => item.orderId !== order.orderId));
  }

  return (
    <section>
      <PageHeader eyebrow="Requests" title="Delivery requests" description="Accept nearby delivery requests with pickup and delivery context." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading requests" /><div className="mt-5"><LoadingSkeleton rows={3} /></div></div> : null}
      {!loading && orders.length === 0 ? <div className="mt-8"><EmptyState title="No open requests" description="New delivery_searching or food_ready orders will appear here." icon={<Truck />} /></div> : null}
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <Card key={order.orderId}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-ink">{order.cookerName}</h2>
                <p className="mt-2 text-sm text-muted">{order.items.map((item) => `${item.quantity} x ${item.name}`).join(", ")}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted"><MapPin size={16} /> Pickup: {order.pickupAddress}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted"><MapPin size={16} /> Drop-off: {order.deliveryAddress}</p>
                <p className="mt-3 text-sm font-bold text-clay">${(order.deliveryFee + order.deliveryTip).toFixed(2)} estimated delivery pay</p>
              </div>
              <Button leftIcon={<CheckCircle2 size={16} />} onClick={() => void accept(order)}>Accept delivery</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
