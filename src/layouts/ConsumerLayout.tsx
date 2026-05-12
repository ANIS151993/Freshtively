import { Outlet } from "react-router-dom";
import { ShellNav } from "../components/layout/ShellNav";

const navItems = [
  { label: "Home", to: "/consumer" },
  { label: "Discover", to: "/consumer/discover" },
  { label: "Cart", to: "/consumer/cart" },
  { label: "Orders", to: "/consumer/orders" },
  { label: "Notifications", to: "/consumer/notifications" },
  { label: "Profile", to: "/consumer/profile" },
];

export default function ConsumerLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <ShellNav items={navItems} homeTo="/consumer" />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <Outlet />
      </main>
    </div>
  );
}
