import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "@tanstack/react-router";
import { Calendar, Edit3, ExternalLink, Save, User, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { samplePosts, sampleUsernames } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const params = useParams({ strict: false }) as { principal?: string };
  const { isLoggedIn, principalText } = useAuth();
  const isOwnProfile = isLoggedIn && principalText === params.principal;

  const username = sampleUsernames["army1-principal"] ?? "ARMYMember";
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(username);
  const [bio, setBio] = useState(
    "BTS ARMY since 2013 💜 Hobi's #1 fan | Spreading purple love worldwide 🌏",
  );
  const [tempName, setTempName] = useState(displayName);
  const [tempBio, setTempBio] = useState(bio);

  const userPosts = samplePosts.slice(0, 3);
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleSave = () => {
    if (!tempName.trim()) {
      toast.error("Username can't be empty!");
      return;
    }
    setDisplayName(tempName);
    setBio(tempBio);
    setEditing(false);
    toast.success("Profile updated! 💜");
  };

  const handleCancel = () => {
    setTempName(displayName);
    setTempBio(bio);
    setEditing(false);
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Profile Header */}
      <div
        className="bg-gradient-to-b from-primary/10 to-background border-b border-border py-12"
        data-ocid="profile.header_section"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-5"
          >
            <Avatar className="w-20 h-20 border-4 border-primary/40 shadow-elevated">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold font-display">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                <h1 className="font-display font-bold text-2xl text-foreground">
                  {displayName}
                </h1>
                <Badge className="bg-primary/15 text-primary border-primary/20 text-xs">
                  ARMY 💜
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
                {bio}
              </p>
              <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" /> Joined 2024
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="w-3.5 h-3.5" /> {userPosts.length} posts
                </span>
              </div>
            </div>
            {isOwnProfile && !editing && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditing(true)}
                className="shrink-0 gap-1.5 border-primary/30 hover:border-primary/60"
                data-ocid="profile.edit_button"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl flex flex-col gap-6">
        {/* Edit Form */}
        {editing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              className="border-primary/30 bg-card"
              data-ocid="profile.edit_form"
            >
              <CardContent className="p-5 flex flex-col gap-4">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-primary" />
                  Edit Profile
                </h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <Label className="text-sm text-foreground mb-1.5 block">
                      Username
                    </Label>
                    <Input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Your ARMY name"
                      className="bg-muted/30"
                      data-ocid="profile.username_input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-foreground mb-1.5 block">
                      Bio
                    </Label>
                    <Textarea
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      placeholder="Tell ARMY about yourself 💜"
                      className="resize-none min-h-[80px] bg-muted/30"
                      data-ocid="profile.bio_input"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancel}
                    className="gap-1.5"
                    data-ocid="profile.cancel_edit_button"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="bg-primary text-primary-foreground gap-1.5"
                    data-ocid="profile.save_profile_button"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recent Posts */}
        <div data-ocid="profile.posts_section">
          <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            Recent Posts
            <Badge variant="secondary" className="text-xs">
              {userPosts.length}
            </Badge>
          </h2>
          <div className="flex flex-col gap-3">
            {userPosts.map((post, i) => (
              <motion.div
                key={post.id.toString()}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`profile.post_item.${i + 1}`}
              >
                <a href={`/feed/${post.id}`}>
                  <Card className="card-lift border-border bg-card/80 cursor-pointer">
                    <CardContent className="p-4 flex flex-col gap-2">
                      <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5 flex-wrap">
                          {post.hashtags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-primary/70">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>💜 {Number(post.likesCount)}</span>
                          <ExternalLink className="w-3 h-3 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Principal Info */}
        {params.principal && (
          <Card
            className="border-border bg-muted/20"
            data-ocid="profile.principal_section"
          >
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-1">Principal ID</p>
              <p className="text-xs font-mono text-foreground/70 break-all">
                {params.principal}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
