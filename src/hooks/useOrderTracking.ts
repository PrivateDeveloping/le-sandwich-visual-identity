import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { connectOrderSocket, disconnectOrderSocket } from "@/lib/socket";

// Mirrors the backend Order shape (with items included). Loose typing on the
// snapshots because we don't strictly need them on the customer page.
export type TrackedOrderItem = {
  id: string;
  menuItemId: string;
  nameSnapshot: string;
  priceSnapshot: number; // cents
  quantity: number;
  notes: string | null;
};

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "READY"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DECLINED"
  | "CANCELLED";

export type TrackedOrder = {
  id: string;
  orderNumber: string;
  trackingToken: string;
  status: OrderStatus;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerNotes: string | null;
  subtotal: number; // cents
  deliveryFee: number; // cents
  total: number; // cents
  declineReason: string | null;
  placedAt: string;
  acceptedAt: string | null;
  startedAt: string | null;
  readyAt: string | null;
  outForDeliveryAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;
  declinedAt: string | null;
  items: TrackedOrderItem[];
};

type GetOrderResponse = { order: TrackedOrder };

async function fetchOrder(trackingToken: string): Promise<TrackedOrder> {
  const data = await apiFetch<GetOrderResponse>(`/api/orders/track/${trackingToken}`);
  return data.order;
}

async function cancelOrder(trackingToken: string): Promise<TrackedOrder> {
  const data = await apiFetch<GetOrderResponse>(
    `/api/orders/track/${trackingToken}/cancel`,
    { method: "POST" },
  );
  return data.order;
}

/**
 * Fetch an order by tracking token and stay subscribed to live updates.
 *
 * Returns:
 *  - `order` — the current order state (live-updated)
 *  - `isLoading` — true during the initial fetch
 *  - `isError` — true if the fetch failed (e.g. invalid token)
 *  - `cancel` — async function to cancel the order (PENDING/ACCEPTED only)
 *  - `isCancelling` — true while the cancel request is in flight
 */
export function useOrderTracking(trackingToken: string | undefined) {
  const queryClient = useQueryClient();
  const queryKey = ["order", trackingToken];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchOrder(trackingToken!),
    enabled: !!trackingToken,
    retry: 1,
    // Don't refetch on focus — we have Socket.io for live updates
    refetchOnWindowFocus: false,
  });

  // Subscribe to live updates via Socket.io
  useEffect(() => {
    if (!trackingToken) return;

    const socket = connectOrderSocket(trackingToken);

    const handleUpdated = (incoming: TrackedOrder) => {
      // Only react to events for THIS order. The customer's room only receives
      // events for this order anyway, but a sanity check doesn't hurt.
      if (incoming.trackingToken !== trackingToken) return;
      queryClient.setQueryData(queryKey, incoming);
    };

    socket.on("order:updated", handleUpdated);

    return () => {
      socket.off("order:updated", handleUpdated);
      disconnectOrderSocket(trackingToken);
    };
    // queryKey / queryClient are stable references; trackingToken is the only real dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingToken]);

  const cancelMutation = useMutation({
    mutationFn: () => cancelOrder(trackingToken!),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKey, updated);
    },
  });

  return {
    order: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    cancel: cancelMutation.mutateAsync,
    isCancelling: cancelMutation.isPending,
  };
}
