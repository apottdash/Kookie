import { cn } from "@/lib/utils";
import { useAuth } from "../hooks/useAuth";
import { useBasket } from "../hooks/useBasket";

interface NavItemDef {
  label: string;
  href: string;
  emoji: string;
  authRequired?: boolean;
}

const navItems: NavItemDef[] = [
  { label: "Home", href: "/", emoji: "🏠" },
  { label: "Browse Vendors", href: "/vendors", emoji: "🔍" },
  { label: "Destinations", href: "/destinations", emoji: "🏰" },
  { label: "Plans", href: "/pricing", emoji: "💎" },
  { label: "Community", href: "/feed", emoji: "💬" },
  { label: "My Shortlist", href: "/basket", emoji: "🛒", authRequired: false },
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
  const { items } = useBasket();
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
            {item.href === "/basket" && items.length > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
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
            "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth whitespace-nowrap",
            isActive(item.href)
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
          )}
        >
          <span>{item.emoji}</span>
          <span>{item.label}</span>
          {item.href === "/basket" && items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {items.length}
            </span>
          )}
        </a>
      ))}
    </>
  );
}
