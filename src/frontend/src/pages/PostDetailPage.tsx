import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Flag,
  Heart,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { samplePosts, sampleUsernames } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";

const sampleComments = [
  {
    id: 1,
    author: "JiminsButterfly",
    content: "I cried so much watching this 😭💜 BTS forever!",
    time: "2h ago",
  },
  {
    id: 2,
    author: "YoongisGenius",
    content: "Purple you ARMY! This is everything 💜✨",
    time: "5h ago",
  },
  {
    id: 3,
    author: "KookiesAndCream",
    content: "Can't stop watching! JK's performance was insane 🔥",
    time: "1d ago",
  },
];

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

interface GatedButtonProps {
  isLoggedIn: boolean;
  tooltip: string;
  onClick: () => void;
  className?: string;
  ocid?: string;
  children: React.ReactNode;
}

function GatedButton({
  isLoggedIn,
  tooltip,
  onClick,
  className = "",
  ocid,
  children,
}: GatedButtonProps) {
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
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function PostDetailPage() {
  const params = useParams({ strict: false }) as { postId?: string };
  const postId = params.postId ? BigInt(params.postId) : null;
  const post = samplePosts.find((p) => p.id === postId) ?? samplePosts[0];

  const { isLoggedIn, login } = useAuth();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Number(post.likesCount));

  const username = sampleUsernames[post.author.toText()] ?? "ARMY Member";
  const initials = username.slice(0, 2).toUpperCase();

  const handleLike = () => {
    setLiked((p) => !p);
    setLikes((p) => (liked ? p - 1 : p + 1));
    if (!liked) toast.success("💜 You purple-hearted this!");
  };

  const handleFlag = () => {
    toast.info("Post reported for review.");
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    toast.success("Comment posted! 💜");
    setComment("");
  };

  if (!post) {
    return (
      <div
        className="container mx-auto px-4 py-16 text-center"
        data-ocid="post_detail.not_found"
      >
        <p className="text-muted-foreground">Post not found.</p>
        <a href="/feed">
          <Button variant="outline" size="sm" className="mt-4">
            Back to Feed
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      <div
        className="bg-muted/30 border-b border-border py-4"
        data-ocid="post_detail.breadcrumb"
      >
        <div className="container mx-auto px-4">
          <a
            href="/feed"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth w-fit"
            data-ocid="post_detail.back_link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Feed
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main Post — visible to all */}
          <Card
            className="border-border bg-card mb-6"
            data-ocid="post_detail.main_post"
          >
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-primary/30">
                  <AvatarFallback className="bg-primary/20 text-primary font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{username}</p>
                  <p className="text-xs text-muted-foreground">
                    BTS ARMY Member
                  </p>
                </div>
              </div>

              <p className="text-foreground leading-relaxed">{post.content}</p>

              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="opacity-50" />

              <div className="flex items-center gap-4">
                {/* Like — disabled with tooltip for guests */}
                <GatedButton
                  isLoggedIn={isLoggedIn}
                  tooltip="Sign in to like 💜"
                  onClick={handleLike}
                  ocid="post_detail.like_button"
                  className={`flex items-center gap-2 text-sm font-medium transition-smooth ${liked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-primary" : ""}`} />
                  <span>{formatCount(BigInt(likes))} likes</span>
                </GatedButton>

                {/* Comment count — always visible */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="w-5 h-5" />
                  <span>{sampleComments.length} comments</span>
                </div>

                {/* Flag — disabled with tooltip for guests */}
                <GatedButton
                  isLoggedIn={isLoggedIn}
                  tooltip="Sign in to report 💜"
                  onClick={handleFlag}
                  ocid="post_detail.flag_button"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-smooth ml-auto"
                >
                  <Flag className="w-4 h-4" />
                  <span>Report</span>
                </GatedButton>
              </div>
            </CardContent>
          </Card>

          {/* Comments — visible to all */}
          <div
            className="flex flex-col gap-4 mb-6"
            data-ocid="post_detail.comments_list"
          >
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              Comments
            </h2>
            {sampleComments.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`post_detail.comment.${i + 1}`}
              >
                <Card className="border-border bg-card/60">
                  <CardContent className="p-4 flex gap-3">
                    <Avatar className="w-8 h-8 border border-primary/20 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {c.author.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">
                          {c.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {c.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Add Comment — form for logged-in, welcoming banner for guests */}
          <div data-ocid="post_detail.add_comment_section">
            {isLoggedIn ? (
              <Card className="border-border bg-card">
                <CardContent className="p-5 flex flex-col gap-3">
                  <Textarea
                    placeholder="Leave a comment for ARMY 💜"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none min-h-[80px] bg-muted/30 border-border text-sm"
                    data-ocid="post_detail.comment_input"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleComment}
                      disabled={!comment.trim()}
                      className="bg-primary text-primary-foreground rounded-full gap-1.5"
                      data-ocid="post_detail.submit_comment_button"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card">
                  {/* Purple accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 gradient-purple" />
                  <div className="gradient-purple-subtle absolute inset-0 pointer-events-none" />
                  <div className="relative px-6 py-5 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/15 shrink-0">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <p className="font-semibold text-foreground text-sm">
                        Have something to say? 💜
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Sign in to leave a comment and connect with ARMY
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={login}
                      className="bg-primary text-primary-foreground rounded-full shrink-0"
                      data-ocid="post_detail.signin_to_comment_button"
                    >
                      Sign in to comment 💜
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
