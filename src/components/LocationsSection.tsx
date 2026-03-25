import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { LOCATIONS, WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/config/brand";

const LocationsSection = () => {
  return (
    <section id="locations" className="bg-brand-dark py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            FIND <span className="text-primary">US</span>
          </h2>
          <p className="font-body text-muted-foreground">Two locations. One obsession.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.address}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-border p-8 md:p-10"
            >
              <h3 className="font-display text-2xl font-black text-primary mb-6 uppercase">{loc.name}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{loc.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{loc.hours}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">{loc.phone}</span>
                </div>
              </div>

              {/* Map embed */}
              <div className="aspect-video mb-6 bg-secondary overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${loc.coords.lng}!3d${loc.coords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Le Sandwich ${loc.name}`}
                />
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary text-primary-foreground font-display font-bold uppercase text-xs text-center py-3 flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-border text-foreground font-display font-bold uppercase text-xs text-center py-3 hover:border-primary hover:text-primary transition-all"
                >
                  @lesandwichshop
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
