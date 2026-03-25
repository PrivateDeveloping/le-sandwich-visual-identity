import { INSTAGRAM_URL, WHATSAPP_NUMBER, LOCATIONS } from "@/config/brand";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-black mb-4 text-foreground">
              L<span className="italic text-primary">e</span> SANDWICH
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Bold flavors. Honest food.<br />Prishtinë-made.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Menu", href: "#menu" },
                { label: "About", href: "#about" },
                { label: "Specials", href: "#specials" },
                { label: "Locations", href: "#locations" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary mb-4">Contact</h4>
            <div className="flex flex-col gap-2 font-body text-sm text-muted-foreground">
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                WhatsApp: {WHATSAPP_NUMBER}
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                @lesandwichshop
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary mb-4">Locations</h4>
            <div className="flex flex-col gap-3 font-body text-sm text-muted-foreground">
              {LOCATIONS.map((loc) => (
                <div key={loc.address}>
                  <p>{loc.address}</p>
                  <p className="text-xs mt-0.5">{loc.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Le Sandwich / Happy Le Place. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
