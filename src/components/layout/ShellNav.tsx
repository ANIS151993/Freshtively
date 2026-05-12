import { NavLink } from "react-router-dom";
import { Logo } from "../common/Logo";
import { Button } from "../common/Button";
import { useAuth } from "../../contexts/AuthContext";

export interface NavItem {
  label: string;
  to: string;
}

export function ShellNav({ items, homeTo = "/" }: { items: NavItem[]; homeTo?: string }) {
  const { currentUser, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-[#bbcabf]/60 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 md:px-10">
        <Logo to={homeTo} />
        <nav className="hidden items-center gap-2 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-emerald text-white" : "text-muted hover:bg-emerald-soft hover:text-emerald"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {currentUser ? (
            <Button variant="ghost" className="ml-2" onClick={() => void logout()}>
              Logout
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
