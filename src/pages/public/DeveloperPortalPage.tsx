import {
  Activity,
  BadgeCheck,
  Cloud,
  Database,
  ExternalLink,
  Github,
  LayoutDashboard,
  Lock,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";

const portalCards = [
  {
    title: "System concept",
    text: "Freshtively connects customers, home cookers, and delivery partners around homemade cultural food.",
    icon: <LayoutDashboard />,
  },
  {
    title: "Protected admin",
    text: "The real admin dashboard remains protected by Firebase login and users/{uid}.role == admin.",
    icon: <Lock />,
  },
  {
    title: "Deployment target",
    text: "Cloudflare Pages serves the React app from the main branch with npm run build and dist output.",
    icon: <Cloud />,
  },
];

const roleFlows = [
  ["Customer", "Discover food", "Add to cart", "Track order"],
  ["Cooker", "Verify kitchen", "Create dishes", "Prepare orders"],
  ["Delivery", "Verify documents", "Accept requests", "Complete drop-off"],
  ["Developer", "Review system", "Check deployment", "Open admin area"],
];

const deploymentItems = [
  "GitHub repository: ANIS151993/Freshtively",
  "Production branch: main",
  "Build command: npm run build",
  "Output directory: dist",
  "SPA redirect: public/_redirects",
  "Custom domain: freshtively.marcbd.site",
];

export default function DeveloperPortalPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:px-10 md:py-20 lg:grid-cols-[1fr_0.88fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Developer portal</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink md:text-6xl">
            Freshtively system console
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            This is a separate developer portal for understanding the Freshtively concept, deployment setup, role
            workflows, and production entry points. It is different from the protected Firebase admin dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/admin">
              <Button leftIcon={<ShieldCheck size={18} />}>Open Protected Admin</Button>
            </Link>
            <a href="https://github.com/ANIS151993/Freshtively" rel="noreferrer" target="_blank">
              <Button variant="secondary" leftIcon={<Github size={18} />}>
                GitHub Repository
              </Button>
            </a>
            <a href="https://anis151993.github.io/Freshtively/" rel="noreferrer" target="_blank">
              <Button variant="ghost" leftIcon={<ExternalLink size={18} />}>
                GitHub Website
              </Button>
            </a>
          </div>
        </div>

        <Card className="bg-white/95">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-soft text-emerald">
              <Activity size={24} />
            </span>
            <div>
              <h2 className="text-xl font-bold text-ink">Console status</h2>
              <p className="text-sm text-muted">Public developer portal is available without Firebase role checks.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {["/developer", "/developer-panel", "/admin"].map((route) => (
              <div key={route} className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3">
                <span className="font-mono text-sm font-bold text-ink">{route}</span>
                <span className="rounded-full bg-emerald-soft px-3 py-1 text-xs font-bold text-emerald">
                  {route === "/admin" ? "Protected" : "Public"}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {portalCards.map((card) => (
            <Card key={card.title} className="transition duration-200 hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-soft text-emerald">
                {card.icon}
              </span>
              <h2 className="mt-5 text-xl font-bold text-ink">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{card.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Role workflow</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-5xl">One system, four views</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              The developer portal shows how the product is organized without exposing private admin data.
            </p>
          </div>
          <div className="grid gap-4">
            {roleFlows.map(([role, first, second, third]) => (
              <Card key={role} className="p-5">
                <div className="grid gap-3 md:grid-cols-[130px_1fr] md:items-center">
                  <div className="flex items-center gap-3 font-bold text-ink">
                    <Users className="text-emerald" size={20} />
                    {role}
                  </div>
                  <div className="grid gap-2 text-sm font-semibold text-muted md:grid-cols-3">
                    <span>{first}</span>
                    <span>{second}</span>
                    <span>{third}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <Database className="text-emerald" size={32} />
            <h2 className="mt-4 text-2xl font-bold text-ink">Firebase access rule</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              The protected admin dashboard requires a signed-in Firebase user with an approved Firestore profile:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-cream p-4 text-sm font-semibold text-ink">
              users/{"{uid}"}.role == "admin"
            </pre>
          </Card>

          <Card>
            <Rocket className="text-emerald" size={32} />
            <h2 className="mt-4 text-2xl font-bold text-ink">Cloudflare deployment</h2>
            <div className="mt-4 space-y-3">
              {deploymentItems.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold text-muted">
                  <BadgeCheck className="shrink-0 text-emerald" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
