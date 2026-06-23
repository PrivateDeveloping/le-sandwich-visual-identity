// Remembers the customer's in-progress orders on this device so they can get
// back to the tracking page after closing the tab. No accounts needed — the
// trackingToken is the customer's own secret, stored on their own device
// (same trust model as the saved name/phone/address).

export type ActiveOrder = {
  trackingToken: string;
  orderNumber: string;
  placedAt: string; // ISO timestamp
};

const KEY = "le_active_orders";
export const ACTIVE_ORDERS_EVENT = "le-active-orders-change";

// Drop entries older than this as a backstop, in case an order never reaches a
// terminal status on a page the customer revisits (so the pill can't linger
// forever).
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

function read(): ActiveOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ActiveOrder[];
    if (!Array.isArray(parsed)) return [];
    const cutoff = Date.now() - MAX_AGE_MS;
    return parsed.filter(
      (o) =>
        o &&
        typeof o.trackingToken === "string" &&
        new Date(o.placedAt).getTime() >= cutoff,
    );
  } catch {
    return [];
  }
}

function write(orders: ActiveOrder[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event(ACTIVE_ORDERS_EVENT));
}

/** Most-recent-first list of non-expired active orders. */
export function getActiveOrders(): ActiveOrder[] {
  return read();
}

/** Record a freshly placed order (dedupes by token, newest first). */
export function addActiveOrder(order: ActiveOrder): void {
  const next = [order, ...read().filter((o) => o.trackingToken !== order.trackingToken)];
  write(next);
}

/** Forget an order (called when it's delivered/cancelled or dismissed). */
export function removeActiveOrder(trackingToken: string): void {
  write(read().filter((o) => o.trackingToken !== trackingToken));
}
