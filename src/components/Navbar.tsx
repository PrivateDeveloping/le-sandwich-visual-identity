import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { buildGeneralWhatsAppUrl } from "@/config/brand";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Specials", href: "#specials" },
  { label: "Locations", href: "#locations" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="font-display text-2xl md:text-3xl font-black tracking-tight text-foreground">
          L<span className="italic text-primary">e</span> SANDWICH
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={openCart}
            className="relative text-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground font-display font-bold text-[10px] w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground font-display font-bold uppercase text-sm px-5 py-2.5 hover:brightness-110 transition-all"
          >
            Order Now
          </a>
        </div>

        {/* Mobile right side */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={openCart}
            className="relative text-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground font-display font-bold text-[10px] w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-lg font-bold uppercase text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-display font-bold uppercase text-center py-3 mt-2"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
