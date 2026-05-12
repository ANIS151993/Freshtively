import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/forms/Input";

export default function AuthPlaceholderPage({ title = "Account access" }: { title?: string }) {
  return (
    <Card className="w-full max-w-md">
      <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Phase 1 route</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        Authentication screens are wired as placeholders. Firebase auth and role authorization come next.
      </p>
      <div className="mt-6 space-y-4">
        <Input label="Email" placeholder="you@example.com" disabled />
        <Input label="Password" type="password" placeholder="Password" disabled />
        <Button className="w-full" disabled>
          Continue
        </Button>
      </div>
    </Card>
  );
}
