import { r as reactExports, j as jsxRuntimeExports, C as Category, _ as Root, $ as Content, a0 as Close, X, s as cn, a1 as Title, a2 as Portal, a3 as Overlay } from "./index-hVcvNcQS.js";
import { E as ExternalLink } from "./external-link-BG5lSryx.js";
const CATEGORY_FALLBACK = {
  [Category.BTS_LIVE]: {
    gradient: "from-violet-600/60 via-purple-600/50 to-indigo-700/60",
    icon: "🎤"
  },
  [Category.BTS_SONGS]: {
    gradient: "from-purple-600/60 via-fuchsia-600/50 to-violet-700/60",
    icon: "🎵"
  },
  [Category.K_DRAMA]: {
    gradient: "from-pink-500/60 via-rose-500/50 to-pink-700/60",
    icon: "🎬"
  },
  [Category.MANHWA]: {
    gradient: "from-blue-500/60 via-sky-500/50 to-indigo-600/60",
    icon: "📚"
  },
  [Category.FANFICTION]: {
    gradient: "from-amber-500/60 via-orange-500/50 to-yellow-600/60",
    icon: "📝"
  }
};
const DEFAULT_FALLBACK = {
  gradient: "from-muted via-muted/80 to-muted",
  icon: "🔗"
};
function CoverImage({
  src,
  alt,
  category,
  aspectClass = "aspect-video"
}) {
  const [failed, setFailed] = reactExports.useState(false);
  const fallback = category ? CATEGORY_FALLBACK[category] ?? DEFAULT_FALLBACK : DEFAULT_FALLBACK;
  const showImage = !!src && !failed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative w-full ${aspectClass} overflow-hidden rounded-t-xl`,
      children: [
        showImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt,
            loading: "lazy",
            className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
            onError: () => setFailed(true)
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `absolute inset-0 bg-gradient-to-br ${fallback.gradient} flex items-center justify-center`,
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl select-none opacity-80", children: fallback.icon })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" })
      ]
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function extractSpotifyId(url) {
  const match = url.match(
    /open\.spotify\.com\/(track|album|playlist)\/([A-Za-z0-9]+)/
  );
  if (!match) return null;
  return { type: match[1], id: match[2] };
}
function buildSoundCloudEmbedUrl(url) {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%239333ea&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
}
function buildYouTubeEmbedUrl(mediaUrl) {
  return `https://www.youtube.com/embed/${mediaUrl}?autoplay=1&rel=0&modestbranding=1`;
}
function YouTubeEmbed({ videoId }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full", style: { aspectRatio: "16/9" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "iframe",
    {
      src: buildYouTubeEmbedUrl(videoId),
      title: "YouTube video player",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      allowFullScreen: true,
      sandbox: "allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox",
      className: "absolute inset-0 w-full h-full rounded-lg border border-border/30"
    }
  ) });
}
function SpotifyEmbed({ url }) {
  const spotifyId = extractSpotifyId(url);
  if (!spotifyId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-24 bg-muted/40 rounded-lg text-muted-foreground text-sm", children: "Unable to embed this Spotify track." });
  }
  const embedUrl = `https://open.spotify.com/embed/${spotifyId.type}/${spotifyId.id}?utm_source=generator&theme=0`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "iframe",
    {
      src: embedUrl,
      width: "100%",
      height: "152",
      allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
      loading: "lazy",
      className: "rounded-lg border border-border/30",
      title: "Spotify player"
    }
  );
}
function SoundCloudEmbed({ url }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "iframe",
    {
      width: "100%",
      height: "166",
      src: buildSoundCloudEmbedUrl(url),
      allow: "autoplay",
      className: "rounded-lg border border-border/30",
      title: "SoundCloud player"
    }
  );
}
function MediaPlayerModal({
  link,
  open,
  onClose
}) {
  if (!link) return null;
  const platform = link.platform.__kind__;
  const canEmbed = platform === "YouTube" || platform === "Spotify" || platform === "SoundCloud";
  function renderPlayer() {
    if (!link) return null;
    if (platform === "YouTube" && link.mediaUrl) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(YouTubeEmbed, { videoId: link.mediaUrl });
    }
    if (platform === "Spotify") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SpotifyEmbed, { url: link.url });
    }
    if (platform === "SoundCloud") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SoundCloudEmbed, { url: link.url });
    }
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-2xl w-full p-0 overflow-hidden bg-card border-border gap-0",
      "data-ocid": "media_player.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            "aria-label": "Close player",
            "data-ocid": "media_player.close_button",
            className: "absolute right-3 top-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-smooth",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        link.coverPhotoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-36 overflow-hidden shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: link.coverPhotoUrl,
              alt: link.title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 pt-4 flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "gap-1 text-left space-y-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg font-bold text-foreground leading-snug pr-8", children: link.title }),
            link.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: link.description })
          ] }),
          canEmbed ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "media_player.canvas_target", children: renderPlayer() }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-20 bg-muted/40 rounded-lg text-muted-foreground text-sm", children: "Embedded player not available for this platform." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: link.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-1.5 text-primary text-xs font-medium hover:underline self-start",
              "data-ocid": "media_player.open_external_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                "Open in ",
                platform
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  CoverImage as C,
  MediaPlayerModal as M
};
