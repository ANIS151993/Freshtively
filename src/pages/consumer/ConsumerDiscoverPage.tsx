import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DishCard } from "../../components/cards/DishCard";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
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
      <div className="rounded-lg border border-[#d8dfd8] bg-white p-4 shadow-sm md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_260px_auto]">
          <label className="flex min-h-14 items-center gap-3 rounded-lg border border-[#d8dfd8] bg-[#fbfcfa] px-4">
            <Search className="text-emerald" size={20} />
            <input
              className="w-full border-0 bg-transparent text-base font-semibold text-ink outline-none placeholder:text-muted"
              placeholder="Search dishes, cookers, cuisines"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="flex min-h-14 items-center gap-3 rounded-lg border border-[#d8dfd8] bg-[#fbfcfa] px-4 text-sm font-semibold text-muted">
            <MapPin className="text-emerald" size={20} />
            Nearby kitchens
          </div>
          <button className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-[#d8dfd8] bg-white px-5 text-sm font-bold text-ink shadow-sm hover:border-emerald hover:text-emerald">
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Fast prep", "Bangladeshi", "Vegetarian", "Family meals", "Top rated"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-[#d8dfd8] bg-white px-4 py-2 text-sm font-bold text-muted hover:border-emerald hover:text-emerald"
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading dishes" /><div className="mt-5"><LoadingSkeleton rows={3} /></div></div> : null}
      {error ? <p className="mt-8 rounded-lg bg-clay-soft px-4 py-3 text-sm font-semibold text-clay">{error}</p> : null}
      {!loading && !error && filteredDishes.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="No dishes found" description="Seed demo data or adjust your search filters." icon={<Search />} />
        </div>
      ) : null}
      {!loading && !error && filteredDishes.length > 0 ? (
        <div className="mt-8 flex items-end justify-between gap-4 border-b border-[#d8dfd8] pb-4">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-emerald">Available now</p>
            <h1 className="mt-1 text-2xl font-extrabold text-ink">Homemade food near you</h1>
          </div>
          <p className="text-sm font-bold text-muted">{filteredDishes.length} results</p>
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
