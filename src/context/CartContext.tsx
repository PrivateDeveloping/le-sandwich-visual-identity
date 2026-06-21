import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  buildCartWhatsAppUrl,
  type MenuItem,
} from "@/config/brand";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartContextValue = {
  cartItems: CartItem[];
  totalItems: number;
  subtotal: number;
  cartUrl: string;
  isCartOpen: boolean;
  addItem: (item: MenuItem, quantity: number) => void;
  incrementItem: (itemId: string) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addItem = (item: MenuItem, quantity: number) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((entry) => entry.item.id === item.id);

      if (existingItem) {
        return currentItems.map((entry) =>
          entry.item.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        );
      }

      return [...currentItems, { item, quantity }];
    });
  };

  const incrementItem = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.map((entry) =>
        entry.item.id === itemId
          ? { ...entry, quantity: entry.quantity + 1 }
          : entry,
      ),
    );
  };

  const decrementItem = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.flatMap((entry) => {
        if (entry.item.id !== itemId) {
          return [entry];
        }

        if (entry.quantity === 1) {
          return [];
        }

        return [{ ...entry, quantity: entry.quantity - 1 }];
      }),
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((entry) => entry.item.id !== itemId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0,
  );
  const cartUrl = buildCartWhatsAppUrl(
    cartItems.map((entry) => ({
      name: entry.item.name,
      price: entry.item.price,
      quantity: entry.quantity,
    })),
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        cartUrl,
        isCartOpen,
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
