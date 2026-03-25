import { useState } from "react";
import { motion } from "framer-motion";
import { MENU_ITEMS } from "@/config/menu";
import MenuItemCard from "./MenuItemCard";

const CATEGORIES = [
  { key: "burgers", label: "Burgers" },
  { key: "sandwiches", label: "Sandwiches" },
  { key: "other", label: "Other" },
  { key: "drinks", label: "Drinks" },
] as const;

const MenuSection = () => {
  const [active, setActive] = useState<string>("burgers");

  const filtered = MENU_ITEMS.filter((item) => item.category === active);

  return (
    <section id="menu" className="bg-brand-dark py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            THE <span className="text-primary">MENU</span>
          </h2>
          <p className="font-body text-muted-foreground text-base">
            Every item made fresh. Every order built by hand.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`font-display font-bold uppercase text-sm md:text-base px-5 py-2.5 transition-all border ${
                active === cat.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
