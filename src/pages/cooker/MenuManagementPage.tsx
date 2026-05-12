import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import { LoadingSkeleton } from "../../components/common/LoadingSkeleton";
import { PageHeader } from "../../components/common/PageHeader";
import { useAuth } from "../../contexts/AuthContext";
import { deleteDish, getCookerDishes, updateDish } from "../../services/dishService";
import type { Dish } from "../../types/firestore";

export default function MenuManagementPage() {
  const { currentUser } = useAuth();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getCookerDishes(currentUser.uid).then(setDishes).finally(() => setLoading(false));
  }, [currentUser]);

  async function toggleDish(dish: Dish) {
    await updateDish(dish.dishId, { isAvailable: !dish.isAvailable });
    setDishes((current) => current.map((item) => item.dishId === dish.dishId ? { ...item, isAvailable: !item.isAvailable } : item));
  }

  async function removeDish(dishId: string) {
    await deleteDish(dishId);
    setDishes((current) => current.filter((dish) => dish.dishId !== dishId));
  }

  return (
    <section>
      <PageHeader
        eyebrow="Menu"
        title="Menu management"
        description="Create, update, preview, and manage daily quantity for homemade dishes."
        action={<Link to="/cooker/menu/new"><Button leftIcon={<Plus size={18} />}>Add dish</Button></Link>}
      />
      {loading ? <div className="mt-8"><LoadingSpinner label="Loading dishes" /><div className="mt-5"><LoadingSkeleton rows={3} /></div></div> : null}
      {!loading && dishes.length === 0 ? <div className="mt-8"><EmptyState title="No dishes listed" description="Add your first dish to start building your kitchen menu." /></div> : null}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {dishes.map((dish) => (
          <Card key={dish.dishId}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-ink">{dish.name}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{dish.description}</p>
                <p className="mt-3 text-sm font-bold text-clay">${dish.price.toFixed(2)} · {dish.quantityAvailable} available</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${dish.isAvailable ? "bg-emerald-soft text-emerald" : "bg-clay-soft text-clay"}`}>
                {dish.isAvailable ? "Available" : "Hidden"}
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to={`/cooker/menu/${dish.dishId}/edit`}><Button variant="secondary" leftIcon={<Edit size={16} />}>Edit</Button></Link>
              <Link to={`/cooker/menu/${dish.dishId}/preview`}><Button variant="ghost">Preview</Button></Link>
              <Button variant="ghost" onClick={() => void toggleDish(dish)}>{dish.isAvailable ? "Hide" : "Show"}</Button>
              <Button variant="danger" leftIcon={<Trash2 size={16} />} onClick={() => void removeDish(dish.dishId)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
