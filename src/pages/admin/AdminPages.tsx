import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  BadgePercent,
  Banknote,
  DollarSign,
  FileCheck,
  LockKeyhole,
  Megaphone,
  MonitorCog,
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
import { Input } from "../../components/forms/Input";
import { Select } from "../../components/forms/Select";
import { Textarea } from "../../components/forms/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import {
  createAccountControlAction,
  createPromotion,
  deleteDish,
  getAllConsumers,
  getAllCookers,
  getAllDeliveryPersons,
  getAllDishes,
  getAllOrders,
  getAllPayments,
  getAllPromotions,
  getAllReviews,
  getAllSupportTickets,
  getAllUsers,
  getPlatformFees,
  updatePaymentRecord,
  updateCookerProfile,
  updateDeliveryPersonProfile,
  updateDish,
  updateOrderStatus,
  updatePromotion,
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
  Promotion,
  PromotionAudience,
  PromotionDiscountType,
  PromotionStatus,
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
      <div className="mt-8 grid gap-5 lg:grid-cols-4">
        {[
          ["Developer console", "/admin/developer", <MonitorCog />],
          ["Account control", "/admin/account-control", <LockKeyhole />],
          ["Money control", "/admin/money-control", <Banknote />],
          ["Promotions", "/admin/promotions", <Megaphone />],
        ].map(([label, to, icon]) => (
          <Card key={to as string} className="transition duration-200 hover:-translate-y-1 hover:shadow-lift">
            <span className="text-emerald">{icon as ReactNode}</span>
            <h2 className="mt-4 text-xl font-bold text-ink">{label as string}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Developer-level controls for operating the marketplace.</p>
            <a className="mt-5 inline-flex" href={to as string}>
              <Button variant="secondary">Open</Button>
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function AdminDeveloperControlPage() {
  const [users, setUsers] = useState<BaseProfile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [fees, setFees] = useState<PlatformFees | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllOrders(), getAllPayments(), getAllSupportTickets(), getPlatformFees(), getAllPromotions()]).then(
      ([nextUsers, nextOrders, nextPayments, nextTickets, nextFees, nextPromotions]) => {
        setUsers(nextUsers);
        setOrders(nextOrders);
        setPayments(nextPayments);
        setTickets(nextTickets);
        setFees(nextFees);
        setPromotions(nextPromotions);
      },
    );
  }, []);

  const gross = payments.reduce((sum, payment) => sum + payment.total, 0);
  const platform = payments.reduce((sum, payment) => sum + payment.platformFee, 0);
  const activePromotions = promotions.filter((promotion) => promotion.status === "active").length;
  const blockedUsers = users.filter((user) => ["suspended", "rejected"].includes(user.status)).length;

  return (
    <section>
      <PageHeader
        eyebrow="Developer console"
        title="Full system control"
        description="Monitor marketplace health, control accounts, manage commissions, review money flow, and publish promotions from one operator surface."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard label="Users under control" value={String(users.length)} helper={`${blockedUsers} blocked or rejected`} icon={<Users />} />
        <DashboardStatCard label="Order volume" value={String(orders.length)} helper="All marketplace orders" icon={<Activity />} />
        <DashboardStatCard label="Gross money" value={`$${gross.toFixed(2)}`} helper={`Platform: $${platform.toFixed(2)}`} icon={<DollarSign />} />
        <DashboardStatCard label="Active promotions" value={String(activePromotions)} helper={`${promotions.length} total campaigns`} icon={<BadgePercent />} />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <ControlCard title="Account control" to="/admin/account-control" icon={<LockKeyhole />} text="Approve, suspend, reject, restore, and document user account actions." />
        <ControlCard title="Money and commission control" to="/admin/money-control" icon={<Banknote />} text="Adjust commission settings, review payouts, and update payment record status." />
        <ControlCard title="Promotion control" to="/admin/promotions" icon={<Megaphone />} text="Create promotions for all users or a specific customer, cooker, or delivery audience." />
        <ControlCard title="System settings" to="/admin/settings" icon={<Settings />} text={`Current service fee: ${fees ? `${(fees.serviceFeeRate * 100).toFixed(1)}%` : "loading"}.`} />
      </div>

      <Card className="mt-8">
        <h2 className="text-xl font-bold text-ink">Operational warnings</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <WarningTile label="Open support" value={tickets.filter((ticket) => ticket.status === "open").length} />
          <WarningTile label="Cancelled orders" value={orders.filter((order) => order.status === "cancelled").length} />
          <WarningTile label="Failed payments" value={payments.filter((payment) => payment.status === "failed").length} />
        </div>
      </Card>
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

export function AdminAccountControlPage() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<BaseProfile[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllUsers().then((nextUsers) => {
      setUsers(nextUsers);
      setSelectedUserId(nextUsers[0]?.uid ?? "");
    });
  }, []);

  const selectedUser = users.find((user) => user.uid === selectedUserId);

  async function controlUser(status: BaseProfile["status"], actionType: "approve" | "suspend" | "reject" | "restore") {
    if (!selectedUser) return;
    await updateUserProfile(selectedUser.uid, { status });
    await createAccountControlAction({
      targetUserId: selectedUser.uid,
      targetEmail: selectedUser.email,
      actionType,
      amount: 0,
      note: note || `${actionType} account`,
      createdBy: profile?.email ?? "developer",
    });
    setUsers((current) => current.map((user) => user.uid === selectedUser.uid ? { ...user, status } : user));
    setMessage(`${selectedUser.email} updated to ${status}.`);
  }

  return (
    <section>
      <PageHeader eyebrow="Account control" title="User account command center" description="Control customer, cooker, and delivery accounts with an audit record for every action." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="space-y-4">
          <Select
            label="Select user"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
            options={users.map((user) => ({ label: `${user.fullName} · ${user.email} · ${user.role}`, value: user.uid }))}
          />
          {selectedUser ? (
            <div className="rounded-2xl bg-cream p-4">
              <p className="font-bold text-ink">{selectedUser.fullName}</p>
              <p className="mt-1 text-sm text-muted">{selectedUser.email}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge status={selectedUser.role} />
                <StatusBadge status={selectedUser.status} />
              </div>
            </div>
          ) : null}
          <Textarea label="Developer note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Reason for account action" />
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="secondary" onClick={() => void controlUser("approved", "approve")}>Approve</Button>
            <Button variant="ghost" onClick={() => void controlUser("approved", "restore")}>Restore</Button>
            <Button variant="ghost" onClick={() => void controlUser("suspended", "suspend")}>Suspend</Button>
            <Button variant="danger" onClick={() => void controlUser("rejected", "reject")}>Reject</Button>
          </div>
          {message ? <p className="rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-bold text-emerald">{message}</p> : null}
        </Card>

        <AdminTable className="mt-0">
          {users.map((user) => (
            <div key={user.uid} className="grid gap-3 border-b border-[#bbcabf]/60 p-4 md:grid-cols-[1fr_120px_120px] md:items-center">
              <div>
                <p className="font-bold text-ink">{user.fullName}</p>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
              <StatusBadge status={user.role} />
              <StatusBadge status={user.status} />
            </div>
          ))}
        </AdminTable>
      </div>
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

export function AdminMoneyControlPage() {
  const { profile } = useAuth();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [fees, setFees] = useState<PlatformFees | null>(null);
  const [manualAmount, setManualAmount] = useState(0);
  const [manualUserId, setManualUserId] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualNote, setManualNote] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    Promise.all([getAllPayments(), getPlatformFees()]).then(([nextPayments, nextFees]) => {
      setPayments(nextPayments);
      setFees(nextFees);
    });
  }, []);

  async function saveFees() {
    if (!fees) return;
    await upsertPlatformFees(fees);
    setSaved("Commission and fee settings saved.");
  }

  async function setPaymentStatus(payment: PaymentRecord, status: PaymentRecord["status"]) {
    await updatePaymentRecord(payment.paymentId, { status });
    setPayments((current) => current.map((item) => item.paymentId === payment.paymentId ? { ...item, status } : item));
  }

  async function saveManualAdjustment() {
    if (!manualUserId || !manualNote) {
      setSaved("Add target user ID and note before saving an adjustment.");
      return;
    }
    await createAccountControlAction({
      targetUserId: manualUserId,
      targetEmail: manualEmail,
      actionType: "manual_adjustment",
      amount: manualAmount,
      note: manualNote,
      createdBy: profile?.email ?? "developer",
    });
    setSaved("Manual money control note recorded.");
    setManualAmount(0);
    setManualNote("");
  }

  const gross = payments.reduce((sum, payment) => sum + payment.total, 0);
  const cookerPayout = payments.reduce((sum, payment) => sum + payment.cookerPayout, 0);
  const deliveryPayout = payments.reduce((sum, payment) => sum + payment.deliveryPayout, 0);
  const platformFee = payments.reduce((sum, payment) => sum + payment.platformFee, 0);

  return (
    <section>
      <PageHeader eyebrow="Money control" title="Commission, payout, and payment control" description="Control marketplace fee rules and review money movement across customers, cookers, and delivery partners." />
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        <DashboardStatCard label="Gross volume" value={`$${gross.toFixed(2)}`} icon={<DollarSign />} />
        <DashboardStatCard label="Cooker payout" value={`$${cookerPayout.toFixed(2)}`} icon={<Utensils />} />
        <DashboardStatCard label="Delivery payout" value={`$${deliveryPayout.toFixed(2)}`} icon={<Activity />} />
        <DashboardStatCard label="Platform fee" value={`$${platformFee.toFixed(2)}`} icon={<Banknote />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <Settings className="text-emerald" />
          <h2 className="text-xl font-bold text-ink">Commission settings</h2>
          {fees ? (
            <>
              {(["serviceFeeRate", "defaultDeliveryFee", "taxRate", "cookerCommissionRate", "deliveryBaseFee"] as const).map((field) => (
                <Input
                  key={field}
                  label={field}
                  type="number"
                  step="0.01"
                  value={fees[field]}
                  onChange={(event) => setFees({ ...fees, [field]: Number(event.target.value) })}
                />
              ))}
              <Button onClick={() => void saveFees()}>Save commission settings</Button>
            </>
          ) : <LoadingSpinner label="Loading fees" />}
        </Card>

        <Card className="space-y-4">
          <Banknote className="text-emerald" />
          <h2 className="text-xl font-bold text-ink">Manual money control note</h2>
          <Input label="Target user ID" value={manualUserId} onChange={(event) => setManualUserId(event.target.value)} />
          <Input label="Target email" value={manualEmail} onChange={(event) => setManualEmail(event.target.value)} />
          <Input label="Amount" type="number" step="0.01" value={manualAmount} onChange={(event) => setManualAmount(Number(event.target.value))} />
          <Textarea label="Reason" value={manualNote} onChange={(event) => setManualNote(event.target.value)} />
          <Button variant="secondary" onClick={() => void saveManualAdjustment()}>Record adjustment</Button>
          <p className="text-sm leading-6 text-muted">This records operator intent. Live bank movement still requires a payment processor integration.</p>
        </Card>
      </div>

      {saved ? <p className="mt-5 rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-bold text-emerald">{saved}</p> : null}

      <AdminTable>
        {payments.map((payment) => (
          <div key={payment.paymentId} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 xl:grid-cols-[1fr_110px_110px_260px] xl:items-center">
            <div>
              <p className="font-bold text-ink">{payment.paymentId}</p>
              <p className="text-sm text-muted">Order {payment.orderId} · Platform ${payment.platformFee.toFixed(2)}</p>
            </div>
            <StatusBadge status={payment.status} />
            <p className="font-bold text-clay">${payment.total.toFixed(2)}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => void setPaymentStatus(payment, "paid")}>Paid</Button>
              <Button variant="ghost" onClick={() => void setPaymentStatus(payment, "refunded")}>Refund</Button>
              <Button variant="danger" onClick={() => void setPaymentStatus(payment, "failed")}>Fail</Button>
            </div>
          </div>
        ))}
      </AdminTable>
    </section>
  );
}

export function AdminPromotionsPage() {
  const { profile } = useAuth();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    audience: "all" as PromotionAudience,
    discountType: "percent" as PromotionDiscountType,
    discountValue: 10,
    maxRedemptions: 100,
    startsAt: "",
    endsAt: "",
    status: "draft" as PromotionStatus,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    getAllPromotions().then(setPromotions);
  }, []);

  async function savePromotion() {
    if (!form.title || !form.code) {
      setMessage("Promotion title and code are required.");
      return;
    }
    const promotionId = await createPromotion({
      ...form,
      code: form.code.trim().toUpperCase(),
      redemptionCount: 0,
      createdBy: profile?.email ?? "developer",
    });
    const nextPromotion: Promotion = {
      ...form,
      promotionId,
      code: form.code.trim().toUpperCase(),
      redemptionCount: 0,
      createdBy: profile?.email ?? "developer",
    };
    setPromotions((current) => [nextPromotion, ...current]);
    setForm({ ...form, title: "", code: "", description: "" });
    setMessage("Promotion created.");
  }

  async function setPromotionStatus(promotion: Promotion, status: PromotionStatus) {
    await updatePromotion(promotion.promotionId, { status });
    setPromotions((current) => current.map((item) => item.promotionId === promotion.promotionId ? { ...item, status } : item));
  }

  return (
    <section>
      <PageHeader eyebrow="Promotions" title="Promotion and campaign control" description="Create and control promotions for all users or a specific marketplace role." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card className="space-y-4">
          <Megaphone className="text-emerald" />
          <h2 className="text-xl font-bold text-ink">Create promotion</h2>
          <Input label="Campaign title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          <Input label="Promo code" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
          <Textarea label="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          <Select
            label="Audience"
            value={form.audience}
            onChange={(event) => setForm({ ...form, audience: event.target.value as PromotionAudience })}
            options={[
              { label: "All users", value: "all" },
              { label: "Customers", value: "consumer" },
              { label: "Cookers", value: "cooker" },
              { label: "Delivery partners", value: "delivery" },
            ]}
          />
          <Select
            label="Discount type"
            value={form.discountType}
            onChange={(event) => setForm({ ...form, discountType: event.target.value as PromotionDiscountType })}
            options={[
              { label: "Percent", value: "percent" },
              { label: "Fixed amount", value: "fixed" },
            ]}
          />
          <Input label="Discount value" type="number" step="0.01" value={form.discountValue} onChange={(event) => setForm({ ...form, discountValue: Number(event.target.value) })} />
          <Input label="Max redemptions" type="number" value={form.maxRedemptions} onChange={(event) => setForm({ ...form, maxRedemptions: Number(event.target.value) })} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Starts at" type="date" value={form.startsAt} onChange={(event) => setForm({ ...form, startsAt: event.target.value })} />
            <Input label="Ends at" type="date" value={form.endsAt} onChange={(event) => setForm({ ...form, endsAt: event.target.value })} />
          </div>
          <Button onClick={() => void savePromotion()}>Create promotion</Button>
          {message ? <p className="rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-bold text-emerald">{message}</p> : null}
        </Card>

        <AdminTable className="mt-0">
          {promotions.map((promotion) => (
            <div key={promotion.promotionId} className="grid gap-4 border-b border-[#bbcabf]/60 p-4 xl:grid-cols-[1fr_110px_120px_260px] xl:items-center">
              <div>
                <p className="font-bold text-ink">{promotion.title}</p>
                <p className="text-sm text-muted">{promotion.code} · {promotion.audience} · {promotion.discountValue}{promotion.discountType === "percent" ? "%" : " USD"}</p>
              </div>
              <StatusBadge status={promotion.status} />
              <p className="text-sm font-bold text-muted">{promotion.redemptionCount}/{promotion.maxRedemptions}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={() => void setPromotionStatus(promotion, "active")}>Activate</Button>
                <Button variant="ghost" onClick={() => void setPromotionStatus(promotion, "paused")}>Pause</Button>
                <Button variant="danger" onClick={() => void setPromotionStatus(promotion, "expired")}>Expire</Button>
              </div>
            </div>
          ))}
        </AdminTable>
      </div>
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

function ControlCard({ title, to, text, icon }: { title: string; to: string; text: string; icon: ReactNode }) {
  return (
    <Card className="transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <span className="text-emerald">{icon}</span>
      <h2 className="mt-4 text-xl font-bold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
      <a className="mt-5 inline-flex" href={to}>
        <Button variant="secondary">Open control</Button>
      </a>
    </Card>
  );
}

function WarningTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#bbcabf]/70 bg-cream p-4">
      <p className="text-sm font-bold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-ink">{value}</p>
    </div>
  );
}
