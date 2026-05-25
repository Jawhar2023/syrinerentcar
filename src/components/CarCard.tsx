import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Zap, Gauge, Star, Clock, Users } from "lucide-react";
import type { Car } from "@/data/cars";
import { carImageAlt } from "@/lib/seoImages";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/seo/seoConfig";

interface CarCardProps {
  car: Car;
  index: number;
  /** Taller image and typography (`large` home, `vip` fleet page). */
  size?: "default" | "large" | "vip";
}

const typeBadgeStyles: Record<string, string> = {
  city: "bg-primary/20 text-red-300",
  compact: "bg-primary/25 text-red-300",
  crossover: "bg-amber-500/20 text-amber-200",
  suv: "bg-primary/20 text-red-200",
  luxury: "bg-amber-500/20 text-amber-200",
  sport: "bg-red-500/30 text-red-200",
  electric: "bg-primary/25 text-red-200",
  economy: "bg-emerald-500/20 text-emerald-300",
};

const CarCard = ({ car, index, size = "default" }: CarCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isLarge = size === "large";
  const isVip = size === "vip";

  const detailPath = ROUTES.fleetCar(String(car.id));
  const showPrice = car.pricePerDay != null && car.pricePerDay > 0;

  const goToDetail = () => navigate(detailPath);

  const goToReservationForm = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.reservation, { state: { reserveCarId: car.id } });
  };

  const imageHeight = isVip
    ? "min-h-[240px] sm:min-h-[260px] md:min-h-[280px]"
    : isLarge
      ? "h-56 sm:h-60 md:h-64 lg:h-[17rem]"
      : "h-48 sm:h-52 md:h-56";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      id={`vip-car-${car.id}`}
      className="group h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        role="button"
        tabIndex={0}
        onClick={goToDetail}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToDetail();
          }
        }}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="fleet-car-card flex h-full cursor-pointer flex-col"
        aria-label={t("carCard.ariaDetails", { brand: car.brand, name: car.name })}
      >
        {/* Image */}
        <div className={cn("relative flex w-full items-center justify-center overflow-hidden showroom-surface", imageHeight)}>
          <motion.img
            src={car.image}
            alt={carImageAlt(car)}
            className="max-h-[94%] max-w-[98%] object-contain object-center drop-shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
            loading="lazy"
            decoding="async"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.45 }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold capitalize tracking-wide",
                typeBadgeStyles[car.type] ?? "bg-slate-600/40 text-slate-200",
              )}
            >
              {car.type}
            </span>
            {car.limitedAvailability && (
              <span className="urgency-pulse rounded-full bg-red-500/25 px-3 py-1 text-[11px] font-semibold text-red-200">
                Only 2 left!
              </span>
            )}
          </div>

          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            <span>{car.rating}</span>
            <span className="text-white/60">({car.reviews})</span>
          </div>
        </div>

        {/* Details */}
        <div className={cn("flex flex-1 flex-col", isLarge || isVip ? "p-6" : "p-5")}>
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {car.brand}
              </p>
              <h3
                className={cn(
                  "font-display font-bold leading-tight text-white",
                  isLarge || isVip ? "text-xl md:text-2xl" : "text-lg",
                )}
              >
                {car.name}
              </h3>
            </div>
            {showPrice ? (
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    "font-display font-bold leading-none text-primary",
                    isLarge || isVip ? "text-3xl md:text-4xl" : "text-2xl",
                  )}
                >
                  {car.pricePerDay}
                  <span className="text-lg md:text-xl"> €</span>
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">{t("carCard.perDay")}</p>
              </div>
            ) : (
              <p className="shrink-0 text-right text-xs font-medium text-slate-400">{car.transmission}</p>
            )}
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-primary/90">
            <span className="inline-flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5" aria-hidden />
              {car.horsepower}hp
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {car.acceleration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" aria-hidden />
              {car.fuelType}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" aria-hidden />
              {car.seats}
            </span>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={goToReservationForm}
            className="mt-auto w-full rounded-xl border border-primary/60 bg-transparent py-3 text-sm font-semibold text-primary transition-colors duration-300 hover:border-primary hover:bg-primary/10 hover:text-red-300"
            aria-label={t("carCard.ariaBook", { brand: car.brand, name: car.name })}
          >
            {t("carCard.bookNow")}
          </motion.button>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default CarCard;
