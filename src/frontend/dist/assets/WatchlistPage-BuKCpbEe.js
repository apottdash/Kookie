import { c as createLucideIcon, a as useAuth, b as useBackend, d as useQueryClient, r as reactExports, e as useQuery, j as jsxRuntimeExports, M as Skeleton, B as Button, S as Sparkles, N as LogIn } from "./index-hVcvNcQS.js";
import { B as Badge } from "./badge-C36aewCt.js";
import { C as Card, a as CardContent } from "./card-Db51ftOn.js";
import { u as useMutation } from "./useMutation-BC7QClTs.js";
import { u as ue } from "./index-N1EbOTNx.js";
import { C as CoverImage, M as MediaPlayerModal } from "./MediaPlayerModal-o7oGxCHh.js";
import { a as sampleLinks, m as motion } from "./sampleData-CwOTQPd9.js";
import { P as Play } from "./play-CgvQuDIY.js";
import { E as ExternalLink } from "./external-link-BG5lSryx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
];
const BookmarkX = createLucideIcon("bookmark-x", __iconNode);
const platformBadgeMap = {
  Netflix: "bg-red-500/10 text-red-400 border-red-500/20",
  YouTube: "bg-red-600/10 text-red-500 border-red-600/20",
  Viki: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Webtoon: "bg-primary/10 text-primary border-primary/20",
  Tapas: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  MangaDex: "bg-red-700/10 text-red-600 border-red-700/20",
  Tappytoon: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Lezhin: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Bato: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Other: "bg-muted text-muted-foreground border-border"
};
function getPlatformBadgeClass(kind) {
  return platformBadgeMap[kind] ?? platformBadgeMap.Other;
}
function WatchlistLoginPrompt({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-24 gap-5 text-center",
      "data-ocid": "watchlist.login_prompt",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Sign in to use your Watchlist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto", children: "Connect with Internet Identity to save your favourite BTS lives, K-dramas, and manhwas 💜" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onLogin,
            className: "bg-primary text-primary-foreground gap-2 rounded-full",
            "data-ocid": "watchlist.login_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              "Connect with Internet Identity"
            ]
          }
        )
      ]
    }
  );
}
function WatchlistEmpty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-24 gap-5 text-center",
      "data-ocid": "watchlist.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🔖" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Your watchlist is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs mx-auto", children: "Browse links and tap the bookmark icon to save them here for later 💜" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "bg-primary text-primary-foreground rounded-full gap-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/links", "data-ocid": "watchlist.browse_links_button", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
              "Browse Links"
            ] })
          }
        )
      ]
    }
  );
}
function WatchlistPage() {
  const { isLoggedIn, login } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [playerLink, setPlayerLink] = reactExports.useState(null);
  const [playerOpen, setPlayerOpen] = reactExports.useState(false);
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWatchlist();
    },
    enabled: isLoggedIn && !!actor
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
    onError: () => ue.error("Failed to remove")
  });
  const resolvedItems = entries.map((entry) => {
    const link = sampleLinks.find((l) => String(l.id) === entry.linkId);
    return { entry, link };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 border-b border-border py-8",
        "data-ocid": "watchlist.header_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "My Watchlist" }),
            isLoggedIn && entries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "bg-primary/10 text-primary border-primary/20 text-sm",
                children: [
                  entries.length,
                  " ",
                  entries.length === 1 ? "item" : "items"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Your personal collection of saved BTS lives, K-dramas, and manhwas 🔖" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: !isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(WatchlistLoginPrompt, { onLogin: login }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "watchlist.loading_state",
        children: [1, 2, 3, 4, 5, 6].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-xl" }, k))
      }
    ) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(WatchlistEmpty, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        "data-ocid": "watchlist.list",
        children: resolvedItems.map(({ entry, link }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            "data-ocid": `watchlist.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full border-border bg-card group hover:border-primary/40 transition-smooth overflow-hidden", children: [
              link && /* @__PURE__ */ jsxRuntimeExports.jsx(
                CoverImage,
                {
                  src: link.coverPhotoUrl,
                  alt: link.title,
                  category: link.category
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5 flex flex-col gap-3 h-full", children: link ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-xs shrink-0 ${getPlatformBadgeClass(link.platform.__kind__)}`,
                      children: link.platform.__kind__
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "w-7 h-7 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                      disabled: removeMutation.isPending,
                      onClick: () => removeMutation.mutate(entry.id),
                      "data-ocid": `watchlist.remove_button.${i + 1}`,
                      "aria-label": "Remove from watchlist",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkX, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth", children: link.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-3 leading-relaxed", children: link.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-auto pt-2 border-t border-border/50", children: [
                  link.mediaUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1",
                      onClick: () => {
                        setPlayerLink(link);
                        setPlayerOpen(true);
                      },
                      "data-ocid": `watchlist.play_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3", fill: "currentColor" }),
                        "Play"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: link.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-1 text-primary text-xs font-medium ml-auto hover:underline",
                      "data-ocid": `watchlist.open_link.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open link" })
                      ]
                    }
                  )
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                    "Link #",
                    entry.linkId
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "w-7 h-7 shrink-0 text-muted-foreground hover:text-destructive",
                      disabled: removeMutation.isPending,
                      onClick: () => removeMutation.mutate(entry.id),
                      "data-ocid": `watchlist.remove_button.${i + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkX, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Link details unavailable" })
              ] }) })
            ] })
          },
          entry.id
        ))
      }
    ) }),
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
  WatchlistPage as default
};
