import { Outlet } from "react-router-dom";
import { ShellNav } from "../components/layout/ShellNav";

const navItems = [
  { label: "Dashboard", to: "/delivery" },
  { label: "Requests", to: "/delivery/requests" },
  { label: "Deliveries", to: "/delivery/deliveries" },
  { label: "Earnings", to: "/delivery/earnings" },
  { label: "Ratings", to: "/delivery/ratings" },
  { label: "Documents", to: "/delivery/documents" },
  { label: "Profile", to: "/delivery/profile" },
];

export default function DeliveryLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <ShellNav items={navItems} homeTo="/delivery" />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <Outlet />
      </main>
    </div>
  );
}
