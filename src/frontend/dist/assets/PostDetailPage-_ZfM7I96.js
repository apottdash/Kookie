import { c as createLucideIcon, u as useParams, a as useAuth, r as reactExports, j as jsxRuntimeExports, B as Button, A as Avatar, h as AvatarFallback, S as Sparkles } from "./index-hVcvNcQS.js";
import { B as Badge } from "./badge-C36aewCt.js";
import { C as Card, a as CardContent } from "./card-Db51ftOn.js";
import { S as Separator } from "./separator-BSmefWgk.js";
import { T as Textarea } from "./textarea-Bk3RotPI.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-1eHNPnMn.js";
import { u as ue } from "./index-N1EbOTNx.js";
import { b as samplePosts, s as sampleUsernames, m as motion } from "./sampleData-CwOTQPd9.js";
import { H as Heart, M as MessageCircle, F as Flag } from "./message-circle-Cr9nmBJ5.js";
import "./index-Da1zQCaI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const sampleComments = [
  {
    id: 1,
    author: "JiminsButterfly",
    content: "I cried so much watching this 😭💜 BTS forever!",
    time: "2h ago"
  },
  {
    id: 2,
    author: "YoongisGenius",
    content: "Purple you ARMY! This is everything 💜✨",
    time: "5h ago"
  },
  {
    id: 3,
    author: "KookiesAndCream",
    content: "Can't stop watching! JK's performance was insane 🔥",
    time: "1d ago"
  }
];
function formatCount(n) {
  const num = Number(n);
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}k`;
  return String(num);
}
function GatedButton({
  isLoggedIn,
  tooltip,
  onClick,
  className = "",
  ocid,
  children
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "top", className: "text-xs", children: tooltip })
  ] }) });
}
function PostDetailPage() {
  const params = useParams({ strict: false });
  const postId = params.postId ? BigInt(params.postId) : null;
  const post = samplePosts.find((p) => p.id === postId) ?? samplePosts[0];
  const { isLoggedIn, login } = useAuth();
  const [comment, setComment] = reactExports.useState("");
  const [liked, setLiked] = reactExports.useState(false);
  const [likes, setLikes] = reactExports.useState(Number(post.likesCount));
  const username = sampleUsernames[post.author.toText()] ?? "ARMY Member";
  const initials = username.slice(0, 2).toUpperCase();
  const handleLike = () => {
    setLiked((p) => !p);
    setLikes((p) => liked ? p - 1 : p + 1);
    if (!liked) ue.success("💜 You purple-hearted this!");
  };
  const handleFlag = () => {
    ue.info("Post reported for review.");
  };
  const handleComment = () => {
    if (!comment.trim()) return;
    ue.success("Comment posted! 💜");
    setComment("");
  };
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 py-16 text-center",
        "data-ocid": "post_detail.not_found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Post not found." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/feed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "mt-4", children: "Back to Feed" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 border-b border-border py-4",
        "data-ocid": "post_detail.breadcrumb",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/feed",
            className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth w-fit",
            "data-ocid": "post_detail.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              " Back to Feed"
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border bg-card mb-6",
              "data-ocid": "post_detail.main_post",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-10 h-10 border-2 border-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary font-bold", children: initials }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: username }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "BTS ARMY Member" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: post.content }),
                post.hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: post.hashtags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "secondary",
                    className: "bg-primary/10 text-primary border-primary/20 text-xs",
                    children: [
                      "#",
                      tag
                    ]
                  },
                  tag
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    GatedButton,
                    {
                      isLoggedIn,
                      tooltip: "Sign in to like 💜",
                      onClick: handleLike,
                      ocid: "post_detail.like_button",
                      className: `flex items-center gap-2 text-sm font-medium transition-smooth ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `w-5 h-5 ${liked ? "fill-primary" : ""}` }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          formatCount(BigInt(likes)),
                          " likes"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-5 h-5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      sampleComments.length,
                      " comments"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    GatedButton,
                    {
                      isLoggedIn,
                      tooltip: "Sign in to report 💜",
                      onClick: handleFlag,
                      ocid: "post_detail.flag_button",
                      className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-smooth ml-auto",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Report" })
                      ]
                    }
                  )
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col gap-4 mb-6",
              "data-ocid": "post_detail.comments_list",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-primary" }),
                  "Comments"
                ] }),
                sampleComments.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -12 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: i * 0.1 },
                    "data-ocid": `post_detail.comment.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8 border border-primary/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-xs font-bold", children: c.author.slice(0, 2).toUpperCase() }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: c.author }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: c.time })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: c.content })
                      ] })
                    ] }) })
                  },
                  c.id
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "post_detail.add_comment_section", children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                placeholder: "Leave a comment for ARMY 💜",
                value: comment,
                onChange: (e) => setComment(e.target.value),
                className: "resize-none min-h-[80px] bg-muted/30 border-border text-sm",
                "data-ocid": "post_detail.comment_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleComment,
                disabled: !comment.trim(),
                className: "bg-primary text-primary-foreground rounded-full gap-1.5",
                "data-ocid": "post_detail.submit_comment_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5" }),
                  "Comment"
                ]
              }
            ) })
          ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.2 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border border-primary/20 bg-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 gradient-purple" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gradient-purple-subtle absolute inset-0 pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative px-6 py-5 flex flex-col sm:flex-row items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-full bg-primary/15 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center sm:text-left flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Have something to say? 💜" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sign in to leave a comment and connect with ARMY" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      onClick: login,
                      className: "bg-primary text-primary-foreground rounded-full shrink-0",
                      "data-ocid": "post_detail.signin_to_comment_button",
                      children: "Sign in to comment 💜"
                    }
                  )
                ] })
              ] })
            }
          ) })
        ]
      }
    ) })
  ] });
}
export {
  PostDetailPage as default
};
