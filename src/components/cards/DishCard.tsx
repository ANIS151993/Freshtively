import { Clock, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button";
import { Card } from "./Card";
import type { Dish } from "../../types/firestore";

const fallbackImage = "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80";

export function DishCard({ dish, onAdd }: { dish: Dish; onAdd: (dish: Dish) => void }) {
  return (
    <Card className="group overflow-hidden p-0 transition hover:border-emerald">
      <Link to={`/consumer/dishes/${dish.dishId}`}>
        <img
          alt={dish.name}
          className="h-48 w-full object-cover transition duration-200 group-hover:scale-[1.02]"
          src={dish.imageURL || fallbackImage}
        />
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/consumer/dishes/${dish.dishId}`} className="text-lg font-extrabold text-ink hover:text-emerald">
              {dish.name}
            </Link>
            <p className="mt-1 text-sm text-muted">{dish.cookerName}</p>
          </div>
          <span className="text-lg font-extrabold text-ink">${dish.price.toFixed(2)}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-muted">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {dish.preparationTimeMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} fill="currentColor" className="text-saffron" /> {dish.rating || "New"}
          </span>
          <span>{dish.culture}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#eef1ee] pt-4 text-xs font-bold text-muted">
          <span>{dish.cuisine}</span>
          <span>{dish.category}</span>
        </div>
        <Button className="mt-5 w-full" leftIcon={<Plus size={17} />} onClick={() => onAdd(dish)}>
          Add to cart
        </Button>
      </div>
    </Card>
  );
}
