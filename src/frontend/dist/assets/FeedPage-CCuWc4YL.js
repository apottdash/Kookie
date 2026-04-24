import { c as createLucideIcon, a as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, S as Sparkles, A as Avatar, h as AvatarFallback } from "./index-hVcvNcQS.js";
import { C as Card, a as CardContent } from "./card-Db51ftOn.js";
import { S as Separator } from "./separator-BSmefWgk.js";
import { T as Textarea } from "./textarea-Bk3RotPI.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-1eHNPnMn.js";
import { u as ue } from "./index-N1EbOTNx.js";
import { b as samplePosts, m as motion, s as sampleUsernames } from "./sampleData-CwOTQPd9.js";
import { P as PenLine } from "./pen-line-xA6VtrEY.js";
import { H as Heart, M as MessageCircle, F as Flag } from "./message-circle-Cr9nmBJ5.js";
import "./index-Da1zQCaI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode);
function formatTime(ts) {
  const ms = Number(ts) * 1e3;
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function formatCount(n) {
  const num = Number(n);
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}k`;
  return String(num);
}
function ActionButton({
  isLoggedIn,
  disabledTooltip,
  onClick,
  children,
  className = "",
  ocid
}) {
  if (isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick,
        "data-ocid": ocid,
        className,
        children
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        "data-ocid": ocid,
        className: `${className} opacity-50 cursor-not-allowed`,
        children
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", className: "text-xs", children: disabledTooltip })
  ] }) });
}
function PostCard({ post, index }) {
  const { isLoggedIn } = useAuth();
  const username = sampleUsernames[post.author.toText()] ?? "ARMY Member";
  const initials = username.slice(0, 2).toUpperCase();
  const [likes, setLikes] = reactExports.useState(Number(post.likesCount));
  const [liked, setLiked] = reactExports.useState(false);
  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => liked ? prev - 1 : prev + 1);
    if (!liked) ue.success("You purple-hearted this post! 💜");
  };
  const handleFlag = () => {
    ue.info("Post flagged for review.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: index * 0.06 },
      "data-ocid": `feed.post_card.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card card-lift", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-9 h-9 border-2 border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-xs font-bold", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatTime(post.createdAt) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `/feed/${post.id}`,
            "data-ocid": `feed.post_link.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: post.content })
          }
        ),
        post.hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: post.hashtags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full",
            children: [
              "#",
              tag
            ]
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            ActionButton,
            {
              isLoggedIn,
              disabledTooltip: "Sign in to like 💜",
              onClick: handleLike,
              ocid: `feed.like_button.${index + 1}`,
              className: `flex items-center gap-1.5 text-xs font-medium transition-smooth ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-4 h-4 ${liked ? "fill-primary" : ""}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatCount(BigInt(likes)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `/feed/${post.id}`,
              "data-ocid": `feed.comment_button.${index + 1}`,
              className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth font-medium",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reply" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              isLoggedIn,
              disabledTooltip: "Sign in to report 💜",
              onClick: handleFlag,
              ocid: `feed.flag_button.${index + 1}`,
              className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-smooth ml-auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-3.5 h-3.5" })
            }
          )
        ] })
      ] }) })
    }
  );
}
function FeedPage() {
  const { isLoggedIn, login } = useAuth();
  const [newPost, setNewPost] = reactExports.useState("");
  const [posts] = reactExports.useState(samplePosts);
  const handlePost = () => {
    if (!newPost.trim()) return;
    ue.success("Post shared with the ARMY! 💜");
    setNewPost("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 border-b border-border py-8",
        "data-ocid": "feed.header_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl text-foreground flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-6 h-6 text-primary" }),
            "ARMY Feed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Share your love for BTS with the community 💜" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex flex-col gap-6", children: [
      isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-border bg-card",
          "data-ocid": "feed.compose_section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Share with ARMY" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "What's on your ARMY heart today? 💜",
                value: newPost,
                onChange: (e) => setNewPost(e.target.value),
                className: "resize-none min-h-[90px] bg-muted/30 border-border text-sm",
                "data-ocid": "feed.new_post_textarea"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                newPost.length,
                "/500"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: handlePost,
                  disabled: !newPost.trim(),
                  className: "bg-primary text-primary-foreground rounded-full gap-1.5",
                  "data-ocid": "feed.submit_post_button",
                  children: "Post 💜"
                }
              )
            ] })
          ] })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          "data-ocid": "feed.signin_banner",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-primary/20 bg-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 gradient-purple" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-purple-subtle absolute inset-0 pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 py-5 flex flex-col sm:flex-row items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm leading-snug", children: "Join the conversation, ARMY! 💜" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sign in to post, like, and reply — your fandom awaits" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  onClick: login,
                  className: "bg-primary text-primary-foreground rounded-full shrink-0 gap-1.5",
                  "data-ocid": "feed.signin_button",
                  children: "Sign in to join 💜"
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "feed.posts_list", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post, index: i }, post.id.toString())) })
    ] }) })
  ] });
}
export {
  FeedPage as default
};
