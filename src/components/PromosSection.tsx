import { motion } from "framer-motion";
import { PROMOS } from "@/config/brand";

const PromosSection = () => {
  const activePromos = PROMOS.filter((p) => p.active);

  return (
    <section id="specials" className="bg-primary py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black text-primary-foreground mb-4">
            SPECIALS
          </h2>
          <p className="font-body text-primary-foreground/70">Limited time. Don't sleep on these.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {activePromos.map((promo, i) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-primary-foreground p-8 md:p-10 text-center"
            >
              <h3 className="font-display text-3xl md:text-4xl font-black text-primary mb-2">
                {promo.title}
              </h3>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                {promo.subtitle}
              </p>
              <p className="font-body text-sm text-foreground">{promo.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromosSection;
