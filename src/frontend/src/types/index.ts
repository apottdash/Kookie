import type { Principal } from "@icp-sdk/core/principal";
import type {
  Category,
  Comment,
  ContentLanguage,
  Genre,
  Link,
  LinkId,
  Platform,
  PostId,
  PostView,
  ProfileView,
  Timestamp,
} from "../backend";

// Re-export backend types (used by community/feed features)
export type {
  Category,
  Comment,
  ContentLanguage,
  Genre,
  Link,
  LinkId,
  Platform,
  PostId,
  PostView,
  ProfileView,
  Timestamp,
};
export type { Principal };

export { Category as CategoryEnum } from "../backend";
export { ContentLanguage as ContentLanguageEnum } from "../backend";
export { Genre as GenreEnum } from "../backend";

// ── WedBridge vendor types ───────────────────────────────────────────────────

export type VendorCategory =
  | "Photographer"
  | "Videographer"
  | "Decorator"
  | "Caterer"
  | "Mehendi Artist"
  | "DJ"
  | "Venue"
  | "Bridal Makeup"
  | "Pundit"
  | "Choreographer"
  | "Invitation Designer"
  | "Bridal Wear"
  | "Dhol Player"
  | "Baraat"
  | "Cake";

export type VendorPlan =
  | "Free"
  | "Standard"
  | "Premium"
  | "Destination Hub"
  | "Agent Managed";

export interface Vendor {
  id: number;
  name: string;
  category: VendorCategory;
  city: string;
  isDestinationReady: boolean;
  plan: VendorPlan;
  coverPhoto: string;
  rating: number;
  reviewCount: number;
  startingPrice: number; // INR
  description: string;
  tags: string[];
  languages: string[];
  verified: boolean;
  whatsappActive: boolean;
  multiDaySupport: boolean;
}

export interface BasketItem {
  vendor: Vendor;
  addedAt: number; // unix ms
  notes: string;
}

export type UserType = "couple" | "vendor" | null;

export type NavCategory =
  | "HOME"
  | "VENDORS"
  | "BASKET"
  | "DESTINATIONS"
  | "FEED";

export interface NavItem {
  label: string;
  path: string;
  category?: NavCategory;
  emoji: string;
}

export type FandomType = "Couple" | "Vendor" | "Planner" | "Other";
