import { Link } from "react-router-dom";

export function Logo({ to = "/", inverse = false }: { to?: string; inverse?: boolean }) {
  return (
    <Link to={to} className="inline-flex items-center" aria-label="Freshtively home">
      <span className={inverse ? "inline-flex rounded-lg bg-white px-3 py-1.5 shadow-sm" : "inline-flex"}>
        <img className="h-14 w-auto object-contain md:h-16" src="/logo/main-logo.png" alt="Freshtively" />
      </span>
    </Link>
  );
}
