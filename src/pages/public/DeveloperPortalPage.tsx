import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bell,
  BookOpen,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileCode2,
  Github,
  GitPullRequest,
  Globe2,
  KeyRound,
  LayoutDashboard,
  Lock,
  Rocket,
  ServerCog,
  ShieldCheck,
  TerminalSquare,
  Users,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

const kpis = [
  { label: "Public routes", value: "10+", helper: "Concept, help, founder, developer", icon: <Globe2 /> },
  { label: "Role areas", value: "4", helper: "Customer, cooker, delivery, admin", icon: <Users /> },
  { label: "Backend", value: "Firebase", helper: "Auth, Firestore, Storage", icon: <Database /> },
  { label: "Hosting", value: "Cloudflare", helper: "Pages from GitHub main", icon: <Cloud /> },
];

const systemModules = [
  {
    title: "Customer marketplace",
    status: "Implemented UI",
    text: "Discovery, dish details, cart, checkout, orders, order tracking, profile, support, notifications, favorites.",
  },
  {
    title: "Cooker operations",
    status: "Implemented UI",
    text: "Kitchen profile, verification, dish creation, menu management, orders, reviews, earnings, documents, support.",
  },
  {
    title: "Delivery operations",
    status: "Implemented UI",
    text: "Delivery requests, active pickup/drop-off, documents, vehicle profile, ratings, earnings, support.",
  },
  {
    title: "Admin control center",
    status: "Role protected",
    text: "Users, cookers, delivery persons, verification, orders, dishes, payments, support, analytics, settings, seed data.",
  },
  {
    title: "Firebase security",
    status: "Rules included",
    text: "Firestore and Storage rules are included for role-based reads, writes, admin access, and user ownership.",
  },
  {
    title: "Deployment pipeline",
    status: "Cloudflare ready",
    text: "GitHub main branch builds with Vite and publishes the dist directory through Cloudflare Pages.",
  },
];

const roleFlows = [
  {
    role: "Customer",
    route: "/consumer",
    steps: ["Create account", "Discover dishes", "Add to cart", "Review checkout", "Track order"],
  },
  {
    role: "Cooker",
    route: "/cooker",
    steps: ["Create profile", "Verify kitchen", "Publish dishes", "Accept order", "Prepare handoff"],
  },
  {
    role: "Delivery",
    route: "/delivery",
    steps: ["Verify documents", "Review requests", "Accept delivery", "Confirm pickup", "Complete drop-off"],
  },
  {
    role: "Admin",
    route: "/admin",
    steps: ["Login", "Pass admin role", "Review users", "Monitor orders", "Manage platform"],
  },
];

const deploymentChecklist = [
  ["GitHub source", "ANIS151993/Freshtively"],
  ["Production branch", "main"],
  ["Framework preset", "Vite"],
  ["Build command", "npm run build"],
  ["Output directory", "dist"],
  ["SPA redirect", "public/_redirects"],
  ["Custom domain", "freshtively.marcbd.site"],
];

const environmentVariables = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
  "VITE_FIREBASE_MEASUREMENT_ID",
];

const routeGroups = [
  ["/", "Public homepage"],
  ["/developer", "Public developer console"],
  ["/developer-panel", "Alias for developer console"],
  ["/founder", "Creator profile"],
  ["/login", "Authentication"],
  ["/consumer", "Customer dashboard"],
  ["/cooker", "Cooker dashboard"],
  ["/delivery", "Delivery dashboard"],
  ["/admin", "Protected admin control center"],
];

export default function DeveloperPortalPage() {
  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden border-b border-[#bbcabf]/70 bg-[#101815] text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-8 top-8 h-64 w-64 rounded-full bg-emerald blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-saffron blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-14 md:px-10 lg:grid-cols-[1fr_460px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-soft">
              <ServerCog size={18} />
              Freshtively professional developer console
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
              System overview, deployment health, and product workflow in one place.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#d8e6dc]">
              This page is a public developer portal for explaining the Freshtively system professionally. The protected
              admin dashboard remains separate and requires Firebase admin role access.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admin">
                <Button leftIcon={<ShieldCheck size={18} />}>Protected Admin Dashboard</Button>
              </Link>
              <a href="https://github.com/ANIS151993/Freshtively" rel="noreferrer" target="_blank">
                <Button variant="secondary" leftIcon={<Github size={18} />}>
                  GitHub Repo
                </Button>
              </a>
              <a href="https://anis151993.github.io/Freshtively/" rel="noreferrer" target="_blank">
                <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20" leftIcon={<BookOpen size={18} />}>
                  GitHub Website
                </Button>
              </a>
            </div>
          </div>

          <Card className="border-white/10 bg-white/95 text-ink">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Production snapshot</p>
                <h2 className="mt-2 text-2xl font-extrabold text-ink">Freshtively Console</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-soft text-emerald">
                <Activity size={24} />
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ["Developer portal", "Public", "/developer"],
                ["Admin dashboard", "Protected", "/admin"],
                ["Deployment", "Cloudflare Pages", "main -> dist"],
                ["Data platform", "Firebase", "Auth + Firestore + Storage"],
              ].map(([label, value, helper]) => (
                <div key={label} className="rounded-2xl border border-[#bbcabf]/70 bg-cream p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-ink">{label}</span>
                    <span className="rounded-full bg-emerald-soft px-3 py-1 text-xs font-bold text-emerald">{value}</span>
                  </div>
                  <p className="mt-2 font-mono text-xs font-semibold text-muted">{helper}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-5 md:grid-cols-4">
          {kpis.map((item) => (
            <Card key={item.label} className="transition duration-200 hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-soft text-emerald">
                {item.icon}
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-wide text-muted">{item.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-ink">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.helper}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">System modules</p>
          <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-5xl">Industry-style product areas</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Freshtively is organized as a marketplace product with separate operational surfaces for each role.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {systemModules.map((module) => (
            <Card key={module.title} className="transition duration-200 hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-ink">{module.title}</h3>
                <Badge tone="emerald">{module.status}</Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{module.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Workflow map</p>
            <h2 className="mt-3 text-3xl font-extrabold text-ink md:text-5xl">How the business logic is separated</h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Each role has a clear dashboard and task path. This makes the system easier to explain, test, and expand.
            </p>
          </div>
          <div className="space-y-4">
            {roleFlows.map((flow) => (
              <Card key={flow.role} className="p-5">
                <div className="grid gap-4 lg:grid-cols-[140px_1fr_92px] lg:items-center">
                  <div>
                    <p className="text-lg font-extrabold text-ink">{flow.role}</p>
                    <p className="mt-1 font-mono text-xs font-semibold text-muted">{flow.route}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-5">
                    {flow.steps.map((step) => (
                      <span key={step} className="rounded-2xl bg-cream px-3 py-2 text-center text-xs font-bold text-muted">
                        {step}
                      </span>
                    ))}
                  </div>
                  <Link to={flow.route}>
                    <Button variant="ghost" className="w-full px-3">
                      Open
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <Cloud className="text-emerald" size={34} />
            <h2 className="mt-4 text-2xl font-extrabold text-ink">Cloudflare deployment checklist</h2>
            <div className="mt-5 space-y-3">
              {deploymentChecklist.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded-2xl bg-cream px-4 py-3">
                  <span className="text-sm font-bold text-muted">{label}</span>
                  <span className="text-right font-mono text-sm font-bold text-ink">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <KeyRound className="text-emerald" size={34} />
            <h2 className="mt-4 text-2xl font-extrabold text-ink">Firebase environment variables</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              These must exist in Cloudflare Pages settings for production Firebase access.
            </p>
            <div className="mt-5 grid gap-2">
              {environmentVariables.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3">
                  <CheckCircle2 className="shrink-0 text-emerald" size={18} />
                  <span className="font-mono text-xs font-bold text-ink">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <Card>
            <Workflow className="text-emerald" size={34} />
            <h2 className="mt-4 text-2xl font-extrabold text-ink">Route registry</h2>
            <div className="mt-5 grid gap-3">
              {routeGroups.map(([route, label]) => (
                <div key={route} className="grid gap-2 rounded-2xl bg-cream px-4 py-3 sm:grid-cols-[150px_1fr]">
                  <span className="font-mono text-sm font-bold text-ink">{route}</span>
                  <span className="text-sm font-semibold text-muted">{label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <Lock className="text-emerald" size={34} />
            <h2 className="mt-4 text-2xl font-extrabold text-ink">Protected admin rule</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              The developer portal is public. The operational admin dashboard is private. To open `/admin`, Firebase
              must have an approved admin profile for the signed-in user.
            </p>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-[#101815] p-4 text-sm font-semibold text-emerald-soft">
{`users/{uid}
  role: "admin"
  status: "approved"`}
            </pre>
            <div className="mt-5 rounded-2xl border border-saffron/40 bg-saffron-soft p-4">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 shrink-0 text-saffron-dark" size={20} />
                <p className="text-sm font-semibold leading-6 text-[#5a3700]">
                  If `/admin` redirects to `/login`, the user is not authenticated. If it redirects after login, the
                  Firestore user role is missing or not admin.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <Card className="bg-[#101815] text-white">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-soft">Developer actions</p>
              <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">Use this console as your public technical portal.</h2>
              <p className="mt-4 text-base leading-7 text-[#d8e6dc]">
                Visitors can understand the system without logging in. You can keep the real admin dashboard secured
                while still showing a professional developer-facing system overview.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                ["/developer", "Public professional console", <TerminalSquare />],
                ["/admin", "Protected operational dashboard", <LayoutDashboard />],
                ["GitHub", "Repository and source history", <GitPullRequest />],
                ["Docs", "Animated concept page", <FileCode2 />],
              ].map(([title, text, icon]) => (
                <div key={title as string} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-emerald-soft">
                    {icon}
                  </span>
                  <div>
                    <p className="font-bold">{title as string}</p>
                    <p className="text-sm text-[#d8e6dc]">{text as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-10 md:pb-20">
        <Card>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Copyright and ownership</p>
              <h2 className="mt-2 text-3xl font-extrabold text-ink">Md Anisur Rahman Chowdhury</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
                Freshtively, its concept, source code, documentation, and system materials are owned by Md Anisur
                Rahman Chowdhury unless a separate written license says otherwise.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/ANIS151993" rel="noreferrer" target="_blank">
                <Button variant="secondary" leftIcon={<Github size={18} />}>
                  GitHub
                </Button>
              </a>
              <a href="https://marcbd.site" rel="noreferrer" target="_blank">
                <Button variant="ghost" leftIcon={<ExternalLink size={18} />}>
                  Portfolio
                </Button>
              </a>
              <a href="https://linkedin.com/in/md-anisur-rahman-chowdhury-15862420a" rel="noreferrer" target="_blank">
                <Button variant="ghost" leftIcon={<Code2 size={18} />}>
                  LinkedIn
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
