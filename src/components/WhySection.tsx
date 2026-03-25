import { motion } from "framer-motion";

const STATEMENTS = [
  "Real ingredients, no compromise.",
  "Built by hand, every order.",
  "Two locations across Prishtinë.",
  "Bold flavors since day one.",
  "Your local sandwich obsession.",
];

const WhySection = () => {
  return (
    <section className="bg-brand-dark py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black">
            WHY <span className="text-primary">LE SANDWICH</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4">
          {STATEMENTS.map((stmt, i) => (
            <motion.div
              key={stmt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border p-6 md:p-8 text-center hover:border-primary transition-colors"
            >
              <span className="font-display text-4xl md:text-5xl font-black text-primary block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-base md:text-lg font-bold uppercase leading-tight text-foreground">
                {stmt}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
