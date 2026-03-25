import { motion } from "framer-motion";
import { INSTAGRAM_URL } from "@/config/brand";
import { MENU_ITEMS } from "@/config/menu";

const GallerySection = () => {
  // Pick items with images for the gallery
  const galleryImages = MENU_ITEMS.filter((item) => item.image && item.category !== "drinks").slice(0, 8);

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            THE <span className="text-primary">FEED</span>
          </h2>
          <p className="font-body text-muted-foreground">Straight from our kitchen to your screen.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {galleryImages.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square overflow-hidden group cursor-pointer relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                width={800}
                height={800}
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="font-display text-sm font-bold uppercase text-primary">{item.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-primary text-primary font-display font-bold uppercase text-sm px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Follow @lesandwichshop
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
