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

export type NavCategory =
  | "HOME"
  | "BTS_LIVE"
  | "BTS_SONGS"
  | "K_DRAMA"
  | "MANHWA"
  | "FANFICTION"
  | "FEED";

export interface NavItem {
  label: string;
  path: string;
  category?: NavCategory;
  emoji: string;
}

export type FandomType = "BTS ARMY" | "Other ARMY" | "K-pop Fan" | "Other";
