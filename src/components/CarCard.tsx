import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Zap, Gauge, Star, Clock, Users, ChevronRight } from "lucide-react";
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

const CarCard = ({ car, index, size = "default" }: CarCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isVip = size === "vip";

  const detailPath = ROUTES.fleetCar(String(car.id));

  const goToDetail = () => {
    navigate(detailPath);
  };

  const goToReservationForm = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.reservation, { state: { reserveCarId: car.id } });
  };

  const typeColors: Record<string, string> = {
    city: "bg-emerald-500/15 text-emerald-700",
    compact: "bg-primary/15 text-primary",
    crossover: "bg-amber-500/15 text-amber-800",
    suv: "bg-sky-500/15 text-sky-800",
    luxury: "bg-amber-500/15 text-amber-800",
    sport: "bg-red-500/15 text-red-700",
    electric: "bg-primary/15 text-primary",
    economy: "bg-emerald-500/15 text-emerald-700",
  };

  const showPrice = car.pricePerDay != null && car.pricePerDay > 0;

  const specItems = [
    { icon: Gauge, label: `${car.horsepower} hp` },
    { icon: Clock, label: car.acceleration },
    { icon: Zap, label: car.fuelType },
    { icon: Users, label: `${car.seats} places` },
  ] as const;

  if (isVip) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.45 }}
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
          className={cn(
            "flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card",
            "shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_-12px_rgba(15,23,42,0.12)]",
            "transition-shadow duration-300 hover:border-primary/25 hover:shadow-[0_4px_20px_-8px_rgba(221,4,38,0.18)]",
          )}
          aria-label={t("carCard.ariaDetails", { brand: car.brand, name: car.name })}
        >
          {/* Square photo — full vehicle visible */}
          <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100/90">
            <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-6">
              <motion.img
                src={car.image}
                alt={carImageAlt(car)}
                className="max-h-full max-w-full object-contain drop-shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
                loading="lazy"
                decoding="async"
                animate={{ scale: hovered ? 1.04 : 1 }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              <span
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm",
                  typeColors[car.type],
                )}
              >
                {car.type}
              </span>
            </div>

            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md border border-border/80 bg-white/95 px-2 py-1 text-xs font-medium shadow-sm backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-foreground">{car.rating}</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{car.brand}</p>
              <h3 className="font-display text-xl font-bold leading-tight text-foreground">{car.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{car.transmission}</p>
            </div>

            <ul className="mb-5 grid grid-cols-2 gap-2">
              {specItems.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2 text-xs text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  <span className="truncate">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={goToReservationForm}
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {t("carCard.bookNow")}
              </button>
              <span className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition group-hover:border-primary/30 group-hover:text-primary">
                Détails
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </motion.div>
      </motion.article>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
      id={`vip-car-${car.id}`}
    >
      <motion.div
        animate={{
          rotateY: hovered ? 5 : 0,
          rotateX: hovered ? -3 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        role="button"
        tabIndex={0}
        onClick={goToDetail}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToDetail();
          }
        }}
        className="card-3d glass cursor-pointer overflow-hidden rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
        aria-label={t("carCard.ariaDetails", { brand: car.brand, name: car.name })}
      >
        <div
          className={
            size === "large" ? "relative h-56 overflow-hidden md:h-60" : "relative h-48 overflow-hidden"
          }
        >
          <motion.img
            src={car.image}
            alt={carImageAlt(car)}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          <div className="absolute left-3 top-3 flex gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeColors[car.type]}`}>
              {car.type}
            </span>
            {car.limitedAvailability && (
              <span className="urgency-pulse rounded-full bg-destructive/20 px-3 py-1 text-xs font-semibold text-destructive">
                Only 2 left!
              </span>
            )}
          </div>

          <div className="glass absolute right-3 top-3 flex items-center gap-1 rounded-full px-2 py-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-foreground">{car.rating}</span>
            <span className="text-xs text-muted-foreground">({car.reviews})</span>
          </div>
        </div>

        <div className={size === "large" ? "p-6" : "p-5"}>
          <div className={`mb-3 flex items-start justify-between ${showPrice ? "" : "mb-1"}`}>
            <div>
              <p className="text-xs text-muted-foreground">{car.brand}</p>
              <h3
                className={
                  size === "large"
                    ? "font-display text-xl font-bold text-foreground md:text-2xl"
                    : "font-display text-lg font-bold text-foreground"
                }
              >
                {car.name}
              </h3>
            </div>
            {showPrice ? (
              <div className="text-right">
                <p
                  className={
                    size === "large"
                      ? "font-display text-3xl font-bold text-primary md:text-4xl"
                      : "font-display text-2xl font-bold text-primary"
                  }
                >
                  {car.pricePerDay}
                </p>
                <p className="text-xs text-muted-foreground">{t("carCard.perDay")}</p>
              </div>
            ) : null}
          </div>

          <motion.div
            animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? 0 : 5 }}
            className="mb-4 flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Gauge className="h-3.5 w-3.5 text-primary" />
              <span>{car.horsepower}hp</span>
            </div>
            {(
              [
                [Clock, car.acceleration],
                [Zap, car.fuelType],
                [Users, String(car.seats)],
              ] as const
            ).map(([Icon, label]) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goToReservationForm}
            className="w-full rounded-xl border border-primary/20 bg-primary/10 py-3 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
            aria-label={t("carCard.ariaBook", { brand: car.brand, name: car.name })}
          >
            {t("carCard.bookNow")}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarCard;
