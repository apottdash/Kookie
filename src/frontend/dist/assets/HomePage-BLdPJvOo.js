import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Sparkles, B as Button, C as Category } from "./index-hVcvNcQS.js";
import { B as Badge } from "./badge-C36aewCt.js";
import { C as Card, a as CardContent } from "./card-Db51ftOn.js";
import { C as CoverImage, M as MediaPlayerModal } from "./MediaPlayerModal-o7oGxCHh.js";
import { m as motion, s as sampleUsernames, a as sampleLinks, b as samplePosts } from "./sampleData-CwOTQPd9.js";
import { P as Play } from "./play-CgvQuDIY.js";
import { U as Users, T as TrendingUp } from "./users-VEFGkPM-.js";
import "./external-link-BG5lSryx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m17 2-5 5-5-5", key: "16satq" }],
  ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", key: "1e6viu" }]
];
const Tv = createLucideIcon("tv", __iconNode);
const featuredLinks = sampleLinks.slice(0, 6);
const recentPosts = samplePosts.slice(0, 3);
const categoryCards = [
  {
    category: Category.BTS_LIVE,
    href: "/links/BTS_LIVE",
    label: "BTS Lives",
    description: "Full concerts, fancams & exclusive stages",
    emoji: "🎤",
    icon: Play,
    color: "from-primary/20 to-primary/5"
  },
  {
    category: Category.K_DRAMA,
    href: "/links/K_DRAMA",
    label: "K-Dramas",
    description: "Netflix, Viki & top Korean dramas",
    emoji: "🎬",
    icon: Tv,
    color: "from-accent/20 to-accent/5"
  },
  {
    category: Category.MANHWA,
    href: "/links/MANHWA",
    label: "Manhwas",
    description: "Webtoon picks & fan-favourite manhwas",
    emoji: "📚",
    icon: BookOpen,
    color: "from-secondary/20 to-secondary/5"
  }
];
function getPlatformLabel(platform) {
  return platform.__kind__;
}
function formatCount(n) {
  const num = Number(n);
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}k`;
  return String(num);
}
function HomePage() {
  const [playerLink, setPlayerLink] = reactExports.useState(null);
  const [playerOpen, setPlayerOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden",
        style: { minHeight: "380px" },
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-army-hub.dim_1200x500.jpg",
              alt: "ARMY Hub Hero",
              className: "absolute inset-0 w-full h-full object-cover object-center"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative container mx-auto px-4 py-20 flex flex-col items-center text-center gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/20 text-primary border-primary/30 px-4 py-1 text-xs font-semibold mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 mr-1.5" }),
                    "Your BTS Universe, All In One Place"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight max-w-3xl mx-auto", children: [
                    "Welcome to ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "ARMY" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Hub" }),
                    " 💜"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto mt-4 leading-relaxed", children: "BTS concerts, K-dramas, manhwas, and fan community — all curated with love for every ARMY." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 10 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3, duration: 0.5 },
                className: "flex flex-wrap gap-3 justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/links/BTS_LIVE", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "bg-primary text-primary-foreground rounded-full gap-2 shadow-elevated hover:shadow-hover transition-smooth",
                      "data-ocid": "home.explore_lives_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
                        "Explore Lives"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/feed", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      variant: "outline",
                      className: "rounded-full gap-2 border-primary/30 hover:border-primary/60 transition-smooth",
                      "data-ocid": "home.go_feed_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                        "Join the Feed"
                      ]
                    }
                  ) })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-muted/30 py-12",
        "data-ocid": "home.categories_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Browse by Category" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: categoryCards.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: cat.href, "data-ocid": `home.category_card.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: `card-lift bg-gradient-to-br ${cat.color} border-border cursor-pointer`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: cat.emoji }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: cat.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: cat.description })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-primary text-xs font-medium", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Browse all" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                    ] })
                  ] })
                }
              ) })
            },
            cat.category
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 bg-background",
        "data-ocid": "home.featured_links_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }),
              "Trending Links"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/links",
                className: "text-primary text-sm hover:underline flex items-center gap-1",
                "data-ocid": "home.view_all_links",
                children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: featuredLinks.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.08 },
              "data-ocid": `home.link_card.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-lift h-full border-border bg-card cursor-pointer group overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CoverImage,
                  {
                    src: link.coverPhotoUrl,
                    alt: link.title,
                    category: link.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3 h-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "secondary",
                        className: `text-xs shrink-0 ${link.category === Category.BTS_LIVE ? "bg-primary/15 text-primary border-primary/20" : link.category === Category.K_DRAMA ? "bg-accent/15 text-accent border-accent/20" : "bg-secondary/15 text-secondary border-secondary/20"}`,
                        children: [
                          link.category === Category.BTS_LIVE ? "🎤" : link.category === Category.K_DRAMA ? "🎬" : "📚",
                          " ",
                          link.category.replace("_", " ")
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs text-muted-foreground shrink-0",
                        children: getPlatformLabel(link.platform)
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth", children: link.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed", children: link.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-auto", children: [
                    link.mediaUrl && (link.category === Category.BTS_LIVE || link.category === Category.BTS_SONGS) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1",
                        onClick: (e) => {
                          e.preventDefault();
                          setPlayerLink(link);
                          setPlayerOpen(true);
                        },
                        "data-ocid": `home.play_button.${i + 1}`,
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
                        "data-ocid": `home.open_link.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open link" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                        ]
                      }
                    )
                  ] })
                ] })
              ] })
            },
            link.id.toString()
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 bg-muted/30",
        "data-ocid": "home.feed_preview_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
              "ARMY Community"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/feed",
                className: "text-primary text-sm hover:underline flex items-center gap-1",
                "data-ocid": "home.view_all_posts",
                children: [
                  "See all posts ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 max-w-2xl", children: recentPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `/feed/${post.id}`,
                  "data-ocid": `home.post_card.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-lift border-border bg-card cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold", children: (sampleUsernames[post.author.toText()] ?? "A")[0] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: sampleUsernames[post.author.toText()] ?? "ARMY Member" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed line-clamp-2", children: post.content }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        "💜 ",
                        formatCount(post.likesCount),
                        " likes"
                      ] }),
                      post.hashtags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary/70", children: [
                        "#",
                        tag
                      ] }, tag))
                    ] })
                  ] }) })
                }
              )
            },
            post.id.toString()
          )) })
        ] })
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
  HomePage as default
};
