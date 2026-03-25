import { motion } from "framer-motion";
import mascot from "@/assets/mascot.png";

const About = () => {
  return (
    <section id="about" className="bg-background py-20 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.95]">
              WE DON'T DO{" "}
              <span className="text-primary">AVERAGE.</span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                This is <strong className="text-foreground">Le Sandwich</strong>. Take it or leave it.
              </p>
              <p>
                Every sandwich built by hand. Every ingredient chosen with obsession.
                No shortcuts on flavor. No compromises on quality.
              </p>
              <p>
                Bold flavors. Honest food. <span className="text-primary font-semibold">Prishtinë-made.</span>
              </p>
              <p>
                Two spots in Prishtinë — one sandwich at a time.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Local Pride", "Global Taste", "Handcrafted", "No Shortcuts"].map((tag) => (
                <span
                  key={tag}
                  className="border border-primary text-primary font-display font-bold uppercase text-xs px-4 py-2 tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mascot */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={mascot}
              alt="Le Sandwich mascot"
              className="w-64 md:w-80 lg:w-96"
              loading="lazy"
              width={512}
              height={768}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
