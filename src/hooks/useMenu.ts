import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { MenuItem } from "@/config/brand";
import { MENU_ITEM_LOCAL } from "@/config/menuImages";

// What the backend actually returns. Note: price is in cents (integer).
type ApiMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // cents
  category: string;
  imageUrl: string | null;
  available: boolean;
};

type ApiMenuResponse = {
  items: ApiMenuItem[];
};

// Valid categories the rest of the app uses. Anything else from the API
// gets dropped into "other" so it doesn't crash the UI.
const VALID_CATEGORIES = new Set(["burgers", "sandwiches", "other", "drinks"]);

function toCategory(raw: string): MenuItem["category"] {
  return VALID_CATEGORIES.has(raw) ? (raw as MenuItem["category"]) : "other";
}

/**
 * Fetch the menu from the backend and merge with local image/translation data.
 * Returns the menu in the existing `MenuItem` shape so consumer components
 * (MenuItemCard, CartDrawer) work unchanged.
 */
async function fetchMenu(): Promise<MenuItem[]> {
  const data = await apiFetch<ApiMenuResponse>("/api/menu");

  return data.items.map((apiItem): MenuItem => {
    const local = MENU_ITEM_LOCAL[apiItem.id];

    return {
      id: apiItem.id,
      name: apiItem.name,
      // Backend returns cents (430), frontend uses euros (4.30) for display
      price: apiItem.price / 100,
      description: apiItem.description,
      // Merge in local-only fields by id
      descriptionAl: local?.descriptionAl,
      image: local?.image ?? apiItem.imageUrl ?? "",
      category: toCategory(apiItem.category),
      tags: local?.tags,
    };
  });
}

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    // Menu doesn't change often. 5 min stale time avoids refetching on every nav.
    staleTime: 5 * 60_000,
    // Retry once on network errors, then give up and let the UI show a fallback.
    retry: 1,
  });
}
