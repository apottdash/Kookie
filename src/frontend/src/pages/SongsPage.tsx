import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Music2,
  Play,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Category, Genre } from "../backend";
import type { Link, ProfileView, WatchlistEntryView } from "../backend";
import CoverImage from "../components/CoverImage";
import MediaPlayerModal from "../components/MediaPlayerModal";
import SubtitleBadge from "../components/SubtitleBadge";
import { sampleLinks } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";

type GenreFilter = "ALL" | Genre;

const GENRE_FILTERS: { value: GenreFilter; label: string; emoji: string }[] = [
  { value: "ALL", label: "All", emoji: "🎵" },
  { value: Genre.Pop, label: "Pop", emoji: "✨" },
  { value: Genre.HipHop, label: "Hip-Hop", emoji: "🎤" },
  { value: Genre.Ballad, label: "Ballad", emoji: "🌸" },
  { value: Genre.Rap, label: "Rap", emoji: "🔥" },
  { value: Genre.EDM, label: "EDM", emoji: "⚡" },
  { value: Genre.RnB, label: "R&B", emoji: "🎶" },
];

const PLATFORM_COLORS: Record<string, string> = {
  Spotify:
    "bg-green-500/10 text-green-600 border-green-500/25 dark:text-green-400",
  SoundCloud:
    "bg-orange-500/10 text-orange-600 border-orange-500/25 dark:text-orange-400",
  YouTube: "bg-red-500/10 text-red-600 border-red-500/25 dark:text-red-400",
  Other: "bg-muted text-muted-foreground border-border",
};

const GENRE_LABEL: Record<string, string> = {
  HipHop: "Hip-Hop",
  RnB: "R&B",
};

const PLATFORM_ICONS: Record<string, string> = {
  Spotify: "🎧",
  SoundCloud: "☁️",
  YouTube: "▶️",
};

const PLAYABLE_PLATFORMS = new Set(["Spotify", "YouTube", "SoundCloud"]);

const songLinks = sampleLinks.filter((l) => l.category === Category.BTS_SONGS);

// ─── Watchlist Button ────────────────────────────────────────────────────────

function WatchlistBtn({
  link,
  entries,
  isLoggedIn,
  onAdd,
  onRemove,
  pending,
  index,
}: {
  link: Link;
  entries: WatchlistEntryView[];
  isLoggedIn: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  pending: boolean;
  index: number;
}) {
  const entry = entries.find((e) => e.linkId === String(link.id));
  const btn = (
    <Button
      variant="ghost"
      size="icon"
      className={`w-8 h-8 shrink-0 rounded-full transition-smooth ${
        entry
          ? "text-primary bg-primary/10 hover:bg-primary/20"
          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
      }`}
      disabled={pending || !isLoggedIn}
      onClick={(e) => {
        e.preventDefault();
        if (!isLoggedIn) return;
        entry ? onRemove(entry.id) : onAdd(String(link.id));
      }}
      aria-label={entry ? "Remove from watchlist" : "Add to watchlist"}
      data-ocid={`songs.watchlist_toggle.${index}`}
    >
      {entry ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <BookmarkPlus className="w-4 h-4" />
      )}
    </Button>
  );

  if (!isLoggedIn) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{btn}</TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Sign in to save songs to watchlist
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return btn;
}

// ─── Song Card ───────────────────────────────────────────────────────────────

function SongCard({
  link,
  index,
  entries,
  isLoggedIn,
  showSubtitleBadge,
  onAdd,
  onRemove,
  pending,
  onPlay,
}: {
  link: Link;
  index: number;
  entries: WatchlistEntryView[];
  isLoggedIn: boolean;
  showSubtitleBadge: boolean;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  pending: boolean;
  onPlay: (link: Link) => void;
}) {
  const platformKind = link.platform.__kind__;
  const platformColor = PLATFORM_COLORS[platformKind] ?? PLATFORM_COLORS.Other;
  const platformIcon = PLATFORM_ICONS[platformKind] ?? "🎵";
  const genreLabel = link.genre
    ? (GENRE_LABEL[link.genre] ?? link.genre)
    : null;
  const isPlayable = PLAYABLE_PLATFORMS.has(platformKind);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      data-ocid={`songs.item.${index + 1}`}
    >
      <Card className="card-lift h-full border-border bg-card group content-card content-card-hover overflow-hidden">
        {/* Cover photo */}
        <div className="relative w-full h-32 overflow-hidden">
          <CoverImage
            src={link.coverPhotoUrl}
            alt={link.title}
            category={link.category}
            aspectClass="h-32"
          />
          {isPlayable && (
            <button
              type="button"
              onClick={() => onPlay(link)}
              aria-label={`Play ${link.title}`}
              data-ocid={`songs.play_button.${index + 1}`}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-elevated hover:bg-primary transition-smooth">
                <Play
                  className="w-5 h-5 text-primary-foreground ml-0.5"
                  fill="currentColor"
                />
              </div>
            </button>
          )}
        </div>

        <CardContent className="p-5 flex flex-col gap-3 h-full">
          {/* Top row: genre + platform + watchlist */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              {genreLabel && (
                <span className="badge-genre text-xs py-0.5 px-2.5">
                  {genreLabel}
                </span>
              )}
              <Badge
                variant="outline"
                className={`text-xs shrink-0 gap-1 ${platformColor}`}
              >
                <span aria-hidden="true">{platformIcon}</span>
                {platformKind}
              </Badge>
            </div>
            <WatchlistBtn
              link={link}
              entries={entries}
              isLoggedIn={isLoggedIn}
              onAdd={onAdd}
              onRemove={onRemove}
              pending={pending}
              index={index + 1}
            />
          </div>

          {/* Title + description */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth">
              {link.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-3 leading-relaxed break-words">
              {link.description}
            </p>
          </div>

          {/* Footer row: actions */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50 mt-auto">
            <div className="flex items-center gap-1.5 min-w-0">
              {showSubtitleBadge && <SubtitleBadge />}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {isPlayable && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1"
                  onClick={() => onPlay(link)}
                  data-ocid={`songs.play_button.${index + 1}`}
                >
                  <Play className="w-3 h-3" fill="currentColor" />
                  Play
                </Button>
              )}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground text-xs font-medium hover:text-primary hover:underline transition-smooth"
                onClick={(e) => e.stopPropagation()}
                data-ocid={`songs.open_link.${index + 1}`}
                aria-label={`Open ${link.title} externally`}
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SongsPage() {
  const { isLoggedIn, principal } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  const [playerLink, setPlayerLink] = useState<Link | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const getInitialGenre = (): GenreFilter => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("genre");
    if (!g) return "ALL";
    const found = GENRE_FILTERS.find(
      (f) => f.value.toString().toLowerCase() === g.toLowerCase(),
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
      params.set("genre", activeGenre.toString().toLowerCase());
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

  const { data: profile } = useQuery<ProfileView | null>({
    queryKey: ["profile", principal?.toText()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getProfile(principal);
    },
    enabled: isLoggedIn && !!actor && !!principal,
  });

  const showSubtitleBadge = isLoggedIn && !!profile?.subtitlePreference;

  const filteredSongs = songLinks.filter((link) => {
    const matchesGenre = activeGenre === "ALL" || link.genre === activeGenre;
    const q = search.toLowerCase();
    const matchesSearch =
      q === "" ||
      link.title.toLowerCase().includes(q) ||
      link.description.toLowerCase().includes(q);
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

  const isPending = addMutation.isPending || removeMutation.isPending;

  function handlePlay(link: Link) {
    setPlayerLink(link);
    setPlayerOpen(true);
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden gradient-purple py-12 md:py-16"
        data-ocid="songs.hero_section"
      >
        <div
          className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.18 290), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.9 0.22 270), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-elevated">
              <Music2
                className="w-9 h-9 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground leading-tight">
                BTS Songs 🎵
              </h1>
              <p className="text-primary-foreground/80 text-sm md:text-base mt-1 max-w-md">
                Stream every BTS track across Spotify, SoundCloud &amp; YouTube.
                Filter by genre, search by title.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {[
              { label: `${songLinks.length} songs`, icon: "🎵" },
              { label: "3 platforms", icon: "🎧" },
              { label: "6 genres", icon: "🎼" },
            ].map((stat) => (
              <span
                key={stat.label}
                className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-white/20"
              >
                <span aria-hidden="true">{stat.icon}</span>
                {stat.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Genre Filter Bar ── */}
      <div
        className="bg-card border-b border-border sticky top-16 z-40 py-3 shadow-subtle"
        data-ocid="songs.filter_bar"
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div
            className="flex flex-wrap gap-2"
            aria-label="Filter songs by genre"
          >
            {GENRE_FILTERS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setActiveGenre(g.value)}
                data-ocid={`songs.genre_filter.${g.value.toString().toLowerCase()}`}
                aria-pressed={activeGenre === g.value}
                className={`filter-pill inline-flex items-center gap-1.5 ${
                  activeGenre === g.value
                    ? "filter-pill-active"
                    : "filter-pill-inactive"
                }`}
              >
                <span aria-hidden="true">{g.emoji}</span>
                {g.label}
              </button>
            ))}
          </div>

          <div className="relative sm:ml-auto w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search songs…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-sm bg-muted/40"
              aria-label="Search songs by title or description"
              data-ocid="songs.search_input"
            />
          </div>
        </div>
      </div>

      {/* ── Songs Grid ── */}
      <main
        className="container mx-auto px-4 py-8"
        data-ocid="songs.grid_section"
      >
        {(activeGenre !== "ALL" || search) && filteredSongs.length > 0 && (
          <p className="text-xs text-muted-foreground mb-4">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredSongs.length}
            </span>{" "}
            {filteredSongs.length === 1 ? "song" : "songs"}
            {activeGenre !== "ALL" && (
              <>
                {" "}
                in{" "}
                <span className="font-semibold text-primary">
                  {GENRE_LABEL[activeGenre] ?? activeGenre}
                </span>
              </>
            )}
            {search && (
              <>
                {" "}
                matching{" "}
                <span className="font-semibold text-primary">
                  &ldquo;{search}&rdquo;
                </span>
              </>
            )}
          </p>
        )}

        {filteredSongs.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            data-ocid="songs.empty_state"
          >
            <div className="w-20 h-20 rounded-full gradient-purple-subtle flex items-center justify-center border border-primary/20">
              <span className="text-4xl" aria-hidden="true">
                🎵
              </span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">
                No songs found
              </h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                Try a different genre or clear your search to see all BTS songs.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch("");
                setActiveGenre("ALL");
              }}
              className="border-primary/30 text-primary hover:bg-primary/10"
              data-ocid="songs.clear_filters_button"
            >
              <SlidersHorizontal
                className="w-3.5 h-3.5 mr-2"
                aria-hidden="true"
              />
              Clear filters
            </Button>
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="songs.list"
          >
            {filteredSongs.map((link, i) => (
              <SongCard
                key={link.id.toString()}
                link={link}
                index={i}
                entries={watchlistEntries}
                isLoggedIn={isLoggedIn}
                showSubtitleBadge={showSubtitleBadge}
                onAdd={(id) => addMutation.mutate(id)}
                onRemove={(id) => removeMutation.mutate(id)}
                pending={isPending}
                onPlay={handlePlay}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Media Player Modal ── */}
      <MediaPlayerModal
        link={playerLink}
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
      />
    </div>
  );
}
