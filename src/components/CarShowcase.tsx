import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cars, carTypes, type Car } from "@/data/cars";
import CarCard from "./CarCard";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/seo/seoConfig";

export interface CarShowcaseProps {
  /** When set, filters and grid use this list (e.g. VIP fleet subset). Defaults to the full catalog. */
  sourceCars?: Car[];
  /** Max cars to show (e.g. 6 on home). */
  limit?: number;
  /** Larger cards; `vip` = 2-column grid on the VIP fleet page. */
  cardSize?: "default" | "large" | "vip";
  /** Home: promo line on the left, category pills + Open VIP Fleet on the right. */
  showPromoToolbar?: boolean;
  /** Optional section id (e.g. `vip-fleet-grid` on VIP page). */
  sectionId?: string;
  /** VIP: search + category pills on one row (search left, filters right). */
  toolbarLayout?: "default" | "split";
  /** Controlled search (used with `toolbarLayout="split"`). */
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Hide the marketing heading block (VIP page uses hero copy instead). */
  showSectionHeader?: boolean;
  /** Hide category pill row; keep search when using split toolbar. */
  showCategoryPills?: boolean;
  /** Visual style for type pills (`vipFleet` = red active + dark bordered inactive, search toolbar right). */
  categoryPillVariant?: "default" | "vipFleet";
}

const CarShowcase = ({
  sourceCars,
  limit,
  cardSize = "default",
  showPromoToolbar = false,
  sectionId,
  toolbarLayout = "default",
  searchQuery = "",
  onSearchChange,
  searchPlaceholder,
  showSectionHeader = true,
  showCategoryPills = true,
  categoryPillVariant = "default",
}: CarShowcaseProps = {}) => {
  const { t } = useTranslation();
  const effectiveSearchPlaceholder =
    searchPlaceholder ??
    (toolbarLayout === "split"
      ? t("carShowcase.searchPlaceholderVip")
      : t("carShowcase.searchPlaceholder"));

  const list = useMemo(() => {
    const base = sourceCars ?? cars;
    return limit != null ? base.slice(0, limit) : base;
  }, [sourceCars, limit]);

  const filterTypes = useMemo(() => {
    const present = new Set(list.map((c) => c.type));
    return carTypes.filter((t) => t === "all" || present.has(t));
  }, [list]);

  const [activeType, setActiveType] = useState<string>("all");

  const filtered = useMemo(() => {
    return activeType === "all" ? list : list.filter((c) => c.type === activeType);
  }, [list, activeType]);

  const typeLabel = (type: string) =>
    type === "all" ? t("carShowcase.allCars") : type.charAt(0).toUpperCase() + type.slice(1);

  const filterButtons = (
    <>
      {filterTypes.map((type) => (
        <motion.button
          key={type}
          type="button"
          onClick={() => setActiveType(type)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
            categoryPillVariant === "vipFleet"
              ? activeType === type
                ? "border border-transparent bg-primary text-primary-foreground shadow-[0_0_22px_hsl(351_96%_44%/0.25)]"
                : "border border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
              : activeType === type
                ? "bg-primary text-primary-foreground neon-glow"
                : "border border-border bg-muted/20 text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {typeLabel(type)}
        </motion.button>
      ))}
    </>
  );

  const gridClass =
    cardSize === "vip"
      ? "mx-auto max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      : cardSize === "large"
        ? "mx-auto max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <section
      className={cn("relative py-24", sectionId && "scroll-mt-24")}
      id={sectionId}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        {showSectionHeader ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{t("carShowcase.badgeAi")}</span>
            </div>
            <h2 className="mb-4 font-display text-4xl font-bold md:text-6xl">
              <span className="text-foreground">{t("carShowcase.titleFind")} </span>
              <span className="bg-gradient-to-r from-primary to-neon-violet bg-clip-text text-transparent">
                {t("carShowcase.titleRide")}
              </span>
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">{t("carShowcase.subtitle")}</p>
          </motion.div>
        ) : null}

        {toolbarLayout === "split" && onSearchChange ? (
          <div className={cn("space-y-3", showSectionHeader ? "mb-10" : "mb-12")}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="min-w-0 flex-1 lg:max-w-xl">
                <label className="sr-only" htmlFor="vip-fleet-search">
                  {t("carShowcase.searchVehicles")}
                </label>
                <div className="flex items-center gap-3 rounded-full border border-border bg-muted/25 px-4 py-2.5 shadow-sm">
                  <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                  <input
                    id="vip-fleet-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={effectiveSearchPlaceholder}
                    autoComplete="off"
                    className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              {showCategoryPills ? (
                <div
                  className={cn(
                    "flex flex-shrink-0 flex-wrap items-center justify-start gap-2 lg:justify-end",
                    categoryPillVariant === "vipFleet" && "gap-2.5",
                  )}
                >
                  {filterButtons}
                </div>
              ) : null}
            </div>
            {searchQuery.trim() !== "" && (
              <p className="text-center text-sm text-muted-foreground lg:text-left">
                {filtered.length === 0
                  ? "No vehicles match your search."
                  : `${filtered.length} vehicle${filtered.length === 1 ? "" : "s"} found`}
              </p>
            )}
          </div>
        ) : showPromoToolbar ? (
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <p className="max-w-xl text-center text-sm text-muted-foreground lg:text-left md:text-base">
              {t("carShowcase.promo")}{" "}
              <span className="font-medium text-foreground">{t("carShowcase.promoVip")}</span>{" "}
              {t("carShowcase.promoEnd")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-end">
              {filterButtons}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={ROUTES.fleet}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground neon-glow md:px-6 md:py-3"
                >
                  {t("carShowcase.openVip")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="mb-12 flex flex-wrap justify-center gap-2">{filterButtons}</div>
        )}

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeType}-${searchQuery}-${filtered.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("grid", gridClass)}
          >
            {filtered.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} size={cardSize} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CarShowcase;
