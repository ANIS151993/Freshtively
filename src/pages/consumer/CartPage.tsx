import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { PageHeader } from "../../components/common/PageHeader";
import { useCart } from "../../contexts/CartContext";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const deliveryFee = items.length ? 4.99 : 0;
  const serviceFee = subtotal * 0.08;
  const tax = subtotal * 0.08875;
  const total = subtotal + deliveryFee + serviceFee + tax;

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add homemade dishes from discovery before checkout."
        actionLabel="Discover food"
        onAction={() => {
          window.location.href = "/consumer/discover";
        }}
      />
    );
  }

  return (
    <section>
      <PageHeader eyebrow="Cart" title="Review your order" description="Payment is a placeholder in this phase." />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.dish.dishId}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-ink">{item.dish.name}</h2>
                  <p className="mt-1 text-sm text-muted">{item.dish.cookerName}</p>
                  <p className="mt-2 text-sm font-bold text-clay">${item.dish.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => updateQuantity(item.dish.dishId, item.quantity - 1)}>
                    <Minus size={16} />
                  </Button>
                  <span className="w-8 text-center font-bold text-ink">{item.quantity}</span>
                  <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => updateQuantity(item.dish.dishId, item.quantity + 1)}>
                    <Plus size={16} />
                  </Button>
                  <Button variant="ghost" className="h-10 w-10 p-0 text-clay" onClick={() => removeItem(item.dish.dishId)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <h2 className="text-xl font-bold text-ink">Order summary</h2>
          <SummaryRow label="Subtotal" value={subtotal} />
          <SummaryRow label="Delivery" value={deliveryFee} />
          <SummaryRow label="Service fee" value={serviceFee} />
          <SummaryRow label="Tax" value={tax} />
          <div className="mt-4 border-t border-[#bbcabf] pt-4">
            <SummaryRow label="Total" value={total} strong />
          </div>
          <Link to="/consumer/checkout">
            <Button className="mt-6 w-full">Continue to checkout</Button>
          </Link>
        </Card>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className={`mt-3 flex items-center justify-between ${strong ? "text-lg font-extrabold text-ink" : "text-sm text-muted"}`}>
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}
