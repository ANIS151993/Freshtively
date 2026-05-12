import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  DollarSign,
  FileCheck,
  Settings,
  ShieldCheck,
  Ticket,
  Users,
  Utensils,
} from "lucide-react";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { PageHeader } from "../../components/common/PageHeader";
import { DashboardStatCard } from "../../components/dashboard/DashboardStatCard";
import { StatusBadge } from "../../components/dashboard/StatusBadge";
import {
  deleteDish,
  getAllConsumers,
  getAllCookers,
  getAllDeliveryPersons,
  getAllDishes,
  getAllOrders,
  getAllPayments,
  getAllReviews,
  getAllSupportTickets,
  getAllUsers,
  getPlatformFees,
  updateCookerProfile,
  updateDeliveryPersonProfile,
  updateDish,
  updateOrderStatus,
  updateSupportTicket,
  updateUserProfile,
  upsertPlatformFees,
} from "../../services/firestoreService";
import type {
  BaseProfile,
  CookerProfile,
  DeliveryPersonProfile,
  Dish,
  Order,
  PaymentRecord,
  PlatformFees,
  Review,
  SupportTicket,
} from "../../types/firestore";

export function AdminDashboardPage() {
  const [users, setUsers] = useState<BaseProfile[]>([]);
  const [cookers, setCookers] = useState<CookerProfile[]>([]);
  const [deliveryPersons, setDeliveryPersons] = useState<DeliveryPersonProfile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllCookers(), getAllDeliveryPersons(), getAllOrders(), getAllPayments(), getAllSupportTickets()]).then(
      ([nextUsers, nextCookers, nextDelivery, nextOrders, nextPayments, nextTickets]) => {
        setUsers(nextUsers);
        setCookers(nextCookers);
        setDeliveryPersons(nextDelivery);
        setOrders(nextOrders);
        setPayments(nextPayments);
        setTickets(nextTickets);
      },
    );
  }, []);

  const consumers = users.filter((user) => user.role === "consumer").length;
  const activeOrders = orders.filter((order) => !["delivered", "cancelled", "refunded"].includes(order.status)).length;
  const completedOrders = orders.filter((order) => order.status === "delivered").length;
  const cancelledOrders = orders.filter((order) => order.status === "cancelled").length;
  const revenue = payments.reduce((total, payment) => total + payment.total, 0);
  const platformProfit = payments.reduce((total, payment) => total + payment.platformFee, 0);
  const pendingVerifications =
    cookers.filter((item) => item.verificationStatus === "pending").length +
    deliveryPersons.filter((item) => item.verificationStatus === "pending").length;

  return (
    <section>
      <PageHeader
        eyebrow="Admin dashboard"
        title="Developer control center"
        description="Monitor users, orders, dishes, payments, verification, safety, support, analytics, and system health."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3 xl:grid-cols-4">
        <DashboardStatCard label="Total users" value={String(users.length)} icon={<Users />} />
        <DashboardStatCard label="Consumers" value={String(consumers)} icon={<Users />} />
        <DashboardStatCard label="Cookers" value={String(cookers.length)} icon={<Utensils />} />
        <DashboardStatCard label="Delivery persons" value={String(deliveryPersons.length)} icon={<Activity />} />
        <DashboardStatCard label="Active orders" value={String(activeOrders)} icon={<Activity />} />
        <DashboardStatCard label="Completed" value={String(completedOrders)} icon={<CheckCircle2 />} />
        <DashboardStatCard label="Cancelled" value={String(cancelledOrders)} icon={<AlertTriangle />} />
        <DashboardStatCard label="Revenue" value={`$${revenue.toFixed(2)}`} icon={<DollarSign />} />
        <DashboardStatCard label="Platform profit" value={`$${platformProfit.toFixed(2)}`} icon={<DollarSign />} />
        <DashboardStatCard label="Pending verifications" value={String(pendingVerifications)} icon={<FileCheck />} />
        <DashboardStatCard label="Safety reports" value={String(tickets.filter((ticket) => ticket.category.toLowerCase().includes("safety")).length)} icon={<ShieldCheck />} />
        <DashboardStatCard label="Open tickets" value={String(tickets.filter((ticket) => ticket.status === "open").length)} icon={<Ticket />} />
      </div>
    </section>
  );
}

export function AdminUsersPage({ role }: { role?: BaseProfile["role"] }) {
  const [users, setUsers] = useState<BaseProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  const filtered = role ? users.filter((user) => user.role === role) : users;

  async function setStatus(user: BaseProfile, status: BaseProfile["status"]) {
    await updateUserProfile(user.uid, { status });
    setUsers((current) => current.map((item) => item.uid === user.uid ? { ...item, status } : item));
  }

  return (
    <section>
      <PageHeader eyebrow="Users" title={role ? `${role} management` : "User management"} description="Approve, reject, suspend, reactivate, and inspect users." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading users" /><div className="mt-5"><LoadingSkeleton rows={4} /></div></div> : null}
      <AdminTable>
        {filtered.map((user) => (
          <div key={user.uid} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 md:grid-cols-[1fr_120px_120px_260px] md:items-center">
            <div><p className="font-bold text-ink">{user.fullName}</p><p className="text-sm text-muted">{user.email}</p></div>
            <span className="text-sm font-semibold text-muted">{user.role}</span>
            <StatusBadge status={user.status} />
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => void setStatus(user, "approved")}>Approve</Button>
              <Button variant="ghost" onClick={() => void setStatus(user, "suspended")}>Suspend</Button>
              <Button variant="danger" onClick={() => void setStatus(user, "rejected")}>Reject</Button>
            </div>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminVerificationPage({ type }: { type: "cooker" | "delivery" }) {
  const [items, setItems] = useState<Array<CookerProfile | DeliveryPersonProfile>>([]);

  useEffect(() => {
    (type === "cooker" ? getAllCookers() : getAllDeliveryPersons()).then(setItems);
  }, [type]);

  async function updateVerification(item: CookerProfile | DeliveryPersonProfile, verificationStatus: "approved" | "rejected") {
    if (type === "cooker") await updateCookerProfile(item.uid, { verificationStatus });
    else await updateDeliveryPersonProfile(item.uid, { verificationStatus });
    setItems((current) => current.map((entry) => entry.uid === item.uid ? { ...entry, verificationStatus } : entry));
  }

  return (
    <section>
      <PageHeader eyebrow="Verification" title={`${type === "cooker" ? "Cooker" : "Delivery"} verification review`} description="Review verification status and approve or reject accounts." />
      <AdminTable>
        {items.map((item) => (
          <div key={item.uid} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 md:grid-cols-[1fr_160px_220px] md:items-center">
            <div><p className="font-bold text-ink">{item.uid}</p><p className="text-sm text-muted">{item.zipCode} · {item.bankStatus}</p></div>
            <StatusBadge status={item.verificationStatus} />
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => void updateVerification(item, "approved")}>Approve</Button>
              <Button variant="danger" onClick={() => void updateVerification(item, "rejected")}>Reject</Button>
            </div>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => { getAllOrders().then(setOrders); }, []);

  async function setOrderStatus(order: Order, status: Order["status"]) {
    await updateOrderStatus(order.orderId, status);
    setOrders((current) => current.map((item) => item.orderId === order.orderId ? { ...item, status } : item));
  }

  return (
    <section>
      <PageHeader eyebrow="Orders" title="Order management" description="View all orders and update status when operational intervention is needed." />
      <AdminTable>
        {orders.map((order) => (
          <div key={order.orderId} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 lg:grid-cols-[1fr_160px_120px_260px] lg:items-center">
            <div><p className="font-bold text-ink">{order.orderId}</p><p className="text-sm text-muted">{order.consumerName} → {order.cookerName}</p></div>
            <StatusBadge status={order.status} />
            <p className="font-bold text-clay">${order.total.toFixed(2)}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => void setOrderStatus(order, "cancelled")}>Cancel</Button>
              <Button variant="secondary" onClick={() => void setOrderStatus(order, "delivered")}>Delivered</Button>
            </div>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminDishesPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => { getAllDishes().then(setDishes); }, []);

  async function hideDish(dish: Dish) {
    await updateDish(dish.dishId, { isAvailable: false });
    setDishes((current) => current.map((item) => item.dishId === dish.dishId ? { ...item, isAvailable: false } : item));
  }

  async function removeDish(dish: Dish) {
    await deleteDish(dish.dishId);
    setDishes((current) => current.filter((item) => item.dishId !== dish.dishId));
  }

  return (
    <section>
      <PageHeader eyebrow="Menu" title="Food and menu management" description="Moderate unsafe dishes and inspect menu availability." />
      <AdminTable>
        {dishes.map((dish) => (
          <div key={dish.dishId} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 lg:grid-cols-[1fr_120px_120px_220px] lg:items-center">
            <div><p className="font-bold text-ink">{dish.name}</p><p className="text-sm text-muted">{dish.cookerName} · {dish.cuisine}</p></div>
            <p className="font-bold text-clay">${dish.price.toFixed(2)}</p>
            <StatusBadge status={dish.isAvailable ? "active" : "unavailable"} />
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => void hideDish(dish)}>Hide</Button>
              <Button variant="danger" onClick={() => void removeDish(dish)}>Remove</Button>
            </div>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  useEffect(() => { getAllPayments().then(setPayments); }, []);
  const total = payments.reduce((sum, payment) => sum + payment.total, 0);
  const profit = payments.reduce((sum, payment) => sum + payment.platformFee, 0);

  return (
    <section>
      <PageHeader eyebrow="Payments" title="Payment management" description="Review payment records, platform fee, payout allocation, refunds, and disputes." />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <DashboardStatCard label="Gross volume" value={`$${total.toFixed(2)}`} icon={<DollarSign />} />
        <DashboardStatCard label="Platform fee" value={`$${profit.toFixed(2)}`} icon={<DollarSign />} />
        <DashboardStatCard label="Records" value={String(payments.length)} icon={<FileCheck />} />
      </div>
      <AdminTable className="mt-8">
        {payments.map((payment) => (
          <div key={payment.paymentId} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 md:grid-cols-[1fr_140px_140px] md:items-center">
            <div><p className="font-bold text-ink">{payment.paymentId}</p><p className="text-sm text-muted">{payment.orderId}</p></div>
            <StatusBadge status={payment.status} />
            <p className="font-bold text-clay">${payment.total.toFixed(2)}</p>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  useEffect(() => { getAllSupportTickets().then(setTickets); }, []);

  async function setTicketStatus(ticket: SupportTicket, status: SupportTicket["status"]) {
    await updateSupportTicket(ticket.ticketId, { status });
    setTickets((current) => current.map((item) => item.ticketId === ticket.ticketId ? { ...item, status } : item));
  }

  return (
    <section>
      <PageHeader eyebrow="Support" title="Support tickets" description="View and update ticket status." />
      <AdminTable>
        {tickets.map((ticket) => (
          <div key={ticket.ticketId} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 lg:grid-cols-[1fr_120px_260px] lg:items-center">
            <div><p className="font-bold text-ink">{ticket.subject}</p><p className="text-sm text-muted">{ticket.category} · {ticket.userRole}</p></div>
            <StatusBadge status={ticket.status} />
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => void setTicketStatus(ticket, "in_progress")}>In progress</Button>
              <Button variant="secondary" onClick={() => void setTicketStatus(ticket, "resolved")}>Resolve</Button>
            </div>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => { getAllReviews().then(setReviews); }, []);
  return (
    <section>
      <PageHeader eyebrow="Reviews" title="Review moderation" description="Inspect cooker and delivery reviews." />
      <AdminTable>
        {reviews.map((review) => (
          <div key={review.reviewId} className="border-b border-[#bbcabf]/60 p-4">
            <p className="font-bold text-ink">{review.reviewId}</p>
            <p className="mt-2 text-sm text-muted">Cooker {review.cookerRating}/5: {review.cookerReview}</p>
            <p className="mt-1 text-sm text-muted">Delivery {review.deliveryRating}/5: {review.deliveryReview}</p>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminSettingsPage() {
  const [fees, setFees] = useState<PlatformFees | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => { getPlatformFees().then(setFees); }, []);

  async function save() {
    if (!fees) return;
    await upsertPlatformFees(fees);
    setSaved(true);
  }

  return (
    <section>
      <PageHeader eyebrow="Settings" title="Platform settings" description="Manage platform fee defaults." />
      <Card className="mt-8 max-w-2xl space-y-4">
        <Settings className="text-emerald" />
        {fees ? (
          <>
            {(["serviceFeeRate", "defaultDeliveryFee", "taxRate", "cookerCommissionRate", "deliveryBaseFee"] as const).map((field) => (
              <label key={field} className="block text-sm font-semibold text-ink">
                {field}
                <input
                  className="mt-2 min-h-12 w-full rounded-2xl border border-[#bbcabf] bg-white px-4"
                  type="number"
                  step="0.01"
                  value={fees[field]}
                  onChange={(event) => setFees({ ...fees, [field]: Number(event.target.value) })}
                />
              </label>
            ))}
            <Button onClick={() => void save()}>Save settings</Button>
            {saved ? <p className="text-sm font-bold text-emerald">Settings saved.</p> : null}
          </>
        ) : <LoadingSpinner label="Loading settings" />}
      </Card>
    </section>
  );
}

export function AdminStaticPage({ title, description, icon = <BarChart3 /> }: { title: string; description: string; icon?: ReactNode }) {
  return (
    <section>
      <PageHeader eyebrow="Admin" title={title} description={description} />
      <Card className="mt-8">
        <span className="text-emerald">{icon}</span>
        <p className="mt-4 text-sm leading-6 text-muted">This admin route is reserved with production navigation and permissions. Deeper workflows can now be built into this screen without changing routes.</p>
      </Card>
    </section>
  );
}

function AdminTable({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Card className={`mt-8 overflow-hidden p-0 ${className}`}>
      {children || <EmptyState title="No records" description="No matching records were returned from Firestore." />}
    </Card>
  );
}
