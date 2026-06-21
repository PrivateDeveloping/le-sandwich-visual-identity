import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { MENU_ITEMS } from "@/config/menu";
import { buildViberTestUrl, buildWhatsAppUrl, VIBER_TEST_ITEM_ID } from "@/config/brand";

const FEATURED_IDS = ["le-burger", "steak", "le-chicken", "vegetarian"];

const FeaturedSection = () => {
  const featured = MENU_ITEMS.filter((item) => FEATURED_IDS.includes(item.id));

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
            const showViberTest = item.id === VIBER_TEST_ITEM_ID;

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
                    <a
                      href={buildWhatsAppUrl(item.name, 1)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-primary-foreground font-display font-bold uppercase text-sm px-6 py-3 flex items-center gap-2 hover:brightness-110 transition-all"
                    >
                      <MessageCircle size={16} />
                      Order Now
                    </a>
                    {showViberTest && (
                      <a
                        href={buildViberTestUrl(item.name, 1)}
                        className="border border-border text-foreground font-display font-bold uppercase text-sm px-6 py-3 flex items-center gap-2 hover:border-primary hover:text-primary transition-all"
                      >
                        <MessageCircle size={16} />
                        Try on Viber
                      </a>
                    )}
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
