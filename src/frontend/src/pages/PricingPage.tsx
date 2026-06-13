// PricingPage — WedBridge vendor subscription plans
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BarChart2,
  Bot,
  Check,
  Globe,
  Headphones,
  MapPin,
  MessageCircle,
  Plane,
  Shield,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";

interface PlanFeature {
  label: string;
  free: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
  destinationHub: boolean | string;
  agentManaged: boolean | string;
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tagline: "Get discovered, no cost",
    color: "border-border",
    badge: "",
    buttonVariant: "outline" as const,
    buttonClass: "border-border text-foreground hover:bg-muted",
    icon: Star,
    commission: "3%",
    commissionNote: "on confirmed bookings",
  },
  {
    id: "standard",
    name: "Standard",
    price: 1000,
    tagline: "Grow your wedding business",
    color: "border-secondary/40",
    badge: "",
    buttonVariant: "outline" as const,
    buttonClass: "border-secondary/50 text-secondary hover:bg-secondary/10",
    icon: Users,
    commission: "2%",
    commissionNote: "on confirmed bookings",
  },
  {
    id: "premium",
    name: "Premium",
    price: 2500,
    tagline: "Most popular for serious vendors",
    color: "border-primary ring-2 ring-primary/20",
    badge: "Most Popular",
    buttonVariant: "default" as const,
    buttonClass: "bg-primary text-primary-foreground",
    icon: Sparkles,
    commission: "2%",
    commissionNote: "on confirmed bookings",
  },
  {
    id: "destination",
    name: "Destination Hub",
    price: 3000,
    tagline: "Reach NRI & destination couples",
    color: "border-accent/40",
    badge: "",
    buttonVariant: "outline" as const,
    buttonClass: "border-accent/50 text-accent hover:bg-accent/10",
    icon: Plane,
    commission: "1.5%",
    commissionNote: "on confirmed bookings",
  },
  {
    id: "agent",
    name: "Agent Managed",
    price: 2000,
    tagline: "WedBridge runs it all for you",
    color: "border-purple-400/50 bg-purple-50/30 dark:bg-purple-950/10",
    badge: "For Offline Vendors",
    buttonVariant: "default" as const,
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
    icon: Bot,
    commission: "1%",
    commissionNote: "on confirmed bookings",
  },
];

const features: PlanFeature[] = [
  {
    label: "Profile listing",
    free: true,
    standard: true,
    premium: true,
    destinationHub: true,
    agentManaged: true,
  },
  {
    label: "Portfolio photos",
    free: "5 photos",
    standard: "20 photos",
    premium: "Unlimited",
    destinationHub: "Unlimited",
    agentManaged: "Unlimited",
  },
  {
    label: "Exclusive inquiry routing",
    free: false,
    standard: true,
    premium: true,
    destinationHub: true,
    agentManaged: true,
  },
  {
    label: "WhatsApp lead notifications",
    free: false,
    standard: true,
    premium: true,
    destinationHub: true,
    agentManaged: true,
  },
  {
    label: "Contact protection (couples)",
    free: true,
    standard: true,
    premium: true,
    destinationHub: true,
    agentManaged: true,
  },
  {
    label: "Category page placement",
    free: "Basic",
    standard: "Enhanced",
    premium: "Priority",
    destinationHub: "Featured",
    agentManaged: "Featured",
  },
  {
    label: "Search ranking boost",
    free: false,
    standard: false,
    premium: true,
    destinationHub: true,
    agentManaged: true,
  },
  {
    label: "Analytics (views & leads)",
    free: false,
    standard: "Basic",
    premium: "Advanced",
    destinationHub: "Advanced",
    agentManaged: "Advanced + Reports",
  },
  {
    label: "Travel Ready badge",
    free: false,
    standard: false,
    premium: true,
    destinationHub: true,
    agentManaged: true,
  },
  {
    label: "Destination hub placement",
    free: false,
    standard: false,
    premium: false,
    destinationHub: true,
    agentManaged: true,
  },
  {
    label: "Multi-city visibility",
    free: false,
    standard: false,
    premium: false,
    destinationHub: "3 cities",
    agentManaged: "3 cities",
  },
  {
    label: "Dedicated WedBridge agent",
    free: false,
    standard: false,
    premium: false,
    destinationHub: false,
    agentManaged: true,
  },
  {
    label: "Profile writing & optimisation",
    free: false,
    standard: false,
    premium: false,
    destinationHub: false,
    agentManaged: true,
  },
  {
    label: "Monthly social media posts",
    free: false,
    standard: false,
    premium: false,
    destinationHub: false,
    agentManaged: "4 posts/month",
  },
  {
    label: "Lead follow-up by agent",
    free: false,
    standard: false,
    premium: false,
    destinationHub: false,
    agentManaged: true,
  },
  {
    label: "Annual business photo shoot",
    free: false,
    standard: false,
    premium: false,
    destinationHub: false,
    agentManaged: true,
  },
  {
    label: "WedBridge commission",
    free: "3%",
    standard: "2%",
    premium: "2%",
    destinationHub: "1.5%",
    agentManaged: "1%",
  },
  {
    label: "Customer support",
    free: "Email",
    standard: "Email + Chat",
    premium: "Priority chat",
    destinationHub: "Priority chat",
    agentManaged: "Dedicated agent",
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-primary mx-auto" />;
  if (value === false)
    return <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />;
  return (
    <span className="text-xs text-foreground text-center block">{value}</span>
  );
}

const planColorMap: Record<string, string> = {
  Free: "bg-muted text-muted-foreground border-border",
  Standard: "bg-secondary/15 text-secondary border-secondary/30",
  Premium: "bg-primary/15 text-primary border-primary/30",
  "Destination Hub": "bg-accent/15 text-accent border-accent/30",
  "Agent Managed":
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300",
};

export const vendorPlanColors = planColorMap;

export default function PricingPage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/8 to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge className="bg-primary/15 text-primary border-primary/30 mb-4">
              Vendor Plans
            </Badge>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3 max-w-2xl mx-auto">
              Choose the plan that grows with your business
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              All plans include WedBridge trust infrastructure: verified
              profiles, contact protection, and exclusive inquiry routing.
              Prices are per month, billed monthly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-8 pt-4">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card
                    className={`border-2 ${plan.color} h-full flex flex-col relative`}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-0 right-0 flex justify-center">
                        <span
                          className={`text-xs font-semibold px-3 py-0.5 rounded-full border ${
                            plan.id === "premium"
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-purple-600 text-white border-purple-500"
                          }`}
                        >
                          {plan.badge}
                        </span>
                      </div>
                    )}
                    <CardContent className="p-5 flex flex-col gap-4 flex-1">
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            plan.id === "premium"
                              ? "bg-primary/15"
                              : plan.id === "agent"
                                ? "bg-purple-100 dark:bg-purple-900/30"
                                : "bg-muted"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              plan.id === "premium"
                                ? "text-primary"
                                : plan.id === "agent"
                                  ? "text-purple-600"
                                  : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <h2 className="font-display font-bold text-foreground text-sm">
                          {plan.name}
                        </h2>
                      </div>

                      <div>
                        {plan.price === 0 ? (
                          <p className="font-display font-bold text-2xl text-foreground">
                            Free
                          </p>
                        ) : (
                          <p className="font-display font-bold text-2xl text-foreground">
                            ₹{plan.price.toLocaleString("en-IN")}
                            <span className="text-sm font-normal text-muted-foreground">
                              /mo
                            </span>
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {plan.tagline}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 rounded-lg px-2.5 py-1.5">
                        <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>
                          <strong className="text-foreground">
                            {plan.commission}
                          </strong>{" "}
                          {plan.commissionNote}
                        </span>
                      </div>

                      <Button
                        variant={plan.buttonVariant}
                        className={`w-full text-sm ${plan.buttonClass}`}
                      >
                        {plan.price === 0 ? "List for Free" : "Get Started"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-display font-bold text-xl text-foreground mb-6 text-center">
            Full plan comparison
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-foreground w-48">
                    Feature
                  </th>
                  {[
                    "Free",
                    "Standard",
                    "Premium",
                    "Destination Hub",
                    "Agent Managed",
                  ].map((name) => (
                    <th
                      key={name}
                      className="px-3 py-3 font-semibold text-center"
                    >
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${planColorMap[name]}`}
                      >
                        {name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.label}
                    className={`border-b border-border last:border-0 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/20"
                    }`}
                  >
                    <td className="px-4 py-2.5 text-sm text-foreground font-medium">
                      {feature.label}
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <FeatureValue value={feature.free} />
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <FeatureValue value={feature.standard} />
                    </td>
                    <td className="px-3 py-2.5 text-center bg-primary/3">
                      <FeatureValue value={feature.premium} />
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <FeatureValue value={feature.destinationHub} />
                    </td>
                    <td className="px-3 py-2.5 text-center bg-purple-50/40 dark:bg-purple-950/10">
                      <FeatureValue value={feature.agentManaged} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Agent Managed spotlight */}
      <section className="py-10 bg-gradient-to-r from-purple-50/60 to-primary/5 dark:from-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-purple-300/50 dark:border-purple-700/40 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-primary p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Bot className="w-6 h-6" />
                  <h2 className="font-display font-bold text-xl">
                    Agent Managed — for offline vendors
                  </h2>
                </div>
                <p className="text-white/80 text-sm">
                  Not comfortable with social media or digital marketing?
                  WedBridge assigns a dedicated agent who handles everything —
                  so you focus on your craft.
                </p>
              </div>
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Headphones,
                    title: "Dedicated account agent",
                    desc: "One person manages your profile, responds to inquiries, and coordinates with couples — all via WhatsApp.",
                  },
                  {
                    icon: BarChart2,
                    title: "Social media content",
                    desc: "4 branded posts per month on Instagram & Facebook. No phone or app skills needed from you.",
                  },
                  {
                    icon: Globe,
                    title: "Profile creation",
                    desc: "Professional write-up, photo editing, and category tags done for you on day one.",
                  },
                  {
                    icon: MapPin,
                    title: "Annual business shoot",
                    desc: "A WedBridge photographer visits to capture fresh portfolio photos for your listing.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust + T&C notice */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto flex flex-col gap-5">
            <Card className="border-border bg-muted/30">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">
                    WedBridge Platform Terms
                  </h3>
                </div>
                <Separator />
                <ul className="flex flex-col gap-2">
                  {[
                    "All vendor plans include contact protection — couple's phone and personal details are never shared until a deal is confirmed through WedBridge.",
                    "Vendors may not contact couples outside WedBridge before the booking is confirmed on the platform.",
                    "By registering, vendors agree to WedBridge's commission structure. If a couple introduced via WedBridge settles payment outside the platform, WedBridge reserves the right to claim the applicable commission and take legal action under applicable Indian contract law.",
                    "Vendors on all plans see only their own leads. Shortlists and comparison activity by couples are private and never disclosed to vendors.",
                    "After a booking is confirmed, WedBridge facilitates optional Event Team coordination — allowing confirmed vendors for the same wedding to communicate through the platform.",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                    >
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-5 flex flex-col gap-3 text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-display font-semibold text-foreground">
                  Not sure which plan is right?
                </h3>
                <p className="text-sm text-muted-foreground">
                  WhatsApp us and a WedBridge advisor will recommend the best
                  fit for your business type and city.
                </p>
                <Button className="bg-primary text-primary-foreground mx-auto gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
