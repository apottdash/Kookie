import { useState } from "react";
import { Category } from "../backend";

// ─── Category gradient + icon fallback ───────────────────────────────────────

const CATEGORY_FALLBACK: Record<string, { gradient: string; icon: string }> = {
  [Category.BTS_LIVE]: {
    gradient: "from-violet-600/60 via-purple-600/50 to-indigo-700/60",
    icon: "🎤",
  },
  [Category.BTS_SONGS]: {
    gradient: "from-purple-600/60 via-fuchsia-600/50 to-violet-700/60",
    icon: "🎵",
  },
  [Category.K_DRAMA]: {
    gradient: "from-pink-500/60 via-rose-500/50 to-pink-700/60",
    icon: "🎬",
  },
  [Category.MANHWA]: {
    gradient: "from-blue-500/60 via-sky-500/50 to-indigo-600/60",
    icon: "📚",
  },
  [Category.FANFICTION]: {
    gradient: "from-amber-500/60 via-orange-500/50 to-yellow-600/60",
    icon: "📝",
  },
};

const DEFAULT_FALLBACK = {
  gradient: "from-muted via-muted/80 to-muted",
  icon: "🔗",
};

interface CoverImageProps {
  src?: string | null;
  alt: string;
  category?: string;
  /** Tailwind aspect-ratio class, defaults to aspect-video (16/9) */
  aspectClass?: string;
}

/**
 * Renders a cover photo with a gradient+emoji fallback when the image is
 * missing or fails to load. Lazy loads by default.
 */
export default function CoverImage({
  src,
  alt,
  category,
  aspectClass = "aspect-video",
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  const fallback = category
    ? (CATEGORY_FALLBACK[category] ?? DEFAULT_FALLBACK)
    : DEFAULT_FALLBACK;

  const showImage = !!src && !failed;

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-t-xl`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${fallback.gradient} flex items-center justify-center`}
          aria-hidden="true"
        >
          <span className="text-4xl select-none opacity-80">
            {fallback.icon}
          </span>
        </div>
      )}
      {/* Subtle bottom vignette so card text below stays readable */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
    </div>
  );
}
