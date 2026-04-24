import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, X } from "lucide-react";
import type { Link } from "../backend";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractSpotifyId(
  url: string,
): { type: "track" | "album" | "playlist"; id: string } | null {
  const match = url.match(
    /open\.spotify\.com\/(track|album|playlist)\/([A-Za-z0-9]+)/,
  );
  if (!match) return null;
  return { type: match[1] as "track" | "album" | "playlist", id: match[2] };
}

function buildSoundCloudEmbedUrl(url: string): string {
  return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%239333ea&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
}

function buildYouTubeEmbedUrl(mediaUrl: string): string {
  return `https://www.youtube.com/embed/${mediaUrl}?autoplay=1&rel=0&modestbranding=1`;
}

// ─── Embed renderers ──────────────────────────────────────────────────────────

function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={buildYouTubeEmbedUrl(videoId)}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
        className="absolute inset-0 w-full h-full rounded-lg border border-border/30"
      />
    </div>
  );
}

function SpotifyEmbed({ url }: { url: string }) {
  const spotifyId = extractSpotifyId(url);
  if (!spotifyId) {
    return (
      <div className="flex items-center justify-center h-24 bg-muted/40 rounded-lg text-muted-foreground text-sm">
        Unable to embed this Spotify track.
      </div>
    );
  }
  const embedUrl = `https://open.spotify.com/embed/${spotifyId.type}/${spotifyId.id}?utm_source=generator&theme=0`;
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="152"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-lg border border-border/30"
      title="Spotify player"
    />
  );
}

function SoundCloudEmbed({ url }: { url: string }) {
  return (
    <iframe
      width="100%"
      height="166"
      src={buildSoundCloudEmbedUrl(url)}
      allow="autoplay"
      className="rounded-lg border border-border/30"
      title="SoundCloud player"
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export interface MediaPlayerModalProps {
  link: Link | null;
  open: boolean;
  onClose: () => void;
}

export default function MediaPlayerModal({
  link,
  open,
  onClose,
}: MediaPlayerModalProps) {
  if (!link) return null;

  const platform = link.platform.__kind__;
  const canEmbed =
    platform === "YouTube" ||
    platform === "Spotify" ||
    platform === "SoundCloud";

  function renderPlayer() {
    if (!link) return null;
    if (platform === "YouTube" && link.mediaUrl) {
      return <YouTubeEmbed videoId={link.mediaUrl} />;
    }
    if (platform === "Spotify") {
      return <SpotifyEmbed url={link.url} />;
    }
    if (platform === "SoundCloud") {
      return <SoundCloudEmbed url={link.url} />;
    }
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-2xl w-full p-0 overflow-hidden bg-card border-border gap-0"
        data-ocid="media_player.dialog"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close player"
          data-ocid="media_player.close_button"
          className="absolute right-3 top-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-smooth"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cover photo */}
        {link.coverPhotoUrl && (
          <div className="relative w-full h-36 overflow-hidden shrink-0">
            <img
              src={link.coverPhotoUrl}
              alt={link.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card" />
          </div>
        )}

        <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
          <DialogHeader className="gap-1 text-left space-y-0">
            <DialogTitle className="font-display text-lg font-bold text-foreground leading-snug pr-8">
              {link.title}
            </DialogTitle>
            {link.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {link.description}
              </p>
            )}
          </DialogHeader>

          {/* Player */}
          {canEmbed ? (
            <div data-ocid="media_player.canvas_target">{renderPlayer()}</div>
          ) : (
            <div className="flex items-center justify-center h-20 bg-muted/40 rounded-lg text-muted-foreground text-sm">
              Embedded player not available for this platform.
            </div>
          )}

          {/* External link */}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-primary text-xs font-medium hover:underline self-start"
            data-ocid="media_player.open_external_link"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in {platform}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
