import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Link,
  LogIn,
  LogOut,
  Menu,
  Search,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Navigation from "./Navigation";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const { isLoggedIn, login, logout, principalText } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const avatarInitials = principalText
    ? principalText.slice(0, 2).toUpperCase()
    : "??";

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          data-ocid="header.logo_link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-smooth">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight hidden sm:block">
            ARMY<span className="text-primary">Hub</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 flex-1 ml-4"
          data-ocid="header.desktop_nav"
        >
          <Navigation />
        </nav>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex items-center relative max-w-xs w-full"
        >
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search links, posts…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-muted/50 border-border text-sm rounded-full"
            data-ocid="header.search_input"
          />
        </form>

        {/* Auth Button */}
        <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <a
                href={`/profile/${principalText}`}
                data-ocid="header.profile_link"
              >
                <Avatar className="w-8 h-8 border-2 border-primary/40 cursor-pointer hover:border-primary transition-smooth">
                  <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                    {avatarInitials}
                  </AvatarFallback>
                </Avatar>
              </a>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="hidden sm:flex items-center gap-1 text-muted-foreground hover:text-foreground"
                data-ocid="header.logout_button"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs">Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={login}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 rounded-full transition-smooth"
              data-ocid="header.login_button"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Connect</span>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden w-8 h-8"
              data-ocid="header.mobile_menu_button"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 bg-card p-0"
            data-ocid="header.mobile_menu_sheet"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 p-4 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-display font-bold text-lg">
                  ARMY<span className="text-primary">Hub</span>
                </span>
              </div>

              {/* Mobile Search */}
              <form
                onSubmit={handleSearch}
                className="p-4 border-b border-border"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-muted/50"
                    data-ocid="header.mobile_search_input"
                  />
                </div>
              </form>

              {/* Mobile Nav */}
              <nav className="flex flex-col p-4 gap-1 flex-1">
                <Navigation
                  mobile
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </nav>

              {/* Mobile Auth */}
              <div className="p-4 border-t border-border">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/40">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground font-mono truncate">
                        {principalText?.slice(0, 20)}…
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={logout}
                      className="w-full gap-2"
                      data-ocid="header.mobile_logout_button"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={login}
                    className="w-full bg-primary text-primary-foreground gap-2"
                    data-ocid="header.mobile_login_button"
                  >
                    <LogIn className="w-4 h-4" />
                    Connect with Internet Identity
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
