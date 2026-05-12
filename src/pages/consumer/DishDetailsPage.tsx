import { Clock, ShoppingBag, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { useCart } from "../../contexts/CartContext";
import { getDishById } from "../../services/dishService";
import type { Dish } from "../../types/firestore";

const fallbackImage = "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=1200&q=80";

export default function DishDetailsPage() {
  const { dishId = "" } = useParams();
  const [dish, setDish] = useState<Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    getDishById(dishId)
      .then(setDish)
      .finally(() => setLoading(false));
  }, [dishId]);

  if (loading) return <LoadingSpinner label="Loading dish" />;
  if (!dish) return <Card>Dish not found.</Card>;

  return (
    <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <img alt={dish.name} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" src={dish.imageURL || fallbackImage} />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-saffron-dark">{dish.culture}</p>
        <h1 className="mt-3 text-4xl font-extrabold text-ink">{dish.name}</h1>
        <p className="mt-3 text-lg text-muted">{dish.cookerName}</p>
        <p className="mt-5 text-base leading-7 text-muted">{dish.description}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-muted">
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-ambient"><Clock size={16} /> {dish.preparationTimeMinutes} min</span>
          <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-ambient"><Star size={16} fill="currentColor" className="text-saffron" /> {dish.rating || "New"}</span>
          <span className="rounded-full bg-white px-4 py-2 shadow-ambient">{dish.quantityAvailable} available</span>
        </div>
        <Card className="mt-6">
          <h2 className="text-lg font-bold text-ink">Ingredients</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{dish.ingredients.join(", ") || "Not listed"}</p>
          <h2 className="mt-5 text-lg font-bold text-ink">Allergens</h2>
          <p className="mt-2 text-sm leading-6 text-muted">{dish.allergens.join(", ") || "No allergens listed"}</p>
        </Card>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="text-3xl font-extrabold text-clay">${dish.price.toFixed(2)}</span>
          <Button leftIcon={<ShoppingBag size={18} />} onClick={() => addItem(dish)}>Add to cart</Button>
          <Link to="/consumer/cart"><Button variant="secondary">Checkout</Button></Link>
        </div>
      </div>
    </section>
  );
}
