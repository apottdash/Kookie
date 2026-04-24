import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Eye,
  ImageIcon,
  Info,
  Link as LinkIcon,
  Pencil,
  Play,
  Plus,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Category } from "../backend";
import { sampleLinks, samplePosts } from "../data/sampleData";
import { useAuth } from "../hooks/useAuth";

interface NewLinkForm {
  title: string;
  description: string;
  url: string;
  platform: string;
  category: string;
  coverPhotoUrl: string;
  mediaUrl: string;
}

const emptyForm: NewLinkForm = {
  title: "",
  description: "",
  url: "",
  platform: "YouTube",
  category: "BTS_LIVE",
  coverPhotoUrl: "",
  mediaUrl: "",
};

function getCategoryEmoji(cat: Category): string {
  if (cat === Category.BTS_LIVE) return "🎤";
  if (cat === Category.K_DRAMA) return "🎬";
  return "📚";
}

/** Returns true if the string looks like a valid HTTP/S URL */
function looksLikeUrl(val: string): boolean {
  return /^https?:\/\/.{4,}/.test(val.trim());
}

/** Thumbnail preview with graceful fallback */
function CoverPreview({ url }: { url: string }) {
  if (!looksLikeUrl(url)) return null;
  return (
    <div className="mt-2 rounded-lg overflow-hidden border border-border w-full max-w-[180px] aspect-video bg-muted/30 relative">
      <img
        src={url}
        alt="Cover preview"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML =
              "<span class=\"absolute inset-0 flex items-center justify-center text-xs text-muted-foreground gap-1\"><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/></svg>Can't load image</span>";
          }
        }}
      />
    </div>
  );
}

export default function AdminPage() {
  const { isLoggedIn, login } = useAuth();
  const [links, setLinks] = useState(sampleLinks);
  const [form, setForm] = useState<NewLinkForm>(emptyForm);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editForm, setEditForm] = useState<NewLinkForm>(emptyForm);

  if (!isLoggedIn) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[50vh] gap-5 text-center px-4"
        data-ocid="admin.auth_gate"
      >
        <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          Connect your Internet Identity to access admin tools for managing ARMY
          Hub content.
        </p>
        <Button
          onClick={login}
          className="bg-primary text-primary-foreground rounded-full gap-2"
          data-ocid="admin.login_button"
        >
          <Shield className="w-4 h-4" />
          Connect to Access
        </Button>
      </div>
    );
  }

  const handleFormChange = (field: keyof NewLinkForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditFormChange = (field: keyof NewLinkForm, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const startEdit = (link: (typeof sampleLinks)[number]) => {
    setEditingId(link.id);
    setEditForm({
      title: link.title,
      url: link.url,
      description: link.description,
      platform: link.platform.__kind__,
      category: link.category,
      coverPhotoUrl:
        "coverPhotoUrl" in link ? String(link.coverPhotoUrl ?? "") : "",
      mediaUrl: "mediaUrl" in link ? String(link.mediaUrl ?? "") : "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(emptyForm);
  };

  const saveEdit = (id: bigint) => {
    if (!editForm.title || !editForm.url) {
      toast.error("Title and URL are required.");
      return;
    }
    setLinks((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              title: editForm.title,
              url: editForm.url,
              description: editForm.description,
              platform: {
                __kind__: editForm.platform,
              } as (typeof l)["platform"],
              category: editForm.category as Category,
              coverPhotoUrl: editForm.coverPhotoUrl || undefined,
              mediaUrl: editForm.mediaUrl || undefined,
            }
          : l,
      ),
    );
    toast.success(`Link "${editForm.title}" updated! 💜`);
    cancelEdit();
  };

  const handleAddLink = () => {
    if (!form.title || !form.url) {
      toast.error("Title and URL are required.");
      return;
    }
    toast.success(`Link "${form.title}" added! 💜 All users can now see it.`);
    setForm(emptyForm);
  };

  const handleDelete = (id: bigint) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
    toast.success("Link removed.");
  };

  const stats = [
    {
      label: "Total Links",
      value: links.length,
      icon: LinkIcon,
      color: "text-primary",
    },
    {
      label: "Community Posts",
      value: samplePosts.length,
      icon: Users,
      color: "text-accent",
    },
    {
      label: "BTS Lives",
      value: links.filter((l) => l.category === Category.BTS_LIVE).length,
      icon: TrendingUp,
      color: "text-secondary",
    },
    {
      label: "Flagged Posts",
      value: samplePosts.filter((p) => p.flagged).length,
      icon: Eye,
      color: "text-destructive",
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      <div
        className="bg-muted/30 border-b border-border py-8"
        data-ocid="admin.header_section"
      >
        <div className="container mx-auto px-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage ARMY Hub content and community
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          data-ocid="admin.stats_section"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              data-ocid={`admin.stat_card.${i + 1}`}
            >
              <Card className="border-border bg-card">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="links" data-ocid="admin.tabs">
          <TabsList className="mb-6 bg-muted/50">
            <TabsTrigger
              value="links"
              className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.links_tab"
            >
              <LinkIcon className="w-3.5 h-3.5" /> Manage Links
            </TabsTrigger>
            <TabsTrigger
              value="add"
              className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.add_link_tab"
            >
              <Plus className="w-3.5 h-3.5" /> Add Link
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-ocid="admin.posts_tab"
            >
              <Users className="w-3.5 h-3.5" /> Posts
            </TabsTrigger>
          </TabsList>

          {/* Manage Links */}
          <TabsContent value="links" data-ocid="admin.links_list">
            <div className="flex flex-col gap-3">
              {links.map((link, i) => (
                <Card
                  key={link.id.toString()}
                  className="border-border bg-card"
                  data-ocid={`admin.link_item.${i + 1}`}
                >
                  <CardContent className="p-4 flex flex-col gap-3">
                    {/* View row */}
                    {editingId !== link.id && (
                      <div className="flex items-start gap-3">
                        {/* Cover thumb */}
                        {"coverPhotoUrl" in link && link.coverPhotoUrl && (
                          <img
                            src={String(link.coverPhotoUrl)}
                            alt=""
                            className="w-14 h-10 rounded object-cover shrink-0 border border-border"
                            onError={(e) => {
                              (
                                e.currentTarget as HTMLImageElement
                              ).style.display = "none";
                            }}
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-semibold text-sm text-foreground truncate">
                              {link.title}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs shrink-0"
                            >
                              {getCategoryEmoji(link.category)}{" "}
                              {link.category.replace("_", " ")}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs text-muted-foreground shrink-0"
                            >
                              {link.platform.__kind__}
                            </Badge>
                            {"mediaUrl" in link && link.mediaUrl && (
                              <Badge
                                variant="outline"
                                className="text-xs text-primary shrink-0 gap-1"
                              >
                                <Play className="w-2.5 h-2.5" /> Media
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {link.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-7 h-7"
                              data-ocid={`admin.view_link_button.${i + 1}`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                          </a>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7 hover:text-primary"
                            onClick={() => startEdit(link)}
                            data-ocid={`admin.edit_link_button.${i + 1}`}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7 hover:text-destructive"
                            onClick={() => handleDelete(link.id)}
                            data-ocid={`admin.delete_link_button.${i + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Inline edit form */}
                    {editingId === link.id && (
                      <div
                        className="flex flex-col gap-3"
                        data-ocid={`admin.edit_link_form.${i + 1}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                            Editing link
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-6 h-6"
                            onClick={cancelEdit}
                            data-ocid={`admin.edit_cancel_button.${i + 1}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label className="text-xs mb-1 block">Title</Label>
                            <Input
                              value={editForm.title}
                              onChange={(e) =>
                                handleEditFormChange("title", e.target.value)
                              }
                              className="bg-muted/30 h-8 text-sm"
                              data-ocid={`admin.edit_title_input.${i + 1}`}
                            />
                          </div>
                          <div>
                            <Label className="text-xs mb-1 block">URL</Label>
                            <Input
                              value={editForm.url}
                              onChange={(e) =>
                                handleEditFormChange("url", e.target.value)
                              }
                              className="bg-muted/30 h-8 text-sm"
                              data-ocid={`admin.edit_url_input.${i + 1}`}
                            />
                          </div>
                          <div>
                            <Label className="text-xs mb-1 block">
                              Description
                            </Label>
                            <Textarea
                              value={editForm.description}
                              onChange={(e) =>
                                handleEditFormChange(
                                  "description",
                                  e.target.value,
                                )
                              }
                              className="resize-none min-h-[56px] bg-muted/30 text-sm"
                              data-ocid={`admin.edit_description_input.${i + 1}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs mb-1 block">
                                Platform
                              </Label>
                              <Select
                                value={editForm.platform}
                                onValueChange={(v) =>
                                  handleEditFormChange("platform", v)
                                }
                              >
                                <SelectTrigger
                                  className="bg-muted/30 h-8 text-sm"
                                  data-ocid={`admin.edit_platform_select.${i + 1}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "YouTube",
                                    "Netflix",
                                    "Viki",
                                    "Webtoon",
                                    "Tapas",
                                    "MangaDex",
                                    "Tappytoon",
                                    "Lezhin",
                                    "Bato",
                                    "Spotify",
                                    "SoundCloud",
                                    "Wattpad",
                                    "Other",
                                  ].map((p) => (
                                    <SelectItem key={p} value={p}>
                                      {p}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs mb-1 block">
                                Category
                              </Label>
                              <Select
                                value={editForm.category}
                                onValueChange={(v) =>
                                  handleEditFormChange("category", v)
                                }
                              >
                                <SelectTrigger
                                  className="bg-muted/30 h-8 text-sm"
                                  data-ocid={`admin.edit_category_select.${i + 1}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="BTS_LIVE">
                                    🎤 BTS Live
                                  </SelectItem>
                                  <SelectItem value="BTS_SONGS">
                                    🎵 BTS Songs
                                  </SelectItem>
                                  <SelectItem value="K_DRAMA">
                                    🎬 K-Drama
                                  </SelectItem>
                                  <SelectItem value="MANHWA">
                                    📚 Manhwa
                                  </SelectItem>
                                  <SelectItem value="FANFICTION">
                                    📝 Fan Fiction
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Cover Photo URL */}
                          <div>
                            <Label className="text-xs mb-1 block flex items-center gap-1.5">
                              <ImageIcon className="w-3 h-3" /> Cover Photo URL
                              <span className="text-muted-foreground font-normal ml-1">
                                (optional)
                              </span>
                            </Label>
                            <Input
                              value={editForm.coverPhotoUrl}
                              onChange={(e) =>
                                handleEditFormChange(
                                  "coverPhotoUrl",
                                  e.target.value,
                                )
                              }
                              placeholder="https://example.com/image.jpg"
                              className="bg-muted/30 h-8 text-sm"
                              data-ocid={`admin.edit_cover_photo_input.${i + 1}`}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Enter a URL for the cover thumbnail shown on cards
                            </p>
                            <CoverPreview url={editForm.coverPhotoUrl} />
                          </div>

                          {/* Media URL */}
                          <div>
                            <Label className="text-xs mb-1 block flex items-center gap-1.5">
                              <Play className="w-3 h-3" /> Media URL / Video ID
                              <span className="text-muted-foreground font-normal ml-1">
                                (optional)
                              </span>
                            </Label>
                            <Input
                              value={editForm.mediaUrl}
                              onChange={(e) =>
                                handleEditFormChange("mediaUrl", e.target.value)
                              }
                              placeholder="YouTube video ID or media URL"
                              className="bg-muted/30 h-8 text-sm"
                              data-ocid={`admin.edit_media_url_input.${i + 1}`}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              For BTS Lives and Songs: enter YouTube video ID
                              for embedded playback
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                            className="gap-1.5 h-7 text-xs"
                            data-ocid={`admin.edit_cancel_button_2.${i + 1}`}
                          >
                            <X className="w-3 h-3" /> Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => saveEdit(link.id)}
                            className="bg-primary text-primary-foreground gap-1.5 h-7 text-xs rounded-full"
                            data-ocid={`admin.edit_save_button.${i + 1}`}
                          >
                            <Check className="w-3 h-3" /> Save Changes
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add Link Form */}
          <TabsContent value="add" data-ocid="admin.add_link_form">
            {/* Admin info banner */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 mb-5 max-w-xl"
              data-ocid="admin.info_banner"
            >
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed">
                <span className="font-semibold text-primary">
                  Adding new links saves them permanently to the app.
                </span>{" "}
                All users will see them immediately after saving — no refresh
                needed.
              </p>
            </motion.div>

            <Card className="border-border bg-card max-w-xl">
              <CardContent className="p-6 flex flex-col gap-4">
                <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <Plus className="w-4 h-4 text-primary" /> Add New Link
                </h3>
                <Separator className="opacity-50" />
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label className="text-sm mb-1.5 block">Title</Label>
                    <Input
                      value={form.title}
                      onChange={(e) =>
                        handleFormChange("title", e.target.value)
                      }
                      placeholder="Link title"
                      className="bg-muted/30"
                      data-ocid="admin.link_title_input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block">Description</Label>
                    <Textarea
                      value={form.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                      placeholder="Brief description for ARMY"
                      className="resize-none min-h-[70px] bg-muted/30"
                      data-ocid="admin.link_description_input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-1.5 block">URL</Label>
                    <Input
                      value={form.url}
                      onChange={(e) => handleFormChange("url", e.target.value)}
                      placeholder="https://"
                      className="bg-muted/30"
                      data-ocid="admin.link_url_input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm mb-1.5 block">Platform</Label>
                      <Select
                        value={form.platform}
                        onValueChange={(v) => handleFormChange("platform", v)}
                      >
                        <SelectTrigger
                          className="bg-muted/30"
                          data-ocid="admin.platform_select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "YouTube",
                            "Netflix",
                            "Viki",
                            "Webtoon",
                            "Tapas",
                            "MangaDex",
                            "Tappytoon",
                            "Lezhin",
                            "Bato",
                            "Spotify",
                            "SoundCloud",
                            "Wattpad",
                            "Other",
                          ].map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm mb-1.5 block">Category</Label>
                      <Select
                        value={form.category}
                        onValueChange={(v) => handleFormChange("category", v)}
                      >
                        <SelectTrigger
                          className="bg-muted/30"
                          data-ocid="admin.category_select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BTS_LIVE">🎤 BTS Live</SelectItem>
                          <SelectItem value="BTS_SONGS">
                            🎵 BTS Songs
                          </SelectItem>
                          <SelectItem value="K_DRAMA">🎬 K-Drama</SelectItem>
                          <SelectItem value="MANHWA">📚 Manhwa</SelectItem>
                          <SelectItem value="FANFICTION">
                            📝 Fan Fiction
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator className="opacity-30" />

                  {/* Cover Photo URL */}
                  <div>
                    <Label className="text-sm mb-1.5 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      Cover Photo URL
                      <span className="text-muted-foreground text-xs font-normal ml-1">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      value={form.coverPhotoUrl}
                      onChange={(e) =>
                        handleFormChange("coverPhotoUrl", e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                      className="bg-muted/30"
                      data-ocid="admin.link_cover_photo_input"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      Enter a URL for the cover thumbnail shown on cards
                    </p>
                    <CoverPreview url={form.coverPhotoUrl} />
                  </div>

                  {/* Media URL */}
                  <div>
                    <Label className="text-sm mb-1.5 flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-muted-foreground" />
                      Media URL / Video ID
                      <span className="text-muted-foreground text-xs font-normal ml-1">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      value={form.mediaUrl}
                      onChange={(e) =>
                        handleFormChange("mediaUrl", e.target.value)
                      }
                      placeholder="YouTube video ID or media URL"
                      className="bg-muted/30"
                      data-ocid="admin.link_media_url_input"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">
                      For BTS Lives and Songs: enter YouTube video ID for
                      embedded playback
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleAddLink}
                  className="bg-primary text-primary-foreground gap-2 rounded-full w-fit"
                  data-ocid="admin.add_link_submit_button"
                >
                  <Plus className="w-4 h-4" /> Add Link
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" data-ocid="admin.posts_list">
            <div className="flex flex-col gap-3">
              {samplePosts.map((post, i) => (
                <Card
                  key={post.id.toString()}
                  className="border-border bg-card"
                  data-ocid={`admin.post_item.${i + 1}`}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>💜 {Number(post.likesCount)}</span>
                        {post.flagged && (
                          <Badge variant="destructive" className="text-xs py-0">
                            Flagged
                          </Badge>
                        )}
                        <div className="flex gap-1">
                          {post.hashtags.slice(0, 2).map((t) => (
                            <span key={t} className="text-primary/60">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <a href={`/feed/${post.id}`}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-7 h-7 shrink-0"
                        data-ocid={`admin.view_post_button.${i + 1}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
