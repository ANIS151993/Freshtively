import { Link } from "react-router-dom";

export function Logo({ to = "/", inverse = false }: { to?: string; inverse?: boolean }) {
  return (
    <Link to={to} className="inline-flex items-center" aria-label="Freshtively home">
      <span className={inverse ? "inline-flex rounded-lg bg-white px-2 py-1 shadow-sm" : "inline-flex"}>
        <img className="h-12 w-auto object-contain" src="/logo/main-logo.png" alt="Freshtively" />
      </span>
    </Link>
  );
}
