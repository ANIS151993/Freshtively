import { FormEvent, useEffect, useState } from "react";
import { Banknote, Bell, Car, FileCheck, Map, MessageCircle, Star, Upload, Wallet } from "lucide-react";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import {
  createSupportTicket,
  getDeliveryOrders,
  getDeliveryPersonProfile,
  getUserNotifications,
  markNotificationAsRead,
} from "../../services/firestoreService";
import { uploadFile } from "../../services/storageService";
import type { DeliveryPersonProfile, NotificationDocument, Order } from "../../types/firestore";

export function DeliveryDocumentsPage() {
  const { currentUser } = useAuth();
  const [deliveryProfile, setDeliveryProfile] = useState<DeliveryPersonProfile | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    getDeliveryPersonProfile(currentUser.uid).then(setDeliveryProfile);
  }, [currentUser]);

  async function handleUpload(file: File | undefined, folder: string) {
    if (!currentUser || !file) return;
    const url = await uploadFile(`verification/deliveryPersons/${currentUser.uid}/${folder}/${file.name}`, file);
    setMessage(`Uploaded document: ${url}`);
  }

  return (
    <section>
      <PageHeader eyebrow="Documents" title="Vehicle and identity documents" description="Upload license, vehicle, insurance, and registration documents for admin review." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <h2 className="text-xl font-bold text-ink">Document management</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {["license", "vehicle", "insurance", "registration"].map((folder) => (
              <label key={folder} className="rounded-2xl border border-dashed border-[#bbcabf] bg-white p-5">
                <Upload className="text-emerald" />
                <span className="mt-3 block text-sm font-bold capitalize text-ink">{folder}</span>
                <input className="mt-3 text-sm" type="file" onChange={(event) => void handleUpload(event.target.files?.[0], folder)} />
              </label>
            ))}
          </div>
          {message ? <p className="mt-5 rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-semibold text-emerald">{message}</p> : null}
        </Card>
        <Card>
          <FileCheck className="text-emerald" />
          <h2 className="mt-4 text-xl font-bold text-ink">Verification status</h2>
          <p className="mt-2 text-sm text-muted">{deliveryProfile?.verificationStatus ?? "pending"}</p>
          <p className="mt-4 text-sm leading-6 text-muted">Bank status: {deliveryProfile?.bankStatus ?? "not_added"}</p>
        </Card>
      </div>
    </section>
  );
}

export function DeliveryProfilePage() {
  const { currentUser, profile } = useAuth();
  const [deliveryProfile, setDeliveryProfile] = useState<DeliveryPersonProfile | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    getDeliveryPersonProfile(currentUser.uid).then(setDeliveryProfile);
  }, [currentUser]);

  return (
    <section>
      <PageHeader eyebrow="Profile" title="Delivery profile" description="Service area, vehicle details, payout status, and availability." />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <Input label="Full name" value={profile?.fullName ?? ""} readOnly />
          <Input label="Email" value={profile?.email ?? ""} readOnly />
          <Input label="Phone" value={profile?.phone ?? ""} readOnly />
          <Input label="ZIP code" value={deliveryProfile?.zipCode ?? ""} readOnly />
        </Card>
        <Card className="space-y-4">
          <Car className="text-emerald" />
          <Input label="Vehicle" value={`${deliveryProfile?.vehicleYear ?? ""} ${deliveryProfile?.vehicleMakeModel ?? ""}`.trim()} readOnly />
          <Input label="Plate" value={deliveryProfile?.vehiclePlateNumber ?? ""} readOnly />
          <Input label="License" value={deliveryProfile?.drivingLicenseNumber ?? ""} readOnly />
        </Card>
      </div>
    </section>
  );
}

export function DeliveryEarningsPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getDeliveryOrders(currentUser.uid).then(setOrders);
  }, [currentUser]);

  const delivered = orders.filter((order) => order.status === "delivered");
  const earnings = delivered.reduce((total, order) => total + order.deliveryFee + order.deliveryTip, 0);

  return (
    <section>
      <PageHeader eyebrow="Earnings" title="Delivery earnings" description="Payout details are placeholders until payment integration." />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card><Wallet className="text-emerald" /><p className="mt-4 text-3xl font-bold text-ink">${earnings.toFixed(2)}</p><p className="text-sm text-muted">Estimated earnings</p></Card>
        <Card><Banknote className="text-saffron" /><p className="mt-4 text-3xl font-bold text-ink">{delivered.length}</p><p className="text-sm text-muted">Completed deliveries</p></Card>
        <Card><FileCheck className="text-clay" /><p className="mt-4 text-3xl font-bold text-ink">Placeholder</p><p className="text-sm text-muted">Payout details</p></Card>
      </div>
    </section>
  );
}

export function DeliveryNotificationsPage() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getUserNotifications(currentUser.uid).then(setNotifications).finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <section>
      <PageHeader eyebrow="Notifications" title="Delivery notifications" description="Delivery requests, pickup, and system updates." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading notifications" /></div> : null}
      {!loading && notifications.length === 0 ? <div className="mt-8"><EmptyState title="No notifications" description="Accepted request updates will appear here." icon={<Bell />} /></div> : null}
      <div className="mt-8 space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.notificationId}>
            <h2 className="text-lg font-bold text-ink">{notification.title}</h2>
            <p className="mt-2 text-sm text-muted">{notification.message}</p>
            {!notification.isRead ? <Button className="mt-4" variant="ghost" onClick={() => void markNotificationAsRead(notification.notificationId)}>Mark read</Button> : null}
          </Card>
        ))}
      </div>
    </section>
  );
}

export function DeliverySupportPage() {
  const { currentUser, profile } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentUser || !profile) return;
    await createSupportTicket({
      userId: currentUser.uid,
      userRole: profile.role,
      category: "Delivery support",
      subject,
      message,
      status: "open",
      assignedTo: "",
    });
    setSubject("");
    setMessage("");
    setStatus("Support ticket created.");
  }

  return (
    <section>
      <PageHeader eyebrow="Support" title="Delivery support" description="Report pickup, drop-off, document, payout, or safety issues." />
      <Card className="mt-8 max-w-2xl">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Subject" value={subject} onChange={(event) => setSubject(event.target.value)} required />
          <Textarea label="Message" value={message} onChange={(event) => setMessage(event.target.value)} required />
          {status ? <p className="rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-semibold text-emerald">{status}</p> : null}
          <Button type="submit" leftIcon={<MessageCircle size={16} />}>Submit ticket</Button>
        </form>
      </Card>
    </section>
  );
}

export function DeliveryRatingsPage() {
  return (
    <section>
      <PageHeader eyebrow="Ratings" title="Delivery ratings" description="Ratings aggregation is reserved for the admin/moderation phase." />
      <Card className="mt-8">
        <Star className="text-saffron" />
        <p className="mt-4 text-sm leading-6 text-muted">Consumer delivery ratings will be listed here once review query helpers are expanded.</p>
      </Card>
    </section>
  );
}

export function DeliveryMapPage() {
  return (
    <section>
      <PageHeader eyebrow="Map placeholder" title="Map tracking" description="Real map integration is intentionally deferred." />
      <Card className="mt-8 grid min-h-[420px] place-items-center bg-emerald-soft text-center">
        <div>
          <Map className="mx-auto text-emerald" size={56} />
          <h2 className="mt-5 text-2xl font-bold text-ink">Delivery route placeholder</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Future integration can show pickup, route progress, and drop-off ETA.</p>
        </div>
      </Card>
    </section>
  );
}

export function DeliveryPlaceholderWorkflowPage({ title, description }: { title: string; description: string }) {
  return (
    <section>
      <PageHeader eyebrow="Delivery workflow" title={title} description={description} />
      <Card className="mt-8">
        <p className="text-sm leading-6 text-muted">
          This route reserves the Phase 8 workflow surface while the detailed modal or sub-flow is expanded later.
        </p>
      </Card>
    </section>
  );
}
