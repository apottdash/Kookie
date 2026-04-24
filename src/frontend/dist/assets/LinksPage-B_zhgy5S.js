import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useParams, a as useAuth, b as useBackend, d as useQueryClient, C as Category, e as useQuery, f as Search, I as Input, G as Genre, g as ContentLanguage, X, B as Button } from "./index-hVcvNcQS.js";
import { B as Badge } from "./badge-C36aewCt.js";
import { C as Card, a as CardContent } from "./card-Db51ftOn.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, S as Select, c as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem } from "./tabs-DztSEaKC.js";
import { u as useMutation } from "./useMutation-BC7QClTs.js";
import { u as ue } from "./index-N1EbOTNx.js";
import { C as CoverImage, M as MediaPlayerModal } from "./MediaPlayerModal-o7oGxCHh.js";
import { S as SlidersHorizontal, a as SubtitleBadge, B as BookmarkCheck, b as BookmarkPlus } from "./SubtitleBadge-Bfx3frTM.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, c as usePresence, d as useIsomorphicLayoutEffect, L as LayoutGroupContext, a as sampleLinks, m as motion } from "./sampleData-CwOTQPd9.js";
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
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const categoryTabs = [
  { value: "ALL", label: "All Links", emoji: "✨" },
  { value: Category.BTS_LIVE, label: "BTS Lives", emoji: "🎤" },
  { value: Category.BTS_SONGS, label: "BTS Songs", emoji: "🎵" },
  { value: Category.K_DRAMA, label: "K-Dramas", emoji: "🎬" },
  { value: Category.MANHWA, label: "Manhwas", emoji: "📚" },
  { value: Category.FANFICTION, label: "Fan Fiction", emoji: "📝" }
];
const genresByCategory = {
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
    Genre.AU
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
    Genre.AU
  ],
  [Category.BTS_SONGS]: [
    Genre.Pop,
    Genre.HipHop,
    Genre.Ballad,
    Genre.Rap,
    Genre.EDM,
    Genre.RnB
  ],
  [Category.K_DRAMA]: [
    Genre.Drama,
    Genre.Comedy,
    Genre.Romance,
    Genre.Thriller,
    Genre.Fantasy,
    Genre.Historical
  ],
  [Category.MANHWA]: [
    Genre.Action,
    Genre.Romance,
    Genre.Comedy,
    Genre.Fantasy,
    Genre.Thriller,
    Genre.Mystery
  ],
  [Category.FANFICTION]: [
    Genre.Romance,
    Genre.Drama,
    Genre.AU,
    Genre.Fantasy,
    Genre.Action,
    Genre.Comedy
  ]
};
const languageOptions = [
  { value: ContentLanguage.Korean, label: "Korean", flag: "🇰🇷" },
  { value: ContentLanguage.English, label: "English", flag: "🇬🇧" },
  { value: ContentLanguage.French, label: "French", flag: "🇫🇷" },
  { value: ContentLanguage.Hindi, label: "Hindi", flag: "🇮🇳" },
  { value: ContentLanguage.Spanish, label: "Spanish", flag: "🇪🇸" }
];
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
  Spotify: "bg-green-600/10 text-green-500 border-green-600/20",
  SoundCloud: "bg-orange-600/10 text-orange-500 border-orange-600/20",
  Wattpad: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Other: "bg-muted text-muted-foreground border-border"
};
const pageTitleMap = {
  ALL: "All Links",
  [Category.BTS_LIVE]: "BTS Lives 🎤",
  [Category.BTS_SONGS]: "BTS Songs 🎵",
  [Category.K_DRAMA]: "K-Dramas 🎬",
  [Category.MANHWA]: "Manhwas 📚",
  [Category.FANFICTION]: "Fan Fiction 📝"
};
function getPlatformBadgeClass(platform) {
  return platformBadgeMap[platform.__kind__] ?? platformBadgeMap.Other;
}
function getCategoryBadgeClass(cat) {
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
function getCategoryEmoji(cat) {
  if (cat === Category.BTS_LIVE) return "🎤";
  if (cat === Category.BTS_SONGS) return "🎵";
  if (cat === Category.K_DRAMA) return "🎬";
  if (cat === Category.FANFICTION) return "📝";
  return "📚";
}
function getLanguageFlag(lang) {
  var _a;
  return ((_a = languageOptions.find((l) => l.value === lang)) == null ? void 0 : _a.flag) ?? "🌐";
}
function readSearchParams() {
  const p = new URLSearchParams(window.location.search);
  const genre = p.get("genre");
  const lang = p.get("lang");
  const validGenre = genre && Object.values(Genre).includes(genre) ? genre : null;
  const validLang = lang && Object.values(ContentLanguage).includes(lang) ? lang : null;
  return { genre: validGenre, lang: validLang };
}
function updateSearchParams(genre, lang) {
  const p = new URLSearchParams(window.location.search);
  if (genre) p.set("genre", genre);
  else p.delete("genre");
  if (lang) p.set("lang", lang);
  else p.delete("lang");
  const newUrl = `${window.location.pathname}${p.toString() ? `?${p.toString()}` : ""}`;
  window.history.replaceState({}, "", newUrl);
}
function WatchlistButton({
  link,
  watchlistEntries,
  onAdd,
  onRemove,
  isAddPending,
  isRemovePending
}) {
  const entry = watchlistEntries.find((e) => e.linkId === String(link.id));
  const isInList = !!entry;
  const isPending = isAddPending || isRemovePending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: `w-7 h-7 shrink-0 transition-smooth ${isInList ? "text-primary bg-primary/10 hover:bg-primary/20" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`,
      disabled: isPending,
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isInList && entry) {
          onRemove(entry.id);
        } else {
          onAdd(String(link.id));
        }
      },
      "data-ocid": `links.watchlist_toggle.${link.id}`,
      "aria-label": isInList ? "Remove from watchlist" : "Add to watchlist",
      title: isInList ? "Remove from watchlist" : "Add to watchlist",
      children: isInList ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "w-4 h-4" })
    }
  );
}
function GenreFilterPills({
  availableGenres,
  activeGenre,
  onSelect
}) {
  if (availableGenres.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "links.genre_filter_pills", children: availableGenres.map((genre) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => onSelect(activeGenre === genre ? null : genre),
      className: `filter-pill ${activeGenre === genre ? "filter-pill-active" : "filter-pill-inactive"}`,
      "data-ocid": `links.genre_pill.${genre.toLowerCase()}`,
      "aria-pressed": activeGenre === genre,
      children: genre
    },
    genre
  )) });
}
function LinksPage() {
  const params = useParams({ strict: false });
  const urlCategory = params.category;
  const { isLoggedIn, principal } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [playerLink, setPlayerLink] = reactExports.useState(null);
  const [playerOpen, setPlayerOpen] = reactExports.useState(false);
  const initialFilter = urlCategory && Object.values(Category).includes(urlCategory) ? urlCategory : "ALL";
  const [activeTab, setActiveTab] = reactExports.useState(initialFilter);
  const [search, setSearch] = reactExports.useState("");
  const initial = readSearchParams();
  const [activeGenre, setActiveGenre] = reactExports.useState(initial.genre);
  const [activeLanguage, setActiveLanguage] = reactExports.useState(
    initial.lang
  );
  reactExports.useEffect(() => {
    updateSearchParams(activeGenre, activeLanguage);
  }, [activeGenre, activeLanguage]);
  reactExports.useEffect(() => {
    if (activeTab !== Category.MANHWA) {
      setActiveLanguage(null);
    }
  }, [activeTab]);
  const availableGenres = genresByCategory[activeTab] ?? [];
  const filtered = reactExports.useMemo(() => {
    return sampleLinks.filter((link) => {
      const matchesCategory = activeTab === "ALL" || link.category === activeTab;
      const matchesSearch = search === "" || link.title.toLowerCase().includes(search.toLowerCase()) || link.description.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = !activeGenre || link.genre === activeGenre;
      const matchesLanguage = !activeLanguage || link.contentLanguage !== void 0 && link.contentLanguage === activeLanguage;
      return matchesCategory && matchesSearch && matchesGenre && matchesLanguage;
    });
  }, [activeTab, search, activeGenre, activeLanguage]);
  const hasActiveFilters = !!activeGenre || !!activeLanguage;
  const { data: profile } = useQuery({
    queryKey: ["profile", principal == null ? void 0 : principal.toText()],
    queryFn: async () => {
      if (!actor || !principal) return null;
      return actor.getProfile(principal);
    },
    enabled: isLoggedIn && !!actor && !!principal
  });
  const showSubtitleBadge = (profile == null ? void 0 : profile.subtitlePreference) === true;
  const { data: watchlistEntries = [] } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWatchlist();
    },
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
  function clearAllFilters() {
    setSearch("");
    setActiveTab("ALL");
    setActiveGenre(null);
    setActiveLanguage(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-20 md:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-muted/30 border-b border-border py-8",
        "data-ocid": "links.header_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-2", children: pageTitleMap[activeTab] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Hand-picked links curated by ARMY, for ARMY 💜" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border-b border-border sticky top-16 z-40 py-3",
        "data-ocid": "links.filter_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tabs,
            {
              value: activeTab,
              onValueChange: (v) => {
                setActiveTab(v);
                setActiveGenre(null);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "bg-muted/50 h-9 flex-wrap", children: categoryTabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                TabsTrigger,
                {
                  value: tab.value,
                  className: "text-xs gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "data-ocid": `links.filter_tab.${tab.value.toLowerCase()}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.emoji }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: tab.label })
                  ]
                },
                tab.value
              )) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:ml-auto w-full sm:max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search links…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-8 h-9 text-sm bg-muted/40",
                "data-ocid": "links.search_input"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: availableGenres.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        transition: { duration: 0.2 },
        className: "bg-background border-b border-border",
        "data-ocid": "links.genre_language_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-3 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide shrink-0", children: "Genre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GenreFilterPills,
              {
                availableGenres,
                activeGenre,
                onSelect: setActiveGenre
              }
            )
          ] }),
          activeTab === Category.MANHWA && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 flex-wrap",
              "data-ocid": "links.language_filter",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide shrink-0 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3" }),
                  "Language"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: activeLanguage ?? "ALL",
                    onValueChange: (v) => setActiveLanguage(
                      v === "ALL" ? null : v
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-8 w-44 text-xs bg-muted/40 border-border",
                          "data-ocid": "links.language_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Languages" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ALL", children: "🌐 All Languages" }),
                        languageOptions.map((lang) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: lang.value, children: [
                          lang.flag,
                          " ",
                          lang.label
                        ] }, lang.value))
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              className: "flex items-center gap-2 flex-wrap",
              "data-ocid": "links.active_filters",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Active filters:" }),
                activeGenre && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-genre text-xs flex items-center gap-1", children: [
                  activeGenre,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveGenre(null),
                      "aria-label": "Remove genre filter",
                      className: "ml-0.5 hover:opacity-70 transition-smooth",
                      "data-ocid": "links.remove_genre_filter",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ] }),
                activeLanguage && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-language flex items-center gap-1", children: [
                  getLanguageFlag(activeLanguage),
                  " ",
                  activeLanguage,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveLanguage(null),
                      "aria-label": "Remove language filter",
                      className: "ml-0.5 hover:opacity-70 transition-smooth",
                      "data-ocid": "links.remove_language_filter",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setActiveGenre(null);
                      setActiveLanguage(null);
                    },
                    className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-smooth",
                    "data-ocid": "links.reset_filters_button",
                    children: "Reset all"
                  }
                )
              ]
            }
          )
        ] })
      },
      "genre-bar"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "container mx-auto px-4 py-8",
        "data-ocid": "links.grid_section",
        children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
            "data-ocid": "links.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "No links found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Try a different search, genre, or language filter." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: clearAllFilters,
                  "data-ocid": "links.clear_filters_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-3.5 h-3.5 mr-2" }),
                    "Clear all filters"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            "data-ocid": "links.list",
            children: filtered.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: Math.min(i * 0.05, 0.4) },
                "data-ocid": `links.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-lift h-full border-border bg-card group overflow-hidden", children: [
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
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            variant: "outline",
                            className: `text-xs shrink-0 ${getCategoryBadgeClass(link.category)}`,
                            children: [
                              getCategoryEmoji(link.category),
                              " ",
                              link.category.replace("_", " ")
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: `text-xs shrink-0 ${getPlatformBadgeClass(link.platform)}`,
                            children: link.platform.__kind__
                          }
                        ),
                        link.genre && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-genre !px-2 !py-0.5 !text-xs", children: link.genre }),
                        link.contentLanguage && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-language", children: [
                          getLanguageFlag(link.contentLanguage),
                          " ",
                          link.contentLanguage
                        ] }),
                        showSubtitleBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(SubtitleBadge, {})
                      ] }),
                      isLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        WatchlistButton,
                        {
                          link,
                          watchlistEntries,
                          onAdd: (id) => addMutation.mutate(id),
                          onRemove: (id) => removeMutation.mutate(id),
                          isAddPending: addMutation.isPending,
                          isRemovePending: removeMutation.isPending
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth", children: link.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-3 leading-relaxed", children: link.description })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mt-auto pt-2 border-t border-border/50", children: [
                      link.mediaUrl && (link.category === Category.BTS_LIVE || link.category === Category.BTS_SONGS) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "ghost",
                          size: "sm",
                          className: "h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1",
                          onClick: () => {
                            setPlayerLink(link);
                            setPlayerOpen(true);
                          },
                          "data-ocid": `links.play_button.${i + 1}`,
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
                          "data-ocid": `links.open_link.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open link" })
                          ]
                        }
                      )
                    ] })
                  ] })
                ] })
              },
              link.id.toString()
            ))
          }
        )
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
  LinksPage as default
};
