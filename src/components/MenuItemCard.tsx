import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";
import type { MenuItem } from "@/config/brand";
import { useCart } from "@/context/CartContext";

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item, qty);
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1200);
  };

  const tagColors: Record<string, string> = {
    "Best Seller": "bg-primary text-primary-foreground",
    "Staff Pick": "bg-foreground text-background",
    "Vegetarian": "bg-green-600 text-foreground",
    "New": "bg-red-600 text-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border group hover:border-primary/50 transition-colors"
    >
      {item.image && (
        <div className="aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={800}
            height={800}
          />
        </div>
      )}
      <div className="p-4 md:p-5">
        {item.tags && (
          <div className="flex gap-2 mb-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`font-display text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${tagColors[tag] || "bg-secondary text-secondary-foreground"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg md:text-xl font-black uppercase leading-tight text-foreground">
            {item.name}
          </h3>
          <span className="font-display text-xl font-black text-primary whitespace-nowrap">
            {item.price.toFixed(2)}€
          </span>
        </div>

        <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Qty + Add to Cart */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-display font-bold text-foreground text-sm">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className={`flex-1 font-display font-bold uppercase text-xs text-center py-2.5 flex items-center justify-center gap-2 transition-all ${
              added
                ? "bg-green-600 text-foreground"
                : "bg-primary text-primary-foreground hover:brightness-110"
            }`}
          >
            {added ? (
              <>
                <Check size={14} />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
