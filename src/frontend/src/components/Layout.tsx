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
        if (!cancelled) setShowOnboarding(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, actor, principal]);

  const handleOnboardingComplete = () => setShowOnboarding(false);
  const handleOnboardingSkip = () => setShowOnboarding(false);

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const bottomNavItems = [
    { href: "/", emoji: "🏠", label: "Home" },
    { href: "/vendors", emoji: "🔍", label: "Browse" },
    { href: "/basket", emoji: "🛒", label: "Basket" },
    { href: "/destinations", emoji: "🏰", label: "Destinations" },
    { href: "/feed", emoji: "💬", label: "Community" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={onSearch} />

      <main className="flex-1 w-full">{children}</main>

      {/* Bottom navigation for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-2 pb-safe">
        <div className="flex items-center justify-around h-14">
          {bottomNavItems.map((item) => {
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
      <footer className="block bg-card border-t border-border mt-auto mb-14 md:mb-0">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  W
                </div>
                <span className="font-display font-bold text-base text-foreground">
                  Wed<span className="text-primary">Bridge</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                India's trusted wedding vendor marketplace. Connecting couples
                and vendors with transparency, fairness, and the Vendor Basket.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">
                For Couples
              </p>
              <ul className="space-y-1">
                {[
                  ["Browse Vendors", "/vendors"],
                  ["Vendor Basket", "/basket"],
                  ["Destination Weddings", "/destinations"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-xs text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">
                For Vendors
              </p>
              <ul className="space-y-1">
                {[
                  ["List Your Services", "/vendors"],
                  ["Community", "/feed"],
                  ["Sign In", "#"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-xs text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">
              © {year} WedBridge — Fair. Transparent. Trusted.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with{" "}
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
        </div>
      </footer>

      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </div>
  );
}
