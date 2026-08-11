import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sampleVendors } from "../data/sampleData";
import type { Vendor, VendorCategory } from "../types";

// Cross-category pairings — "couples who booked X also booked Y"
const CROSS_CATEGORY: Partial<Record<VendorCategory, VendorCategory[]>> = {
  Photographer:        ["Videographer", "Decorator", "Bridal Makeup"],
  Videographer:        ["Photographer", "DJ", "Decorator"],
  Decorator:           ["Photographer", "Venue", "Mehendi Artist"],
  Venue:               ["Caterer", "Decorator", "DJ"],
  Caterer:             ["Venue", "Cake", "DJ"],
  "Bridal Makeup":     ["Mehendi Artist", "Bridal Wear", "Photographer"],
  "Mehendi Artist":    ["Bridal Makeup", "Choreographer", "Photographer"],
  DJ:                  ["Choreographer", "Baraat", "Venue"],
  Choreographer:       ["DJ", "Sangeet / Mehendi Artist"],
  Pundit:              ["Decorator", "Venue", "Caterer"],
  "Bridal Wear":       ["Bridal Makeup", "Mehendi Artist"],
  "Invitation Designer": ["Photographer", "Decorator"],
  "Dhol Player":       ["Baraat", "DJ"],
  Baraat:              ["Dhol Player", "DJ"],
  Cake:                ["Caterer", "Decorator"],
} as unknown as Partial<Record<VendorCategory, VendorCategory[]>>;

export interface CoupleProfile {
  city: string | null;
  budget_min: number | null;
  budget_max: number | null;
  wedding_style: string | null;
  events_needed: string[] | null;
}

// Plan tier score (Premium vendors rank higher)
const PLAN_SCORE: Record<string, number> = {
  Concierge: 10,
  "Destination Hub": 8,
  Premium: 6,
  Standard: 3,
  Free: 1,
};

// Score a single vendor against a couple's profile
function scoreVendor(vendor: Vendor, profile: CoupleProfile, browsingCity?: string): number {
  let score = 0;

  // ── Budget match (40 pts, highest weight) ──────────────────────
  const effectiveBudget = profile.budget_max ?? null;
  if (effectiveBudget) {
    if (vendor.startingPrice <= effectiveBudget) {
      // Within budget — closer to the budget ceiling scores higher
      const ratio = vendor.startingPrice / effectiveBudget;
      score += 40 * (0.5 + ratio * 0.5); // 20–40 pts
    } else {
      // Over budget — penalty proportional to overshoot
      const overshoot = (vendor.startingPrice - effectiveBudget) / effectiveBudget;
      score += Math.max(0, 20 - overshoot * 40);
    }
  } else {
    score += 20; // neutral when no budget set
  }

  // ── Rating (30 pts) ────────────────────────────────────────────
  score += (vendor.rating / 5) * 30;

  // ── City match (20 pts) ────────────────────────────────────────
  const city = profile.city ?? browsingCity ?? null;
  if (city && vendor.city.toLowerCase() === city.toLowerCase()) {
    score += 20;
  }

  // ── Plan tier (10 pts) ─────────────────────────────────────────
  score += PLAN_SCORE[vendor.plan] ?? 1;

  return score;
}

// ── Hook: fetch couple profile from Supabase (or null for visitors) ───────────
function useCoupleProfile(): CoupleProfile | null {
  const { user, isLoggedIn } = useAuth();
  const [profile, setProfile] = useState<CoupleProfile | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !user || !isSupabaseConfigured || !supabase) return;
    supabase
      .from("couples")
      .select("city, budget_min, budget_max, wedding_style, events_needed")
      .eq("principal", user.id)
      .maybeSingle()
      .then(
        ({ data }) => { if (data) setProfile(data as CoupleProfile); },
        () => {},
      );
  }, [isLoggedIn, user]);

  return profile;
}

// ── Fetch all vendors (Supabase → sample fallback) ────────────────────────────
function useAllVendors(): Vendor[] {
  const [vendors, setVendors] = useState<Vendor[]>(sampleVendors);
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    supabase
      .from("vendors")
      .select("*")
      .eq("verified", true)
      .then(
        ({ data }) => { if (data && data.length > 0) setVendors(data as Vendor[]); },
        () => {},
      );
  }, []);
  return vendors;
}

// ── Main recommendation hook ───────────────────────────────────────────────────

interface UseRecommendationsOptions {
  /** Exclude this vendor ID from results (e.g. the one currently being viewed) */
  excludeId?: number;
  /** If set, bias results toward this category (visitor browsing context) */
  browsingCategory?: VendorCategory;
  /** If set, bias results toward this city (visitor browsing context) */
  browsingCity?: string;
  /** Max vendors to return */
  limit?: number;
}

interface RecommendationResult {
  /** Personalised "For You" vendors — sorted by full score */
  forYou: Vendor[];
  /** Same-category vendors sorted by score — "similar vendors" */
  similar: Vendor[];
  /** Cross-category pairings — "couples also booked" */
  crossCategory: { category: VendorCategory; vendors: Vendor[] }[];
  /** True while profile is loading */
  loading: boolean;
}

export function useRecommendations(
  opts: UseRecommendationsOptions = {},
): RecommendationResult {
  const { excludeId, browsingCategory, browsingCity, limit = 6 } = opts;
  const profile = useCoupleProfile();
  const allVendors = useAllVendors();
  const { isLoggedIn } = useAuth();

  const effectiveProfile: CoupleProfile = profile ?? {
    city: browsingCity ?? null,
    budget_min: null,
    budget_max: null,
    wedding_style: null,
    events_needed: null,
  };

  const pool = allVendors.filter((v) => v.id !== excludeId);

  // "For You" — full scored sort
  const forYou = [...pool]
    .map((v) => ({ v, score: scoreVendor(v, effectiveProfile, browsingCity) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ v }) => v);

  // "Similar" — same category as browsingCategory, scored
  const similar = browsingCategory
    ? [...pool]
        .filter((v) => v.category === browsingCategory)
        .map((v) => ({ v, score: scoreVendor(v, effectiveProfile, browsingCity) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ v }) => v)
    : [];

  // "Cross-category" — paired categories, top 3 vendors each
  const pairedCategories =
    (browsingCategory && CROSS_CATEGORY[browsingCategory]) ?? [];
  const crossCategory = pairedCategories
    .slice(0, 3)
    .map((cat) => ({
      category: cat,
      vendors: [...pool]
        .filter((v) => v.category === cat)
        .map((v) => ({ v, score: scoreVendor(v, effectiveProfile, browsingCity) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(({ v }) => v),
    }))
    .filter(({ vendors }) => vendors.length > 0);

  return {
    forYou,
    similar,
    crossCategory,
    loading: isLoggedIn && profile === null,
  };
}
