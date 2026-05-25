import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  MapPin,
  MessageCircle,
  Plane,
  ShoppingBasket,
  Star,
  X,
} from "lucide-react";
import { useBasket } from "../hooks/useBasket";
import type { Vendor } from "../types";

function formatPrice(price: number, category: string): string {
  if (category === "Caterer") return `₹${price.toLocaleString("en-IN")}/plate`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
  return `₹${price}`;
}

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

const planColors: Record<string, string> = {
  Free: "bg-muted text-muted-foreground border-border",
  Standard: "bg-secondary/15 text-secondary border-secondary/30",
  Premium: "bg-primary/15 text-primary border-primary/30",
  "Destination Hub": "bg-accent/15 text-accent border-accent/30",
  "Agent Managed":
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
};

interface VendorCardProps {
  vendor: Vendor;
  showBasketButton?: boolean;
}

export default function VendorCard({
  vendor,
  showBasketButton = true,
}: VendorCardProps) {
  const { addToBasket, removeFromBasket, isInBasket } = useBasket();
  const inBasket = isInBasket(vendor.id);

  const handleBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inBasket) removeFromBasket(vendor.id);
    else addToBasket(vendor);
  };

  return (
    <Card
      className="card-lift h-full border-border bg-card overflow-hidden group"
      data-ocid={`vendor_card.${vendor.id}`}
    >
      {/* Cover image */}
      <div className="relative h-44 bg-muted overflow-hidden">
        <img
          src={vendor.coverPhoto}
          alt={vendor.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Plan badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold border ${planColors[vendor.plan]}`}
          >
            {vendor.plan}
          </span>
        </div>
        {/* Destination ready badge */}
        {vendor.isDestinationReady && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold bg-accent/90 text-accent-foreground">
              <Plane className="w-3 h-3" />
              Travel Ready
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4 flex flex-col gap-3">
        {/* Category + city */}
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant="secondary"
            className="text-xs bg-primary/10 text-primary border-primary/20"
          >
            {categoryEmoji[vendor.category] ?? "✨"} {vendor.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {vendor.city}
          </span>
        </div>

        {/* Name */}
        <div>
          <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-1 group-hover:text-primary transition-smooth">
            {vendor.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
        </div>

        {/* Rating + price */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-foreground">
              {vendor.rating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({vendor.reviewCount})
            </span>
          </div>
          <span className="text-sm font-semibold text-primary">
            from {formatPrice(vendor.startingPrice, vendor.category)}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {vendor.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="badge-genre text-[10px] px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: trust signals + basket */}
        <div className="flex items-center justify-between gap-2 pt-1 mt-auto border-t border-border">
          <div className="flex items-center gap-2">
            {vendor.verified && (
              <span className="flex items-center gap-1 text-[10px] text-primary font-medium">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
            {vendor.whatsappActive && (
              <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                <MessageCircle className="w-3 h-3" />
                WhatsApp
              </span>
            )}
          </div>
          {showBasketButton && (
            <Button
              size="sm"
              variant={inBasket ? "default" : "outline"}
              className={`h-7 px-2.5 text-xs gap-1 transition-smooth ${
                inBasket
                  ? "bg-primary text-primary-foreground"
                  : "border-primary/40 text-primary hover:bg-primary/10"
              }`}
              onClick={handleBasket}
              data-ocid={`vendor_card.basket_button.${vendor.id}`}
            >
              {inBasket ? (
                <>
                  <X className="w-3 h-3" />
                  Saved
                </>
              ) : (
                <>
                  <ShoppingBasket className="w-3 h-3" />
                  Save
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
