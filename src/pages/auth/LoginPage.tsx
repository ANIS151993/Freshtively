import { FormEvent, useState } from "react";
import { Eye, EyeOff, ShieldCheck, ShoppingBag, Truck, Utensils } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import { getRoleHomePath, useAuth } from "../../contexts/AuthContext";
import { loginWithEmail } from "../../services/authService";
import { getUserProfile } from "../../services/firestoreService";
import { getFriendlyAuthError } from "../../utils/authErrors";

const loginActions = [
  { label: "Order", Icon: ShoppingBag },
  { label: "Cook", Icon: Utensils },
  { label: "Deliver", Icon: Truck },
];

export default function LoginPage() {
  const { currentUser, profile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;

  if (!loading && currentUser && profile) {
    return <Navigate to={from ?? getRoleHomePath(profile.role)} replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const credentials = await loginWithEmail(email, password);
      const nextProfile = await getUserProfile(credentials.user.uid);
      navigate(from ?? getRoleHomePath(nextProfile?.role), { replace: true });
    } catch (caughtError) {
      setError(getFriendlyAuthError(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-[100svh] bg-[#f7f8f4] text-ink lg:grid-cols-2">
      <section className="relative hidden min-h-[100svh] overflow-hidden bg-[#111915] px-10 py-6 text-white lg:grid lg:content-center xl:px-14">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(135deg,#111915_0%,#17231d_56%,#0d5f35_140%)] bg-[length:40px_40px,40px_40px,auto]" />
        <div className="absolute left-[58%] top-[11%] h-[min(32vw,360px)] w-[min(32vw,360px)] rounded-full bg-[#d26b2d]/30 blur-3xl freshtively-brand-pulse" />
        <div className="absolute bottom-[10%] right-[9%] h-[min(18vw,210px)] w-[min(18vw,210px)] rounded-[28px] border border-white/10 freshtively-panel-drift" />

        <div className="relative z-10 max-w-2xl">
          <Link to="/" aria-label="Freshtively home">
            <img
              className="freshtively-logo-float h-auto w-[min(32vw,420px)] max-w-full drop-shadow-[0_24px_46px_rgba(0,0,0,.42)] transition duration-300 hover:scale-[1.03]"
              src="/logo/main-logo.png"
              alt="Freshtively"
            />
          </Link>
          <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-extrabold text-white">
            Freshtively marketplace access
          </div>
          <h1 className="mt-4 max-w-2xl text-[clamp(2.35rem,4.3vw,3.85rem)] font-extrabold leading-none">
            One login for customers, cookers, and delivery partners.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#d8e6dc] xl:text-base xl:leading-7">
            Access ordering, kitchen operations, delivery handoffs, profile controls, notifications, and marketplace
            support from a focused role-based portal.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {loginActions.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-3">
                <Icon className="shrink-0 text-[#f3a21b]" size={22} />
                <p className="text-sm font-extrabold text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-[100svh] place-items-center px-4 py-3 sm:px-8 lg:px-10">
        <div className="w-full max-w-[540px]">
          <Link className="mb-3 flex justify-center lg:hidden" to="/" aria-label="Freshtively home">
            <img
              className="freshtively-logo-float h-auto w-[min(64vw,280px)] drop-shadow-[0_16px_30px_rgba(22,29,25,.18)]"
              src="/logo/main-logo.png"
              alt="Freshtively"
            />
          </Link>

          <div className="rounded-lg border border-[#d8dfd8] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wide text-emerald sm:text-sm">Welcome back</p>
                <h1 className="mt-1 text-3xl font-extrabold text-ink sm:text-[2.4rem]">Login</h1>
                <p className="mt-1.5 text-sm leading-6 text-muted">Access your Freshtively dashboard.</p>
              </div>
              <span className="hidden rounded-lg bg-[#edf6ef] p-2.5 text-emerald sm:inline-flex">
                <ShieldCheck size={22} />
              </span>
            </div>

            <form className="mt-5 space-y-3.5" onSubmit={handleSubmit}>
              <label className="block text-sm font-bold text-ink">
                Email
                <input
                  className="mt-1.5 min-h-[48px] w-full rounded-lg border border-[#cfd8d0] bg-white px-4 py-2.5 text-base text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-[#dceee3]"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="block text-sm font-bold text-ink">
                Password
                <span className="relative mt-1.5 block">
                  <input
                    className="min-h-[48px] w-full rounded-lg border border-[#cfd8d0] bg-white px-4 py-2.5 pr-14 text-base text-ink outline-none transition focus:border-emerald focus:ring-2 focus:ring-[#dceee3]"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md text-muted hover:bg-[#f0f4ef] hover:text-emerald"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>

              {error ? <p className="rounded-lg bg-clay-soft px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}
              <Button className="min-h-[48px] w-full text-base" type="submit" isLoading={isSubmitting}>
                Login
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e3e8e3] pt-3.5 text-sm font-bold">
              <Link className="text-emerald hover:underline" to="/forgot-password">
                Forgot password?
              </Link>
              <Link className="text-muted hover:text-emerald" to="/role-selection">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
