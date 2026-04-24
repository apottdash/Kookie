import { c as createLucideIcon, u as useParams, a as useAuth, r as reactExports, j as jsxRuntimeExports, A as Avatar, h as AvatarFallback, U as User, B as Button, L as Label, I as Input, X } from "./index-hVcvNcQS.js";
import { B as Badge } from "./badge-C36aewCt.js";
import { C as Card, a as CardContent } from "./card-Db51ftOn.js";
import { T as Textarea } from "./textarea-Bk3RotPI.js";
import { u as ue } from "./index-N1EbOTNx.js";
import { s as sampleUsernames, b as samplePosts, m as motion } from "./sampleData-CwOTQPd9.js";
import { P as PenLine } from "./pen-line-xA6VtrEY.js";
import { E as ExternalLink } from "./external-link-BG5lSryx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function ProfilePage() {
  const params = useParams({ strict: false });
  const { isLoggedIn, principalText } = useAuth();
  const isOwnProfile = isLoggedIn && principalText === params.principal;
  const username = sampleUsernames["army1-principal"];
  const [editing, setEditing] = reactExports.useState(false);
  const [displayName, setDisplayName] = reactExports.useState(username);
  const [bio, setBio] = reactExports.useState(
    "BTS ARMY since 2013 💜 Hobi's #1 fan | Spreading purple love worldwide 🌏"
  );
  const [tempName, setTempName] = reactExports.useState(displayName);
  const [tempBio, setTempBio] = reactExports.useState(bio);
  const userPosts = samplePosts.slice(0, 3);
  const initials = displayName.slice(0, 2).toUpperCase();
  const handleSave = () => {
    if (!tempName.trim()) {
      ue.error("Username can't be empty!");
      return;
    }
    setDisplayName(tempName);
    setBio(tempBio);
    setEditing(false);
    ue.success("Profile updated! 💜");
  };
  const handleCancel = () => {
    setTempName(displayName);
    setTempBio(bio);
    setEditing(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-gradient-to-b from-primary/10 to-background border-b border-border py-12",
        "data-ocid": "profile.header_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-col sm:flex-row items-center sm:items-start gap-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-20 h-20 border-4 border-primary/40 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/20 text-primary text-2xl font-bold font-display", children: initials }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-center sm:justify-start flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: displayName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border-primary/20 text-xs", children: "ARMY 💜" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-md leading-relaxed", children: bio }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 justify-center sm:justify-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                    " Joined 2024"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
                    " ",
                    userPosts.length,
                    " posts"
                  ] })
                ] })
              ] }),
              isOwnProfile && !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => setEditing(true),
                  className: "shrink-0 gap-1.5 border-primary/30 hover:border-primary/60",
                  "data-ocid": "profile.edit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
                    "Edit Profile"
                  ]
                }
              )
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-2xl flex flex-col gap-6", children: [
      editing && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-primary/30 bg-card",
              "data-ocid": "profile.edit_form",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-primary" }),
                  "Edit Profile"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground mb-1.5 block", children: "Username" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        value: tempName,
                        onChange: (e) => setTempName(e.target.value),
                        placeholder: "Your ARMY name",
                        className: "bg-muted/30",
                        "data-ocid": "profile.username_input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm text-foreground mb-1.5 block", children: "Bio" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        value: tempBio,
                        onChange: (e) => setTempBio(e.target.value),
                        placeholder: "Tell ARMY about yourself 💜",
                        className: "resize-none min-h-[80px] bg-muted/30",
                        "data-ocid": "profile.bio_input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: handleCancel,
                      className: "gap-1.5",
                      "data-ocid": "profile.cancel_edit_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                        " Cancel"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: handleSave,
                      className: "bg-primary text-primary-foreground gap-1.5",
                      "data-ocid": "profile.save_profile_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                        " Save Profile"
                      ]
                    }
                  )
                ] })
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.posts_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground mb-4 flex items-center gap-2", children: [
          "Recent Posts",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: userPosts.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: userPosts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.08 },
            "data-ocid": `profile.post_item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/feed/${post.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-lift border-border bg-card/80 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed line-clamp-2", children: post.content }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: post.hashtags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary/70", children: [
                  "#",
                  tag
                ] }, tag)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "💜 ",
                    Number(post.likesCount)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3 text-primary" })
                ] })
              ] })
            ] }) }) })
          },
          post.id.toString()
        )) })
      ] }),
      params.principal && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "border-border bg-muted/20",
          "data-ocid": "profile.principal_section",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Principal ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-foreground/70 break-all", children: params.principal })
          ] })
        }
      )
    ] })
  ] });
}
export {
  ProfilePage as default
};
