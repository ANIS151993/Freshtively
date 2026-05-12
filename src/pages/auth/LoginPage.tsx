import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/forms/Input";
import { getRoleHomePath, useAuth } from "../../contexts/AuthContext";
import { loginWithEmail } from "../../services/authService";
import { getUserProfile } from "../../services/firestoreService";
import { getFriendlyAuthError } from "../../utils/authErrors";

export default function LoginPage() {
  const { currentUser, profile, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <Card className="w-full max-w-md">
      <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Welcome back</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">Login</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Access your Freshtively dashboard.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? <p className="rounded-2xl bg-clay-soft px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}
        <Button className="w-full" type="submit" isLoading={isSubmitting}>
          Login
        </Button>
      </form>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold">
        <Link className="text-emerald hover:underline" to="/forgot-password">
          Forgot password?
        </Link>
        <Link className="text-muted hover:text-emerald" to="/role-selection">
          Create account
        </Link>
      </div>
    </Card>
  );
}
