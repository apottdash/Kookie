import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Flag,
  Hash,
  Heart,
  MessageCircle,
  PenLine,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { samplePosts, sampleUsernames } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";
import type { PostView } from "../types";

function formatTime(ts: bigint): string {
  const ms = Number(ts) * 1000;
  const diff = Date.now() - ms;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

interface ActionButtonProps {
  isLoggedIn: boolean;
  disabledTooltip: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  ocid?: string;
}

function ActionButton({
  isLoggedIn,
  disabledTooltip,
  onClick,
  children,
  className = "",
  ocid,
}: ActionButtonProps) {
  if (isLoggedIn) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-ocid={ocid}
        className={className}
      >
        {children}
      </button>
    );
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            data-ocid={ocid}
            className={`${className} opacity-50 cursor-not-allowed`}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {disabledTooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface PostCardProps {
  post: PostView;
  index: number;
}

function PostCard({ post, index }: PostCardProps) {
  const { isLoggedIn } = useAuth();
  const username = sampleUsernames[post.author.toText()] ?? "ARMY Member";
  const initials = username.slice(0, 2).toUpperCase();
  const [likes, setLikes] = useState(Number(post.likesCount));
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    if (!liked) toast.success("You purple-hearted this post! 💜");
  };

  const handleFlag = () => {
    toast.info("Post flagged for review.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      data-ocid={`feed.post_card.${index + 1}`}
    >
      <Card className="border-border bg-card card-lift">
        <CardContent className="p-5 flex flex-col gap-4">
          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar className="w-9 h-9 border-2 border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {username}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(post.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <a
            href={`/feed/${post.id}`}
            data-ocid={`feed.post_link.${index + 1}`}
          >
            <p className="text-sm text-foreground leading-relaxed">
              {post.content}
            </p>
          </a>

          {/* Hashtags */}
          {post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <Separator className="opacity-50" />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ActionButton
              isLoggedIn={isLoggedIn}
              disabledTooltip="Sign in to like 💜"
              onClick={handleLike}
              ocid={`feed.like_button.${index + 1}`}
              className={`flex items-center gap-1.5 text-xs font-medium transition-smooth ${
                liked
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-primary" : ""}`} />
              <span>{formatCount(BigInt(likes))}</span>
            </ActionButton>

            <a
              href={`/feed/${post.id}`}
              data-ocid={`feed.comment_button.${index + 1}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reply</span>
            </a>

            <ActionButton
              isLoggedIn={isLoggedIn}
              disabledTooltip="Sign in to report 💜"
              onClick={handleFlag}
              ocid={`feed.flag_button.${index + 1}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-smooth ml-auto"
            >
              <Flag className="w-3.5 h-3.5" />
            </ActionButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function FeedPage() {
  const { isLoggedIn, login } = useAuth();
  const [newPost, setNewPost] = useState("");
  const [posts] = useState<PostView[]>(samplePosts);

  const handlePost = () => {
    if (!newPost.trim()) return;
    toast.success("Post shared with the ARMY! 💜");
    setNewPost("");
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <div
        className="bg-muted/30 border-b border-border py-8"
        data-ocid="feed.header_section"
      >
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-3xl text-foreground flex items-center gap-2 mb-1">
            <Hash className="w-6 h-6 text-primary" />
            ARMY Feed
          </h1>
          <p className="text-muted-foreground text-sm">
            Share your love for BTS with the community 💜
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {/* Compose Post or Sign-in Banner */}
          {isLoggedIn ? (
            <Card
              className="border-border bg-card"
              data-ocid="feed.compose_section"
            >
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <PenLine className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Share with ARMY
                  </span>
                </div>
                <Textarea
                  placeholder="What's on your ARMY heart today? 💜"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="resize-none min-h-[90px] bg-muted/30 border-border text-sm"
                  data-ocid="feed.new_post_textarea"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {newPost.length}/500
                  </span>
                  <Button
                    size="sm"
                    onClick={handlePost}
                    disabled={!newPost.trim()}
                    className="bg-primary text-primary-foreground rounded-full gap-1.5"
                    data-ocid="feed.submit_post_button"
                  >
                    Post 💜
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              data-ocid="feed.signin_banner"
            >
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card">
                {/* Purple gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 gradient-purple" />
                <div className="gradient-purple-subtle absolute inset-0 pointer-events-none" />
                <div className="relative px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/15 shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <p className="font-semibold text-foreground text-sm leading-snug">
                      Join the conversation, ARMY! 💜
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Sign in to post, like, and reply — your fandom awaits
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={login}
                    className="bg-primary text-primary-foreground rounded-full shrink-0 gap-1.5"
                    data-ocid="feed.signin_button"
                  >
                    Sign in to join 💜
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Posts List */}
          <div className="flex flex-col gap-4" data-ocid="feed.posts_list">
            {posts.map((post, i) => (
              <PostCard key={post.id.toString()} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
