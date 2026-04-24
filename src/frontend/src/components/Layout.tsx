import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import Header from "./Header";
import OnboardingModal from "./OnboardingModal";

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

export default function Layout({ children, onSearch }: LayoutProps) {
  const { isLoggedIn, principal } = useAuth();
  const { actor } = useBackend();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  // Check if onboarding is needed
  useEffect(() => {
    if (!isLoggedIn || !actor || !principal) return;
    let cancelled = false;
    actor
      .getProfile(principal)
      .then((profile) => {
        if (cancelled) return;
        if (profile && !profile.profileCompleted) {
          setShowOnboarding(true);
        }
      })
      .catch(() => {
        // profile not found — also show onboarding
        if (!cancelled) setShowOnboarding(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, actor, principal]);

  const handleOnboardingComplete = () => setShowOnboarding(false);
  const handleOnboardingSkip = () => setShowOnboarding(false);

  const bottomNavItems = [
    { href: "/", emoji: "🏠", label: "Home" },
    { href: "/links/BTS_LIVE", emoji: "🎤", label: "Lives" },
    { href: "/songs", emoji: "🎵", label: "Songs" },
    { href: "/fanfiction", emoji: "📝", label: "Fics" },
    ...(isLoggedIn
      ? [{ href: "/watchlist", emoji: "🔖", label: "Watchlist" }]
      : [{ href: "/feed", emoji: "💬", label: "Feed" }]),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={onSearch} />

      {/* Main content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Bottom navigation for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-2 pb-safe">
        <div className="flex items-center justify-around h-14">
          {bottomNavItems.map((item) => {
            const currentPath =
              typeof window !== "undefined" ? window.location.pathname : "/";
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                data-ocid={`bottom_nav.${item.label.toLowerCase()}_link`}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-smooth ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="text-lg leading-none">{item.emoji}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <footer className="block bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-display font-semibold text-foreground">
              ARMY<span className="text-primary">Hub</span>
            </span>
            <span className="text-muted-foreground text-xs">
              — One Place for All Things BTS 💜
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {year}. Built with love using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </div>
  );
}
