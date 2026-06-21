import type { OrderStatus } from "@/hooks/useOrderTracking";

export type StatusCopy = {
  headline: string;
  subtitle: string;
  // Whether this is a "final" state (no further updates expected)
  terminal: boolean;
  // Mood drives the color treatment: "active" = in progress, "success" = good outcome,
  // "danger" = bad outcome (cancelled/declined)
  mood: "active" | "success" | "danger";
};

// English only for now. When you do the Albanian pass, just duplicate this map
// and toggle which one is used based on a language preference.
export const STATUS_COPY: Record<OrderStatus, StatusCopy> = {
  PENDING: {
    headline: "We've got your order",
    subtitle: "Le Sandwich is about to take a look.",
    terminal: false,
    mood: "active",
  },
  ACCEPTED: {
    headline: "The kitchen has your order",
    subtitle: "They'll start preparing it any minute.",
    terminal: false,
    mood: "active",
  },
  IN_PROGRESS: {
    headline: "They're making it now",
    subtitle: "Coming up in just a few minutes.",
    terminal: false,
    mood: "active",
  },
  READY: {
    headline: "Your food is ready",
    subtitle: "A driver is being dispatched.",
    terminal: false,
    mood: "active",
  },
  OUT_FOR_DELIVERY: {
    headline: "Your order is on the way",
    subtitle: "Be ready to receive it shortly.",
    terminal: false,
    mood: "active",
  },
  DELIVERED: {
    headline: "Delivered. Bon appétit!",
    subtitle: "Hope you enjoy it.",
    terminal: true,
    mood: "success",
  },
  CANCELLED: {
    headline: "Order cancelled",
    subtitle: "You can place a new one anytime.",
    terminal: true,
    mood: "danger",
  },
  DECLINED: {
    headline: "Order couldn't be processed",
    subtitle: "Sorry about that — please try again or contact us.",
    terminal: true,
    mood: "danger",
  },
};

// The "normal" path through the order. Used to render the visual timeline.
// CANCELLED and DECLINED interrupt this — they're handled separately.
export const TIMELINE_STEPS: OrderStatus[] = [
  "PENDING",
  "ACCEPTED",
  "IN_PROGRESS",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

// Short labels for timeline steps (the verbose copy goes in the status banner).
export const TIMELINE_LABELS: Record<OrderStatus, string> = {
  PENDING: "Received",
  ACCEPTED: "Confirmed",
  IN_PROGRESS: "Cooking",
  READY: "Ready",
  OUT_FOR_DELIVERY: "On the way",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  DECLINED: "Declined",
};
