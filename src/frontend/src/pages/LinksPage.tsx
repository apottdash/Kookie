import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  BookmarkCheck,
  BookmarkPlus,
  ExternalLink,
  Globe,
  Play,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Category, ContentLanguage, Genre } from "../backend";
import type { Link, WatchlistEntryView } from "../backend";
import CoverImage from "../components/CoverImage";
import MediaPlayerModal from "../components/MediaPlayerModal";
import SubtitleBadge from "../components/SubtitleBadge";
import { sampleLinks } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryFilter = "ALL" | Category;

// ─── Constants ────────────────────────────────────────────────────────────────

const categoryTabs: { value: CategoryFilter; label: string; emoji: string }[] =
  [
    { value: "ALL", label: "All Links", emoji: "✨" },
    { value: Category.BTS_LIVE, label: "BTS Lives", emoji: "🎤" },
    { value: Category.BTS_SONGS, label: "BTS Songs", emoji: "🎵" },
    { value: Category.K_DRAMA, label: "K-Dramas", emoji: "🎬" },
    { value: Category.MANHWA, label: "Manhwas", emoji: "📚" },
    { value: Category.FANFICTION, label: "Fan Fiction", emoji: "📝" },
  ];

const genresByCategory: Record<CategoryFilter, Genre[]> = {
  ALL: [
    Genre.Pop,
    Genre.HipHop,
    Genre.Ballad,
    Genre.Rap,
    Genre.EDM,
    Genre.RnB,
    Genre.Romance,
    Genre.Action,
    Genre.Comedy,
    Genre.Drama,
    Genre.Fantasy,
    Genre.Thriller,
    Genre.Historical,
    Genre.Mystery,
    Genre.AU,
  ],
  [Category.BTS_LIVE]: [
    Genre.Pop,
    Genre.HipHop,
    Genre.Ballad,
    Genre.Rap,
    Genre.EDM,
    Genre.RnB,
    Genre.Romance,
    Genre.Action,
    Genre.Comedy,
    Genre.Drama,
    Genre.Fantasy,
    Genre.Thriller,
    Genre.Historical,
    Genre.Mystery,
    Genre.AU,
  ],
  [Category.BTS_SONGS]: [
    Genre.Pop,
    Genre.HipHop,
    Genre.Ballad,
    Genre.Rap,
    Genre.EDM,
    Genre.RnB,
  ],
  [Category.K_DRAMA]: [
    Genre.Drama,
    Genre.Comedy,
    Genre.Romance,
    Genre.Thriller,
    Genre.Fantasy,
    Genre.Historical,
  ],
  [Category.MANHWA]: [
    Genre.Action,
    Genre.Romance,
    Genre.Comedy,
    Genre.Fantasy,
    Genre.Thriller,
    Genre.Mystery,
  ],
  [Category.FANFICTION]: [
    Genre.Romance,
    Genre.Drama,
    Genre.AU,
    Genre.Fantasy,
    Genre.Action,
    Genre.Comedy,
  ],
};

const languageOptions: {
  value: ContentLanguage;
  label: string;
  flag: string;
}[] = [
  { value: ContentLanguage.Korean, label: "Korean", flag: "🇰🇷" },
  { value: ContentLanguage.English, label: "English", flag: "🇬🇧" },
  { value: ContentLanguage.French, label: "French", flag: "🇫🇷" },
  { value: ContentLanguage.Hindi, label: "Hindi", flag: "🇮🇳" },
  { value: ContentLanguage.Spanish, label: "Spanish", flag: "🇪🇸" },
];

const platformBadgeMap: Record<string, string> = {
  Netflix: "bg-red-500/10 text-red-400 border-red-500/20",
  YouTube: "bg-red-600/10 text-red-500 border-red-600/20",
  Viki: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Webtoon: "bg-primary/10 text-primary border-primary/20",
  Tapas: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  MangaDex: "bg-red-700/10 text-red-600 border-red-700/20",
  Tappytoon: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Lezhin: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Bato: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Spotify: "bg-green-600/10 text-green-500 border-green-600/20",
  SoundCloud: "bg-orange-600/10 text-orange-500 border-orange-600/20",
  Wattpad: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Other: "bg-muted text-muted-foreground border-border",
};

const pageTitleMap: Record<CategoryFilter, string> = {
  ALL: "All Links",
  [Category.BTS_LIVE]: "BTS Lives 🎤",
  [Category.BTS_SONGS]: "BTS Songs 🎵",
  [Category.K_DRAMA]: "K-Dramas 🎬",
  [Category.MANHWA]: "Manhwas 📚",
  [Category.FANFICTION]: "Fan Fiction 📝",
};

// ─── Helper functions ─────────────────────────────────────────────────────────

function getPlatformBadgeClass(platform: { __kind__: string }): string {
  return platformBadgeMap[platform.__kind__] ?? platformBadgeMap.Other;
}

function getCategoryBadgeClass(cat: Category): string {
  if (cat === Category.BTS_LIVE)
    return "bg-primary/15 text-primary border-primary/20";
  if (cat === Category.BTS_SONGS)
    return "bg-primary/10 text-primary border-primary/15";
  if (cat === Category.K_DRAMA)
    return "bg-accent/15 text-accent border-accent/20";
  if (cat === Category.FANFICTION)
    return "bg-secondary/15 text-secondary border-secondary/20";
  return "bg-secondary/15 text-secondary border-secondary/20";
}

function getCategoryEmoji(cat: Category): string {
  if (cat === Category.BTS_LIVE) return "🎤";
  if (cat === Category.BTS_SONGS) return "🎵";
  if (cat === Category.K_DRAMA) return "🎬";
  if (cat === Category.FANFICTION) return "📝";
  return "📚";
}

function getLanguageFlag(lang: ContentLanguage): string {
  return languageOptions.find((l) => l.value === lang)?.flag ?? "🌐";
}

// ─── URL params helpers ───────────────────────────────────────────────────────

function readSearchParams(): {
  genre: Genre | null;
  lang: ContentLanguage | null;
} {
  const p = new URLSearchParams(window.location.search);
  const genre = p.get("genre") as Genre | null;
  const lang = p.get("lang") as ContentLanguage | null;
  const validGenre =
    genre && Object.values(Genre).includes(genre) ? genre : null;
  const validLang =
    lang && Object.values(ContentLanguage).includes(lang) ? lang : null;
  return { genre: validGenre, lang: validLang };
}

function updateSearchParams(genre: Genre | null, lang: ContentLanguage | null) {
  const p = new URLSearchParams(window.location.search);
  if (genre) p.set("genre", genre);
  else p.delete("genre");
  if (lang) p.set("lang", lang);
  else p.delete("lang");
  const newUrl = `${window.location.pathname}${p.toString() ? `?${p.toString()}` : ""}`;
  window.history.replaceState({}, "", newUrl);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function WatchlistButton({
  link,
  watchlistEntries,
  onAdd,
  onRemove,
  isAddPending,
  isRemovePending,
}: {
  link: Link;
  watchlistEntries: WatchlistEntryView[];
  onAdd: (linkId: string) => void;
  onRemove: (entryId: string) => void;
  isAddPending: boolean;
  isRemovePending: boolean;
}) {
  const entry = watchlistEntries.find((e) => e.linkId === String(link.id));
  const isInList = !!entry;
  const isPending = isAddPending || isRemovePending;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`w-7 h-7 shrink-0 transition-smooth ${
        isInList
          ? "text-primary bg-primary/10 hover:bg-primary/20"
          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
      }`}
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInList && entry) {
          onRemove(entry.id);
        } else {
          onAdd(String(link.id));
        }
      }}
      data-ocid={`links.watchlist_toggle.${link.id}`}
      aria-label={isInList ? "Remove from watchlist" : "Add to watchlist"}
      title={isInList ? "Remove from watchlist" : "Add to watchlist"}
    >
      {isInList ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <BookmarkPlus className="w-4 h-4" />
      )}
    </Button>
  );
}

function GenreFilterPills({
  availableGenres,
  activeGenre,
  onSelect,
}: {
  availableGenres: Genre[];
  activeGenre: Genre | null;
  onSelect: (genre: Genre | null) => void;
}) {
  if (availableGenres.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2" data-ocid="links.genre_filter_pills">
      {availableGenres.map((genre) => (
        <button
          type="button"
          key={genre}
          onClick={() => onSelect(activeGenre === genre ? null : genre)}
          className={`filter-pill ${activeGenre === genre ? "filter-pill-active" : "filter-pill-inactive"}`}
          data-ocid={`links.genre_pill.${genre.toLowerCase()}`}
          aria-pressed={activeGenre === genre}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LinksPage() {
  const params = useParams({ strict: false }) as { category?: string };
  const urlCategory = params.category as Category | undefined;
  const { isLoggedIn, principal } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  const [playerLink, setPlayerLink] = useState<Link | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const initialFilter: CategoryFilter =
    urlCategory && Object.values(Category).includes(urlCategory as Category)
      ? (urlCategory as Category)
      : "ALL";

  const [activeTab, setActiveTab] = useState<CategoryFilter>(initialFilter);
  const [search, setSearch] = useState("");

  // Genre + language filter state — initialized from URL params
  const initial = readSearchParams();
  const [activeGenre, setActiveGenre] = useState<Genre | null>(initial.genre);
  const [activeLanguage, setActiveLanguage] = useState<ContentLanguage | null>(
    initial.lang,
  );

  // Sync filters to URL
  useEffect(() => {
    updateSearchParams(activeGenre, activeLanguage);
  }, [activeGenre, activeLanguage]);

  // Reset language filter when leaving MANHWA tab
  useEffect(() => {
    if (activeTab !== Category.MANHWA) {
      setActiveLanguage(null);
    }
  }, [activeTab]);

  // Available genres for current tab
  const availableGenres = genresByCategory[activeTab] ?? [];

  // Filtered links
  const filtered = useMemo(() => {
    return sampleLinks.filter((link) => {
      const matchesCategory =
        activeTab === "ALL" || link.category === activeTab;
      const matchesSearch =
        search === "" ||
        link.title.toLowerCase().includes(search.toLowerCase()) ||
        link.description.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = !activeGenre || link.genre === activeGenre;
      const matchesLanguage =
        !activeLanguage ||
        (link.contentLanguage !== undefined &&
          link.contentLanguage === activeLanguage);
      return (
        matchesCategory && matchesSearch && matchesGenre && matchesLanguage
      );
    });
  }, [activeTab, search, activeGenre, activeLanguage]);

  const hasActiveFilters = !!activeGenre || !!activeLanguage;

  // User profile for subtitle preference
  const { data: profile } = useQuery({
    queryKey: ["profile", principal?.toText()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getProfile(principal);
    },
    enabled: isLoggedIn && !!actor && !!principal,
  });

  const showSubtitleBadge = profile?.subtitlePreference === true;

  // Watchlist queries
  const { data: watchlistEntries = [] } = useQuery<WatchlistEntryView[]>({
    queryKey: ["watchlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWatchlist();
    },
    enabled: isLoggedIn && !!actor,
  });

  const addMutation = useMutation({
    mutationFn: async (linkId: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addToWatchlist({ linkId: BigInt(linkId) });
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success("Added to watchlist 🔖");
    },
    onError: () => toast.error("Failed to add to watchlist"),
  });

  const removeMutation = useMutation({
    mutationFn: async (entryId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeFromWatchlist(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success("Removed from watchlist");
    },
    onError: () => toast.error("Failed to remove from watchlist"),
  });

  function clearAllFilters() {
    setSearch("");
    setActiveTab("ALL");
    setActiveGenre(null);
    setActiveLanguage(null);
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Page Header */}
      <div
        className="bg-muted/30 border-b border-border py-8"
        data-ocid="links.header_section"
      >
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            {pageTitleMap[activeTab]}
          </h1>
          <p className="text-muted-foreground text-sm">
            Hand-picked links curated by ARMY, for ARMY 💜
          </p>
        </div>
      </div>

      {/* Category Tabs + Search */}
      <div
        className="bg-card border-b border-border sticky top-16 z-40 py-3"
        data-ocid="links.filter_bar"
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as CategoryFilter);
              setActiveGenre(null);
            }}
          >
            <TabsList className="bg-muted/50 h-9 flex-wrap">
              {categoryTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-ocid={`links.filter_tab.${tab.value.toLowerCase()}`}
                >
                  <span>{tab.emoji}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative sm:ml-auto w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search links…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm bg-muted/40"
              data-ocid="links.search_input"
            />
          </div>
        </div>
      </div>

      {/* Genre + Language Filter Bar */}
      <AnimatePresence>
        {availableGenres.length > 0 && (
          <motion.div
            key="genre-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background border-b border-border"
            data-ocid="links.genre_language_bar"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
              {/* Genre pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide shrink-0">
                  Genre
                </span>
                <GenreFilterPills
                  availableGenres={availableGenres}
                  activeGenre={activeGenre}
                  onSelect={setActiveGenre}
                />
              </div>

              {/* Language filter — Manhwa only */}
              {activeTab === Category.MANHWA && (
                <div
                  className="flex items-center gap-3 flex-wrap"
                  data-ocid="links.language_filter"
                >
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide shrink-0 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Language
                  </span>
                  <Select
                    value={activeLanguage ?? "ALL"}
                    onValueChange={(v) =>
                      setActiveLanguage(
                        v === "ALL" ? null : (v as ContentLanguage),
                      )
                    }
                  >
                    <SelectTrigger
                      className="h-8 w-44 text-xs bg-muted/40 border-border"
                      data-ocid="links.language_select"
                    >
                      <SelectValue placeholder="All Languages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">🌐 All Languages</SelectItem>
                      {languageOptions.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.flag} {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Active filter indicator + reset */}
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 flex-wrap"
                  data-ocid="links.active_filters"
                >
                  <span className="text-xs text-muted-foreground">
                    Active filters:
                  </span>
                  {activeGenre && (
                    <span className="badge-genre text-xs flex items-center gap-1">
                      {activeGenre}
                      <button
                        type="button"
                        onClick={() => setActiveGenre(null)}
                        aria-label="Remove genre filter"
                        className="ml-0.5 hover:opacity-70 transition-smooth"
                        data-ocid="links.remove_genre_filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {activeLanguage && (
                    <span className="badge-language flex items-center gap-1">
                      {getLanguageFlag(activeLanguage)} {activeLanguage}
                      <button
                        type="button"
                        onClick={() => setActiveLanguage(null)}
                        aria-label="Remove language filter"
                        className="ml-0.5 hover:opacity-70 transition-smooth"
                        data-ocid="links.remove_language_filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveGenre(null);
                      setActiveLanguage(null);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-smooth"
                    data-ocid="links.reset_filters_button"
                  >
                    Reset all
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links Grid */}
      <div
        className="container mx-auto px-4 py-8"
        data-ocid="links.grid_section"
      >
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            data-ocid="links.empty_state"
          >
            <span className="text-5xl">🔍</span>
            <h3 className="font-display font-bold text-lg text-foreground">
              No links found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try a different search, genre, or language filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              data-ocid="links.clear_filters_button"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
              Clear all filters
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="links.list"
          >
            {filtered.map((link, i) => (
              <motion.div
                key={link.id.toString()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
                data-ocid={`links.item.${i + 1}`}
              >
                <Card className="card-lift h-full border-border bg-card group overflow-hidden">
                  {/* Cover photo */}
                  <CoverImage
                    src={link.coverPhotoUrl}
                    alt={link.title}
                    category={link.category}
                  />
                  <CardContent className="p-5 flex flex-col gap-3 h-full">
                    {/* Top row: category badge, platform badge, watchlist */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                        <Badge
                          variant="outline"
                          className={`text-xs shrink-0 ${getCategoryBadgeClass(link.category)}`}
                        >
                          {getCategoryEmoji(link.category)}{" "}
                          {link.category.replace("_", " ")}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs shrink-0 ${getPlatformBadgeClass(link.platform)}`}
                        >
                          {link.platform.__kind__}
                        </Badge>
                        {link.genre && (
                          <span className="badge-genre !px-2 !py-0.5 !text-xs">
                            {link.genre}
                          </span>
                        )}
                        {link.contentLanguage && (
                          <span className="badge-language">
                            {getLanguageFlag(link.contentLanguage)}{" "}
                            {link.contentLanguage}
                          </span>
                        )}
                        {showSubtitleBadge && <SubtitleBadge />}
                      </div>
                      {isLoggedIn && (
                        <WatchlistButton
                          link={link}
                          watchlistEntries={watchlistEntries}
                          onAdd={(id) => addMutation.mutate(id)}
                          onRemove={(id) => removeMutation.mutate(id)}
                          isAddPending={addMutation.isPending}
                          isRemovePending={removeMutation.isPending}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth">
                        {link.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-3 leading-relaxed">
                        {link.description}
                      </p>
                    </div>

                    {/* Open / Play row */}
                    <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-border/50">
                      {link.mediaUrl &&
                        (link.category === Category.BTS_LIVE ||
                          link.category === Category.BTS_SONGS) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1"
                            onClick={() => {
                              setPlayerLink(link);
                              setPlayerOpen(true);
                            }}
                            data-ocid={`links.play_button.${i + 1}`}
                          >
                            <Play className="w-3 h-3" fill="currentColor" />
                            Play
                          </Button>
                        )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary text-xs font-medium ml-auto hover:underline"
                        data-ocid={`links.open_link.${i + 1}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open link</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Media Player Modal */}
      <MediaPlayerModal
        link={playerLink}
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
      />
    </div>
  );
}
