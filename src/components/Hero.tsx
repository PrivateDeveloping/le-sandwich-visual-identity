import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/config/brand";
import heroBurger from "@/assets/hero-burger.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBurger}
          alt="Le Sandwich hero burger"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-display text-primary text-lg md:text-xl font-bold uppercase tracking-[0.2em] mb-4">
            Prishtinë, Kosovo
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-6">
            BUILT FOR
            <br />
            <span className="text-primary">HUNGER.</span>
          </h1>
          <p className="font-body text-muted-foreground text-base md:text-lg max-w-md mx-auto mb-10">
            Handcrafted burgers & baguettes in the heart of Prishtinë. No shortcuts. No compromises.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#menu"
              className="bg-foreground text-background font-display font-bold uppercase text-sm px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all w-full sm:w-[220px] text-center"
            >
              See the Menu
            </a>
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-display font-bold uppercase text-sm px-8 py-4 hover:brightness-110 transition-all w-full sm:w-[220px] text-center"
            >
              Order via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="text-primary animate-scroll-down" size={32} />
      </div>
    </section>
  );
};

export default Hero;
