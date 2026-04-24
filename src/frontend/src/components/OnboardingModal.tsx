import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useState } from "react";
import { ContentLanguage } from "../backend";
import { useBackend } from "../hooks/useBackend";
import type { FandomType } from "../types";

interface OnboardingModalProps {
  onComplete: () => void;
  onSkip: () => void;
}

const FANDOM_OPTIONS: FandomType[] = [
  "BTS ARMY",
  "Other ARMY",
  "K-pop Fan",
  "Other",
];

const LANGUAGE_OPTIONS: { label: string; value: ContentLanguage }[] = [
  { label: "English", value: ContentLanguage.English },
  { label: "French", value: ContentLanguage.French },
  { label: "Hindi", value: ContentLanguage.Hindi },
  { label: "Korean", value: ContentLanguage.Korean },
  { label: "Spanish", value: ContentLanguage.Spanish },
];

const COUNTRY_OPTIONS = [
  "USA",
  "South Korea",
  "India",
  "France",
  "Mexico",
  "Brazil",
  "UK",
  "Canada",
  "Australia",
  "Japan",
  "Philippines",
  "Indonesia",
  "Other",
];

export default function OnboardingModal({
  onComplete,
  onSkip,
}: OnboardingModalProps) {
  const { actor } = useBackend();
  const [country, setCountry] = useState("");
  const [fandom, setFandom] = useState<FandomType>("BTS ARMY");
  const [preferredLanguage, setPreferredLanguage] = useState<ContentLanguage>(
    ContentLanguage.English,
  );
  const [subtitlePreference, setSubtitlePreference] = useState(false);
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
        country || null,
        fandom || null,
        preferredLanguage,
        subtitlePreference,
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
          <div className="text-3xl mb-2">💜</div>
          <h2
            id="onboarding-title"
            className="text-2xl font-display font-bold text-primary-foreground mb-1"
          >
            Welcome to ARMY Hub
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            Welcome to a digital platform dedicated to BTS fan community, upon
            the first login.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Country */}
          <div className="onboarding-field">
            <Label htmlFor="country" className="onboarding-label">
              🌍 Country
            </Label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="onboarding-input"
              data-ocid="onboarding.country_select"
            >
              <option value="">Select your Country</option>
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Fandom */}
          <fieldset className="onboarding-field border-0 p-0 m-0">
            <legend className="onboarding-label mb-2">💜 Fandom Choice</legend>
            <div className="flex flex-wrap gap-2">
              {FANDOM_OPTIONS.map((option) => (
                <label key={option} className="cursor-pointer">
                  <input
                    type="radio"
                    name="fandom"
                    value={option}
                    checked={fandom === option}
                    onChange={() => setFandom(option)}
                    className="sr-only"
                    data-ocid={`onboarding.fandom_${option.toLowerCase().replace(/\s/g, "_")}_radio`}
                  />
                  <span
                    className={`filter-pill select-none ${fandom === option ? "filter-pill-active" : "filter-pill-inactive"}`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Preferred Language */}
          <div className="onboarding-field">
            <Label htmlFor="language" className="onboarding-label">
              🌐 Language Preference
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

          {/* Subtitle Preference */}
          <div className="onboarding-field">
            <span className="onboarding-label">📺 Subtitle Toggle</span>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Enable Subtitles
                </p>
                <p className="text-xs text-muted-foreground">
                  Show CC badge on content by default 📄
                </p>
              </div>
              <Switch
                id="subtitle-preference"
                checked={subtitlePreference}
                onCheckedChange={setSubtitlePreference}
                data-ocid="onboarding.subtitle_switch"
                aria-label="Enable subtitle preference"
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
              {isSubmitting ? "Saving…" : "Get Started! 💜"}
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
