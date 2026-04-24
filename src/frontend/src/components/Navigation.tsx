import { cn } from "@/lib/utils";
import { useAuth } from "../hooks/useAuth";

interface NavItem {
  label: string;
  href: string;
  emoji: string;
  authRequired?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", emoji: "🏠" },
  { label: "BTS Lives", href: "/links/BTS_LIVE", emoji: "🎤" },
  { label: "BTS Songs", href: "/songs", emoji: "🎵" },
  { label: "K-Dramas", href: "/links/K_DRAMA", emoji: "🎬" },
  { label: "Fan Fiction", href: "/fanfiction", emoji: "📝" },
  { label: "Manhwas", href: "/links/MANHWA", emoji: "📚" },
  { label: "Feed", href: "/feed", emoji: "💬" },
  {
    label: "My Watchlist",
    href: "/watchlist",
    emoji: "🔖",
    authRequired: true,
  },
];

interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function Navigation({
  mobile = false,
  onNavigate,
}: NavigationProps) {
  const { isLoggedIn } = useAuth();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  const visibleItems = navItems.filter(
    (item) => !item.authRequired || isLoggedIn,
  );

  if (mobile) {
    return (
      <>
        {visibleItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            data-ocid={`nav.${item.label.toLowerCase().replace(/[\s]/g, "_")}_link`}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
              isActive(item.href)
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <span className="text-base">{item.emoji}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </>
    );
  }

  return (
    <>
      {visibleItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          data-ocid={`nav.${item.label.toLowerCase().replace(/[\s]/g, "_")}_link`}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap",
            isActive(item.href)
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          <span>{item.emoji}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </>
  );
}
