import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { ContentLanguage } from "../backend";
import { useBackend } from "../hooks/useBackend";
import type { FandomType } from "../types";

interface OnboardingModalProps {
  onComplete: () => void;
  onSkip: () => void;
}

const USER_TYPE_OPTIONS: FandomType[] = [
  "Couple",
  "Vendor",
  "Planner",
  "Other",
];

const LANGUAGE_OPTIONS: { label: string; value: ContentLanguage }[] = [
  { label: "Hindi", value: ContentLanguage.Hindi },
  { label: "English", value: ContentLanguage.English },
];

const CITY_OPTIONS = [
  "Jaipur",
  "Delhi / NCR",
  "Mumbai",
  "Pune",
  "Chandigarh",
  "Lucknow",
  "Surat",
  "Ahmedabad",
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Outside India",
  "Other",
];

export default function OnboardingModal({
  onComplete,
  onSkip,
}: OnboardingModalProps) {
  const { actor } = useBackend();
  const [city, setCity] = useState("");
  const [userType, setUserType] = useState<FandomType>("Couple");
  const [preferredLanguage, setPreferredLanguage] = useState<ContentLanguage>(
    ContentLanguage.Hindi,
  );
  const [wantsNotifications, setWantsNotifications] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBackdropKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onSkip();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setIsSubmitting(true);
    try {
      await actor.setOnboarding(
        city || null,
        userType || null,
        preferredLanguage,
        wantsNotifications,
      );
      onComplete();
    } catch {
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      open
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none max-h-none m-0"
      aria-labelledby="onboarding-title"
      data-ocid="onboarding.dialog"
    >
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm cursor-default"
        onClick={onSkip}
        onKeyUp={handleBackdropKey}
        aria-label="Close onboarding"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-elevated border border-border modal-enter overflow-hidden">
        {/* Header */}
        <div className="gradient-purple p-6 text-center relative">
          <button
            type="button"
            onClick={onSkip}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-smooth text-primary-foreground"
            aria-label="Skip onboarding"
            data-ocid="onboarding.close_button"
          >
            <X className="w-4 h-4" />
          </button>
          <Heart className="w-8 h-8 text-primary-foreground/90 mx-auto mb-2" />
          <h2
            id="onboarding-title"
            className="text-2xl font-display font-bold text-primary-foreground mb-1"
          >
            Welcome to WedBridge
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            Tell us a little about yourself so we can personalise your
            experience.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* City */}
          <div className="onboarding-field">
            <Label htmlFor="city" className="onboarding-label">
              📍 Your City
            </Label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="onboarding-input"
              data-ocid="onboarding.city_select"
            >
              <option value="">Select your city</option>
              {CITY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* User type */}
          <fieldset className="onboarding-field border-0 p-0 m-0">
            <legend className="onboarding-label mb-2">💍 I am a…</legend>
            <div className="flex flex-wrap gap-2">
              {USER_TYPE_OPTIONS.map((option) => (
                <label key={option} className="cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value={option}
                    checked={userType === option}
                    onChange={() => setUserType(option)}
                    className="sr-only"
                    data-ocid={`onboarding.usertype_${option.toLowerCase()}_radio`}
                  />
                  <span
                    className={`filter-pill select-none ${userType === option ? "filter-pill-active" : "filter-pill-inactive"}`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Language */}
          <div className="onboarding-field">
            <Label htmlFor="language" className="onboarding-label">
              🌐 Preferred Language
            </Label>
            <select
              id="language"
              value={preferredLanguage}
              onChange={(e) =>
                setPreferredLanguage(e.target.value as ContentLanguage)
              }
              className="onboarding-input"
              data-ocid="onboarding.language_select"
            >
              {LANGUAGE_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* WhatsApp notifications */}
          <div className="onboarding-field">
            <span className="onboarding-label">📱 WhatsApp Updates</span>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Enable vendor notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Get instant WhatsApp alerts when vendors respond
                </p>
              </div>
              <Switch
                id="notifications"
                checked={wantsNotifications}
                onCheckedChange={setWantsNotifications}
                data-ocid="onboarding.notifications_switch"
                aria-label="Enable WhatsApp notifications"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="submit"
              className="w-full gradient-purple text-primary-foreground font-semibold py-3 rounded-xl transition-smooth"
              disabled={isSubmitting}
              data-ocid="onboarding.submit_button"
            >
              {isSubmitting ? "Saving…" : "Get Started 💍"}
            </Button>
            <button
              type="button"
              onClick={onSkip}
              className="text-sm text-muted-foreground hover:text-foreground transition-smooth underline-offset-2 hover:underline"
              data-ocid="onboarding.skip_button"
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
