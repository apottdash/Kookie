import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookmarkCheck,
  BookmarkPlus,
  ExternalLink,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Category, Genre } from "../backend";
import type { Link, WatchlistEntryView } from "../backend";
import CoverImage from "../components/CoverImage";
import MediaPlayerModal from "../components/MediaPlayerModal";
import SubtitleBadge from "../components/SubtitleBadge";
import { sampleLinks } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";

type GenreFilter = "ALL" | Genre;

const GENRE_FILTERS: { value: GenreFilter; label: string; emoji: string }[] = [
  { value: "ALL", label: "All", emoji: "✨" },
  { value: Genre.Romance, label: "Romance", emoji: "💜" },
  { value: Genre.AU, label: "AU", emoji: "🌙" },
  { value: Genre.Drama, label: "Drama", emoji: "🎭" },
  { value: Genre.Mystery, label: "Mystery", emoji: "🔍" },
  { value: Genre.Comedy, label: "Comedy", emoji: "😄" },
  { value: Genre.Fantasy, label: "Fantasy", emoji: "🔮" },
  { value: Genre.Action, label: "Action", emoji: "⚡" },
];

const PLATFORM_COLORS: Record<string, string> = {
  Wattpad:
    "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  YouTube: "bg-red-500/10 text-red-500 border-red-500/20 dark:text-red-400",
  Other: "bg-muted text-muted-foreground border-border",
};

const GENRE_BADGE_COLORS: Record<string, string> = {
  Romance: "bg-pink-500/10 text-pink-600 border-pink-400/30 dark:text-pink-400",
  AU: "bg-violet-500/10 text-violet-600 border-violet-400/30 dark:text-violet-400",
  Drama: "bg-blue-500/10 text-blue-600 border-blue-400/30 dark:text-blue-400",
  Fantasy:
    "bg-emerald-500/10 text-emerald-600 border-emerald-400/30 dark:text-emerald-400",
  Comedy:
    "bg-yellow-400/10 text-yellow-600 border-yellow-400/30 dark:text-yellow-500",
  Mystery:
    "bg-orange-500/10 text-orange-600 border-orange-400/30 dark:text-orange-400",
  Action: "bg-red-500/10 text-red-600 border-red-400/30 dark:text-red-400",
};

const PLATFORM_ICONS: Record<string, string> = {
  Wattpad: "📕",
  YouTube: "▶️",
};

const GENRE_STATS = [
  { label: "Stories", value: "50+" },
  { label: "Platforms", value: "Wattpad & YouTube" },
  { label: "Genres", value: "7+" },
];

const fictionLinks = sampleLinks.filter(
  (l) => l.category === Category.FANFICTION,
);

// ─── Watchlist Button ────────────────────────────────────────────────────────

interface WatchlistBtnProps {
  link: Link;
  entries: WatchlistEntryView[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  pending: boolean;
  isLoggedIn: boolean;
  onLoginPrompt: () => void;
  index: number;
}

function WatchlistBtn({
  link,
  entries,
  onAdd,
  onRemove,
  pending,
  isLoggedIn,
  onLoginPrompt,
  index,
}: WatchlistBtnProps) {
  const entry = entries.find((e) => e.linkId === String(link.id));

  if (!isLoggedIn) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label="Sign in to add to watchlist"
              data-ocid={`fanfiction.watchlist_toggle.${index}`}
              className="inline-flex items-center justify-center w-7 h-7 shrink-0 text-muted-foreground opacity-50 cursor-pointer rounded hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={onLoginPrompt}
            >
              <BookmarkPlus className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="text-xs">
            Sign in to save stories 💜
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`w-7 h-7 shrink-0 transition-smooth ${
        entry
          ? "text-primary bg-primary/10 hover:bg-primary/20"
          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
      }`}
      disabled={pending}
      onClick={(e) => {
        e.preventDefault();
        entry ? onRemove(entry.id) : onAdd(String(link.id));
      }}
      aria-label={entry ? "Remove from watchlist" : "Add to watchlist"}
      data-ocid={`fanfiction.watchlist_toggle.${index}`}
    >
      {entry ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <BookmarkPlus className="w-4 h-4" />
      )}
    </Button>
  );
}

// ─── Fan Fic Card ────────────────────────────────────────────────────────────

interface FanFicCardProps {
  link: Link;
  index: number;
  entries: WatchlistEntryView[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  mutationPending: boolean;
  isLoggedIn: boolean;
  subtitlePreference: boolean;
  onLoginPrompt: () => void;
  onPlay: (link: Link) => void;
}

function FanFicCard({
  link,
  index,
  entries,
  onAdd,
  onRemove,
  mutationPending,
  isLoggedIn,
  subtitlePreference,
  onLoginPrompt,
  onPlay,
}: FanFicCardProps) {
  const platformKey = link.platform.__kind__;
  const platformIcon = PLATFORM_ICONS[platformKey] ?? "📄";
  const genreColor = link.genre ? (GENRE_BADGE_COLORS[link.genre] ?? "") : "";
  const platformColor = PLATFORM_COLORS[platformKey] ?? PLATFORM_COLORS.Other;
  const isPlayable = platformKey === "YouTube" && !!link.mediaUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      data-ocid={`fanfiction.item.${index + 1}`}
      className="h-full"
    >
      <div className="content-card content-card-hover h-full flex flex-col group card-lift overflow-hidden !p-0">
        {/* Cover image */}
        <CoverImage
          src={link.coverPhotoUrl}
          alt={link.title}
          category={link.category}
        />

        <div className="p-4 flex flex-col gap-3 flex-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {link.genre && (
                <Badge
                  variant="outline"
                  className={`text-xs shrink-0 ${genreColor}`}
                >
                  {link.genre}
                </Badge>
              )}
              <Badge
                variant="outline"
                className={`text-xs shrink-0 ${platformColor}`}
              >
                <span className="mr-1" aria-hidden="true">
                  {platformIcon}
                </span>
                {platformKey}
              </Badge>
              {subtitlePreference && <SubtitleBadge />}
            </div>
            <WatchlistBtn
              link={link}
              entries={entries}
              onAdd={onAdd}
              onRemove={onRemove}
              pending={mutationPending}
              isLoggedIn={isLoggedIn}
              onLoginPrompt={onLoginPrompt}
              index={index + 1}
            />
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth mb-1.5">
              {link.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
              {link.description}
            </p>
          </div>

          {/* Footer link */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50 mt-auto">
            {isPlayable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1"
                onClick={() => onPlay(link)}
                data-ocid={`fanfiction.play_button.${index + 1}`}
              >
                <Play className="w-3 h-3" fill="currentColor" />
                Watch
              </Button>
            )}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-primary text-xs font-medium ml-auto hover:underline underline-offset-2"
              data-ocid={`fanfiction.open_link.${index + 1}`}
            >
              <ExternalLink className="w-3 h-3 shrink-0" />
              <span>Read story</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FanFictionPage() {
  const { isLoggedIn, login } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  const [playerLink, setPlayerLink] = useState<Link | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  // URL-param helpers
  const getInitialGenre = (): GenreFilter => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("genre");
    if (!g) return "ALL";
    const found = GENRE_FILTERS.find(
      (f) => f.value.toLowerCase() === g.toLowerCase(),
    );
    return found ? found.value : "ALL";
  };

  const [activeGenre, setActiveGenre] = useState<GenreFilter>(getInitialGenre);
  const [search, setSearch] = useState(
    () => new URLSearchParams(window.location.search).get("q") ?? "",
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeGenre === "ALL") {
      params.delete("genre");
    } else {
      params.set("genre", activeGenre.toLowerCase());
    }
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [activeGenre, search]);

  // Fetch user profile to get subtitlePreference
  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return null; // Profile lookup by current principal requires identity — we use watchlist as proxy
    },
    enabled: isLoggedIn && !!actor,
  });

  const subtitlePreference =
    (profile as { subtitlePreference?: boolean } | null)?.subtitlePreference ??
    false;

  const filtered = fictionLinks.filter((link) => {
    const matchesGenre = activeGenre === "ALL" || link.genre === activeGenre;
    const matchesSearch =
      search === "" ||
      link.title.toLowerCase().includes(search.toLowerCase()) ||
      link.description.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const { data: watchlistEntries = [] } = useQuery<WatchlistEntryView[]>({
    queryKey: ["watchlist"],
    queryFn: async () => (actor ? actor.getWatchlist() : []),
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

  const mutationPending = addMutation.isPending || removeMutation.isPending;

  return (
    <div className="pb-20 md:pb-0">
      {/* ── Purple Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        data-ocid="fanfiction.hero_section"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.2 290), oklch(0.52 0.26 290), oklch(0.42 0.22 275))",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.75 0.28 290)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 -left-10 w-48 h-48 rounded-full opacity-15 blur-2xl pointer-events-none"
          style={{ background: "oklch(0.65 0.24 300)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 border"
                style={{
                  background: "oklch(0.98 0.01 0 / 0.15)",
                  color: "oklch(0.96 0.02 290)",
                  borderColor: "oklch(0.98 0.01 0 / 0.25)",
                }}
              >
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                ARMY Fan Fiction
              </span>
            </div>
            <h1
              className="font-display font-bold text-4xl md:text-5xl leading-tight mb-3"
              style={{ color: "oklch(0.97 0.02 290)" }}
            >
              Fan Fiction 💜
            </h1>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: "oklch(0.88 0.04 290)" }}
            >
              ARMY-crafted stories inspired by BTS — from heartfelt romances to
              wild alternate universes. Discover the best fan fics on Wattpad,
              YouTube, and more.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4">
              {GENRE_STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span
                    className="font-display font-bold text-xl leading-none"
                    style={{ color: "oklch(0.97 0.02 290)" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-xs mt-0.5"
                    style={{ color: "oklch(0.82 0.04 290)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <div
        className="bg-card border-b border-border sticky top-16 z-40 py-3"
        data-ocid="fanfiction.filter_bar"
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {GENRE_FILTERS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setActiveGenre(g.value)}
                data-ocid={`fanfiction.genre_filter.${g.value.toLowerCase()}`}
                className={`filter-pill ${
                  activeGenre === g.value
                    ? "filter-pill-active"
                    : "filter-pill-inactive"
                }`}
              >
                <span aria-hidden="true" className="mr-1">
                  {g.emoji}
                </span>
                {g.label}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search fan fiction…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm bg-muted/40"
              data-ocid="fanfiction.search_input"
            />
          </div>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────────────── */}
      <div
        className="container mx-auto px-4 py-8"
        data-ocid="fanfiction.grid_section"
      >
        {/* Results count */}
        {filtered.length > 0 && (
          <p className="text-xs text-muted-foreground mb-4">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            stor{filtered.length === 1 ? "y" : "ies"}
            {activeGenre !== "ALL" && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-primary">
                  {activeGenre}
                </span>
              </>
            )}
            {search && (
              <>
                {" "}
                matching &ldquo;
                <span className="font-semibold text-foreground">{search}</span>
                &rdquo;
              </>
            )}
          </p>
        )}

        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            data-ocid="fanfiction.empty_state"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
            >
              <span className="text-6xl" aria-hidden="true">
                📖
              </span>
            </motion.div>
            <h3 className="font-display font-bold text-lg text-foreground">
              No stories found
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Try a different genre or adjust your search term to discover more
              fan fiction.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setActiveGenre("ALL");
              }}
              data-ocid="fanfiction.clear_filters_button"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
              Clear filters
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="fanfiction.list"
          >
            {filtered.map((link, i) => (
              <FanFicCard
                key={link.id.toString()}
                link={link}
                index={i}
                entries={watchlistEntries}
                onAdd={(id) => addMutation.mutate(id)}
                onRemove={(id) => removeMutation.mutate(id)}
                mutationPending={mutationPending}
                isLoggedIn={isLoggedIn}
                subtitlePreference={subtitlePreference}
                onLoginPrompt={login}
                onPlay={(l) => {
                  setPlayerLink(l);
                  setPlayerOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Login nudge for logged-out visitors */}
        {!isLoggedIn && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 rounded-xl border border-primary/20 p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
            style={{ background: "oklch(0.48 0.22 290 / 0.06)" }}
            data-ocid="fanfiction.login_nudge"
          >
            <span className="text-3xl shrink-0" aria-hidden="true">
              💜
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm">
                Save your favourite stories
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sign in to build your personal watchlist and get subtitle
                preferences.
              </p>
            </div>
            <Button
              size="sm"
              onClick={login}
              className="shrink-0"
              data-ocid="fanfiction.login_button"
            >
              Sign In
            </Button>
          </motion.div>
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
