import { a as useAuth, b as useBackend, d as useQueryClient, r as reactExports, e as useQuery, j as jsxRuntimeExports, S as Sparkles, G as Genre, f as Search, I as Input, B as Button, C as Category } from "./index-hVcvNcQS.js";
import { B as Badge } from "./badge-C36aewCt.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-1eHNPnMn.js";
import { u as useMutation } from "./useMutation-BC7QClTs.js";
import { u as ue } from "./index-N1EbOTNx.js";
import { M as MediaPlayerModal, C as CoverImage } from "./MediaPlayerModal-o7oGxCHh.js";
import { S as SlidersHorizontal, a as SubtitleBadge, b as BookmarkPlus, B as BookmarkCheck } from "./SubtitleBadge-Bfx3frTM.js";
import { m as motion, a as sampleLinks } from "./sampleData-CwOTQPd9.js";
import { P as Play } from "./play-CgvQuDIY.js";
import { E as ExternalLink } from "./external-link-BG5lSryx.js";
import "./index-Da1zQCaI.js";
const GENRE_FILTERS = [
  { value: "ALL", label: "All", emoji: "✨" },
  { value: Genre.Romance, label: "Romance", emoji: "💜" },
  { value: Genre.AU, label: "AU", emoji: "🌙" },
  { value: Genre.Drama, label: "Drama", emoji: "🎭" },
  { value: Genre.Mystery, label: "Mystery", emoji: "🔍" },
  { value: Genre.Comedy, label: "Comedy", emoji: "😄" },
  { value: Genre.Fantasy, label: "Fantasy", emoji: "🔮" },
  { value: Genre.Action, label: "Action", emoji: "⚡" }
];
const PLATFORM_COLORS = {
  Wattpad: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  YouTube: "bg-red-500/10 text-red-500 border-red-500/20 dark:text-red-400",
  Other: "bg-muted text-muted-foreground border-border"
};
const GENRE_BADGE_COLORS = {
  Romance: "bg-pink-500/10 text-pink-600 border-pink-400/30 dark:text-pink-400",
  AU: "bg-violet-500/10 text-violet-600 border-violet-400/30 dark:text-violet-400",
  Drama: "bg-blue-500/10 text-blue-600 border-blue-400/30 dark:text-blue-400",
  Fantasy: "bg-emerald-500/10 text-emerald-600 border-emerald-400/30 dark:text-emerald-400",
  Comedy: "bg-yellow-400/10 text-yellow-600 border-yellow-400/30 dark:text-yellow-500",
  Mystery: "bg-orange-500/10 text-orange-600 border-orange-400/30 dark:text-orange-400",
  Action: "bg-red-500/10 text-red-600 border-red-400/30 dark:text-red-400"
};
const PLATFORM_ICONS = {
  Wattpad: "📕",
  YouTube: "▶️"
};
const GENRE_STATS = [
  { label: "Stories", value: "50+" },
  { label: "Platforms", value: "Wattpad & YouTube" },
  { label: "Genres", value: "7+" }
];
const fictionLinks = sampleLinks.filter(
  (l) => l.category === Category.FANFICTION
);
function WatchlistBtn({
  link,
  entries,
  onAdd,
  onRemove,
  pending,
  isLoggedIn,
  onLoginPrompt,
  index
}) {
  const entry = entries.find((e) => e.linkId === String(link.id));
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Sign in to add to watchlist",
          "data-ocid": `fanfiction.watchlist_toggle.${index}`,
          className: "inline-flex items-center justify-center w-7 h-7 shrink-0 text-muted-foreground opacity-50 cursor-pointer rounded hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          onClick: onLoginPrompt,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-4 h-4" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "left", className: "text-xs", children: "Sign in to save stories 💜" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: `w-7 h-7 shrink-0 transition-smooth ${entry ? "text-primary bg-primary/10 hover:bg-primary/20" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`,
      disabled: pending,
      onClick: (e) => {
        e.preventDefault();
        entry ? onRemove(entry.id) : onAdd(String(link.id));
      },
      "aria-label": entry ? "Remove from watchlist" : "Add to watchlist",
      "data-ocid": `fanfiction.watchlist_toggle.${index}`,
      children: entry ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-4 h-4" })
    }
  );
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
  onPlay
}) {
  const platformKey = link.platform.__kind__;
  const platformIcon = PLATFORM_ICONS[platformKey] ?? "📄";
  const genreColor = link.genre ? GENRE_BADGE_COLORS[link.genre] ?? "" : "";
  const platformColor = PLATFORM_COLORS[platformKey] ?? PLATFORM_COLORS.Other;
  const isPlayable = platformKey === "YouTube" && !!link.mediaUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06, duration: 0.35 },
      "data-ocid": `fanfiction.item.${index + 1}`,
      className: "h-full",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content-card content-card-hover h-full flex flex-col group card-lift overflow-hidden !p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CoverImage,
          {
            src: link.coverPhotoUrl,
            alt: link.title,
            category: link.category
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
              link.genre && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs shrink-0 ${genreColor}`,
                  children: link.genre
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs shrink-0 ${platformColor}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1", "aria-hidden": "true", children: platformIcon }),
                    platformKey
                  ]
                }
              ),
              subtitlePreference && /* @__PURE__ */ jsxRuntimeExports.jsx(SubtitleBadge, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WatchlistBtn,
              {
                link,
                entries,
                onAdd,
                onRemove,
                pending: mutationPending,
                isLoggedIn,
                onLoginPrompt,
                index: index + 1
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth mb-1.5", children: link.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-3 leading-relaxed", children: link.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-2 border-t border-border/50 mt-auto", children: [
            isPlayable && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1",
                onClick: () => onPlay(link),
                "data-ocid": `fanfiction.play_button.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3", fill: "currentColor" }),
                  "Watch"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: link.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-1.5 text-primary text-xs font-medium ml-auto hover:underline underline-offset-2",
                "data-ocid": `fanfiction.open_link.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Read story" })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function FanFictionPage() {
  const { isLoggedIn, login } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [playerLink, setPlayerLink] = reactExports.useState(null);
  const [playerOpen, setPlayerOpen] = reactExports.useState(false);
  const getInitialGenre = () => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("genre");
    if (!g) return "ALL";
    const found = GENRE_FILTERS.find(
      (f) => f.value.toLowerCase() === g.toLowerCase()
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
      params.set("genre", activeGenre.toLowerCase());
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
    queryKey: ["my-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: isLoggedIn && !!actor
  });
  const subtitlePreference = (profile == null ? void 0 : profile.subtitlePreference) ?? false;
  const filtered = fictionLinks.filter((link) => {
    const matchesGenre = activeGenre === "ALL" || link.genre === activeGenre;
    const matchesSearch = search === "" || link.title.toLowerCase().includes(search.toLowerCase()) || link.description.toLowerCase().includes(search.toLowerCase());
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
  const mutationPending = addMutation.isPending || removeMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden py-14 md:py-20",
        "data-ocid": "fanfiction.hero_section",
        style: {
          background: "linear-gradient(135deg, oklch(0.35 0.2 290), oklch(0.52 0.26 290), oklch(0.42 0.22 275))"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-10 -right-10 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none",
              style: { background: "oklch(0.75 0.28 290)" },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 -left-10 w-48 h-48 rounded-full opacity-15 blur-2xl pointer-events-none",
              style: { background: "oklch(0.65 0.24 300)" },
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55 },
              className: "max-w-2xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1 border",
                    style: {
                      background: "oklch(0.98 0.01 0 / 0.15)",
                      color: "oklch(0.96 0.02 290)",
                      borderColor: "oklch(0.98 0.01 0 / 0.25)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3", "aria-hidden": "true" }),
                      "ARMY Fan Fiction"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "font-display font-bold text-4xl md:text-5xl leading-tight mb-3",
                    style: { color: "oklch(0.97 0.02 290)" },
                    children: "Fan Fiction 💜"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-base md:text-lg leading-relaxed mb-6",
                    style: { color: "oklch(0.88 0.04 290)" },
                    children: "ARMY-crafted stories inspired by BTS — from heartfelt romances to wild alternate universes. Discover the best fan fics on Wattpad, YouTube, and more."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: GENRE_STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-xl leading-none",
                      style: { color: "oklch(0.97 0.02 290)" },
                      children: s.value
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs mt-0.5",
                      style: { color: "oklch(0.82 0.04 290)" },
                      children: s.label
                    }
                  )
                ] }, s.label)) })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border-b border-border sticky top-16 z-40 py-3",
        "data-ocid": "fanfiction.filter_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: GENRE_FILTERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveGenre(g.value),
              "data-ocid": `fanfiction.genre_filter.${g.value.toLowerCase()}`,
              className: `filter-pill ${activeGenre === g.value ? "filter-pill-active" : "filter-pill-inactive"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "mr-1", children: g.emoji }),
                g.label
              ]
            },
            g.value
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:ml-auto w-full sm:max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search fan fiction…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-8 h-9 text-sm bg-muted/40",
                "data-ocid": "fanfiction.search_input"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-8",
        "data-ocid": "fanfiction.grid_section",
        children: [
          filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
            "Showing",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
            " ",
            "stor",
            filtered.length === 1 ? "y" : "ies",
            activeGenre !== "ALL" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              "in",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: activeGenre })
            ] }),
            search && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " ",
              "matching “",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: search }),
              "”"
            ] })
          ] }),
          filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-24 gap-4 text-center",
              "data-ocid": "fanfiction.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0.7, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    transition: { type: "spring", stiffness: 180, damping: 14 },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", "aria-hidden": "true", children: "📖" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "No stories found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Try a different genre or adjust your search term to discover more fan fiction." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => {
                      setSearch("");
                      setActiveGenre("ALL");
                    },
                    "data-ocid": "fanfiction.clear_filters_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5 mr-2" }),
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
              "data-ocid": "fanfiction.list",
              children: filtered.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                FanFicCard,
                {
                  link,
                  index: i,
                  entries: watchlistEntries,
                  onAdd: (id) => addMutation.mutate(id),
                  onRemove: (id) => removeMutation.mutate(id),
                  mutationPending,
                  isLoggedIn,
                  subtitlePreference,
                  onLoginPrompt: login,
                  onPlay: (l) => {
                    setPlayerLink(l);
                    setPlayerOpen(true);
                  }
                },
                link.id.toString()
              ))
            }
          ),
          !isLoggedIn && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4 },
              className: "mt-8 rounded-xl border border-primary/20 p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left",
              style: { background: "oklch(0.48 0.22 290 / 0.06)" },
              "data-ocid": "fanfiction.login_nudge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl shrink-0", "aria-hidden": "true", children: "💜" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Save your favourite stories" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sign in to build your personal watchlist and get subtitle preferences." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: login,
                    className: "shrink-0",
                    "data-ocid": "fanfiction.login_button",
                    children: "Sign In"
                  }
                )
              ]
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
  FanFictionPage as default
};
