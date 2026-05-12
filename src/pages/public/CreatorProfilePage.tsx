import { BookOpen, ExternalLink, Github, Globe2, GraduationCap, Linkedin, ShieldCheck } from "lucide-react";
import { Card } from "../../components/cards/Card";

const profileLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/md-anisur-rahman-chowdhury-15862420a",
    icon: <Linkedin size={18} />,
  },
  { label: "GitHub", href: "https://github.com/ANIS151993", icon: <Github size={18} /> },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=NQyywPoAAAAJ",
    icon: <GraduationCap size={18} />,
  },
  { label: "Portfolio", href: "https://marcbd.site", icon: <Globe2 size={18} /> },
  {
    label: "ResearchGate",
    href: "https://researchgate.net/profile/Md-Anisur-Rahman-Chowdhury",
    icon: <BookOpen size={18} />,
  },
];

const ownershipHighlights = [
  "Designed and built as a full-stack marketplace system for homemade cultural food.",
  "Includes consumer, cooker, delivery partner, and admin workflows.",
  "Prepared for Firebase services, Cloudflare Pages deployment, and future production integrations.",
];

export default function CreatorProfilePage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:px-10 md:py-20 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="bg-white/95">
          <div className="grid aspect-square place-items-center rounded-3xl bg-gradient-to-br from-emerald to-saffron text-center text-white shadow-ambient">
            <div>
              <p className="text-6xl font-extrabold">MARC</p>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide">Freshtively Creator</p>
            </div>
          </div>
        </Card>

        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Founder profile</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-6xl">
            Md Anisur Rahman Chowdhury
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Creator, owner, and copyright holder of Freshtively. This profile connects the project to the developer's
            professional, academic, research, and portfolio presence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {profileLinks.map((link) => (
              <a
                key={link.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-2.5 text-sm font-semibold text-white shadow-ambient transition duration-200 hover:-translate-y-0.5 hover:shadow-lift"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.icon}
                {link.label}
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-10 md:pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {ownershipHighlights.map((text) => (
            <Card key={text}>
              <ShieldCheck className="text-emerald" />
              <p className="mt-5 text-sm font-semibold leading-6 text-muted">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
