import { Outlet } from "react-router-dom";
import { AppCopyrightFooter } from "../components/layout/AppCopyrightFooter";
import { ShellNav } from "../components/layout/ShellNav";

const navItems = [
  { label: "Dashboard", to: "/cooker" },
  { label: "Menu", to: "/cooker/menu" },
  { label: "Orders", to: "/cooker/orders" },
  { label: "Earnings", to: "/cooker/earnings" },
  { label: "Reviews", to: "/cooker/reviews" },
  { label: "Verification", to: "/cooker/verification" },
  { label: "Profile", to: "/cooker/profile" },
];

export default function CookerLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <ShellNav items={navItems} homeTo="/cooker" />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <Outlet />
      </main>
      <AppCopyrightFooter />
    </div>
  );
}
