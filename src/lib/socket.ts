import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// We keep one socket per tracking token. If the customer somehow opens
// multiple tracking pages, each gets its own connection — that's fine.
const sockets = new Map<string, Socket>();

/**
 * Connect to the realtime server scoped to a specific order (by tracking token).
 * The customer doesn't have a JWT — instead, we tell the server which order
 * room to join via the handshake.
 *
 * Safe to call multiple times with the same token — returns the existing
 * connection rather than creating a new one.
 */
export function connectOrderSocket(trackingToken: string): Socket {
  const existing = sockets.get(trackingToken);
  if (existing) return existing;

  const socket = io(API_URL, {
    auth: { orderId: trackingToken },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  if (import.meta.env.DEV) {
    socket.on("connect", () => console.log("[order-socket] connected", socket.id));
    socket.on("disconnect", (reason) => console.log("[order-socket] disconnected", reason));
    socket.on("connect_error", (err) => console.warn("[order-socket] connect_error:", err.message));
  }

  sockets.set(trackingToken, socket);
  return socket;
}

/**
 * Disconnect the socket for a specific tracking token.
 * Call when the customer leaves the tracking page.
 */
export function disconnectOrderSocket(trackingToken: string): void {
  const existing = sockets.get(trackingToken);
  if (existing) {
    existing.disconnect();
    sockets.delete(trackingToken);
  }
}
