import { c as createLucideIcon, a as useAuth, b as useBackend, d as useQueryClient, r as reactExports, e as useQuery, j as jsxRuntimeExports, G as Genre, f as Search, I as Input, B as Button, C as Category } from "./index-hVcvNcQS.js";
import { B as Badge } from "./badge-C36aewCt.js";
import { C as Card, a as CardContent } from "./card-Db51ftOn.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-1eHNPnMn.js";
import { u as useMutation } from "./useMutation-BC7QClTs.js";
import { u as ue } from "./index-N1EbOTNx.js";
import { M as MediaPlayerModal, C as CoverImage } from "./MediaPlayerModal-o7oGxCHh.js";
import { S as SlidersHorizontal, a as SubtitleBadge, B as BookmarkCheck, b as BookmarkPlus } from "./SubtitleBadge-Bfx3frTM.js";
import { m as motion, a as sampleLinks } from "./sampleData-CwOTQPd9.js";
import { P as Play } from "./play-CgvQuDIY.js";
import { E as ExternalLink } from "./external-link-BG5lSryx.js";
import "./index-Da1zQCaI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "18", r: "4", key: "1fc0mg" }],
  ["path", { d: "M12 18V2l7 4", key: "g04rme" }]
];
const Music2 = createLucideIcon("music-2", __iconNode);
const GENRE_FILTERS = [
  { value: "ALL", label: "All", emoji: "🎵" },
  { value: Genre.Pop, label: "Pop", emoji: "✨" },
  { value: Genre.HipHop, label: "Hip-Hop", emoji: "🎤" },
  { value: Genre.Ballad, label: "Ballad", emoji: "🌸" },
  { value: Genre.Rap, label: "Rap", emoji: "🔥" },
  { value: Genre.EDM, label: "EDM", emoji: "⚡" },
  { value: Genre.RnB, label: "R&B", emoji: "🎶" }
];
const PLATFORM_COLORS = {
  Spotify: "bg-green-500/10 text-green-600 border-green-500/25 dark:text-green-400",
  SoundCloud: "bg-orange-500/10 text-orange-600 border-orange-500/25 dark:text-orange-400",
  YouTube: "bg-red-500/10 text-red-600 border-red-500/25 dark:text-red-400",
  Other: "bg-muted text-muted-foreground border-border"
};
const GENRE_LABEL = {
  HipHop: "Hip-Hop",
  RnB: "R&B"
};
const PLATFORM_ICONS = {
  Spotify: "🎧",
  SoundCloud: "☁️",
  YouTube: "▶️"
};
const PLAYABLE_PLATFORMS = /* @__PURE__ */ new Set(["Spotify", "YouTube", "SoundCloud"]);
const songLinks = sampleLinks.filter((l) => l.category === Category.BTS_SONGS);
function WatchlistBtn({
  link,
  entries,
  isLoggedIn,
  onAdd,
  onRemove,
  pending,
  index
}) {
  const entry = entries.find((e) => e.linkId === String(link.id));
  const btn = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: `w-8 h-8 shrink-0 rounded-full transition-smooth ${entry ? "text-primary bg-primary/10 hover:bg-primary/20" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`,
      disabled: pending || !isLoggedIn,
      onClick: (e) => {
        e.preventDefault();
        if (!isLoggedIn) return;
        entry ? onRemove(entry.id) : onAdd(String(link.id));
      },
      "aria-label": entry ? "Remove from watchlist" : "Add to watchlist",
      "data-ocid": `songs.watchlist_toggle.${index}`,
      children: entry ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-4 h-4" })
    }
  );
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: btn }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", className: "text-xs", children: "Sign in to save songs to watchlist" })
    ] }) });
  }
  return btn;
}
function SongCard({
  link,
  index,
  entries,
  isLoggedIn,
  showSubtitleBadge,
  onAdd,
  onRemove,
  pending,
  onPlay
}) {
  const platformKind = link.platform.__kind__;
  const platformColor = PLATFORM_COLORS[platformKind] ?? PLATFORM_COLORS.Other;
  const platformIcon = PLATFORM_ICONS[platformKind] ?? "🎵";
  const genreLabel = link.genre ? GENRE_LABEL[link.genre] ?? link.genre : null;
  const isPlayable = PLAYABLE_PLATFORMS.has(platformKind);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.35, ease: "easeOut" },
      "data-ocid": `songs.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-lift h-full border-border bg-card group content-card content-card-hover overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-32 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CoverImage,
            {
              src: link.coverPhotoUrl,
              alt: link.title,
              category: link.category,
              aspectClass: "h-32"
            }
          ),
          isPlayable && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => onPlay(link),
              "aria-label": `Play ${link.title}`,
              "data-ocid": `songs.play_button.${index + 1}`,
              className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-elevated hover:bg-primary transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Play,
                {
                  className: "w-5 h-5 text-primary-foreground ml-0.5",
                  fill: "currentColor"
                }
              ) })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3 h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap min-w-0", children: [
              genreLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-genre text-xs py-0.5 px-2.5", children: genreLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs shrink-0 gap-1 ${platformColor}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: platformIcon }),
                    platformKind
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WatchlistBtn,
              {
                link,
                entries,
                isLoggedIn,
                onAdd,
                onRemove,
                pending,
                index: index + 1
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth", children: link.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-3 leading-relaxed break-words", children: link.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-2 border-t border-border/50 mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 min-w-0", children: showSubtitleBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(SubtitleBadge, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              isPlayable && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1",
                  onClick: () => onPlay(link),
                  "data-ocid": `songs.play_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3", fill: "currentColor" }),
                    "Play"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: link.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-1 text-muted-foreground text-xs font-medium hover:text-primary hover:underline transition-smooth",
                  onClick: (e) => e.stopPropagation(),
                  "data-ocid": `songs.open_link.${index + 1}`,
                  "aria-label": `Open ${link.title} externally`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
                }
              )
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function SongsPage() {
  const { isLoggedIn, principal } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [playerLink, setPlayerLink] = reactExports.useState(null);
  const [playerOpen, setPlayerOpen] = reactExports.useState(false);
  const getInitialGenre = () => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("genre");
    if (!g) return "ALL";
    const found = GENRE_FILTERS.find(
      (f) => f.value.toString().toLowerCase() === g.toLowerCase()
    );
    return found ? found.value : "ALL";
  };
  const [activeGenre, setActiveGenre] = reactExports.useState(getInitialGenre);
  const [search, setSearch] = reactExports.useState(
    () => new URLSearchParams(window.location.search).get("q") ?? ""
  );
  reactExports.useEffect(() => {
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
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [activeGenre, search]);
  const { data: profile } = useQuery({
    queryKey: ["profile", principal == null ? void 0 : principal.toText()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getProfile(principal);
    },
    enabled: isLoggedIn && !!actor && !!principal
  });
  const showSubtitleBadge = isLoggedIn && !!(profile == null ? void 0 : profile.subtitlePreference);
  const filteredSongs = songLinks.filter((link) => {
    const matchesGenre = activeGenre === "ALL" || link.genre === activeGenre;
    const q = search.toLowerCase();
    const matchesSearch = q === "" || link.title.toLowerCase().includes(q) || link.description.toLowerCase().includes(q);
    return matchesGenre && matchesSearch;
  });
  const { data: watchlistEntries = [] } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => actor ? actor.getWatchlist() : [],
    enabled: isLoggedIn && !!actor
  });
  const addMutation = useMutation({
    mutationFn: async (linkId) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.addToWatchlist({ linkId: BigInt(linkId) });
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      ue.success("Added to watchlist 🔖");
    },
    onError: () => ue.error("Failed to add to watchlist")
  });
  const removeMutation = useMutation({
    mutationFn: async (entryId) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeFromWatchlist(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      ue.success("Removed from watchlist");
    },
    onError: () => ue.error("Failed to remove from watchlist")
  });
  const isPending = addMutation.isPending || removeMutation.isPending;
  function handlePlay(link) {
    setPlayerLink(link);
    setPlayerOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden gradient-purple py-12 md:py-16",
        "data-ocid": "songs.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-20 pointer-events-none",
              style: {
                background: "radial-gradient(circle, oklch(0.85 0.18 290), transparent 70%)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10 pointer-events-none",
              style: {
                background: "radial-gradient(circle, oklch(0.9 0.22 270), transparent 70%)"
              },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex items-center gap-5",
                initial: { opacity: 0, y: -12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.45 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Music2,
                    {
                      className: "w-9 h-9 text-primary-foreground",
                      "aria-hidden": "true"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl md:text-4xl text-primary-foreground leading-tight", children: "BTS Songs 🎵" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm md:text-base mt-1 max-w-md", children: "Stream every BTS track across Spotify, SoundCloud & YouTube. Filter by genre, search by title." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "flex flex-wrap gap-3 mt-6",
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.2, duration: 0.4 },
                children: [
                  { label: `${songLinks.length} songs`, icon: "🎵" },
                  { label: "3 platforms", icon: "🎧" },
                  { label: "6 genres", icon: "🎼" }
                ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-white/20",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: stat.icon }),
                      stat.label
                    ]
                  },
                  stat.label
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border-b border-border sticky top-16 z-40 py-3 shadow-subtle",
        "data-ocid": "songs.filter_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-2",
              "aria-label": "Filter songs by genre",
              children: GENRE_FILTERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveGenre(g.value),
                  "data-ocid": `songs.genre_filter.${g.value.toString().toLowerCase()}`,
                  "aria-pressed": activeGenre === g.value,
                  className: `filter-pill inline-flex items-center gap-1.5 ${activeGenre === g.value ? "filter-pill-active" : "filter-pill-inactive"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: g.emoji }),
                    g.label
                  ]
                },
                g.value
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:ml-auto w-full sm:max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search songs…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-8 h-9 text-sm bg-muted/40",
                "aria-label": "Search songs by title or description",
                "data-ocid": "songs.search_input"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: "container mx-auto px-4 py-8",
        "data-ocid": "songs.grid_section",
        children: [
          (activeGenre !== "ALL" || search) && filteredSongs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
            "Showing",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filteredSongs.length }),
            " ",
            filteredSongs.length === 1 ? "song" : "songs",
            activeGenre !== "ALL" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              "in",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: GENRE_LABEL[activeGenre] ?? activeGenre })
            ] }),
            search && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              "matching",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
                "“",
                search,
                "”"
              ] })
            ] })
          ] }),
          filteredSongs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col items-center justify-center py-24 gap-4 text-center",
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.3 },
              "data-ocid": "songs.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full gradient-purple-subtle flex items-center justify-center border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", "aria-hidden": "true", children: "🎵" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "No songs found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 max-w-xs", children: "Try a different genre or clear your search to see all BTS songs." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      setSearch("");
                      setActiveGenre("ALL");
                    },
                    className: "border-primary/30 text-primary hover:bg-primary/10",
                    "data-ocid": "songs.clear_filters_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SlidersHorizontal,
                        {
                          className: "w-3.5 h-3.5 mr-2",
                          "aria-hidden": "true"
                        }
                      ),
                      "Clear filters"
                    ]
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              "data-ocid": "songs.list",
              children: filteredSongs.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SongCard,
                {
                  link,
                  index: i,
                  entries: watchlistEntries,
                  isLoggedIn,
                  showSubtitleBadge,
                  onAdd: (id) => addMutation.mutate(id),
                  onRemove: (id) => removeMutation.mutate(id),
                  pending: isPending,
                  onPlay: handlePlay
                },
                link.id.toString()
              ))
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MediaPlayerModal,
      {
        link: playerLink,
        open: playerOpen,
        onClose: () => setPlayerOpen(false)
      }
    )
  ] });
}
export {
  SongsPage as default
};
