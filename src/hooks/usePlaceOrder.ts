import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

// What the customer fills in at checkout.
export type CheckoutInput = {
  customer: {
    name: string;
    phone: string;
    address: string;
    notes?: string | null;
  };
  items: Array<{
    menuItemId: string;
    quantity: number;
    notes?: string | null;
  }>;
};

// What the backend returns after creating an order.
// We return enough to show a confirmation and (eventually) link to a tracking page.
export type PlacedOrder = {
  id: string;
  orderNumber: string;
  trackingToken: string;
  cancelToken: string | null;
  status: string;
  subtotal: number; // cents
  deliveryFee: number; // cents
  total: number; // cents
  customerName: string;
  customerPhone: string;
  customerAddress: string;
};

type ApiPlaceOrderResponse = {
  order: PlacedOrder;
};

async function placeOrder(input: CheckoutInput): Promise<PlacedOrder> {
  const data = await apiFetch<ApiPlaceOrderResponse>("/api/orders", {
    method: "POST",
    body: input,
  });
  return data.order;
}

export function usePlaceOrder() {
  return useMutation({
    mutationFn: placeOrder,
  });
}
