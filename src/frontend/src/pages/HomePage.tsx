import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  MapPin,
  Plane,
  Search,
  ShoppingBasket,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import VendorCard from "../components/VendorCard";
import {
  samplePosts,
  sampleUsernames,
  sampleVendors,
} from "../data/sampleData";

const featuredVendors = sampleVendors
  .filter((v) => v.plan === "Premium" || v.plan === "Destination Hub")
  .slice(0, 6);

const vendorCategories = [
  {
    label: "Photographers",
    emoji: "📸",
    href: "/vendors?cat=Photographer",
    color: "from-primary/20 to-primary/5",
  },
  {
    label: "Decorators",
    emoji: "🌸",
    href: "/vendors?cat=Decorator",
    color: "from-accent/20 to-accent/5",
  },
  {
    label: "Mehendi Artists",
    emoji: "🌿",
    href: "/vendors?cat=Mehendi+Artist",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    label: "Venues",
    emoji: "🏰",
    href: "/vendors?cat=Venue",
    color: "from-primary/15 to-accent/5",
  },
  {
    label: "Caterers",
    emoji: "🍽️",
    href: "/vendors?cat=Caterer",
    color: "from-accent/15 to-primary/5",
  },
  {
    label: "Bridal Makeup",
    emoji: "💄",
    href: "/vendors?cat=Bridal+Makeup",
    color: "from-secondary/20 to-accent/5",
  },
  {
    label: "DJ & Music",
    emoji: "🎵",
    href: "/vendors?cat=DJ",
    color: "from-primary/10 to-secondary/5",
  },
  {
    label: "All Categories",
    emoji: "✨",
    href: "/vendors",
    color: "from-muted to-muted/50",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Browse & Shortlist",
    description:
      "Filter vendors by city, category, budget or destination-readiness. Add them to your Vendor Basket.",
    icon: Search,
  },
  {
    step: "2",
    title: "Build Your Basket",
    description:
      "Compare vendors side by side in your basket. Add notes, check prices, and decide who to contact.",
    icon: ShoppingBasket,
  },
  {
    step: "3",
    title: "Connect & Book",
    description:
      "Send an exclusive inquiry. Vendors respond via WhatsApp — no spam, no shotgun emails to 10 people.",
    icon: Heart,
  },
];

const trustStats = [
  { value: "8M+", label: "Weddings in India every year" },
  { value: "₹0", label: "Cost to join as a couple" },
  { value: "Exclusive", label: "Leads — one couple per inquiry" },
  { value: "100%", label: "Verified vendor profiles" },
];

const destinationHubs = [
  {
    name: "Jaipur",
    desc: "Palace weddings & royal decor",
    emoji: "🏰",
    active: true,
  },
  { name: "Goa", desc: "Beach & resort weddings", emoji: "🌊", active: false },
  {
    name: "Udaipur",
    desc: "Lake palace & heritage venues",
    emoji: "💎",
    active: false,
  },
  {
    name: "Rishikesh",
    desc: "Riverside & spiritual ceremonies",
    emoji: "🌿",
    active: false,
  },
];

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5"
        style={{ minHeight: "420px" }}
        data-ocid="home.hero_section"
      >
        <div className="absolute inset-0 gradient-purple-subtle" />
        <div className="relative container mx-auto px-4 py-20 flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1 text-xs font-semibold mb-4">
              <MapPin className="w-3 h-3 mr-1.5" />
              Now live in Jaipur — India's top destination wedding city
            </Badge>
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight max-w-3xl mx-auto">
              Your wedding vendors,{" "}
              <span className="text-primary">curated</span> and{" "}
              <span className="text-accent">compared</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              Browse photographers, decorators, caterers and more. Add them to
              your <strong className="text-foreground">Vendor Basket</strong> —
              then contact your favourites with exclusive leads. No spam. No
              middlemen.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a href="/vendors">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground rounded-full gap-2 shadow-elevated hover:shadow-hover transition-smooth"
                data-ocid="home.browse_vendors_button"
              >
                <Search className="w-4 h-4" />
                Browse Vendors in Jaipur
              </Button>
            </a>
            <a href="/destinations">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full gap-2 border-primary/30 hover:border-primary/60 transition-smooth"
                data-ocid="home.destination_button"
              >
                <Plane className="w-4 h-4" />
                Destination Weddings
              </Button>
            </a>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-4"
          >
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-xl text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section
        className="bg-muted/30 py-12"
        data-ocid="home.categories_section"
      >
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {vendorCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <a href={cat.href} data-ocid={`home.category_card.${i + 1}`}>
                  <Card
                    className={`card-lift bg-gradient-to-br ${cat.color} border-border cursor-pointer`}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div>
                        <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                          {cat.label}
                        </h3>
                        <div className="flex items-center gap-1 text-primary text-xs font-medium mt-0.5">
                          Browse <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How WedBridge Works */}
      <section
        className="py-14 bg-background"
        data-ocid="home.how_it_works_section"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              How WedBridge Works
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Built to give couples negotiating power without removing fairness
              for vendors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center shadow-elevated">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section
        className="py-12 bg-muted/30"
        data-ocid="home.featured_vendors_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Top Vendors in Jaipur
            </h2>
            <a
              href="/vendors"
              className="text-primary text-sm hover:underline flex items-center gap-1"
              data-ocid="home.view_all_vendors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredVendors.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`home.vendor_card.${i + 1}`}
              >
                <a href={`/vendors/${vendor.id}`}>
                  <VendorCard vendor={vendor} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Hubs */}
      <section
        className="py-12 bg-background"
        data-ocid="home.destinations_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              Destination Wedding Hubs
            </h2>
            <a
              href="/destinations"
              className="text-primary text-sm hover:underline flex items-center gap-1"
            >
              Explore all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {destinationHubs.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={`/destinations?city=${dest.name}`}>
                  <Card
                    className={`card-lift cursor-pointer border-border ${dest.active ? "ring-1 ring-primary/30" : ""}`}
                  >
                    <CardContent className="p-5 flex flex-col items-center text-center gap-2">
                      <span className="text-3xl">{dest.emoji}</span>
                      <h3 className="font-display font-semibold text-foreground text-sm">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {dest.desc}
                      </p>
                      {dest.active && (
                        <Badge className="text-[10px] bg-primary/15 text-primary border-primary/20 px-2 py-0.5">
                          Live Now
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WedBridge Fair by Design section */}
      <section className="py-14 bg-muted/30" data-ocid="home.fair_section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl text-foreground mb-4">
              Fair by Design
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              WedBridge is built on the belief that both couples and vendors
              deserve a fair deal. Couples get competitive quotes. Vendors get
              qualified, exclusive leads — not 15 people asking the same price
              on a group inquiry.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {[
                {
                  icon: CheckCircle,
                  title: "Exclusive Leads",
                  desc: "Each inquiry goes to one vendor only — no more racing 10 competitors to reply first.",
                },
                {
                  icon: ShoppingBasket,
                  title: "Vendor Basket",
                  desc: "Shortlist and compare vendors before reaching out. Make informed decisions, not rushed ones.",
                },
                {
                  icon: Star,
                  title: "Verified Vendors",
                  desc: "GST verified, ID confirmed, reviewed by real couples. Know who you're trusting before you book.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-border bg-card h-full">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground">
                        {title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials */}
      <section
        className="py-12 bg-background"
        data-ocid="home.testimonials_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Real Stories from Couples & Vendors
            </h2>
            <a
              href="/feed"
              className="text-primary text-sm hover:underline flex items-center gap-1"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="flex flex-col gap-4 max-w-2xl">
            {samplePosts.slice(0, 3).map((post, i) => (
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
                          {(sampleUsernames[post.author.toText()] ?? "W")[0]}
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {sampleUsernames[post.author.toText()] ??
                            "WedBridge User"}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          ❤️ {formatCount(post.likesCount)} likes
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
    </div>
  );
}
