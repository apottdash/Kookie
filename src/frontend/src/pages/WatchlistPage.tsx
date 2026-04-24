import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BookmarkX, ExternalLink, LogIn, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Link, WatchlistEntryView } from "../backend";
import CoverImage from "../components/CoverImage";
import MediaPlayerModal from "../components/MediaPlayerModal";
import { sampleLinks } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";

const platformBadgeMap: Record<string, string> = {
  Netflix: "bg-red-500/10 text-red-400 border-red-500/20",
  YouTube: "bg-red-600/10 text-red-500 border-red-600/20",
  Viki: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Webtoon: "bg-primary/10 text-primary border-primary/20",
  Tapas: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  MangaDex: "bg-red-700/10 text-red-600 border-red-700/20",
  Tappytoon: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  Lezhin: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Bato: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Other: "bg-muted text-muted-foreground border-border",
};

function getPlatformBadgeClass(kind: string): string {
  return platformBadgeMap[kind] ?? platformBadgeMap.Other;
}

function WatchlistLoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-5 text-center"
      data-ocid="watchlist.login_prompt"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Sign in to use your Watchlist
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Connect with Internet Identity to save your favourite BTS lives,
          K-dramas, and manhwas 💜
        </p>
      </div>
      <Button
        onClick={onLogin}
        className="bg-primary text-primary-foreground gap-2 rounded-full"
        data-ocid="watchlist.login_button"
      >
        <LogIn className="w-4 h-4" />
        Connect with Internet Identity
      </Button>
    </div>
  );
}

function WatchlistEmpty() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-5 text-center"
      data-ocid="watchlist.empty_state"
    >
      <span className="text-6xl">🔖</span>
      <div>
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Your watchlist is empty
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Browse links and tap the bookmark icon to save them here for later 💜
        </p>
      </div>
      <Button
        asChild
        className="bg-primary text-primary-foreground rounded-full gap-2"
      >
        <a href="/links" data-ocid="watchlist.browse_links_button">
          <Sparkles className="w-4 h-4" />
          Browse Links
        </a>
      </Button>
    </div>
  );
}

export default function WatchlistPage() {
  const { isLoggedIn, login } = useAuth();
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  const [playerLink, setPlayerLink] = useState<Link | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const { data: entries = [], isLoading } = useQuery<WatchlistEntryView[]>({
    queryKey: ["watchlist"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWatchlist();
    },
    enabled: isLoggedIn && !!actor,
  });

  const removeMutation = useMutation({
    mutationFn: async (entryId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeFromWatchlist(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      toast.success("Removed from watchlist");
    },
    onError: () => toast.error("Failed to remove"),
  });

  // Resolve link details from sample data by matching linkId
  const resolvedItems = entries.map((entry) => {
    const link = sampleLinks.find((l) => String(l.id) === entry.linkId);
    return { entry, link };
  });

  return (
    <div className="pb-20 md:pb-0">
      {/* Page Header */}
      <div
        className="bg-muted/30 border-b border-border py-8"
        data-ocid="watchlist.header_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-display font-bold text-3xl text-foreground">
              My Watchlist
            </h1>
            {isLoggedIn && entries.length > 0 && (
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 text-sm"
              >
                {entries.length} {entries.length === 1 ? "item" : "items"}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            Your personal collection of saved BTS lives, K-dramas, and manhwas
            🔖
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <WatchlistLoginPrompt onLogin={login} />
        ) : isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="watchlist.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((k) => (
              <Skeleton key={k} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <WatchlistEmpty />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="watchlist.list"
          >
            {resolvedItems.map(({ entry, link }, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`watchlist.item.${i + 1}`}
              >
                <Card className="h-full border-border bg-card group hover:border-primary/40 transition-smooth overflow-hidden">
                  {link && (
                    <CoverImage
                      src={link.coverPhotoUrl}
                      alt={link.title}
                      category={link.category}
                    />
                  )}
                  <CardContent className="p-5 flex flex-col gap-3 h-full">
                    {link ? (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs shrink-0 ${getPlatformBadgeClass(link.platform.__kind__)}`}
                          >
                            {link.platform.__kind__}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                            disabled={removeMutation.isPending}
                            onClick={() => removeMutation.mutate(entry.id)}
                            data-ocid={`watchlist.remove_button.${i + 1}`}
                            aria-label="Remove from watchlist"
                          >
                            <BookmarkX className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth">
                            {link.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-3 leading-relaxed">
                            {link.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-border/50">
                          {link.mediaUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1"
                              onClick={() => {
                                setPlayerLink(link);
                                setPlayerOpen(true);
                              }}
                              data-ocid={`watchlist.play_button.${i + 1}`}
                            >
                              <Play className="w-3 h-3" fill="currentColor" />
                              Play
                            </Button>
                          )}
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary text-xs font-medium ml-auto hover:underline"
                            data-ocid={`watchlist.open_link.${i + 1}`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Open link</span>
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-mono">
                            Link #{entry.linkId}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 shrink-0 text-muted-foreground hover:text-destructive"
                            disabled={removeMutation.isPending}
                            onClick={() => removeMutation.mutate(entry.id)}
                            data-ocid={`watchlist.remove_button.${i + 1}`}
                          >
                            <BookmarkX className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Link details unavailable
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Media Player Modal */}
      <MediaPlayerModal
        link={playerLink}
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
      />
    </div>
  );
}
