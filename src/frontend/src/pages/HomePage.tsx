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
  { label: "Photographers", emoji: "📸", href: "/vendors?cat=Photographer", count: "48+ vendors" },
  { label: "Decorators", emoji: "🌸", href: "/vendors?cat=Decorator", count: "32+ vendors" },
  { label: "Mehendi Artists", emoji: "🌿", href: "/vendors?cat=Mehendi+Artist", count: "24+ vendors" },
  { label: "Venues", emoji: "🏰", href: "/vendors?cat=Venue", count: "19+ venues" },
  { label: "Caterers", emoji: "🍽️", href: "/vendors?cat=Caterer", count: "27+ vendors" },
  { label: "Bridal Makeup", emoji: "💄", href: "/vendors?cat=Bridal+Makeup", count: "35+ artists" },
  { label: "DJ & Music", emoji: "🎵", href: "/vendors?cat=DJ", count: "22+ vendors" },
  { label: "All Categories", emoji: "✨", href: "/vendors", count: "15 categories" },
];

const howItWorks = [
  {
    step: "01",
    title: "Browse & Shortlist",
    description:
      "Filter by city, category, budget or destination-readiness. Discover verified vendors across India.",
    icon: Search,
  },
  {
    step: "02",
    title: "Build Your Basket",
    description:
      "Add favourites to your Vendor Basket. Compare side by side with your own notes before deciding.",
    icon: ShoppingBasket,
  },
  {
    step: "03",
    title: "Connect & Book",
    description:
      "Send an exclusive inquiry — one couple, one vendor. Connect via WhatsApp instantly. No spam.",
    icon: Heart,
  },
];

const trustStats = [
  { value: "8M+", label: "Weddings in India every year" },
  { value: "₹0", label: "Free for couples, always" },
  { value: "1:1", label: "Exclusive leads per inquiry" },
  { value: "100%", label: "Verified vendor profiles" },
];

const destinationHubs = [
  { name: "Jaipur",    desc: "Palace weddings & royal décor",          emoji: "🏰", active: true,  badge: "Live Now"     },
  { name: "Siliguri",  desc: "Hill weddings & North Bengal charm",      emoji: "🏔️", active: true,  badge: "Live Now"     },
  { name: "Amritsar",  desc: "Heritage & Punjabi grand weddings",       emoji: "🪔", active: true,  badge: "Live Now"     },
  { name: "Indore",    desc: "Central India's rising wedding hub",      emoji: "🌆", active: true,  badge: "Live Now"     },
  { name: "Goa",       desc: "Beach & resort weddings",                 emoji: "🌊", active: false, badge: "Coming Soon"  },
  { name: "Udaipur",   desc: "Lake palace & heritage venues",           emoji: "💎", active: false, badge: "Coming Soon"  },
  { name: "Varanasi",  desc: "Spiritual riverside ceremonies",          emoji: "🕊️", active: false, badge: "Coming Soon"  },
  { name: "Rishikesh", desc: "Riverside & yoga-inspired ceremonies",    emoji: "🌿", active: false, badge: "Coming Soon"  },
];

const heroPetals = [
  { left: "7%",  top: "22%", size: "text-2xl", delay: "0s",    dur: "9s",  el: "🌸" },
  { left: "91%", top: "18%", size: "text-xl",  delay: "2.1s",  dur: "11s", el: "💍" },
  { left: "14%", top: "72%", size: "text-lg",  delay: "4s",    dur: "8s",  el: "✨" },
  { left: "83%", top: "68%", size: "text-2xl", delay: "1.2s",  dur: "10s", el: "🌸" },
  { left: "48%", top: "12%", size: "text-base",delay: "3s",    dur: "13s", el: "💜" },
];

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return String(num);
}

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0 overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-background to-accent/8" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,oklch(0.48_0.22_290_/_0.14),transparent)]" />

        {/* Soft glow orbs */}
        <div className="absolute top-20 left-[6%] w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse" style={{ animationDuration: "5s" }} />
        <div className="absolute bottom-20 right-[8%] w-96 h-96 rounded-full bg-accent/8 blur-3xl animate-pulse" style={{ animationDuration: "7s", animationDelay: "2s" }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-primary/4 blur-3xl" />
        </div>

        {/* Floating petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {heroPetals.map((p, i) => (
            <span
              key={i}
              className={`absolute ${p.size} opacity-25 float-petal`}
              style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur }}
            >
              {p.el}
            </span>
          ))}
        </div>

        <div className="relative container mx-auto px-4 py-28 flex flex-col items-center text-center gap-8">
          {/* Launch badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-primary/15 text-primary border-primary/25 px-5 py-1.5 text-xs font-semibold rounded-full inline-flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Now live across India — Jaipur, Siliguri, Amritsar & more
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75 }}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl text-foreground leading-[1.08] max-w-4xl mx-auto"
          >
            India's wedding market,{" "}
            <br />
            <span className="text-primary">beautifully</span>{" "}
            organised{" "}
            <span className="text-accent italic">by WedVow</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38, duration: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
          >
            WedVow connects couples with India's finest photographers, decorators,
            caterers and more — with a{" "}
            <strong className="text-foreground">Vendor Basket</strong> to compare
            and exclusive one-to-one leads that are fair for everyone.
          </motion.p>

          {/* Hero search pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.55 }}
            className="w-full max-w-2xl"
          >
            <a href="/vendors" data-ocid="home.hero_search">
              <div className="flex items-center gap-3 bg-card/95 backdrop-blur-sm border border-border rounded-full px-5 py-3.5 shadow-elevated hover:shadow-hover transition-smooth cursor-pointer group">
                <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth shrink-0" />
                <span className="text-muted-foreground text-sm flex-1 text-left truncate">
                  Search photographers, venues, caterers near you…
                </span>
                <div className="gradient-purple text-primary-foreground rounded-full px-5 py-2 text-sm font-semibold shrink-0 shadow-sm">
                  Search
                </div>
              </div>
            </a>
          </motion.div>

          {/* Quick category chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.62 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {["Photographer", "Venue", "Decorator", "Bridal Makeup", "Mehendi Artist", "Caterer"].map((cat) => (
              <a
                key={cat}
                href={`/vendors?cat=${encodeURIComponent(cat)}`}
                data-ocid={`home.quick_cat.${cat}`}
              >
                <span className="px-4 py-1.5 rounded-full bg-card/80 text-foreground text-xs font-medium border border-border hover:border-primary/40 hover:bg-primary/8 transition-smooth cursor-pointer">
                  {cat}
                </span>
              </a>
            ))}
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72 }}
            className="flex flex-wrap justify-center gap-8 mt-2 pt-6 border-t border-border/40 w-full max-w-2xl"
          >
            {trustStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-2xl sm:text-3xl text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ORNAMENTAL DIVIDER ── */}
      <div className="py-3 bg-primary/5 flex items-center justify-center">
        <div className="flex items-center gap-4 text-primary/40">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/30" />
          <Heart className="w-3.5 h-3.5 fill-primary/25 text-primary/25" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section className="py-16 bg-background" data-ocid="home.categories_section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-sm">
              Every vendor you need for a complete Indian wedding
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {vendorCategories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <a href={cat.href} data-ocid={`home.category_card.${i + 1}`}>
                  <Card className="card-lift border-border bg-gradient-to-br from-muted/50 to-background cursor-pointer group h-full">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <span className="text-3xl group-hover:scale-110 transition-smooth inline-block origin-left">
                        {cat.emoji}
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-sm text-foreground leading-snug">
                          {cat.label}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p>
                      </div>
                      <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                        Browse{" "}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-smooth" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section
        className="py-20 bg-gradient-to-b from-primary/6 to-background"
        data-ocid="home.how_it_works_section"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              How WedVow Works
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Fair for couples. Fair for vendors. Built for the Indian wedding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto relative">
            {/* Connecting dashes on desktop */}
            <div className="hidden md:flex absolute top-9 left-[calc(33%+2rem)] right-[calc(33%+2rem)] items-center gap-1 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 h-px bg-primary/20" />
              ))}
            </div>

            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 }}
                className="flex flex-col items-center text-center gap-4"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl gradient-purple flex items-center justify-center shadow-elevated">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-foreground text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR EVERY ROLE ────────────────────────────────────── */}
      <section className="py-20 bg-background" data-ocid="home.for_everyone_section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              WedVow is for everyone in an Indian wedding
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
              Whether you're planning your big day, running a wedding business, coordinating a family event, or celebrating — WedVow has a place for you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {[
              {
                emoji: "💍",
                role: "Couples",
                headline: "Discover your dream team",
                points: [
                  "Browse 200+ verified vendors across 50+ cities",
                  "Shortlist favourites in your free Vendor Basket",
                  "Send exclusive inquiries — no spam, no bidding wars",
                  "Plan ceremonies: Mehendi, Haldi, Sangeet, Pheras & more",
                ],
                bg: "from-primary/10 to-background",
                accent: "text-primary",
              },
              {
                emoji: "📸",
                role: "Vendors",
                headline: "Grow your wedding business",
                points: [
                  "Get qualified, exclusive leads from serious couples",
                  "Showcase your portfolio with premium profile pages",
                  "List across multiple cities and event types",
                  "Build trust with verified reviews and GST confirmation",
                ],
                bg: "from-accent/10 to-background",
                accent: "text-accent",
              },
              {
                emoji: "📋",
                role: "Wedding Planners",
                headline: "Organise every detail",
                points: [
                  "Manage vendor shortlists across multiple client weddings",
                  "Access a curated network of destination-ready vendors",
                  "Filter by budget, city, availability and category",
                  "Coordinate outstation vendors for destination weddings",
                ],
                bg: "from-secondary/15 to-background",
                accent: "text-secondary-foreground",
              },
              {
                emoji: "🌸",
                role: "Community",
                headline: "Celebrate and inspire",
                points: [
                  "Share your wedding moments with real Indian families",
                  "Get inspired by real Bengali, Punjabi, Marwari & South Indian weddings",
                  "Post questions and get advice from couples who've been there",
                  "Follow vendors and get early access to new listings",
                ],
                bg: "from-muted/50 to-background",
                accent: "text-muted-foreground",
              },
            ].map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Card className={`border-border bg-gradient-to-br ${item.bg} h-full`}>
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wide ${item.accent}`}>{item.role}</p>
                        <h3 className="font-display font-bold text-foreground text-base leading-snug">{item.headline}</h3>
                      </div>
                    </div>
                    <ul className="space-y-2 flex-1">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED VENDORS ──────────────────────────────────── */}
      <section className="py-14 bg-background" data-ocid="home.featured_vendors_section">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display font-bold text-3xl text-foreground flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Top Vendors Across India
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Premium and destination-ready vendors
              </p>
            </div>
            <a
              href="/vendors"
              className="text-primary text-sm hover:underline flex items-center gap-1 shrink-0 mt-1"
              data-ocid="home.view_all_vendors"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredVendors.map((vendor, i) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
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

      {/* ── DESTINATION HUBS ──────────────────────────────────── */}
      <section className="py-14 bg-muted/30" data-ocid="home.destinations_section">
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display font-bold text-3xl text-foreground flex items-center gap-2">
                <Plane className="w-6 h-6 text-primary" />
                Destination Wedding Hubs
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                India's most beautiful wedding locations
              </p>
            </div>
            <a
              href="/destinations"
              className="text-primary text-sm hover:underline flex items-center gap-1 shrink-0 mt-1"
            >
              Explore all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {destinationHubs.map((dest, i) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={`/destinations?city=${dest.name}`}>
                  <Card
                    className={`card-lift cursor-pointer border-border h-full ${
                      dest.active
                        ? "bg-gradient-to-br from-primary/15 to-accent/8 ring-2 ring-primary/25 shadow-elevated"
                        : "bg-gradient-to-br from-muted/60 to-background opacity-70 hover:opacity-90"
                    }`}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                      <span className="text-4xl">{dest.emoji}</span>
                      <h3 className="font-display font-bold text-foreground text-base">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {dest.desc}
                      </p>
                      <Badge
                        className={`text-[10px] px-2.5 py-0.5 mt-1 ${
                          dest.active
                            ? "bg-primary/15 text-primary border-primary/25"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {dest.badge}
                      </Badge>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAIR BY DESIGN ────────────────────────────────────── */}
      <section className="py-16 bg-background" data-ocid="home.fair_section">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              Fair by Design
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
              Couples get competitive options. Vendors get qualified, exclusive
              leads — not 15 people asking the same price on a group blast.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: CheckCircle,
                title: "Exclusive Leads",
                desc: "Each inquiry goes to one vendor only — no more racing 10 competitors to reply first.",
                bg: "from-primary/10 to-background",
              },
              {
                icon: ShoppingBasket,
                title: "Vendor Basket",
                desc: "Shortlist and compare vendors before reaching out. Make informed, pressure-free decisions.",
                bg: "from-accent/10 to-background",
              },
              {
                icon: Star,
                title: "Verified Vendors",
                desc: "GST verified, ID confirmed, reviewed by real couples. Know who you're trusting before you book.",
                bg: "from-secondary/15 to-background",
              },
            ].map(({ icon: Icon, title, desc, bg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Card className={`border-border bg-gradient-to-br ${bg} h-full`}>
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY STORIES ─────────────────────────────────── */}
      <section
        className="py-16 bg-gradient-to-b from-primary/6 to-background"
        data-ocid="home.testimonials_section"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <h2 className="font-display font-bold text-3xl text-foreground flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Real Stories from Couples & Vendors
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Moments that matter, shared by real WedVow families
              </p>
            </div>
            <a
              href="/feed"
              className="text-primary text-sm hover:underline flex items-center gap-1 shrink-0 mt-1"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {samplePosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <a
                  href={`/feed/${post.id}`}
                  data-ocid={`home.post_card.${i + 1}`}
                  className="h-full block"
                >
                  <Card className="card-lift border-border bg-card cursor-pointer relative overflow-hidden h-full">
                    {/* Decorative large quote mark */}
                    <div className="absolute top-1 right-4 font-serif text-7xl leading-none text-primary/8 select-none pointer-events-none">
                      "
                    </div>
                    <CardContent className="p-6 flex flex-col gap-4 h-full">
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                          {(sampleUsernames[post.author.toText()] ?? "V")[0]}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground block">
                            {sampleUsernames[post.author.toText()] ?? "WedVow Member"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Verified couple
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <p className="text-sm text-foreground leading-relaxed line-clamp-3 flex-1">
                        {post.content}
                      </p>
                      {/* Footer */}
                      <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-red-400 text-red-400" />
                          {formatCount(post.likesCount)} likes
                        </span>
                        {post.hashtags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs text-primary/70 font-medium">
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

      {/* ── BOTTOM CTA BANNER ─────────────────────────────────── */}
      <section
        className="py-20 bg-gradient-to-br from-primary/14 via-accent/8 to-secondary/10 border-t border-primary/10"
        data-ocid="home.cta_section"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-primary/25" />
              <Heart className="w-5 h-5 text-primary fill-primary/40" />
              <div className="h-px w-16 bg-primary/25" />
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
              Your dream wedding is
              <br />
              <span className="text-primary">one search away</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-10 text-sm leading-relaxed">
              Join couples across India planning their perfect wedding with
              WedVow. Browse, compare, and book the vendors you love.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/vendors">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground rounded-full gap-2 shadow-elevated hover:shadow-hover transition-smooth px-8"
                  data-ocid="home.cta_browse_button"
                >
                  <Search className="w-4 h-4" />
                  Browse Vendors
                </Button>
              </a>
              <a href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full gap-2 border-primary/30 hover:border-primary/60 transition-smooth px-8"
                  data-ocid="home.cta_plans_button"
                >
                  <TrendingUp className="w-4 h-4" />
                  Vendor Plans
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
