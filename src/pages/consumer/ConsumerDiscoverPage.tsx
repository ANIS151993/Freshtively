import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DishCard } from "../../components/cards/DishCard";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/forms/Input";
import { useCart } from "../../contexts/CartContext";
import { getAvailableDishes } from "../../services/dishService";
import type { Dish } from "../../types/firestore";

export default function ConsumerDiscoverPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    getAvailableDishes()
      .then(setDishes)
      .catch(() => setError("Unable to load dishes. Check Firestore rules and indexes."))
      .finally(() => setLoading(false));
  }, []);

  const filteredDishes = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return dishes;
    return dishes.filter((dish) =>
      [dish.name, dish.cookerName, dish.cuisine, dish.culture, dish.category].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [dishes, query]);

  return (
    <section>
      <PageHeader
        eyebrow="Food search"
        title="Discover homemade food"
        description="Search available dishes from Firestore by dish, cooker, cuisine, culture, or category."
      />
      <div className="mt-6 max-w-xl">
        <Input
          label="Search"
          placeholder="Biryani, Bengali, Ayesha"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading dishes" /><div className="mt-5"><LoadingSkeleton rows={3} /></div></div> : null}
      {error ? <p className="mt-8 rounded-2xl bg-clay-soft px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}
      {!loading && !error && filteredDishes.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No dishes found" description="Seed demo data or adjust your search filters." icon={<Search />} />
        </div>
      ) : null}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredDishes.map((dish) => (
          <DishCard key={dish.dishId} dish={dish} onAdd={addItem} />
        ))}
      </div>
    </section>
  );
}
