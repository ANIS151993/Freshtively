import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../../components/cards/Card";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { PageHeader } from "../../components/common/PageHeader";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import { useAuth } from "../../contexts/AuthContext";
import { getConsumerOrders } from "../../services/orderService";
import type { Order } from "../../types/firestore";

export default function OrdersPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getConsumerOrders(currentUser.uid)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <section>
      <PageHeader eyebrow="Orders" title="Order history" description="Track active and completed orders from Firestore." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading orders" /><div className="mt-5"><LoadingSkeleton rows={3} /></div></div> : null}
      {!loading && orders.length === 0 ? (
        <div className="mt-8"><EmptyState title="No orders yet" description="Place an order from your cart to see it here." /></div>
      ) : null}
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <Link key={order.orderId} to={`/consumer/orders/${order.orderId}`}>
            <Card className="transition hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-ink">{order.cookerName}</h2>
                  <p className="mt-1 text-sm text-muted">{order.items.map((item) => `${item.quantity} x ${item.name}`).join(", ")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={order.status} />
                  <span className="font-extrabold text-clay">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
