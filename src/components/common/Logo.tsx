import { Link } from "react-router-dom";

export function Logo({ to = "/", inverse = false }: { to?: string; inverse?: boolean }) {
  return (
    <Link to={to} className="inline-flex items-center" aria-label="Freshtively home">
      <span className={inverse ? "inline-flex rounded-lg bg-white/95 px-3 py-1.5 shadow-sm" : "inline-flex"}>
        <img className="h-[72px] w-auto object-contain md:h-20" src="/logo/main-logo.png" alt="Freshtively" />
      </span>
    </Link>
  );
}
