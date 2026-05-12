import { Link } from "react-router-dom";
import { Logo } from "../common/Logo";

const footerLinks = [
  { label: "About", to: "/about" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Safety", to: "/safety" },
  { label: "Founder", to: "/founder" },
  { label: "Become a cooker", to: "/become-a-cooker" },
  { label: "Become a delivery partner", to: "/become-a-delivery-person" },
  { label: "Help", to: "/help" },
  { label: "Contact", to: "/contact" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-[#bbcabf]/60 bg-[#2b322d] text-[#ebf3eb]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_1fr] md:px-10">
        <div>
          <Logo inverse />
          <p className="mt-4 max-w-md text-sm leading-6 text-[#dde4dd]">
            Freshtively connects local household cooks, neighbors, and delivery partners around verified homemade
            cultural food.
          </p>
        </div>
        <nav className="grid gap-3 sm:grid-cols-2">
          {footerLinks.map((link) => (
            <Link key={link.to} className="text-sm font-semibold text-[#dde4dd] hover:text-white" to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs font-semibold text-[#dde4dd] md:px-10">
        <p>Copyright (c) 2026 Md Anisur Rahman Chowdhury. All rights reserved.</p>
        <p className="mt-2">
          <a className="hover:text-white" href="https://github.com/ANIS151993" rel="noreferrer" target="_blank">
            GitHub
          </a>{" "}
          |{" "}
          <a className="hover:text-white" href="https://marcbd.site" rel="noreferrer" target="_blank">
            Portfolio
          </a>{" "}
          |{" "}
          <a
            className="hover:text-white"
            href="https://linkedin.com/in/md-anisur-rahman-chowdhury-15862420a"
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
