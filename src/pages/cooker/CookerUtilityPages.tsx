import { FormEvent, useEffect, useState } from "react";
import { Banknote, Bell, FileCheck, MessageCircle, Star, Upload, Wallet } from "lucide-react";
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
  getCookerOrders,
  getCookerProfile,
  getUserNotifications,
  markNotificationAsRead,
} from "../../services/firestoreService";
import { uploadFile } from "../../services/storageService";
import type { CookerProfile, NotificationDocument, Order } from "../../types/firestore";

export function CookerVerificationPage() {
  const { currentUser } = useAuth();
  const [cooker, setCooker] = useState<CookerProfile | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    getCookerProfile(currentUser.uid).then(setCooker);
  }, [currentUser]);

  async function handleUpload(file: File | undefined, folder: string) {
    if (!currentUser || !file) return;
    const url = await uploadFile(`verification/cookers/${currentUser.uid}/${folder}/${file.name}`, file);
    setMessage(`Uploaded document: ${url}`);
  }

  return (
    <section>
      <PageHeader
        eyebrow="Verification"
        title="Kitchen verification"
        description="Upload kitchen, fridge, food safety certificate, and sample food documents for admin review."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <h2 className="text-xl font-bold text-ink">Document management</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {["kitchen", "fridge", "certificate", "sample-food"].map((folder) => (
              <label key={folder} className="rounded-2xl border border-dashed border-[#bbcabf] bg-white p-5">
                <Upload className="text-emerald" />
                <span className="mt-3 block text-sm font-bold capitalize text-ink">{folder.replace("-", " ")}</span>
                <input className="mt-3 text-sm" type="file" onChange={(event) => void handleUpload(event.target.files?.[0], folder)} />
              </label>
            ))}
          </div>
          {message ? <p className="mt-5 rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-semibold text-emerald">{message}</p> : null}
        </Card>
        <Card>
          <FileCheck className="text-emerald" />
          <h2 className="mt-4 text-xl font-bold text-ink">Status</h2>
          <p className="mt-2 text-sm text-muted">{cooker?.verificationStatus ?? "pending"}</p>
          <p className="mt-4 text-sm leading-6 text-muted">Bank status: {cooker?.bankStatus ?? "not_added"}</p>
        </Card>
      </div>
    </section>
  );
}

export function CookerProfilePage() {
  const { currentUser, profile } = useAuth();
  const [cooker, setCooker] = useState<CookerProfile | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    getCookerProfile(currentUser.uid).then(setCooker);
  }, [currentUser]);

  return (
    <section>
      <PageHeader eyebrow="Profile" title="Cooker profile" description="Kitchen story, cultural background, payout status, and service area." />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <Input label="Full name" value={profile?.fullName ?? ""} readOnly />
          <Input label="Email" value={profile?.email ?? ""} readOnly />
          <Input label="Phone" value={profile?.phone ?? ""} readOnly />
          <Input label="ZIP code" value={cooker?.zipCode ?? ""} readOnly />
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-ink">Cultural cooking background</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{cooker?.culturalCookingBackground ?? "Not added yet."}</p>
          <p className="mt-5 text-sm font-bold text-saffron-dark">Special dishes: {cooker?.specialDishes.join(", ") || "Not listed"}</p>
        </Card>
      </div>
    </section>
  );
}

export function CookerEarningsPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getCookerOrders(currentUser.uid).then(setOrders);
  }, [currentUser]);

  const delivered = orders.filter((order) => order.status === "delivered");
  const earnings = delivered.reduce((total, order) => total + order.subtotal + order.cookerTip, 0);

  return (
    <section>
      <PageHeader eyebrow="Earnings" title="Kitchen earnings" description="Payout and bank account screens are placeholders until payment integration." />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card><Wallet className="text-emerald" /><p className="mt-4 text-3xl font-bold text-ink">${earnings.toFixed(2)}</p><p className="text-sm text-muted">Estimated earnings</p></Card>
        <Card><Banknote className="text-saffron" /><p className="mt-4 text-3xl font-bold text-ink">{delivered.length}</p><p className="text-sm text-muted">Delivered orders</p></Card>
        <Card><FileCheck className="text-clay" /><p className="mt-4 text-3xl font-bold text-ink">Placeholder</p><p className="text-sm text-muted">Payout details</p></Card>
      </div>
    </section>
  );
}

export function CookerNotificationsPage() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getUserNotifications(currentUser.uid).then(setNotifications).finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <section>
      <PageHeader eyebrow="Notifications" title="Kitchen notifications" description="Order, verification, and system updates." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading notifications" /></div> : null}
      {!loading && notifications.length === 0 ? <div className="mt-8"><EmptyState title="No notifications" description="New order alerts will appear here." icon={<Bell />} /></div> : null}
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

export function CookerReviewsPage() {
  return (
    <section>
      <PageHeader eyebrow="Reviews" title="Cooker reviews" description="Review aggregation is reserved for the admin/moderation phase." />
      <Card className="mt-8">
        <Star className="text-saffron" />
        <p className="mt-4 text-sm leading-6 text-muted">Reviews are created by consumers and will be listed here once review query helpers are expanded.</p>
      </Card>
    </section>
  );
}

export function CookerSupportPage() {
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
      category: "Cooker support",
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
      <PageHeader eyebrow="Support" title="Kitchen support" description="Report issues with orders, documents, bank setup, or safety workflows." />
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

export function CookerPlaceholderWorkflowPage({ title, description }: { title: string; description: string }) {
  return (
    <section>
      <PageHeader eyebrow="Cooker workflow" title={title} description={description} />
      <Card className="mt-8">
        <p className="text-sm leading-6 text-muted">
          This route is reserved in Phase 7 so navigation and permissions are stable while the detailed modal or
          sub-workflow is implemented in a later polish pass.
        </p>
      </Card>
    </section>
  );
}
