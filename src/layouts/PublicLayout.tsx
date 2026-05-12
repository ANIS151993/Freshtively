import { Outlet } from "react-router-dom";
import { PublicFooter } from "../components/layout/PublicFooter";
import { ShellNav } from "../components/layout/ShellNav";

const navItems = [
  { label: "Discover", to: "/discover" },
  { label: "About", to: "/about" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Safety", to: "/safety" },
  { label: "Founder", to: "/founder" },
  { label: "Developer", to: "/developer" },
  { label: "Cook", to: "/become-a-cooker" },
  { label: "Help", to: "/help" },
  { label: "Contact", to: "/contact" },
  { label: "Login", to: "/login" },
];

export default function PublicLayout() {
  return (
    <div className="min-h-screen freshtively-gradient">
      <ShellNav items={navItems} />
      <main>
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
