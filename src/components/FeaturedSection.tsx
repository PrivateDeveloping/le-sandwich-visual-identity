import { motion } from "framer-motion";
import { ShoppingBag, Lock } from "lucide-react";
import type { MenuItem } from "@/config/brand";
import { useMenu } from "@/hooks/useMenu";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/hooks/useSettings";

const FEATURED_IDS = ["le-burger", "steak", "le-chicken", "vegetarian"];

const FeaturedSection = () => {
  const { data: items } = useMenu();
  const { addItem, openCart } = useCart();
  const { canOrder } = useSettings();

  // Pull the curated picks from the live menu so prices/availability stay in
  // sync with admin edits. Keep FEATURED_IDS order; skip any that are missing
  // (e.g. archived or not yet loaded).
  const featured = FEATURED_IDS.map((id) => items?.find((i) => i.id === id)).filter(
    (i): i is MenuItem => Boolean(i),
  );

  const handleOrder = (item: MenuItem) => {
    if (!canOrder) return;
    addItem(item, 1);
    openCart();
  };

  // Nothing to show yet (still loading) or none of the picks resolved.
  if (featured.length === 0) return null;

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            SIGNATURE <span className="text-primary">PICKS</span>
          </h2>
          <p className="font-body text-muted-foreground">The ones everybody's talking about.</p>
        </motion.div>

        <div className="space-y-6">
          {featured.map((item, i) => {
            return (
              <motion.div
                key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`grid md:grid-cols-2 gap-0 border border-border hover:border-primary/50 transition-colors ${
                i % 2 === 1 ? "md:direction-rtl" : ""
              }`}
            >
              <div
                className={`aspect-[16/10] md:aspect-[4/3] overflow-hidden ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
              <div className={`p-8 md:p-12 flex flex-col justify-center bg-card ${i % 2 === 1 ? "md:order-1" : ""}`}>
                {item.tags && (
                  <div className="flex gap-2 mb-3">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-primary text-primary-foreground font-display text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
	                <h3 className="font-display text-3xl md:text-5xl font-black uppercase mb-3 text-foreground">{item.name}</h3>
	                <p className="font-body text-muted-foreground text-base md:text-lg mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-display text-3xl md:text-4xl font-black text-primary">{item.price.toFixed(2)}€</span>
                    <button
                      onClick={() => handleOrder(item)}
                      disabled={!canOrder}
                      className={`font-display font-bold uppercase text-sm px-6 py-3 flex items-center gap-2 transition-all disabled:cursor-not-allowed ${
                        canOrder
                          ? "bg-primary text-primary-foreground hover:brightness-110"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {canOrder ? (
                        <>
                          <ShoppingBag size={16} />
                          Order Now
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          Unavailable
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
