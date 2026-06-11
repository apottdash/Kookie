import { createClient } from "@supabase/supabase-js";
import type { Vendor } from "../types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured =
  !!supabaseUrl &&
  supabaseUrl !== "undefined" &&
  !!supabaseAnonKey &&
  supabaseAnonKey !== "undefined";

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// ── DB row shape (snake_case from Postgres) ──────────────────────────────────

export interface VendorRow {
  id: number;
  name: string;
  category: string;
  city: string;
  is_destination_ready: boolean;
  plan: string;
  cover_photo: string | null;
  rating: number;
  review_count: number;
  starting_price: number;
  description: string | null;
  tags: string[];
  languages: string[];
  verified: boolean;
  whatsapp_active: boolean;
  multi_day_support: boolean;
  created_at: string;
}

export interface InquiryRow {
  id: string;
  couple_id: string;
  vendor_id: number;
  status: "pending" | "responded" | "confirmed" | "cancelled";
  message: string | null;
  couple_contact_released: boolean;
  created_at: string;
}

export interface BookingRow {
  id: string;
  inquiry_id: string;
  confirmed_price: number;
  event_date: string;
  commission_percent: number;
  commission_amount: number;
  commission_paid: boolean;
  bypassed_platform: boolean;
  created_at: string;
}

export interface BasketItemRow {
  id: string;
  couple_id: string;
  vendor_id: number;
  notes: string;
  added_at: string;
}

export interface ReviewRow {
  id: string;
  vendor_id: number;
  couple_id: string;
  rating: number;
  content: string;
  created_at: string;
}

// ── Row → Vendor type mapper ──────────────────────────────────────────────────

export function rowToVendor(row: VendorRow): Vendor {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Vendor["category"],
    city: row.city,
    isDestinationReady: row.is_destination_ready,
    plan: row.plan as Vendor["plan"],
    coverPhoto:
      row.cover_photo ??
      `https://picsum.photos/seed/vendor-${row.id}/600/400`,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    startingPrice: row.starting_price,
    description: row.description ?? "",
    tags: row.tags ?? [],
    languages: row.languages ?? ["Hindi"],
    verified: row.verified,
    whatsappActive: row.whatsapp_active,
    multiDaySupport: row.multi_day_support,
  };
}

// ── Vendor queries ────────────────────────────────────────────────────────────

export interface VendorFilters {
  category?: string;
  city?: string;
  plan?: string;
  isDestinationReady?: boolean;
  search?: string;
  limit?: number;
}

export async function fetchVendors(
  filters: VendorFilters = {},
): Promise<Vendor[]> {
  if (!supabase) throw new Error("Supabase not configured");

  let query = supabase
    .from("vendors")
    .select("*")
    .order("rating", { ascending: false });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.city) query = query.eq("city", filters.city);
  if (filters.plan) query = query.eq("plan", filters.plan);
  if (filters.isDestinationReady !== undefined)
    query = query.eq("is_destination_ready", filters.isDestinationReady);
  if (filters.search)
    query = query.or(
      `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
    );
  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data as VendorRow[]).map(rowToVendor);
}

export async function fetchVendorById(id: number): Promise<Vendor | null> {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("vendors")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return rowToVendor(data as VendorRow);
}

export async function fetchDistinctCities(): Promise<string[]> {
  if (!supabase) throw new Error("Supabase not configured");
  const { data, error } = await supabase
    .from("vendors")
    .select("city")
    .order("city");
  if (error) throw error;
  return [...new Set((data as { city: string }[]).map((r) => r.city))];
}
