// VendorBasketPage — repurposed from WatchlistPage for WedBridge
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Plane,
  Search,
  ShoppingBasket,
  Star,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { useBasket } from "../hooks/useBasket";

const categoryEmoji: Record<string, string> = {
  Photographer: "📸",
  Videographer: "🎬",
  Decorator: "🌸",
  Caterer: "🍽️",
  "Mehendi Artist": "🌿",
  DJ: "🎵",
  Venue: "🏰",
  "Bridal Makeup": "💄",
  Pundit: "🪔",
  Choreographer: "💃",
  "Invitation Designer": "✉️",
  "Bridal Wear": "👗",
  "Dhol Player": "🥁",
  Baraat: "🐎",
  Cake: "🎂",
};

function formatPrice(price: number, category: string): string {
  if (category === "Caterer") return `₹${price.toLocaleString("en-IN")}/plate`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
  return `₹${price}`;
}

export default function VendorBasketPage() {
  const { items, removeFromBasket, updateNotes, clearBasket } = useBasket();

  const handleInquireAll = () => {
    toast.success(
      `Exclusive inquiries sent to ${items.length} vendor${items.length > 1 ? "s" : ""}! They'll reach out on WhatsApp.`,
    );
  };

  if (items.length === 0) {
    return (
      <div className="pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center gap-5">
          <div className="w-20 h-20 rounded-2xl gradient-purple flex items-center justify-center shadow-elevated">
            <ShoppingBasket className="w-9 h-9 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Your Vendor Basket is empty
          </h1>
          <p className="text-muted-foreground max-w-xs leading-relaxed">
            Add vendors to your basket while browsing. Compare them here before
            sending an exclusive inquiry.
          </p>
          <a href="/vendors">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground rounded-full gap-2"
              data-ocid="basket.browse_vendors_button"
            >
              <Search className="w-4 h-4" />
              Browse Vendors
            </Button>
          </a>

          {/* How basket works */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
            {[
              {
                icon: Search,
                title: "Browse & Add",
                desc: "Click 'Add to Basket' on any vendor card",
              },
              {
                icon: ShoppingBasket,
                title: "Compare",
                desc: "Review prices, ratings and notes side by side",
              },
              {
                icon: MessageCircle,
                title: "Inquire",
                desc: "Send exclusive inquiries — one vendor at a time",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="border-border bg-muted/30 text-center"
              >
                <CardContent className="p-4 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-sm text-foreground">
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-3xl text-foreground">
                Your Vendor Basket
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {items.length} vendor{items.length !== 1 ? "s" : ""} shortlisted
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearBasket}
                className="text-muted-foreground hover:text-destructive gap-1 text-xs"
                data-ocid="basket.clear_button"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Basket items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.vendor.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card className="border-border bg-card overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex gap-0">
                          {/* Cover thumbnail */}
                          <div className="w-28 sm:w-36 shrink-0">
                            <img
                              src={item.vendor.coverPhoto}
                              alt={item.vendor.name}
                              className="w-full h-full object-cover"
                              style={{ minHeight: "120px" }}
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 p-4 flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-1.5 mb-1">
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px] bg-primary/10 text-primary border-primary/20 px-2 py-0"
                                  >
                                    {categoryEmoji[item.vendor.category] ??
                                      "✨"}{" "}
                                    {item.vendor.category}
                                  </Badge>
                                  {item.vendor.isDestinationReady && (
                                    <span className="inline-flex items-center gap-0.5 text-[10px] text-accent font-medium">
                                      <Plane className="w-2.5 h-2.5" />
                                      Travel
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-display font-semibold text-foreground text-sm">
                                  {item.vendor.name}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                  📍 {item.vendor.city}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromBasket(item.vendor.id)}
                                className="text-muted-foreground hover:text-destructive transition-smooth p-1 rounded-md hover:bg-destructive/10"
                                aria-label={`Remove ${item.vendor.name} from basket`}
                                data-ocid={`basket.remove.${item.vendor.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {item.vendor.rating.toFixed(1)} (
                                {item.vendor.reviewCount})
                              </span>
                              <span className="text-primary font-semibold">
                                from{" "}
                                {formatPrice(
                                  item.vendor.startingPrice,
                                  item.vendor.category,
                                )}
                              </span>
                            </div>

                            {item.vendor.verified && (
                              <div className="flex items-center gap-1 text-[10px] text-primary">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                              </div>
                            )}

                            {/* Notes */}
                            <Textarea
                              placeholder="Add private notes (budget, questions, dates…)"
                              value={item.notes}
                              onChange={(e) =>
                                updateNotes(item.vendor.id, e.target.value)
                              }
                              className="text-xs h-14 resize-none bg-muted/40 border-border mt-1"
                              data-ocid={`basket.notes.${item.vendor.id}`}
                            />

                            {/* Inline CTA */}
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={`/vendors/${item.vendor.id}`}
                                className="text-xs text-primary hover:underline flex items-center gap-0.5"
                              >
                                View profile <ArrowRight className="w-3 h-3" />
                              </a>
                              <Button
                                size="sm"
                                className="h-7 px-3 text-xs bg-primary text-primary-foreground gap-1 ml-auto"
                                onClick={() =>
                                  toast.success(
                                    `Inquiry sent to ${item.vendor.name}! They'll WhatsApp you shortly.`,
                                  )
                                }
                                data-ocid={`basket.inquire.${item.vendor.id}`}
                              >
                                <MessageCircle className="w-3 h-3" />
                                Inquire
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary card */}
            <div>
              <Card className="border-border bg-card sticky top-24 shadow-elevated">
                <CardContent className="p-5 flex flex-col gap-4">
                  <h2 className="font-display font-semibold text-foreground">
                    Basket Summary
                  </h2>

                  <div className="flex flex-col gap-2">
                    {items.map((item) => (
                      <div
                        key={item.vendor.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-foreground truncate flex-1">
                          {categoryEmoji[item.vendor.category] ?? "✨"}{" "}
                          {item.vendor.name}
                        </span>
                        <span className="text-primary font-medium shrink-0 ml-2">
                          {formatPrice(
                            item.vendor.startingPrice,
                            item.vendor.category,
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="bg-muted/30 rounded-xl p-3 text-xs text-muted-foreground leading-relaxed">
                    💡{" "}
                    <strong className="text-foreground">
                      WedBridge guarantee:
                    </strong>{" "}
                    Your inquiry goes exclusively to each vendor — no
                    mass-broadcast. Vendors respond within hours, not days.
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground gap-2 font-semibold"
                    onClick={handleInquireAll}
                    data-ocid="basket.inquire_all_button"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Inquire All ({items.length})
                  </Button>

                  <a href="/vendors">
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
                      data-ocid="basket.add_more_button"
                    >
                      <Search className="w-4 h-4" />
                      Add More Vendors
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
