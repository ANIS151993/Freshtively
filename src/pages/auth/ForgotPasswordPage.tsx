import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/forms/Input";
import { sendPasswordReset } from "../../services/authService";
import { getFriendlyAuthError } from "../../utils/authErrors";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      await sendPasswordReset(email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (caughtError) {
      setError(getFriendlyAuthError(caughtError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Account recovery</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">Forgot password</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        {message ? <p className="rounded-2xl bg-emerald-soft px-4 py-3 text-sm font-semibold text-emerald">{message}</p> : null}
        {error ? <p className="rounded-2xl bg-clay-soft px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}
        <Button className="w-full" type="submit" isLoading={isSubmitting}>
          Send reset email
        </Button>
      </form>
      <Link className="mt-5 inline-flex text-sm font-semibold text-emerald hover:underline" to="/login">
        Back to login
      </Link>
    </Card>
  );
}
