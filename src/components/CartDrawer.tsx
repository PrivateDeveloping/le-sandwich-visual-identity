import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER } from "@/config/brand";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, subtotal, totalItems, isDrawerOpen, setDrawerOpen } = useCart();

  const buildCartWhatsAppUrl = () => {
    if (items.length === 0) return "#";
    const lines = items.map(
      (ci) => `- ${ci.quantity} x ${ci.item.name} (${ci.item.price.toFixed(2)}€)`
    );
    const message = `Përshëndetje! Dua të porosis:\n\n${lines.join("\n")}\n\nTotal: ${subtotal.toFixed(2)}€\n\nFaleminderit!`;
    return `https://wa.me/${WHATSAPP_NUMBER.replace(/\s/g, "")}?text=${encodeURIComponent(message)}`;
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent side="right" className="bg-background border-border flex flex-col p-0 w-full sm:max-w-md">
        <SheetHeader className="p-5 border-b border-border shrink-0">
          <SheetTitle className="font-display text-xl font-black uppercase text-foreground">
            Your Order
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
              <ShoppingBag size={48} className="text-muted-foreground" />
              <p className="font-display text-lg font-bold uppercase text-muted-foreground">
                Your cart is empty
              </p>
              <p className="font-body text-sm text-muted-foreground">
                Start adding items!
              </p>
            </div>
          ) : (
            items.map((ci) => (
              <div key={ci.item.id} className="flex gap-3 border-b border-border pb-4">
                {ci.item.image && (
                  <img
                    src={ci.item.image}
                    alt={ci.item.name}
                    className="w-16 h-16 object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-sm font-bold uppercase text-foreground truncate">
                      {ci.item.name}
                    </h4>
                    <button
                      onClick={() => removeItem(ci.item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="font-body text-xs text-muted-foreground">
                    {ci.item.price.toFixed(2)}€ each
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center font-display font-bold text-foreground text-xs">
                        {ci.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                        className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-display font-bold text-primary text-sm">
                      {(ci.item.price * ci.quantity).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold uppercase text-foreground">
                Subtotal ({totalItems} items)
              </span>
              <span className="font-display text-xl font-black text-primary">
                {subtotal.toFixed(2)}€
              </span>
            </div>
            <p className="font-body text-xs text-muted-foreground">
              Prices in EUR. Order confirmed via WhatsApp.
            </p>
            <a
              href={buildCartWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-display font-bold uppercase text-sm py-3.5 hover:brightness-110 transition-all"
            >
              <MessageCircle size={18} />
              Order via WhatsApp
            </a>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
