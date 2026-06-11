import { useEffect, useState } from "react";
import { sampleVendors } from "../data/sampleData";
import {
  type VendorFilters,
  fetchVendors,
  isSupabaseConfigured,
} from "../lib/supabase";
import type { Vendor } from "../types";

interface UseVendorsResult {
  vendors: Vendor[];
  loading: boolean;
  error: string | null;
  source: "supabase" | "sample";
}

export function useVendors(filters: VendorFilters = {}): UseVendorsResult {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"supabase" | "sample">("sample");

  const filterKey = JSON.stringify(filters);

  // biome-ignore lint/correctness/useExhaustiveDependencies: filterKey serialises all filters; adding `filters` would cause infinite re-renders
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured) {
        // Fall back to local sample data — apply filters in-memory
        const filtered = applyFiltersLocally(sampleVendors, filters);
        if (!cancelled) {
          setVendors(filtered);
          setSource("sample");
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchVendors(filters);
        if (!cancelled) {
          setVendors(data);
          setSource("supabase");
          setLoading(false);
        }
      } catch (err) {
        // Supabase failed — fall back to sample data
        const filtered = applyFiltersLocally(sampleVendors, filters);
        if (!cancelled) {
          setVendors(filtered);
          setSource("sample");
          setError(
            err instanceof Error
              ? err.message
              : "Supabase error — using sample data",
          );
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [filterKey]);

  return { vendors, loading, error, source };
}

function applyFiltersLocally(
  vendors: Vendor[],
  filters: VendorFilters,
): Vendor[] {
  return vendors.filter((v) => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.city && v.city !== filters.city) return false;
    if (filters.plan && v.plan !== filters.plan) return false;
    if (
      filters.isDestinationReady !== undefined &&
      v.isDestinationReady !== filters.isDestinationReady
    )
      return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !v.name.toLowerCase().includes(q) &&
        !v.category.toLowerCase().includes(q) &&
        !v.description.toLowerCase().includes(q) &&
        !v.tags.some((t) => t.toLowerCase().includes(q))
      )
        return false;
    }
    return true;
  });
}

// ── Cities helper ─────────────────────────────────────────────────────────────

export function useDistinctCities(): string[] {
  const [cities, setCities] = useState<string[]>(() =>
    [...new Set(sampleVendors.map((v) => v.city))].sort(),
  );

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    import("../lib/supabase")
      .then(({ fetchDistinctCities }) => fetchDistinctCities())
      .then((data) => setCities(data))
      .catch(() => {});
  }, []);

  return cities;
}
