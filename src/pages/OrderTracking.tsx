import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Clock,
  ChefHat,
  Truck,
  PackageCheck,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useOrderTracking, type TrackedOrder, type OrderStatus } from "@/hooks/useOrderTracking";
import { STATUS_COPY, TIMELINE_STEPS, TIMELINE_LABELS } from "@/config/orderStatus";
import { ApiError, NetworkError } from "@/lib/api";

const STATUS_ICON: Record<OrderStatus, typeof Clock> = {
  PENDING: Clock,
  ACCEPTED: Check,
  IN_PROGRESS: ChefHat,
  READY: PackageCheck,
  OUT_FOR_DELIVERY: Truck,
  DELIVERED: PackageCheck,
  CANCELLED: XCircle,
  DECLINED: AlertCircle,
};

export default function OrderTracking() {
  const { trackingToken } = useParams<{ trackingToken: string }>();
  const { order, isLoading, isError, cancel, isCancelling } = useOrderTracking(trackingToken);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  // -------- Loading state --------
  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="font-body text-sm">Loading your order…</p>
        </div>
      </Layout>
    );
  }

  // -------- Not found / error state --------
  if (isError || !order) {
    return (
      <Layout>
        <div className="text-center py-20 max-w-md mx-auto space-y-4">
          <div className="mx-auto h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-7 w-7 text-destructive" />
          </div>
          <h1 className="font-display text-3xl font-black uppercase">
            Order not found
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            We couldn't find this order. The link may be incorrect or the order may have been removed.
          </p>
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to menu
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const copy = STATUS_COPY[order.status];
  const canCancel = order.status === "PENDING" || order.status === "ACCEPTED";
  const isTerminal = copy.terminal;

  const handleCancel = async () => {
    try {
      await cancel();
      toast.success("Order cancelled.");
      setCancelConfirmOpen(false);
    } catch (err) {
      if (err instanceof NetworkError) {
        toast.error("Couldn't reach the kitchen. Try again.");
      } else if (err instanceof ApiError) {
        toast.error(err.message);
      } else {
        toast.error("Failed to cancel. Try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-1">
          <p className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Order #{order.orderNumber}
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Placed {formatTime(order.placedAt)}
          </p>
        </header>

        {/* Status banner — the headline message */}
        <StatusBanner order={order} />

        {/* Timeline (hidden for declined orders that never made it past pending) */}
        {order.status !== "DECLINED" && (
          <Timeline order={order} />
        )}

        {/* Decline reason (when declined) */}
        {order.status === "DECLINED" && order.declineReason && (
          <div className="bg-destructive/5 border border-destructive/20 p-4 space-y-1">
            <p className="font-display text-xs font-bold uppercase text-destructive">
              Reason
            </p>
            <p className="font-body text-sm text-foreground">{order.declineReason}</p>
          </div>
        )}

        {/* Items */}
        <OrderItems order={order} />

        {/* Delivery info */}
        <DeliveryInfo order={order} />

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          {canCancel && (
            <Button
              variant="outline"
              size="lg"
              className="w-full font-display font-bold uppercase border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setCancelConfirmOpen(true)}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Cancelling...
                </>
              ) : (
                "Cancel order"
              )}
            </Button>
          )}

          {isTerminal && (
            <Button asChild size="lg" className="w-full font-display font-bold uppercase">
              <Link to="/">
                {order.status === "DELIVERED" ? "Order again" : "Back to menu"}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Cancel confirmation */}
      <AlertDialog open={cancelConfirmOpen} onOpenChange={setCancelConfirmOpen}>
        <AlertDialogContent className="bg-background border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display uppercase">Cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              The kitchen will stop preparing it. You'll need to place a new order if you change your mind.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>Keep order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={isCancelling}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isCancelling ? "Cancelling..." : "Yes, cancel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-8 md:py-12">{children}</div>
    </div>
  );
}

function StatusBanner({ order }: { order: TrackedOrder }) {
  const copy = STATUS_COPY[order.status];
  const Icon = STATUS_ICON[order.status];

  const moodStyles =
    copy.mood === "active"
      ? "bg-primary/10 border-primary/30 text-primary"
      : copy.mood === "success"
        ? "bg-green-600/10 border-green-600/30 text-green-600"
        : "bg-destructive/10 border-destructive/30 text-destructive";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={order.status}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
        className={`border p-6 flex items-center gap-4 ${moodStyles}`}
      >
        <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center shrink-0">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-xl md:text-2xl font-black uppercase leading-tight text-foreground">
            {copy.headline}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">{copy.subtitle}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function Timeline({ order }: { order: TrackedOrder }) {
  const currentIndex = TIMELINE_STEPS.indexOf(order.status);
  // CANCELLED: treat the timeline as "stopped" at whatever the last step was
  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="space-y-2">
      {TIMELINE_STEPS.map((step, index) => {
        const stepReached = !isCancelled && index <= currentIndex;
        const isCurrent = !isCancelled && index === currentIndex;
        const timestamp = getTimestampForStep(order, step);

        return (
          <div key={step} className="flex items-center gap-4">
            {/* Step indicator */}
            <div
              className={`relative h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                stepReached
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isCurrent && !STATUS_COPY[order.status].terminal && (
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
              )}
              <span className="relative font-display font-bold text-xs">
                {stepReached ? <Check className="h-4 w-4" /> : index + 1}
              </span>
            </div>

            {/* Label */}
            <div className="flex-1 flex items-baseline justify-between gap-3 min-w-0">
              <span
                className={`font-display text-sm font-bold uppercase ${
                  stepReached ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {TIMELINE_LABELS[step]}
              </span>
              {timestamp && (
                <span className="font-body text-xs text-muted-foreground shrink-0">
                  {formatTime(timestamp)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderItems({ order }: { order: TrackedOrder }) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Your order
      </h2>
      <div className="border border-border divide-y divide-border">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4 p-4">
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-bold uppercase truncate">
                {item.quantity}× {item.nameSnapshot}
              </p>
              {item.notes && (
                <p className="font-body text-xs text-muted-foreground mt-1">{item.notes}</p>
              )}
            </div>
            <span className="font-display font-bold text-sm shrink-0">
              {formatPrice(item.priceSnapshot * item.quantity)}
            </span>
          </div>
        ))}
        <div className="p-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Delivery</span>
            <span>{formatPrice(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-display font-black text-base text-foreground pt-2 border-t border-border">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeliveryInfo({ order }: { order: TrackedOrder }) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        Delivery
      </h2>
      <div className="border border-border p-4 space-y-2 text-sm">
        <Row label="Name" value={order.customerName} />
        <Row label="Phone" value={order.customerPhone} />
        <Row label="Address" value={order.customerAddress} />
        {order.customerNotes && <Row label="Notes" value={order.customerNotes} />}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground font-display text-xs uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-foreground text-right break-words">{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatPrice(cents: number): string {
  return `${(cents / 100).toFixed(2)}€`;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return time;

  const date = d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  return `${date}, ${time}`;
}

function getTimestampForStep(order: TrackedOrder, step: OrderStatus): string | null {
  switch (step) {
    case "PENDING":
      return order.placedAt;
    case "ACCEPTED":
      return order.acceptedAt;
    case "IN_PROGRESS":
      return order.startedAt;
    case "READY":
      return order.readyAt;
    case "OUT_FOR_DELIVERY":
      return order.outForDeliveryAt;
    case "DELIVERED":
      return order.deliveredAt;
    default:
      return null;
  }
}
