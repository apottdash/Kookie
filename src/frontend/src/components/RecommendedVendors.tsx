import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";
import { useRecommendations } from "../hooks/useRecommendations";
import type { VendorCategory } from "../types";
import VendorCard from "./VendorCard";

interface RecommendedVendorsProps {
  excludeId?: number;
  browsingCategory?: VendorCategory;
  browsingCity?: string;
  show?: ("forYou" | "similar" | "crossCategory")[];
  limit?: number;
}

export default function RecommendedVendors({
  excludeId,
  browsingCategory,
  browsingCity,
  show = ["forYou", "similar", "crossCategory"],
  limit = 6,
}: RecommendedVendorsProps) {
  const { isLoggedIn } = useAuth();
  const { forYou, similar, crossCategory, loading } = useRecommendations({
    excludeId,
    browsingCategory,
    browsingCity,
    limit,
  });

  const showForYou = show.includes("forYou") && forYou.length > 0;
  const showSimilar = show.includes("similar") && similar.length > 0;
  const showCross = show.includes("crossCategory") && crossCategory.length > 0;

  if (loading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["r1", "r2", "r3"].map((k) => (
              <div key={k} className="h-64 rounded-2xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!showForYou && !showSimilar && !showCross) return null;

  return (
    <>
      {showForYou && (
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between mb-6 gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {isLoggedIn ? "Recommended for You" : "Trending Picks"}
                </h2>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {isLoggedIn
                    ? "Matched to your budget, city and style"
                    : "Popular vendors across India this season"}
                </p>
              </div>
              <a
                href="/vendors"
                className="text-primary text-sm hover:underline flex items-center gap-1 shrink-0 mt-1"
              >
                Browse all <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {forYou.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a href={`/vendors/${v.id}`}>
                    <VendorCard vendor={v} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showSimilar && (
        <section className="py-10 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-5 gap-4">
              <h2 className="font-display font-bold text-xl text-foreground">
                Similar {browsingCategory}s
              </h2>
              <a
                href={`/vendors?cat=${encodeURIComponent(browsingCategory ?? "")}`}
                className="text-primary text-sm hover:underline flex items-center gap-1 shrink-0"
              >
                See all <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similar.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a href={`/vendors/${v.id}`}>
                    <VendorCard vendor={v} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showCross &&
        crossCategory.map(({ category, vendors }) => (
          <section key={category} className="py-10 border-t border-border/40">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-5 gap-4">
                <div>
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Couples also booked a {category}
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Popular pairings with {browsingCategory}s
                  </p>
                </div>
                <a
                  href={`/vendors?cat=${encodeURIComponent(category)}`}
                  className="text-primary text-sm hover:underline flex items-center gap-1 shrink-0"
                >
                  See all <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendors.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <a href={`/vendors/${v.id}`}>
                      <VendorCard vendor={v} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}
    </>
  );
}
