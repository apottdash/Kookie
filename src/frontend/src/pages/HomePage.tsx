import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Play,
  Sparkles,
  TrendingUp,
  Tv,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Category } from "../backend";
import type { Link } from "../backend";
import CoverImage from "../components/CoverImage";
import MediaPlayerModal from "../components/MediaPlayerModal";
import { sampleLinks, samplePosts, sampleUsernames } from "../data/sampleData";

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
    color: "from-primary/20 to-primary/5",
  },
  {
    category: Category.K_DRAMA,
    href: "/links/K_DRAMA",
    label: "K-Dramas",
    description: "Netflix, Viki & top Korean dramas",
    emoji: "🎬",
    icon: Tv,
    color: "from-accent/20 to-accent/5",
  },
  {
    category: Category.MANHWA,
    href: "/links/MANHWA",
    label: "Manhwas",
    description: "Webtoon picks & fan-favourite manhwas",
    emoji: "📚",
    icon: BookOpen,
    color: "from-secondary/20 to-secondary/5",
  },
];

function getPlatformLabel(platform: { __kind__: string }): string {
  return platform.__kind__;
}

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

export default function HomePage() {
  const [playerLink, setPlayerLink] = useState<Link | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "380px" }}
        data-ocid="home.hero_section"
      >
        <img
          src="/assets/generated/hero-army-hub.dim_1200x500.jpg"
          alt="ARMY Hub Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90" />
        <div className="relative container mx-auto px-4 py-20 flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1 text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Your BTS Universe, All In One Place
            </Badge>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight max-w-3xl mx-auto">
              Welcome to <span className="text-primary">ARMY</span>
              <span className="text-accent">Hub</span> 💜
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              BTS concerts, K-dramas, manhwas, and fan community — all curated
              with love for every ARMY.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a href="/links/BTS_LIVE">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground rounded-full gap-2 shadow-elevated hover:shadow-hover transition-smooth"
                data-ocid="home.explore_lives_button"
              >
                <Play className="w-4 h-4" />
                Explore Lives
              </Button>
            </a>
            <a href="/feed">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full gap-2 border-primary/30 hover:border-primary/60 transition-smooth"
                data-ocid="home.go_feed_button"
              >
                <Users className="w-4 h-4" />
                Join the Feed
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Category Cards */}
      <section
        className="bg-muted/30 py-12"
        data-ocid="home.categories_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-foreground">
              Browse by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categoryCards.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={cat.href} data-ocid={`home.category_card.${i + 1}`}>
                  <Card
                    className={`card-lift bg-gradient-to-br ${cat.color} border-border cursor-pointer`}
                  >
                    <CardContent className="p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{cat.emoji}</span>
                        <div>
                          <h3 className="font-display font-bold text-foreground">
                            {cat.label}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-primary text-xs font-medium">
                        <span>Browse all</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Links */}
      <section
        className="py-12 bg-background"
        data-ocid="home.featured_links_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Trending Links
            </h2>
            <a
              href="/links"
              className="text-primary text-sm hover:underline flex items-center gap-1"
              data-ocid="home.view_all_links"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredLinks.map((link, i) => (
              <motion.div
                key={link.id.toString()}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`home.link_card.${i + 1}`}
              >
                <Card className="card-lift h-full border-border bg-card cursor-pointer group overflow-hidden">
                  {/* Cover image */}
                  <CoverImage
                    src={link.coverPhotoUrl}
                    alt={link.title}
                    category={link.category}
                  />
                  <CardContent className="p-5 flex flex-col gap-3 h-full">
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs shrink-0 ${
                          link.category === Category.BTS_LIVE
                            ? "bg-primary/15 text-primary border-primary/20"
                            : link.category === Category.K_DRAMA
                              ? "bg-accent/15 text-accent border-accent/20"
                              : "bg-secondary/15 text-secondary border-secondary/20"
                        }`}
                      >
                        {link.category === Category.BTS_LIVE
                          ? "🎤"
                          : link.category === Category.K_DRAMA
                            ? "🎬"
                            : "📚"}{" "}
                        {link.category.replace("_", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground shrink-0"
                      >
                        {getPlatformLabel(link.platform)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-smooth">
                        {link.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-auto">
                      {link.mediaUrl &&
                        (link.category === Category.BTS_LIVE ||
                          link.category === Category.BTS_SONGS) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2.5 text-xs text-primary hover:bg-primary/10 gap-1"
                            onClick={(e) => {
                              e.preventDefault();
                              setPlayerLink(link);
                              setPlayerOpen(true);
                            }}
                            data-ocid={`home.play_button.${i + 1}`}
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
                        data-ocid={`home.open_link.${i + 1}`}
                      >
                        <span>Open link</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Feed Preview */}
      <section
        className="py-12 bg-muted/30"
        data-ocid="home.feed_preview_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              ARMY Community
            </h2>
            <a
              href="/feed"
              className="text-primary text-sm hover:underline flex items-center gap-1"
              data-ocid="home.view_all_posts"
            >
              See all posts <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="flex flex-col gap-4 max-w-2xl">
            {recentPosts.map((post, i) => (
              <motion.div
                key={post.id.toString()}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={`/feed/${post.id}`}
                  data-ocid={`home.post_card.${i + 1}`}
                >
                  <Card className="card-lift border-border bg-card cursor-pointer">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                          {(sampleUsernames[post.author.toText()] ?? "A")[0]}
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {sampleUsernames[post.author.toText()] ??
                            "ARMY Member"}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          💜 {formatCount(post.likesCount)} likes
                        </span>
                        {post.hashtags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs text-primary/70">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Player Modal */}
      <MediaPlayerModal
        link={playerLink}
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
      />
    </div>
  );
}
