import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../../components/cards/Card";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { PageHeader } from "../../components/common/PageHeader";
import { useAuth } from "../../contexts/AuthContext";
import { getUserNotifications, markNotificationAsRead } from "../../services/notificationService";
import type { NotificationDocument } from "../../types/firestore";

export default function NotificationsPage() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getUserNotifications(currentUser.uid)
      .then(setNotifications)
      .finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <section>
      <PageHeader eyebrow="Notifications" title="Updates" description="Order, payment, verification, and system notifications." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading notifications" /></div> : null}
      {!loading && notifications.length === 0 ? (
        <div className="mt-8"><EmptyState title="No notifications" description="Order updates will appear here." icon={<Bell />} /></div>
      ) : null}
      <div className="mt-8 space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.notificationId}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink">{notification.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{notification.message}</p>
              </div>
              {!notification.isRead ? (
                <button
                  className="text-sm font-bold text-emerald"
                  onClick={() => void markNotificationAsRead(notification.notificationId)}
                >
                  Mark read
                </button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
