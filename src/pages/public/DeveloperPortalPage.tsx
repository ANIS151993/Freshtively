import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BadgeCheck,
  Banknote,
  Bell,
  ChefHat,
  Cloud,
  Database,
  DollarSign,
  ExternalLink,
  Github,
  KeyRound,
  Lock,
  LogOut,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/forms/Input";
import { Select } from "../../components/forms/Select";
import { Textarea } from "../../components/forms/Textarea";

const PORTAL_SESSION_KEY = "freshtively_developer_portal";
const DEVELOPER_EMAIL = "engr.aanis@gmail.com";
const DEVELOPER_PASSWORD_HASH = "5b484d8b2799daf74779ce686501847d4a08b5e917c1e8395e1da7f7e73bce0d";

const users = [
  { name: "Ayesha Rahman", email: "consumer.demo@freshtively.local", role: "Customer", status: "approved" },
  { name: "Nadia Kitchen", email: "cooker.demo@freshtively.local", role: "Cooker", status: "pending" },
  { name: "Samir Delivery", email: "delivery.demo@freshtively.local", role: "Delivery", status: "approved" },
  { name: "Suspended Demo", email: "blocked.demo@freshtively.local", role: "Customer", status: "suspended" },
];

const moneyRows = [
  { label: "Gross order volume", value: "$12,480.50", helper: "Total marketplace order value" },
  { label: "Platform commission", value: "$1,872.08", helper: "System owner revenue" },
  { label: "Cooker payouts", value: "$8,340.22", helper: "Pending and completed cooker earnings" },
  { label: "Delivery payouts", value: "$1,228.40", helper: "Delivery partner earnings" },
];

const workflow = [
  ["Customer", "Browse food", "Order", "Track delivery", <ShoppingBag />],
  ["Cooker", "Verify kitchen", "Publish menu", "Prepare food", <ChefHat />],
  ["Delivery", "Accept request", "Pickup", "Drop off", <Truck />],
  ["Developer", "Control users", "Set commission", "Monitor money", <UserCog />],
];

export default function DeveloperPortalPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setIsUnlocked(sessionStorage.getItem(PORTAL_SESSION_KEY) === "unlocked");
  }, []);

  function unlock() {
    sessionStorage.setItem(PORTAL_SESSION_KEY, "unlocked");
    setIsUnlocked(true);
  }

  function logout() {
    sessionStorage.removeItem(PORTAL_SESSION_KEY);
    setIsUnlocked(false);
  }

  return isUnlocked ? <DeveloperConsole onLogout={logout} /> : <DeveloperLogin onUnlock={unlock} />;
}

function DeveloperLogin({ onUnlock }: { onUnlock: () => void }) {
  const [email, setEmail] = useState(DEVELOPER_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const passwordHash = await sha256(password);
    if (email.trim().toLowerCase() === DEVELOPER_EMAIL && passwordHash === DEVELOPER_PASSWORD_HASH) {
      onUnlock();
      return;
    }
    setError("Developer email or password is incorrect.");
  }

  return (
    <section className="min-h-[calc(100vh-220px)] bg-[#101815] px-4 py-12 text-white md:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_440px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-soft">
            <Lock size={18} />
            Private developer portal
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
            Freshtively owner console
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#d8e6dc]">
            Log in to view the developer portal for monitoring customers, cookers, delivery partners, commissions,
            promotions, account controls, money controls, and deployment health.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["User control", "Money control", "Promotion control"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <BadgeCheck className="text-emerald-soft" />
                <p className="mt-3 font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-white text-ink">
          <KeyRound className="text-emerald" size={34} />
          <h2 className="mt-4 text-2xl font-extrabold text-ink">Developer login</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Use your private developer credential to open the portal.</p>
          <form className="mt-6 space-y-4" onSubmit={(event) => void submit(event)}>
            <Input label="Developer email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            {error ? <p className="rounded-2xl bg-clay-soft px-4 py-3 text-sm font-bold text-clay">{error}</p> : null}
            <Button className="w-full" type="submit" leftIcon={<Lock size={18} />}>
              Enter developer portal
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

function DeveloperConsole({ onLogout }: { onLogout: () => void }) {
  const [commission, setCommission] = useState({
    serviceFee: 8,
    cookerCommission: 15,
    deliveryBase: 5,
    taxRate: 8.875,
  });
  const [promotion, setPromotion] = useState({
    title: "Launch discount",
    code: "FRESH10",
    audience: "all",
    value: 10,
    message: "Welcome promotion for Freshtively users.",
  });
  const [selectedUser, setSelectedUser] = useState(users[0].email);
  const [accountNote, setAccountNote] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const selectedUserRecord = useMemo(() => users.find((user) => user.email === selectedUser), [selectedUser]);

  function saveAction(action: string) {
    setStatusMessage(`${action} prepared for ${selectedUserRecord?.email}. Connect Firebase Admin backend to execute this on production records.`);
  }

  return (
    <div className="bg-cream">
      <section className="border-b border-[#bbcabf]/70 bg-[#101815] px-4 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-soft">Developer portal active</p>
            <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">Freshtively system control center</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#d8e6dc]">
              Monitor and control the customer, cooker, delivery, money, promotion, and deployment areas from one owner
              console. Production write actions require Firebase rules/backend deployment.
            </p>
          </div>
          <Button variant="ghost" className="bg-white/10 text-white hover:bg-white/20" leftIcon={<LogOut size={18} />} onClick={onLogout}>
            Logout
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {moneyRows.map((row) => (
            <Card key={row.label}>
              <DollarSign className="text-emerald" />
              <p className="mt-4 text-sm font-bold uppercase tracking-wide text-muted">{row.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-ink">{row.value}</p>
              <p className="mt-2 text-sm text-muted">{row.helper}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-10 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="flex items-center gap-3">
            <Users className="text-emerald" size={32} />
            <div>
              <h2 className="text-2xl font-extrabold text-ink">All user control</h2>
              <p className="text-sm text-muted">Customers, cookers, and delivery partners in one control table.</p>
            </div>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#bbcabf]/70">
            {users.map((user) => (
              <div key={user.email} className="grid gap-3 border-b border-[#bbcabf]/70 p-4 md:grid-cols-[1fr_120px_120px_220px] md:items-center">
                <div>
                  <p className="font-bold text-ink">{user.name}</p>
                  <p className="text-sm text-muted">{user.email}</p>
                </div>
                <Badge tone="emerald">{user.role}</Badge>
                <Badge tone={user.status === "approved" ? "emerald" : user.status === "pending" ? "saffron" : "clay"}>{user.status}</Badge>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => saveAction("Approve")}>Approve</Button>
                  <Button variant="ghost" onClick={() => saveAction("Suspend")}>Suspend</Button>
                  <Button variant="danger" onClick={() => saveAction("Block")}>Block</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <ShieldCheck className="text-emerald" size={32} />
          <h2 className="text-2xl font-extrabold text-ink">Account action panel</h2>
          <Select
            label="Target account"
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
            options={users.map((user) => ({ label: `${user.name} - ${user.role}`, value: user.email }))}
          />
          <Textarea label="Developer note" value={accountNote} onChange={(event) => setAccountNote(event.target.value)} placeholder="Reason for control action" />
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="secondary" onClick={() => saveAction("Restore account")}>Restore</Button>
            <Button variant="ghost" onClick={() => saveAction("Freeze payouts")}>Freeze payouts</Button>
            <Button variant="ghost" onClick={() => saveAction("Require verification")}>Require verify</Button>
            <Button variant="danger" onClick={() => saveAction("Permanent block")}>Permanent block</Button>
          </div>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-10 xl:grid-cols-2">
        <Card className="space-y-4">
          <Banknote className="text-emerald" size={32} />
          <h2 className="text-2xl font-extrabold text-ink">Commission and money controls</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Service fee percent" type="number" value={commission.serviceFee} onChange={(event) => setCommission({ ...commission, serviceFee: Number(event.target.value) })} />
            <Input label="Cooker commission percent" type="number" value={commission.cookerCommission} onChange={(event) => setCommission({ ...commission, cookerCommission: Number(event.target.value) })} />
            <Input label="Delivery base fee" type="number" value={commission.deliveryBase} onChange={(event) => setCommission({ ...commission, deliveryBase: Number(event.target.value) })} />
            <Input label="Tax rate percent" type="number" value={commission.taxRate} onChange={(event) => setCommission({ ...commission, taxRate: Number(event.target.value) })} />
          </div>
          <Button onClick={() => setStatusMessage("Commission settings prepared. Connect Firebase platformSettings/fees to persist production values.")}>
            Save commission
          </Button>
        </Card>

        <Card className="space-y-4">
          <Megaphone className="text-emerald" size={32} />
          <h2 className="text-2xl font-extrabold text-ink">Promotion control</h2>
          <Input label="Promotion title" value={promotion.title} onChange={(event) => setPromotion({ ...promotion, title: event.target.value })} />
          <Input label="Promotion code" value={promotion.code} onChange={(event) => setPromotion({ ...promotion, code: event.target.value.toUpperCase() })} />
          <Select
            label="Audience"
            value={promotion.audience}
            onChange={(event) => setPromotion({ ...promotion, audience: event.target.value })}
            options={[
              { label: "All users", value: "all" },
              { label: "Customers", value: "consumer" },
              { label: "Cookers", value: "cooker" },
              { label: "Delivery partners", value: "delivery" },
            ]}
          />
          <Input label="Discount value" type="number" value={promotion.value} onChange={(event) => setPromotion({ ...promotion, value: Number(event.target.value) })} />
          <Textarea label="Promotion message" value={promotion.message} onChange={(event) => setPromotion({ ...promotion, message: event.target.value })} />
          <Button variant="secondary" onClick={() => setStatusMessage(`Promotion ${promotion.code} prepared for ${promotion.audience}.`)}>
            Publish promotion
          </Button>
        </Card>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-10 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <Cloud className="text-emerald" size={32} />
          <h2 className="mt-4 text-2xl font-extrabold text-ink">Deployment and data status</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Cloudflare Pages", "main branch -> npm run build -> dist"],
              ["Firebase Auth", "Developer email override: engr.aanis@gmail.com"],
              ["Firestore rules", "Deploy required for real admin writes"],
              ["Storage rules", "Deploy required for admin document reads"],
            ].map(([label, text]) => (
              <div key={label} className="rounded-2xl bg-cream p-4">
                <p className="font-bold text-ink">{label}</p>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Database className="text-emerald" size={32} />
          <h2 className="mt-4 text-2xl font-extrabold text-ink">System workflow</h2>
          <div className="mt-5 grid gap-3">
            {workflow.map(([role, first, second, third, icon]) => (
              <div key={role as string} className="grid gap-3 rounded-2xl bg-cream p-4 md:grid-cols-[140px_1fr] md:items-center">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <span className="text-emerald">{icon}</span>
                  {role as string}
                </div>
                <div className="grid gap-2 text-sm font-semibold text-muted md:grid-cols-3">
                  <span>{first as string}</span>
                  <span>{second as string}</span>
                  <span>{third as string}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-10">
        {statusMessage ? (
          <div className="rounded-2xl border border-emerald/20 bg-emerald-soft px-5 py-4 text-sm font-bold text-emerald">
            {statusMessage}
          </div>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/admin">
            <Button leftIcon={<Lock size={18} />}>Open protected admin</Button>
          </Link>
          <a href="https://github.com/ANIS151993/Freshtively" rel="noreferrer" target="_blank">
            <Button variant="secondary" leftIcon={<Github size={18} />}>GitHub</Button>
          </a>
          <a href="https://freshtively.marcbd.site" rel="noreferrer" target="_blank">
            <Button variant="ghost" leftIcon={<ExternalLink size={18} />}>Live site</Button>
          </a>
        </div>
      </section>
    </div>
  );
}

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
