import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Heart, Instagram, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

interface OnboardingModalProps {
  onComplete: () => void;
  onSkip: () => void;
}

const USER_TYPE_OPTIONS = ["Couple", "Vendor", "Planner", "Other"] as const;
type UserType = (typeof USER_TYPE_OPTIONS)[number];

const CITY_OPTIONS = [
  // North India
  "Delhi / NCR", "Jaipur", "Chandigarh", "Lucknow", "Amritsar", "Ludhiana",
  "Varanasi", "Agra", "Dehradun", "Jodhpur", "Udaipur", "Meerut", "Jammu",
  // East India
  "Siliguri", "Kolkata", "Patna", "Ranchi", "Bhubaneswar", "Guwahati",
  "Jamshedpur", "Durgapur",
  // West India
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Surat", "Ahmedabad",
  "Vadodara", "Rajkot", "Indore", "Bhopal", "Raipur",
  // South India
  "Hyderabad", "Bengaluru", "Chennai", "Kochi", "Coimbatore", "Mysuru",
  "Visakhapatnam", "Madurai",
  // Destination / Special
  "Goa", "Rishikesh", "Mussoorie",
  "Outside India", "Other",
];

const GUEST_RANGES = ["Under 50", "50–150", "150–300", "300–500", "500+"] as const;
const BUDGET_RANGES = [
  { label: "₹5–10 Lakh", min: 500000, max: 1000000 },
  { label: "₹10–25 Lakh", min: 1000000, max: 2500000 },
  { label: "₹25–50 Lakh", min: 2500000, max: 5000000 },
  { label: "₹50L–1 Cr", min: 5000000, max: 10000000 },
  { label: "₹1 Cr+", min: 10000000, max: 99999999 },
] as const;
const WEDDING_STYLES = [
  { label: "Royal & Traditional", emoji: "🏰" },
  { label: "Modern & Minimal", emoji: "✨" },
  { label: "Bohemian Garden", emoji: "🌿" },
  { label: "Destination / Beach", emoji: "🌊" },
  { label: "Intimate & Cosy", emoji: "🕯️" },
] as const;
const WEDDING_EVENTS = [
  "Mehendi", "Haldi", "Sangeet", "Baraat", "Pheras / Ceremony",
  "Reception", "Tilak", "Engagement", "Pre-Wedding Shoot",
] as const;

export default function OnboardingModal({ onComplete, onSkip }: OnboardingModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 — About you
  const [userType, setUserType] = useState<UserType>("Couple");
  const [city, setCity] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("Hindi");

  // Step 2 — Wedding details
  const [weddingDate, setWeddingDate] = useState("");
  const [guestRange, setGuestRange] = useState<string>("");
  const [budgetIdx, setBudgetIdx] = useState<number | null>(null);
  const [weddingStyle, setWeddingStyle] = useState("");
  const [eventsNeeded, setEventsNeeded] = useState<string[]>([]);

  // Step 3 — Social profiles
  const [instagram, setInstagram] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [facebook, setFacebook] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [wantsWhatsapp, setWantsWhatsapp] = useState(true);

  const toggleEvent = (ev: string) =>
    setEventsNeeded((prev) =>
      prev.includes(ev) ? prev.filter((e) => e !== ev) : [...prev, ev]
    );

  const handleBackdropKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onSkip();
  };

  const handleSubmit = async () => {
    if (!user || !supabase) { onComplete(); return; }
    setIsSubmitting(true);
    const budget = budgetIdx !== null ? BUDGET_RANGES[budgetIdx] : null;
    try {
      await supabase.from("couples").upsert(
        {
          principal: user.id,
          display_name:
            user.user_metadata?.display_name ||
            user.email?.split("@")[0] ||
            userType,
          city: city || null,
          preferred_languages: [preferredLanguage],
          wedding_date: weddingDate || null,
          guest_count: guestRange
            ? parseInt(guestRange.replace(/\D.*/, "")) || null
            : null,
          budget_min: budget?.min ?? null,
          budget_max: budget?.max ?? null,
          wedding_style: weddingStyle || null,
          events_needed: eventsNeeded.length > 0 ? eventsNeeded : null,
          instagram_handle: instagram.trim().replace(/^@/, "") || null,
          pinterest_url: pinterest.trim() || null,
          facebook_url: facebook.trim() || null,
          wedding_hashtag: hashtag.trim().replace(/^#/, "") || null,
          wants_whatsapp_updates: wantsWhatsapp,
        },
        { onConflict: "principal" },
      );
      onComplete();
    } catch {
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  const STEPS = ["About You", "Your Wedding", "Social Profiles"];
  const isCouple = userType === "Couple" || userType === "Planner";

  return (
    <dialog
      open
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none m-0"
      aria-labelledby="onboarding-title"
      data-ocid="onboarding.dialog"
    >
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default"
        onClick={onSkip}
        onKeyUp={handleBackdropKey}
        aria-label="Close onboarding"
      />

      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-elevated border border-border modal-enter overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="gradient-purple p-5 text-center relative shrink-0">
          <button
            type="button"
            onClick={onSkip}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-smooth text-primary-foreground"
            aria-label="Skip"
            data-ocid="onboarding.close_button"
          >
            <X className="w-4 h-4" />
          </button>
          <Heart className="w-7 h-7 text-primary-foreground/90 mx-auto mb-1.5" />
          <h2 id="onboarding-title" className="text-xl font-display font-bold text-primary-foreground mb-1">
            Welcome to VowVoyage
          </h2>
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5 transition-smooth ${
                  i + 1 === step
                    ? "bg-white text-primary"
                    : i + 1 < step
                    ? "bg-white/40 text-primary-foreground"
                    : "bg-white/20 text-primary-foreground/60"
                }`}>
                  <span>{i + 1 < step ? "✓" : i + 1}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 h-px ${i + 1 < step ? "bg-white/60" : "bg-white/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">

          {/* ── STEP 1: About You ── */}
          {step === 1 && (
            <>
              <div className="onboarding-field">
                <Label htmlFor="city" className="onboarding-label">📍 Your City</Label>
                <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="onboarding-input" data-ocid="onboarding.city_select">
                  <option value="">Select your city</option>
                  {CITY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <fieldset className="onboarding-field border-0 p-0 m-0">
                <legend className="onboarding-label mb-2">💍 I am a…</legend>
                <div className="flex flex-wrap gap-2">
                  {USER_TYPE_OPTIONS.map((option) => (
                    <label key={option} className="cursor-pointer">
                      <input type="radio" name="userType" value={option} checked={userType === option} onChange={() => setUserType(option)} className="sr-only" />
                      <span className={`filter-pill select-none ${userType === option ? "filter-pill-active" : "filter-pill-inactive"}`}>{option}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="onboarding-field">
                <Label htmlFor="language" className="onboarding-label">🌐 Preferred Language</Label>
                <select id="language" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)} className="onboarding-input">
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Marwari">Marwari</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Gujarati">Gujarati</option>
                </select>
              </div>
            </>
          )}

          {/* ── STEP 2: Wedding Details ── */}
          {step === 2 && isCouple && (
            <>
              <div className="onboarding-field">
                <Label htmlFor="wdate" className="onboarding-label">📅 Wedding Date (approx. is fine)</Label>
                <Input id="wdate" type="month" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="onboarding-input h-9 text-sm" />
              </div>

              <fieldset className="onboarding-field border-0 p-0 m-0">
                <legend className="onboarding-label mb-2">👥 Expected Guest Count</legend>
                <div className="flex flex-wrap gap-2">
                  {GUEST_RANGES.map((r) => (
                    <label key={r} className="cursor-pointer">
                      <input type="radio" name="guests" value={r} checked={guestRange === r} onChange={() => setGuestRange(r)} className="sr-only" />
                      <span className={`filter-pill select-none ${guestRange === r ? "filter-pill-active" : "filter-pill-inactive"}`}>{r}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="onboarding-field border-0 p-0 m-0">
                <legend className="onboarding-label mb-2">💰 Total Wedding Budget</legend>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_RANGES.map((b, i) => (
                    <label key={b.label} className="cursor-pointer">
                      <input type="radio" name="budget" checked={budgetIdx === i} onChange={() => setBudgetIdx(i)} className="sr-only" />
                      <span className={`filter-pill select-none ${budgetIdx === i ? "filter-pill-active" : "filter-pill-inactive"}`}>{b.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="onboarding-field border-0 p-0 m-0">
                <legend className="onboarding-label mb-2">🎨 Wedding Vibe / Style</legend>
                <div className="flex flex-wrap gap-2">
                  {WEDDING_STYLES.map(({ label, emoji }) => (
                    <label key={label} className="cursor-pointer">
                      <input type="radio" name="style" value={label} checked={weddingStyle === label} onChange={() => setWeddingStyle(label)} className="sr-only" />
                      <span className={`filter-pill select-none ${weddingStyle === label ? "filter-pill-active" : "filter-pill-inactive"}`}>{emoji} {label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="onboarding-field border-0 p-0 m-0">
                <legend className="onboarding-label mb-2">🎉 Events You Need Vendors For</legend>
                <div className="flex flex-wrap gap-2">
                  {WEDDING_EVENTS.map((ev) => (
                    <label key={ev} className="cursor-pointer">
                      <input type="checkbox" checked={eventsNeeded.includes(ev)} onChange={() => toggleEvent(ev)} className="sr-only" />
                      <span className={`filter-pill select-none ${eventsNeeded.includes(ev) ? "filter-pill-active" : "filter-pill-inactive"}`}>{ev}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {step === 2 && !isCouple && (
            <div className="text-center py-6 text-muted-foreground text-sm">
              <p className="mb-1">Wedding details are tailored for couples & planners.</p>
              <p>Click <strong>Next</strong> to connect your social profiles.</p>
            </div>
          )}

          {/* ── STEP 3: Social Profiles ── */}
          {step === 3 && (
            <>
              <p className="text-xs text-muted-foreground leading-relaxed -mt-1 mb-1">
                Share your social profiles so vendors can get inspired by your aesthetic, and the community can follow your journey. All fields are optional.
              </p>

              <div className="onboarding-field">
                <Label htmlFor="ig" className="onboarding-label flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" /> Instagram Handle
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">@</span>
                  <Input id="ig" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="yourhandle" className="pl-7 text-sm h-9" />
                </div>
              </div>

              <div className="onboarding-field">
                <Label htmlFor="ht" className="onboarding-label">💍 Wedding Hashtag</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">#</span>
                  <Input id="ht" value={hashtag} onChange={(e) => setHashtag(e.target.value)} placeholder="RahulWedsPriya2026" className="pl-7 text-sm h-9" />
                </div>
              </div>

              <div className="onboarding-field">
                <Label htmlFor="pin" className="onboarding-label">
                  <span className="text-red-500 font-bold">P</span> Pinterest Profile / Board URL
                </Label>
                <Input id="pin" value={pinterest} onChange={(e) => setPinterest(e.target.value)} placeholder="https://pinterest.com/yourboards" className="text-sm h-9" />
              </div>

              <div className="onboarding-field">
                <Label htmlFor="fb" className="onboarding-label">
                  <span className="text-blue-600 font-bold">f</span> Facebook Page or Profile URL
                </Label>
                <Input id="fb" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/yourpage" className="text-sm h-9" />
              </div>

              <div className="onboarding-field">
                <span className="onboarding-label">📱 WhatsApp Updates</span>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Vendor notifications via WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Get instant alerts when vendors respond to your inquiries</p>
                  </div>
                  <Switch checked={wantsWhatsapp} onCheckedChange={setWantsWhatsapp} aria-label="Enable WhatsApp notifications" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="shrink-0 px-6 pb-6 pt-3 flex flex-col gap-2 border-t border-border">
          {step < 3 ? (
            <Button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="w-full gradient-purple text-primary-foreground font-semibold"
            >
              Next →
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full gradient-purple text-primary-foreground font-semibold"
              disabled={isSubmitting}
              data-ocid="onboarding.submit_button"
            >
              {isSubmitting ? "Saving…" : "Get Started 💍"}
            </Button>
          )}
          <div className="flex items-center justify-between">
            {step > 1 ? (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
                ← Back
              </button>
            ) : <span />}
            <button type="button" onClick={onSkip} className="text-xs text-muted-foreground hover:text-foreground transition-smooth underline-offset-2 hover:underline" data-ocid="onboarding.skip_button">
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
