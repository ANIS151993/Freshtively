import { Link } from "react-router-dom";

export function Logo({ to = "/", inverse = false }: { to?: string; inverse?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-3" aria-label="Freshtively home">
      <span className="logo-mark grid h-11 w-11 place-items-center rounded-2xl bg-emerald text-lg font-extrabold text-white shadow-ambient transition-transform duration-200 hover:-translate-y-0.5">
        F
      </span>
      <span className={`text-xl font-extrabold tracking-normal ${inverse ? "text-white" : "text-ink"}`}>Freshtively</span>
    </Link>
  );
}
