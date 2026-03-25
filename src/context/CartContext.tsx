import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { MenuItem } from "@/config/brand";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const addToCart = useCallback((item: MenuItem, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
        );
      }
      return [...prev, { item, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
      );
    }
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeItem, clearCart, totalItems, subtotal, isDrawerOpen, setDrawerOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};
