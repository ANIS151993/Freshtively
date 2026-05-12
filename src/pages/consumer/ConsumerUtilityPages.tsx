import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChefHat, CreditCard, Heart, Map, MapPin, RotateCcw, ShieldCheck, Star } from "lucide-react";
import { Card } from "../../components/cards/Card";
import { DishCard } from "../../components/cards/DishCard";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import {
  createReview,
  getAvailableDishes,
  getAvailableDishesByCategory,
  getConsumerOrders,
  getCookerDishes,
  getCookerProfile,
} from "../../services/firestoreService";
import { getFeaturedCookers } from "../../services/userService";
import type { CookerProfile, Dish, Order } from "../../types/firestore";

const categories = ["Dinner", "Lunch", "Breakfast", "Dessert", "Snack", "Family meal"];

export function FoodCategoryPage() {
  const { category = "" } = useParams();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const load = category ? getAvailableDishesByCategory(category) : getAvailableDishes();
    load.then(setDishes).finally(() => setLoading(false));
  }, [category]);

  return (
    <section>
      <PageHeader eyebrow="Category" title={category || "Food categories"} description="Browse dishes by food category." />
      {!category ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <Link key={item} to={`/consumer/categories/${item}`}>
              <Card className="transition hover:-translate-y-1 hover:shadow-lift">
                <ChefHat className="text-emerald" />
                <h2 className="mt-4 text-xl font-bold text-ink">{item}</h2>
              </Card>
            </Link>
          ))}
        </div>
      ) : null}
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading category" /></div> : null}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => <DishCard key={dish.dishId} dish={dish} onAdd={addItem} />)}
      </div>
    </section>
  );
}

export function NearbyCookersPage() {
  const [cookers, setCookers] = useState<CookerProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedCookers().then(setCookers).finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <PageHeader eyebrow="Nearby cookers" title="Verified household kitchens" description="Cooker discovery is based on approved, available cooker profiles." />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading cookers" /></div> : null}
      {!loading && cookers.length === 0 ? <div className="mt-8"><EmptyState title="No cookers found" description="Seed demo data or approve cookers in Firestore." /></div> : null}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cookers.map((cooker) => (
          <Link key={cooker.uid} to={`/consumer/cookers/${cooker.uid}`}>
            <Card className="h-full transition hover:-translate-y-1 hover:shadow-lift">
              <ChefHat className="text-emerald" />
              <h2 className="mt-5 text-xl font-bold text-ink">{cooker.uid}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{cooker.culturalCookingBackground}</p>
              <p className="mt-4 text-sm font-bold text-saffron-dark">{cooker.totalOrders} orders · {cooker.rating} rating</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function NearbyMapPage() {
  return (
    <section>
      <PageHeader eyebrow="Map placeholder" title="Nearby cooker map" description="Real map integration is intentionally deferred. This placeholder reserves the consumer map workflow." />
      <Card className="mt-8 grid min-h-[420px] place-items-center bg-emerald-soft text-center">
        <div>
          <Map className="mx-auto text-emerald" size={56} />
          <h2 className="mt-5 text-2xl font-bold text-ink">Map tracking placeholder</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Future integration can use a map provider to show nearby cookers and delivery progress.</p>
        </div>
      </Card>
    </section>
  );
}

export function CookerProfilePage() {
  const { cookerId = "" } = useParams();
  const [cooker, setCooker] = useState<CookerProfile | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    Promise.all([getCookerProfile(cookerId), getCookerDishes(cookerId)])
      .then(([profile, cookerDishes]) => {
        setCooker(profile);
        setDishes(cookerDishes);
      })
      .finally(() => setLoading(false));
  }, [cookerId]);

  if (loading) return <LoadingSpinner label="Loading cooker" />;
  if (!cooker) return <Card>Cooker not found.</Card>;

  return (
    <section>
      <PageHeader eyebrow="Cooker profile" title={cooker.uid} description={cooker.culturalCookingBackground} />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card><Star className="text-saffron" /><p className="mt-3 text-2xl font-bold text-ink">{cooker.rating}</p><p className="text-sm text-muted">Rating</p></Card>
        <Card><Heart className="text-clay" /><p className="mt-3 text-2xl font-bold text-ink">{cooker.totalOrders}</p><p className="text-sm text-muted">Orders</p></Card>
        <Card><ShieldCheck className="text-emerald" /><p className="mt-3 text-2xl font-bold text-ink">{cooker.verificationStatus}</p><p className="text-sm text-muted">Verification</p></Card>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => <DishCard key={dish.dishId} dish={dish} onAdd={addItem} />)}
      </div>
    </section>
  );
}

export function CheckoutStepPage({ step }: { step: "address" | "payment" | "review" | "confirmation" }) {
  const title = step === "address" ? "Checkout address" : step === "payment" ? "Checkout payment" : step === "review" ? "Checkout review" : "Order confirmation";
  return (
    <section>
      <PageHeader eyebrow="Checkout" title={title} description="This step is represented in the main checkout workflow. Payment remains a placeholder." />
      <Card className="mt-8">
        <CreditCard className="text-emerald" />
        <p className="mt-4 text-sm leading-6 text-muted">Use the main checkout screen to place a Firestore order.</p>
        <Link className="mt-5 inline-flex" to="/consumer/checkout"><Button>Open checkout</Button></Link>
      </Card>
    </section>
  );
}

export function ReorderPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    getConsumerOrders(currentUser.uid).then(setOrders);
  }, [currentUser]);

  return (
    <section>
      <PageHeader eyebrow="Reorder" title="Order again" description="Add items from previous orders back into your current cart when dish data is available." />
      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <Card key={order.orderId}>
            <h2 className="text-lg font-bold text-ink">{order.cookerName}</h2>
            <p className="mt-2 text-sm text-muted">{order.items.map((item) => `${item.quantity} x ${item.name}`).join(", ")}</p>
            <Link className="mt-4 inline-flex" to="/consumer/discover">
              <Button variant="secondary" leftIcon={<RotateCcw size={16} />}>Find these dishes again</Button>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function RatingReviewPage() {
  const { orderId = "" } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [cookerRating, setCookerRating] = useState("5");
  const [deliveryRating, setDeliveryRating] = useState("5");
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    getConsumerOrders(currentUser.uid).then((orders) => {
      setOrder(orders.find((item) => item.orderId === orderId) ?? null);
    });
  }, [currentUser, orderId]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentUser) return;
    setIsSubmitting(true);
    await createReview({
      orderId,
      consumerId: currentUser.uid,
      cookerId: order?.cookerId ?? "",
      deliveryPersonId: order?.deliveryPersonId ?? "",
      cookerRating: Number(cookerRating),
      deliveryRating: Number(deliveryRating),
      cookerReview: review,
      deliveryReview: review,
    });
    setIsSubmitting(false);
    navigate(`/consumer/orders/${orderId}`);
  }

  return (
    <section>
      <PageHeader eyebrow="Rating" title="Rate and review" description="Submit a Firestore review for your order." />
      <Card className="mt-8 max-w-2xl">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Cooker rating" type="number" min="1" max="5" value={cookerRating} onChange={(event) => setCookerRating(event.target.value)} />
          <Input label="Delivery rating" type="number" min="1" max="5" value={deliveryRating} onChange={(event) => setDeliveryRating(event.target.value)} />
          <Textarea label="Review" value={review} onChange={(event) => setReview(event.target.value)} />
          <Button type="submit" isLoading={isSubmitting}>Submit review</Button>
        </form>
      </Card>
    </section>
  );
}

export function ConsumerSettingsPage({ kind }: { kind: "addresses" | "payment-methods" | "dietary" | "privacy" }) {
  const titleMap = {
    addresses: "Address management",
    "payment-methods": "Payment methods placeholder",
    dietary: "Dietary and allergy settings",
    privacy: "Privacy settings",
  };
  return (
    <section>
      <PageHeader eyebrow="Settings" title={titleMap[kind]} description="Settings UI placeholder for the consumer account workflow." />
      <Card className="mt-8 max-w-2xl">
        <MapPin className="text-emerald" />
        <p className="mt-4 text-sm leading-6 text-muted">This screen reserves the workflow and will be connected to editable profile data in a later pass.</p>
      </Card>
    </section>
  );
}
