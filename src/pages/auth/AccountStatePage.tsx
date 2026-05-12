import { Link, useLocation } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";

export default function AccountStatePage({
  title,
  description,
  actionLabel = "Back home",
  actionTo = "/",
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  const location = useLocation();
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo ?? actionTo;

  return (
    <Card className="w-full max-w-lg text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">Account status</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      <Link className="mt-6 inline-flex" to={returnTo}>
        <Button>{actionLabel}</Button>
      </Link>
    </Card>
  );
}
