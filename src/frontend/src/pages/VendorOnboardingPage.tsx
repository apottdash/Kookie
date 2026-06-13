// VendorOnboardingPage — real vendor registration for WedBridge
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  ChevronRight,
  IndianRupee,
  Loader2,
  MapPin,
  Phone,
  Shield,
  Star,
  Store,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

const CATEGORIES = [
  "Photographer", "Videographer", "Decorator", "Caterer",
  "Mehendi Artist", "DJ", "Venue", "Bridal Makeup", "Pundit",
  "Choreographer", "Invitation Designer", "Bridal Wear",
  "Dhol Player", "Baraat", "Cake",
];

const CITIES = [
  "Jaipur", "Delhi NCR", "Mumbai", "Goa", "Udaipur",
  "Chandigarh", "Pune", "Hyderabad", "Bengaluru", "Kolkata",
  "Ahmedabad", "Surat", "Lucknow", "Bhopal", "Nagpur",
  "Indore", "Coimbatore", "Kochi", "Thiruvananthapuram", "Other",
];

const LANGUAGES = [
  "Hindi", "English", "Punjabi", "Bengali", "Marathi",
  "Telugu", "Tamil", "Kannada", "Gujarati", "Rajasthani",
  "Urdu", "Malayalam", "Konkani", "Sanskrit",
];

const PLANS = [
  {
    id: "Free",
    price: "₹0",
    color: "bg-muted/40 border-border",
    badge: "",
    features: ["Basic listing", "3% commission", "Standard visibility"],
  },
  {
    id: "Standard",
    price: "₹1,000/mo",
    color: "bg-primary/5 border-primary/30",
    badge: "",
    features: ["Featured listing", "2% commission", "WhatsApp button", "Priority support"],
  },
  {
    id: "Premium",
    price: "₹2,500/mo",
    color: "bg-primary/10 border-primary/40",
    badge: "Most Popular",
    features: ["Top placement", "2% commission", "Verified badge", "Analytics dashboard"],
  },
  {
    id: "Destination Hub",
    price: "₹3,000/mo",
    color: "bg-accent/5 border-accent/30",
    badge: "",
    features: ["Destination filter", "1.5% commission", "Multi-day events", "NRI couple targeting"],
  },
  {
    id: "Agent Managed",
    price: "₹2,000/mo",
    color: "bg-purple-500/5 border-purple-500/30",
    badge: "For Offline Vendors",
    features: ["WedBridge agent manages listing", "1% commission", "No smartphone needed", "Agent handles inquiries"],
  },
];

interface FormData {
  name: string;
  category: string;
  city: string;
  customCity: string;
  description: string;
  startingPrice: string;
  phone: string;
  languages: string[];
  tags: string;
  plan: string;
  isDestinationReady: boolean;
  whatsappActive: boolean;
  multiDaySupport: boolean;
  agreeToTerms: boolean;
}

const initialForm: FormData = {
  name: "",
  category: "",
  city: "",
  customCity: "",
  description: "",
  startingPrice: "",
  phone: "",
  languages: ["Hindi"],
  tags: "",
  plan: "Free",
  isDestinationReady: false,
  whatsappActive: true,
  multiDaySupport: false,
  agreeToTerms: false,
};

export default function VendorOnboardingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleLanguage = (lang: string) => {
    set(
      "languages",
      form.languages.includes(lang)
        ? form.languages.filter((l) => l !== lang)
        : [...form.languages, lang],
    );
  };

  const canProceedStep1 =
    form.name.trim().length > 1 && form.category && form.city;
  const canProceedStep2 =
    form.description.trim().length > 20 && form.startingPrice && form.phone.trim().length >= 10;
  const canSubmit = form.agreeToTerms;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);

    const city = form.city === "Other" ? form.customCity : form.city;
    const tags = form.tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    try {
      if (supabase) {
        const { error } = await supabase.from("vendors").insert({
          name: form.name.trim(),
          category: form.category,
          city,
          is_destination_ready: form.isDestinationReady,
          plan: form.plan,
          cover_photo: null,
          rating: 0,
          review_count: 0,
          starting_price: Number(form.startingPrice.replace(/[^0-9]/g, "")),
          description: form.description.trim(),
          tags,
          languages: form.languages,
          verified: false,
          whatsapp_active: form.whatsappActive,
          multi_day_support: form.multiDaySupport,
        });
        if (error) throw error;
      }
      setSubmitted(true);
    } catch (err) {
      toast.error("Something went wrong. Please try again or contact WedBridge support.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pb-20 md:pb-0">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center gap-6 max-w-md">
          <div className="w-20 h-20 rounded-2xl gradient-purple flex items-center justify-center shadow-elevated">
            <CheckCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            You're on WedBridge!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Your listing has been submitted. The WedBridge team will review and
            verify your profile within <strong>24–48 hours</strong>. Once
            verified, couples across India will start discovering you.
          </p>
          <div className="bg-primary/5 rounded-xl p-4 text-sm text-muted-foreground text-left w-full space-y-2">
            <p className="font-semibold text-foreground">What happens next:</p>
            <p>✅ WedBridge team reviews your listing</p>
            <p>✅ We may WhatsApp you for verification</p>
            <p>✅ Profile goes live after approval</p>
            <p>✅ Couples can find and inquire with you</p>
          </div>
          <a href="/vendors">
            <Button className="bg-primary text-primary-foreground rounded-full px-8">
              Browse Other Vendors
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/8 to-background py-10">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Store className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Vendor Registration
            </span>
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            List Your Business on WedBridge
          </h1>
          <p className="text-muted-foreground text-sm">
            Join India's most trusted wedding marketplace. Reach verified
            couples — no spam, no mass broadcasts.
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? "✓" : s}
                </div>
                <span
                  className={`text-xs hidden sm:block ${step >= s ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  {s === 1 ? "Basic Info" : s === 2 ? "Details & Pricing" : "Plan & Submit"}
                </span>
                {s < 3 && (
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* ── STEP 1: Basic Info ── */}
          {step === 1 && (
            <Card className="border-border bg-card">
              <CardContent className="p-6 flex flex-col gap-5">
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Tell us about your business
                </h2>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Business Name *
                  </label>
                  <Input
                    placeholder="e.g. Regal Frames Photography"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    data-ocid="vendor_reg.name_input"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => set("category", cat)}
                        className={`filter-pill text-xs ${form.category === cat ? "filter-pill-active" : "filter-pill-inactive"}`}
                        data-ocid={`vendor_reg.category.${cat}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    <MapPin className="w-3.5 h-3.5 inline mr-1" />
                    City *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => set("city", city)}
                        className={`filter-pill text-xs ${form.city === city ? "filter-pill-active" : "filter-pill-inactive"}`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                  {form.city === "Other" && (
                    <Input
                      placeholder="Enter your city"
                      value={form.customCity}
                      onChange={(e) => set("customCity", e.target.value)}
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-foreground">
                    Additional options
                  </label>
                  {[
                    { key: "isDestinationReady", label: "Available for destination/outstation weddings" },
                    { key: "multiDaySupport", label: "Can cover multi-day events (Haldi, Sangeet, Mehendi, Pheras)" },
                    { key: "whatsappActive", label: "Couples can contact me via WhatsApp" },
                  ].map(({ key, label }) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form[key as keyof FormData] as boolean}
                        onChange={(e) => set(key as keyof FormData, e.target.checked)}
                        className="rounded"
                      />
                      {label}
                    </label>
                  ))}
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground"
                  disabled={!canProceedStep1}
                  onClick={() => setStep(2)}
                  data-ocid="vendor_reg.next_step1"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── STEP 2: Details & Pricing ── */}
          {step === 2 && (
            <Card className="border-border bg-card">
              <CardContent className="p-6 flex flex-col gap-5">
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Describe your services
                </h2>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Description * (min 20 characters)
                  </label>
                  <Textarea
                    placeholder="Tell couples what makes your service special — your experience, style, specialties and what's included..."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    className="h-28 resize-none"
                    data-ocid="vendor_reg.description_input"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {form.description.length} chars
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    <IndianRupee className="w-3.5 h-3.5 inline mr-1" />
                    Starting Price (INR) *
                  </label>
                  <Input
                    placeholder={
                      form.category === "Caterer"
                        ? "e.g. 800 (per plate)"
                        : "e.g. 25000 (per event)"
                    }
                    value={form.startingPrice}
                    onChange={(e) => set("startingPrice", e.target.value)}
                    type="number"
                    min={0}
                    data-ocid="vendor_reg.price_input"
                  />
                  {form.category === "Caterer" && (
                    <p className="text-xs text-muted-foreground">
                      For caterers, enter per-plate price
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    <Phone className="w-3.5 h-3.5 inline mr-1" />
                    WhatsApp / Phone Number *
                  </label>
                  <Input
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    type="tel"
                    maxLength={13}
                    data-ocid="vendor_reg.phone_input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Only shared with couples after deal is confirmed through WedBridge
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Languages you work in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => toggleLanguage(lang)}
                        className={`filter-pill text-xs ${form.languages.includes(lang) ? "filter-pill-active" : "filter-pill-inactive"}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Tags (comma separated)
                  </label>
                  <Input
                    placeholder="e.g. candid, outdoor, drone, traditional"
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    data-ocid="vendor_reg.tags_input"
                  />
                  <p className="text-xs text-muted-foreground">
                    Helps couples find you through search
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    disabled={!canProceedStep2}
                    onClick={() => setStep(3)}
                    data-ocid="vendor_reg.next_step2"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── STEP 3: Plan & Submit ── */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <Card className="border-border bg-card">
                <CardContent className="p-6 flex flex-col gap-4">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Choose your plan
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    You can upgrade anytime. Start with Free and see how WedBridge works for you.
                  </p>

                  <div className="flex flex-col gap-3">
                    {PLANS.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => set("plan", plan.id)}
                        className={`w-full text-left rounded-xl border p-4 transition-all ${plan.color} ${
                          form.plan === plan.id
                            ? "ring-2 ring-primary"
                            : "hover:border-primary/40"
                        }`}
                        data-ocid={`vendor_reg.plan.${plan.id}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-foreground">
                              {plan.id}
                            </span>
                            {plan.badge && (
                              <Badge className="text-[10px] bg-primary/15 text-primary border-primary/20 px-1.5 py-0">
                                {plan.badge}
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {plan.price}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                          {plan.features.map((f) => (
                            <span
                              key={f}
                              className="text-xs text-muted-foreground"
                            >
                              · {f}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="border-border bg-card">
                <CardContent className="p-5 flex flex-col gap-3">
                  <h3 className="font-semibold text-foreground text-sm">
                    Your listing summary
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Business</span>
                    <span className="text-foreground font-medium">
                      {form.name}
                    </span>
                    <span className="text-muted-foreground">Category</span>
                    <span className="text-foreground">{form.category}</span>
                    <span className="text-muted-foreground">City</span>
                    <span className="text-foreground">
                      {form.city === "Other" ? form.customCity : form.city}
                    </span>
                    <span className="text-muted-foreground">Plan</span>
                    <span className="text-foreground">{form.plan}</span>
                  </div>
                </CardContent>
              </Card>

              {/* T&C */}
              <Card className="border-border bg-card">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/30 rounded-xl p-3">
                    <Shield className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">WedBridge T&C:</strong>{" "}
                      Your contact details are never shared with couples until a deal is confirmed. A{" "}
                      <strong className="text-foreground">2% commission</strong> is due on all bookings originated through WedBridge, including those settled outside the platform. Bypassing WedBridge after an introduction may result in legal action.
                    </span>
                  </div>

                  <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreeToTerms}
                      onChange={(e) => set("agreeToTerms", e.target.checked)}
                      className="rounded mt-0.5"
                      data-ocid="vendor_reg.agree_terms"
                    />
                    <span>
                      I agree to the WedBridge Terms & Conditions, including the commission and contact-release policy.
                    </span>
                  </label>

                  <div className="flex gap-3 mt-1">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      className="flex-1 bg-primary text-primary-foreground gap-2"
                      disabled={!canSubmit || submitting}
                      onClick={handleSubmit}
                      data-ocid="vendor_reg.submit"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Star className="w-4 h-4" />
                      )}
                      {submitting ? "Submitting…" : "List My Business"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: "Privacy protected" },
                  { icon: Users, text: "Real verified couples" },
                  { icon: CheckCircle, text: "Free to start" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col items-center gap-1 text-center p-3 rounded-xl bg-muted/30"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
