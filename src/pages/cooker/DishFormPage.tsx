import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/cards/Card";
import { Button } from "../../components/common/Button";
import { PageHeader } from "../../components/common/PageHeader";
import { Input } from "../../components/forms/Input";
import { Textarea } from "../../components/forms/Textarea";
import { useAuth } from "../../contexts/AuthContext";
import { createDish, getDishById, updateDish } from "../../services/dishService";
import type { Dish } from "../../types/firestore";

const initialForm = {
  name: "",
  description: "",
  cuisine: "",
  culture: "",
  category: "",
  ingredients: "",
  allergens: "",
  imageURL: "",
  price: "",
  quantityAvailable: "",
  preparationTimeMinutes: "",
};

export default function DishFormPage() {
  const { dishId } = useParams();
  const { currentUser, profile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = Boolean(dishId);

  useEffect(() => {
    if (!dishId) return;
    getDishById(dishId).then((dish) => {
      if (!dish) return;
      setForm({
        name: dish.name,
        description: dish.description,
        cuisine: dish.cuisine,
        culture: dish.culture,
        category: dish.category,
        ingredients: dish.ingredients.join(", "),
        allergens: dish.allergens.join(", "),
        imageURL: dish.imageURL,
        price: String(dish.price),
        quantityAvailable: String(dish.quantityAvailable),
        preparationTimeMinutes: String(dish.preparationTimeMinutes),
      });
    });
  }, [dishId]);

  function updateField(name: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!currentUser) return;
    setIsSubmitting(true);

    const payload: Omit<Dish, "dishId" | "createdAt" | "updatedAt"> = {
      cookerId: currentUser.uid,
      cookerName: profile?.fullName ?? "Freshtively cooker",
      name: form.name,
      description: form.description,
      cuisine: form.cuisine,
      culture: form.culture,
      category: form.category,
      ingredients: splitList(form.ingredients),
      allergens: splitList(form.allergens),
      imageURL: form.imageURL,
      price: Number(form.price) || 0,
      quantityAvailable: Number(form.quantityAvailable) || 0,
      preparationTimeMinutes: Number(form.preparationTimeMinutes) || 0,
      isAvailable: true,
      rating: 0,
      totalReviews: 0,
    };

    if (dishId) {
      await updateDish(dishId, payload);
    } else {
      await createDish(payload);
    }
    setIsSubmitting(false);
    navigate("/cooker/menu");
  }

  return (
    <section>
      <PageHeader
        eyebrow="Menu"
        title={isEdit ? "Edit dish" : "Add new dish"}
        description="Share your flavors with ingredients, pricing, quantity, and prep timing."
      />
      <Card className="mt-8">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <Input label="Dish name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
          <Input label="Category" value={form.category} onChange={(event) => updateField("category", event.target.value)} required />
          <Input label="Cuisine" value={form.cuisine} onChange={(event) => updateField("cuisine", event.target.value)} required />
          <Input label="Culture" value={form.culture} onChange={(event) => updateField("culture", event.target.value)} required />
          <Input label="Price" type="number" step="0.01" value={form.price} onChange={(event) => updateField("price", event.target.value)} required />
          <Input label="Daily quantity" type="number" value={form.quantityAvailable} onChange={(event) => updateField("quantityAvailable", event.target.value)} required />
          <Input label="Prep time minutes" type="number" value={form.preparationTimeMinutes} onChange={(event) => updateField("preparationTimeMinutes", event.target.value)} required />
          <Input label="Dish image URL" value={form.imageURL} onChange={(event) => updateField("imageURL", event.target.value)} placeholder="Storage URL or placeholder" />
          <div className="md:col-span-2">
            <Textarea label="Description" value={form.description} onChange={(event) => updateField("description", event.target.value)} required />
          </div>
          <Input label="Ingredients" value={form.ingredients} onChange={(event) => updateField("ingredients", event.target.value)} placeholder="Comma separated" />
          <Input label="Allergens" value={form.allergens} onChange={(event) => updateField("allergens", event.target.value)} placeholder="Comma separated" />
          <div className="md:col-span-2">
            <Button type="submit" isLoading={isSubmitting}>{isEdit ? "Save dish" : "Create dish"}</Button>
          </div>
        </form>
      </Card>
    </section>
  );
}

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}
