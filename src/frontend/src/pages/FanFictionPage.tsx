// VendorProfilePage — repurposed from FanFictionPage for WedBridge
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Lock,
  MessageCircle,
  Plane,
  ShoppingBasket,
  Star,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import VendorCard from "../components/VendorCard";
import { sampleVendors } from "../data/sampleData";
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
  if (category === "Caterer")
    return `₹${price.toLocaleString("en-IN")} per plate`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} Lakh`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)},000`;
  return `₹${price}`;
}

const planColors: Record<string, string> = {
  Free: "bg-muted text-muted-foreground border-border",
  Standard: "bg-secondary/15 text-secondary border-secondary/30",
  Premium: "bg-primary/15 text-primary border-primary/30",
  "Destination Hub": "bg-accent/15 text-accent border-accent/30",
  "Agent Managed":
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function VendorProfilePage() {
  const { vendorId } = useParams({ from: "/vendors/$vendorId" });
  const { addToBasket, removeFromBasket, isInBasket } = useBasket();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const vendor = sampleVendors.find((v) => v.id === Number(vendorId));

  if (!vendor) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <span className="text-5xl mb-4 block">🔍</span>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          Vendor not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This vendor profile doesn't exist or may have been removed.
        </p>
        <a href="/vendors">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Browse
          </Button>
        </a>
      </div>
    );
  }

  const inBasket = isInBasket(vendor.id);
  const relatedVendors = sampleVendors
    .filter((v) => v.category === vendor.category && v.id !== vendor.id)
    .slice(0, 3);

  const handleBasket = () => {
    if (inBasket) {
      removeFromBasket(vendor.id);
      toast.info(`${vendor.name} removed from your basket.`);
    } else {
      addToBasket(vendor);
      toast.success(`${vendor.name} added to your Vendor Basket!`);
    }
  };

  const handleInquiry = () => {
    toast.success(
      "Inquiry sent! The vendor will contact you on WhatsApp shortly.",
    );
  };

  return (
    <div className="pb-20 md:pb-0">
      {/* Back nav */}
      <div className="container mx-auto px-4 pt-6">
        <a
          href="/vendors"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </a>
      </div>

      {/* Cover */}
      <section className="mt-4">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden h-56 sm:h-72 bg-muted">
            <img
              src={vendor.coverPhoto}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: details */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className="text-sm bg-primary/10 text-primary border-primary/20"
                  >
                    {categoryEmoji[vendor.category] ?? "✨"} {vendor.category}
                  </Badge>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${planColors[vendor.plan]}`}
                  >
                    {vendor.plan}
                  </span>
                  {vendor.isDestinationReady && (
                    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-accent/15 text-accent border-accent/30">
                      <Plane className="w-3 h-3" />
                      Travel Ready
                    </span>
                  )}
                </div>
                <h1 className="font-display font-bold text-3xl text-foreground mb-1">
                  {vendor.name}
                </h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <strong className="text-foreground">
                      {vendor.rating.toFixed(1)}
                    </strong>{" "}
                    ({vendor.reviewCount} reviews)
                  </span>
                  <span>📍 {vendor.city}</span>
                </div>
              </motion.div>

              <Separator />

              <div>
                <h2 className="font-display font-semibold text-foreground mb-2">
                  About
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {vendor.description}
                </p>
              </div>

              <div>
                <h2 className="font-display font-semibold text-foreground mb-2">
                  Specialities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {vendor.tags.map((tag) => (
                    <span key={tag} className="badge-genre">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Starting Price",
                    value: formatPrice(vendor.startingPrice, vendor.category),
                  },
                  { label: "City", value: vendor.city },
                  { label: "Languages", value: vendor.languages.join(", ") },
                  {
                    label: "Multi-Day Events",
                    value: vendor.multiDaySupport
                      ? "Mehendi, Haldi, Sangeet, Wedding"
                      : "Single day only",
                  },
                ].map(({ label, value }) => (
                  <Card key={label} className="border-border bg-muted/30">
                    <CardContent className="p-3">
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right: action card */}
            <div>
              <Card className="border-border bg-card sticky top-24 shadow-elevated">
                <CardContent className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Starting from
                    </p>
                    <p className="font-display font-bold text-2xl text-primary">
                      {formatPrice(vendor.startingPrice, vendor.category)}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-1.5">
                    {vendor.verified && (
                      <div className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        GST Verified & ID Confirmed
                      </div>
                    )}
                    {vendor.whatsappActive && (
                      <div className="flex items-center gap-2 text-xs text-foreground">
                        <MessageCircle className="w-4 h-4 text-green-600 shrink-0" />
                        Responds via WhatsApp
                      </div>
                    )}
                    {vendor.multiDaySupport && (
                      <div className="flex items-center gap-2 text-xs text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        Multi-day events supported
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Privacy protection notice */}
                  <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3 text-xs text-muted-foreground leading-relaxed">
                    <Lock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Your phone number and personal details are{" "}
                      <strong className="text-foreground">not shared</strong>{" "}
                      with this vendor until a deal is confirmed through
                      WedBridge.
                    </span>
                  </div>

                  {/* T&C acknowledgment */}
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-0.5 accent-primary w-3.5 h-3.5 shrink-0"
                      data-ocid="vendor_profile.terms_checkbox"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                      I agree to WedBridge{" "}
                      <a
                        href="/pricing"
                        className="text-primary hover:underline"
                      >
                        Terms & Conditions
                      </a>
                      . I understand that if I arrange payment outside
                      WedBridge, the 2% platform commission remains due.
                    </span>
                  </label>

                  <Button
                    className="w-full bg-primary text-primary-foreground gap-2 disabled:opacity-50"
                    onClick={handleInquiry}
                    disabled={!agreedToTerms}
                    data-ocid="vendor_profile.contact_button"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Exclusive Inquiry
                  </Button>

                  <Button
                    variant="outline"
                    className={`w-full gap-2 ${inBasket ? "bg-primary/15 text-primary border-primary/30" : "border-primary/30 text-primary hover:bg-primary/10"}`}
                    onClick={handleBasket}
                    data-ocid="vendor_profile.basket_button"
                  >
                    {inBasket ? (
                      <>
                        <X className="w-4 h-4" />
                        Remove from Basket
                      </>
                    ) : (
                      <>
                        <ShoppingBasket className="w-4 h-4" />
                        Add to Vendor Basket
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Exclusive leads — your inquiry goes only to this vendor
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {relatedVendors.length > 0 && (
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-display font-bold text-xl text-foreground mb-5">
              More {vendor.category}s in {vendor.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedVendors.map((v) => (
                <a key={v.id} href={`/vendors/${v.id}`}>
                  <VendorCard vendor={v} />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
