import { Outlet } from "react-router-dom";
import { AppCopyrightFooter } from "../components/layout/AppCopyrightFooter";
import { ShellNav } from "../components/layout/ShellNav";

const navItems = [
  { label: "Overview", to: "/admin" },
  { label: "Users", to: "/admin/users" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Dishes", to: "/admin/dishes" },
  { label: "Payments", to: "/admin/payments" },
  { label: "Support", to: "/admin/support" },
  { label: "Analytics", to: "/admin/analytics" },
  { label: "Settings", to: "/admin/settings" },
  { label: "Seed", to: "/admin/seed-data" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <ShellNav items={navItems} homeTo="/admin" />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <Outlet />
      </main>
      <AppCopyrightFooter />
    </div>
  );
}
