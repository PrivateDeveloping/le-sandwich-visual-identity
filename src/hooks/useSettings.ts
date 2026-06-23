import { useEffect, useState } from "react";
import { apiFetch, ApiError, NetworkError } from "@/lib/api";

export type DayHours = {
  open: string | null;
  close: string | null;
};

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type RestaurantSettings = {
  deliveryFee: number; // cents
  isPaused: boolean;
  pauseMessage: string | null;
  hours: Record<DayKey, DayHours>;
  updatedAt: string;
};

export type OpenStatus =
  | { isOpen: true }
  | {
      isOpen: false;
      reason: "closed-today" | "before-open" | "after-close";
      nextOpen: string | null;
    };

type GetSettingsResponse = {
  settings: RestaurantSettings;
  openStatus: OpenStatus;
};

const POLL_INTERVAL_MS = 60_000; // refresh every 60 seconds

/**
 * Subscribe to restaurant settings on the customer site.
 *
 * Refreshes:
 *  - On mount
 *  - Every 60 seconds (so admin changes propagate within a minute)
 *  - When the tab regains focus (catches updates after lunch break, etc.)
 *
 * Why not Socket.io? Settings change rarely (admin clicks save once or twice
 * a day). Polling at 60s adds negligible load, requires no extra connection,
 * and is robust to network blips.
 */
export function useSettings() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSettings = async (signal?: AbortSignal) => {
      try {
        const data = await apiFetch<GetSettingsResponse>("/api/settings", {
          signal,
        });
        if (cancelled) return;
        setSettings(data.settings);
        setOpenStatus(data.openStatus);
        setError(null);
      } catch (err) {
        if (cancelled || (err as Error)?.name === "AbortError") return;
        // Don't blow away the UI for transient failures during polling;
        // only surface errors on the initial fetch.
        if (!settings) {
          if (err instanceof NetworkError) setError("Could not reach the server.");
          else if (err instanceof ApiError) setError(err.message);
          else setError("Failed to load settings.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Initial fetch
    const initialAc = new AbortController();
    fetchSettings(initialAc.signal);

    // Polling
    const interval = window.setInterval(() => {
      fetchSettings();
    }, POLL_INTERVAL_MS);

    // Refetch on focus (handles laptop sleeping etc.)
    const onFocus = () => {
      fetchSettings();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      cancelled = true;
      initialAc.abort();
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
    // settings deliberately excluded — we read it inside, but don't want to
    // restart polling whenever it updates. Linter ignored intentionally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derive "can order" from settings + openStatus
  const canOrder =
    !!settings && !settings.isPaused && !!openStatus && openStatus.isOpen;

  return { settings, openStatus, loading, error, canOrder };
}
