import { Link, useLocation } from "react-router-dom";
import { Bike, ArrowRight, X } from "lucide-react";
import { useActiveOrders } from "@/hooks/useActiveOrders";
import { removeActiveOrder } from "@/lib/activeOrders";

/**
 * Site-wide floating pill(s) linking back to any in-progress order's tracking
 * page. Lets a customer who closed the tab return to their live order without
 * an account. Hidden for the order whose tracking page is currently open.
 */
const TrackOrderPill = () => {
  const orders = useActiveOrders();
  const location = useLocation();

  // Don't show a pill for the order you're already looking at.
  const visible = orders.filter(
    (o) => location.pathname !== `/order/${o.trackingToken}`,
  );

  if (visible.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {visible.map((o) => (
        <div
          key={o.trackingToken}
          className="flex items-center gap-1 bg-primary text-primary-foreground shadow-lg shadow-black/20"
        >
          <Link
            to={`/order/${o.trackingToken}`}
            className="flex items-center gap-2 pl-3 pr-2 py-2.5 font-display font-bold uppercase text-xs tracking-wider hover:brightness-110 transition-all"
          >
            <Bike size={16} className="shrink-0" />
            <span>Track order #{o.orderNumber}</span>
            <ArrowRight size={14} className="shrink-0" />
          </Link>
          <button
            onClick={() => removeActiveOrder(o.trackingToken)}
            aria-label={`Dismiss tracking for order ${o.orderNumber}`}
            className="self-stretch px-2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-black/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TrackOrderPill;
