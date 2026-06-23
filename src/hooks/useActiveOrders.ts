import { useEffect, useState } from "react";
import {
  ACTIVE_ORDERS_EVENT,
  getActiveOrders,
  type ActiveOrder,
} from "@/lib/activeOrders";

/**
 * Reactive list of the customer's in-progress orders on this device.
 * Updates when an order is placed (checkout) or removed (delivered/dismissed),
 * and stays in sync across tabs via the storage event.
 */
export function useActiveOrders(): ActiveOrder[] {
  const [orders, setOrders] = useState<ActiveOrder[]>(getActiveOrders);

  useEffect(() => {
    const sync = () => setOrders(getActiveOrders());
    window.addEventListener(ACTIVE_ORDERS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ACTIVE_ORDERS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return orders;
}
