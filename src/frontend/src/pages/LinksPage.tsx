// BrowseVendorsPage — repurposed from LinksPage for WedBridge
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plane, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import VendorCard from "../components/VendorCard";
import { sampleVendors } from "../data/sampleData";
import type { VendorCategory } from "../types";

const ALL_CATEGORIES: VendorCategory[] = [
  "Photographer",
  "Videographer",
  "Decorator",
  "Caterer",
  "Mehendi Artist",
  "DJ",
  "Venue",
  "Bridal Makeup",
  "Pundit",
  "Choreographer",
  "Invitation Designer",
  "Dhol Player",
];

export default function BrowseVendorsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<VendorCategory | "ALL">(
    "ALL",
  );
  const [destinationOnly, setDestinationOnly] = useState(false);

  // Read initial category from URL query param
  useMemo(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("cat") as VendorCategory | null;
    if (cat && ALL_CATEGORIES.includes(cat)) setActiveCategory(cat);
  }, []);

  const filtered = useMemo(() => {
    return sampleVendors.filter((v) => {
      if (activeCategory !== "ALL" && v.category !== activeCategory)
        return false;
      if (destinationOnly && !v.isDestinationReady) return false;
      if (
        search &&
        !v.name.toLowerCase().includes(search.toLowerCase()) &&
        !v.category.toLowerCase().includes(search.toLowerCase()) &&
        !v.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
        return false;
      return true;
    });
  }, [search, activeCategory, destinationOnly]);

  return (
    <div className="pb-20 md:pb-0">
      {/* Page header */}
      <section className="bg-gradient-to-b from-primary/8 to-background py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Browse Vendors in Jaipur
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            All verified wedding vendors. Add your favourites to your Vendor
            Basket and compare before reaching out.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-30 bg-card border-b border-border shadow-subtle">
        <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search vendors, tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-muted/50 text-sm rounded-full"
              data-ocid="browse.search_input"
            />
          </div>

          {/* Category pills + destination toggle */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              type="button"
              onClick={() => setActiveCategory("ALL")}
              className={`filter-pill shrink-0 ${activeCategory === "ALL" ? "filter-pill-active" : "filter-pill-inactive"}`}
              data-ocid="browse.filter.all"
            >
              ✨ All
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? "ALL" : cat)
                }
                className={`filter-pill shrink-0 ${activeCategory === cat ? "filter-pill-active" : "filter-pill-inactive"}`}
                data-ocid={`browse.filter.${cat.toLowerCase().replace(/\s/g, "_")}`}
              >
                {cat}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setDestinationOnly(!destinationOnly)}
              className={`filter-pill shrink-0 flex items-center gap-1 ${destinationOnly ? "filter-pill-active" : "filter-pill-inactive"}`}
              data-ocid="browse.filter.destination"
            >
              <Plane className="w-3 h-3" />
              Travel Ready
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filtered.length} vendor{filtered.length !== 1 ? "s" : ""} found
              {activeCategory !== "ALL" && (
                <span className="ml-1">
                  in{" "}
                  <Badge
                    variant="secondary"
                    className="text-xs bg-primary/15 text-primary border-primary/20"
                  >
                    {activeCategory}
                    <button
                      type="button"
                      onClick={() => setActiveCategory("ALL")}
                      className="ml-1"
                      aria-label="Clear category filter"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </Badge>
                </span>
              )}
            </p>
            {destinationOnly && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDestinationOnly(false)}
                className="text-xs text-muted-foreground h-7 gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </Button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    data-ocid={`browse.vendor_card.${vendor.id}`}
                  >
                    <a href={`/vendors/${vendor.id}`}>
                      <VendorCard vendor={vendor} />
                    </a>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-4 text-center"
                data-ocid="browse.empty_state"
              >
                <span className="text-5xl">🔍</span>
                <h3 className="font-display font-semibold text-foreground text-lg">
                  No vendors found
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Try adjusting your filters or search term. More vendors are
                  onboarding every week.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("ALL");
                    setDestinationOnly(false);
                  }}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
