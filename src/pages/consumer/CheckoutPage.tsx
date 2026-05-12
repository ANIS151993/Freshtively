import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { createNotification, createOrder } from "../../services/firestoreService";

export default function CheckoutPage() {
  const { currentUser, profile } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const deliveryFee = items.length ? 4.99 : 0;
  const serviceFee = subtotal * 0.08;
  const tax = subtotal * 0.08875;
  const total = subtotal + deliveryFee + serviceFee + tax;

  async function placeOrder(event: FormEvent) {
    event.preventDefault();
    if (!currentUser || !profile || items.length === 0) return;
    setError("");
    setIsSubmitting(true);

    try {
      const firstDish = items[0].dish;
      const orderId = await createOrder({
        consumerId: currentUser.uid,
        consumerName: profile.fullName,
        cookerId: firstDish.cookerId,
        cookerName: firstDish.cookerName,
        deliveryPersonId: "",
        deliveryPersonName: "",
        items: items.map((item) => ({
          dishId: item.dish.dishId,
          name: item.dish.name,
          quantity: item.quantity,
          price: item.dish.price,
        })),
        status: "placed",
        subtotal,
        deliveryFee,
        serviceFee,
        tax,
        cookerTip: 0,
        deliveryTip: 0,
        total,
        deliveryAddress: address,
        pickupAddress: "Cooker pickup address shown after acceptance",
        estimatedReadyTime: "Pending cooker acceptance",
        paymentStatus: "pending",
      });

      await createNotification({
        userId: currentUser.uid,
        title: "Order placed",
        message: notes ? `Your order was placed. Note: ${notes}` : "Your order was placed and is waiting for cooker acceptance.",
        type: "order",
        isRead: false,
        relatedOrderId: orderId,
      });

      clearCart();
      navigate(`/consumer/orders/${orderId}`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to place order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="Checkout"
        title="Finalize your order"
        description="Payment is a placeholder for now. This creates a Firestore order and notification."
      />
      <form className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]" onSubmit={placeOrder}>
        <Card className="space-y-4">
          <Input label="Delivery address" value={address} onChange={(event) => setAddress(event.target.value)} required />
          <Textarea label="Order notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Gate code, allergies, preferred handoff..." />
          <Card className="bg-saffron-soft">
            <h2 className="font-bold text-ink">Payment placeholder</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Real payment processing is intentionally not integrated yet.</p>
          </Card>
          {error ? <p className="rounded-2xl bg-clay-soft px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-ink">Review</h2>
          {items.map((item) => (
            <div key={item.dish.dishId} className="mt-4 flex justify-between gap-4 text-sm">
              <span className="text-muted">{item.quantity} x {item.dish.name}</span>
              <span className="font-bold text-ink">${(item.quantity * item.dish.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-5 border-t border-[#bbcabf] pt-5 text-lg font-extrabold text-ink">
            Total ${total.toFixed(2)}
          </div>
          <Button className="mt-6 w-full" type="submit" isLoading={isSubmitting} disabled={items.length === 0}>
            Place order
          </Button>
        </Card>
      </form>
    </section>
  );
}
