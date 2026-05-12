import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Dish } from "../types/firestore";

export interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (dish: Dish) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(dish: Dish) {
    setItems((current) => {
      const existing = current.find((item) => item.dish.dishId === dish.dishId);
      if (existing) {
        return current.map((item) =>
          item.dish.dishId === dish.dishId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { dish, quantity: 1 }];
    });
  }

  function removeItem(dishId: string) {
    setItems((current) => current.filter((item) => item.dish.dishId !== dishId));
  }

  function updateQuantity(dishId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(dishId);
      return;
    }

    setItems((current) =>
      current.map((item) => (item.dish.dishId === dishId ? { ...item, quantity } : item)),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(() => {
    const subtotal = items.reduce((total, item) => total + item.dish.price * item.quantity, 0);
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return {
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
