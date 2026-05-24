// DestinationPage — repurposed from SongsPage for WedBridge
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Plane, Star } from "lucide-react";
import { motion } from "motion/react";
import VendorCard from "../components/VendorCard";
import { sampleVendors } from "../data/sampleData";

const destinationHubs = [
  {
    name: "Jaipur",
    tagline: "The Pink City — India's #1 Palace Wedding Destination",
    emoji: "🏰",
    description:
      "Jaipur offers unmatched palace venues — Rambagh Palace, Samode Haveli, Jai Mahal Palace. 400,000+ weddings per year with a massive local vendor base ready for destination couples from Delhi, Mumbai and abroad.",
    highlights: [
      "Palace & heritage venues",
      "Rajasthani cuisine & decor",
      "Travel-ready vendors",
      "Low competition vs metros",
    ],
    avgSpend: "₹38–₹85 Lakh",
    vendors: sampleVendors
      .filter((v) => v.city === "Jaipur" && v.isDestinationReady)
      .slice(0, 3),
    active: true,
    coverGradient: "from-primary/30 via-primary/10 to-accent/10",
  },
  {
    name: "Goa",
    tagline: "Beach & Resort Weddings — Sun, Sand, Vows",
    emoji: "🌊",
    description:
      "Goa is the go-to for couples wanting a relaxed beach ceremony with international guests. Stunning resorts, open-air venues and a growing vendor ecosystem.",
    highlights: [
      "Beach & poolside ceremonies",
      "Resort venues",
      "International guest-friendly",
      "Fusion cuisine",
    ],
    avgSpend: "₹40–₹90 Lakh",
    vendors: [],
    active: false,
    coverGradient: "from-accent/20 via-accent/10 to-primary/5",
  },
  {
    name: "Udaipur",
    tagline: "The City of Lakes — Royalty on the Water",
    emoji: "💎",
    description:
      "Udaipur's lake palaces and heritage havelis make it Rajasthan's most romantic wedding destination. Smaller capacity than Jaipur but unmatched visual grandeur.",
    highlights: [
      "Lake palace venues",
      "Small intimate gatherings",
      "Photography-perfect",
      "Heritage cuisine",
    ],
    avgSpend: "₹50–₹1.2 Crore",
    vendors: [],
    active: false,
    coverGradient: "from-secondary/20 via-secondary/10 to-accent/5",
  },
  {
    name: "Rishikesh",
    tagline: "Riverside & Spiritual Weddings — Where the Ganges Blesses",
    emoji: "🌿",
    description:
      "Rishikesh is emerging as a spiritual and eco-wedding destination. Riverside ceremonies, yoga retreat venues, and a growing number of certified pandits for traditional Hindu rituals.",
    highlights: [
      "Riverside ceremonies",
      "Spiritual & eco venues",
      "Vedic rituals",
      "Adventure pre-wedding shoots",
    ],
    avgSpend: "₹15–₹40 Lakh",
    vendors: [],
    active: false,
    coverGradient: "from-muted via-muted/50 to-background",
  },
];

export default function DestinationPage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-14">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1 text-xs font-semibold mb-4">
              <Plane className="w-3 h-3 mr-1.5" />1 in 4 Indian weddings is now
              a destination wedding
            </Badge>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-3 max-w-2xl mx-auto">
              Destination Wedding Hubs
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              WedBridge connects you with travel-ready vendors in India's most
              iconic wedding destinations. Average destination spend: ₹58 Lakh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destination Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 flex flex-col gap-12">
          {destinationHubs.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              id={dest.name.toLowerCase()}
            >
              <Card
                className={`border-border overflow-hidden ${!dest.active ? "opacity-80" : ""}`}
              >
                {/* Destination header */}
                <div
                  className={`bg-gradient-to-r ${dest.coverGradient} p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4`}
                >
                  <span className="text-5xl">{dest.emoji}</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="font-display font-bold text-2xl text-foreground">
                        {dest.name}
                      </h2>
                      {dest.active ? (
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                          Live Now
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs text-muted-foreground"
                        >
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {dest.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Avg. spend</p>
                    <p className="font-display font-bold text-primary">
                      {dest.avgSpend}
                    </p>
                  </div>
                </div>

                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Description + highlights */}
                  <div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {dest.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dest.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium bg-primary/8 text-primary border border-primary/20"
                        >
                          <MapPin className="w-3 h-3" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vendors in this hub or coming soon */}
                  <div>
                    {dest.vendors.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        <p className="text-sm font-semibold text-foreground">
                          Travel-ready vendors in {dest.name}
                        </p>
                        {dest.vendors.map((vendor) => (
                          <a
                            key={vendor.id}
                            href={`/vendors/${vendor.id}`}
                            className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 hover:border-primary/30 transition-smooth group"
                          >
                            <img
                              src={vendor.coverPhoto}
                              alt={vendor.name}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-smooth">
                                {vendor.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {vendor.category}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {vendor.rating.toFixed(1)}
                            </div>
                          </a>
                        ))}
                        <a href={`/vendors?city=${dest.name}&dest=true`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-1 border-primary/30 text-primary hover:bg-primary/10"
                          >
                            All {dest.name} vendors
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-6 bg-muted/30 rounded-xl border border-border border-dashed">
                        <span className="text-3xl">{dest.emoji}</span>
                        <p className="text-sm font-semibold text-foreground">
                          {dest.name} vendors coming soon
                        </p>
                        <p className="text-xs text-muted-foreground max-w-xs">
                          We're onboarding vendors in {dest.name}. Be the first
                          to list your services here.
                        </p>
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground"
                        >
                          Join as a Vendor
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">
            Planning a destination wedding?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Browse our curated travel-ready vendors and add your favourites to
            the Vendor Basket before reaching out.
          </p>
          <a href="/vendors">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground rounded-full gap-2 shadow-elevated"
            >
              <Plane className="w-4 h-4" />
              Browse Travel-Ready Vendors
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
