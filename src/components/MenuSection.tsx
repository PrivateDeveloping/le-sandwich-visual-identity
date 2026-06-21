import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import MenuItemCard from "./MenuItemCard";

const CATEGORIES = [
  { key: "burgers", label: "Burgers" },
  { key: "sandwiches", label: "Sandwiches" },
  { key: "other", label: "Other" },
  { key: "drinks", label: "Drinks" },
] as const;

const MenuSection = () => {
  const [active, setActive] = useState<string>("burgers");
  const { data: items, isLoading, isError } = useMenu();

  const filtered = (items ?? []).filter((item) => item.category === active);

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

        {/* States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="font-body text-sm">Loading menu…</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center max-w-md mx-auto">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <p className="font-display font-bold uppercase text-foreground">
              Couldn't load menu
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Please check your connection and try again. You can still order via WhatsApp.
            </p>
          </div>
        )}

        {/* Items grid */}
        {!isLoading && !isError && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
