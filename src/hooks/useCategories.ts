import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type Category = {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
};

type ApiCategoriesResponse = { categories: Category[] };

/**
 * Fetch the ordered, active menu categories from the backend. Drives the
 * customer menu's category tabs (replaces the old hardcoded list).
 */
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await apiFetch<ApiCategoriesResponse>("/api/categories");
      return data.categories;
    },
    staleTime: 5 * 60_000,
    retry: 1,
  });
}
