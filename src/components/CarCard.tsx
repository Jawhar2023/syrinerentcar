import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Zap, Gauge, Star, Clock, Users } from "lucide-react";
import type { Car } from "@/data/cars";
import { CarImage } from "@/components/CarImage";
import { carImageAlt } from "@/lib/seoImages";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/seo/seoConfig";

interface CarCardProps {
  car: Car;
  index: number;
  /** Taller image and typography (`large` home, `vip` VIP fleet page). */
  size?: "default" | "large" | "vip";
}

const CarCard = ({ car, index, size = "default" }: CarCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const detailPath = ROUTES.fleetCar(String(car.id));

  const goToDetail = () => {
    navigate(detailPath);
  };

  const goToReservationForm = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.reservation, { state: { reserveCarId: car.id } });
  };

  const typeColors: Record<string, string> = {
    city: "bg-emerald-500/20 text-emerald-400",
    compact: "bg-primary/20 text-primary",
    crossover: "bg-amber-500/20 text-amber-400",
    suv: "bg-sky-500/20 text-sky-400",
    luxury: "bg-amber-500/20 text-amber-400",
    sport: "bg-red-500/20 text-red-400",
    electric: "bg-primary/20 text-primary",
    economy: "bg-emerald-500/20 text-emerald-400",
  };

  const showPrice = car.pricePerDay != null && car.pricePerDay > 0;

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
        className={cn(
          "card-3d glass overflow-hidden cursor-pointer",
          size === "vip" ? "rounded-3xl" : "rounded-2xl",
        )}
        style={{ transformStyle: "preserve-3d" }}
        aria-label={t("carCard.ariaDetails", { brand: car.brand, name: car.name })}
      >
        {/* Image */}
        <div
          className={
            size === "vip"
              ? "relative h-64 overflow-hidden sm:h-72 md:h-80"
              : size === "large"
                ? "relative h-56 overflow-hidden md:h-60"
                : "relative h-48 overflow-hidden"
          }
        >
          <motion.div
            className="h-full w-full"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <CarImage
              src={car.image}
              alt={carImageAlt(car)}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[car.type]}`}>
              {car.type}
            </span>
            {car.limitedAvailability && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-destructive/20 text-destructive urgency-pulse">
                Only 2 left!
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center gap-1 glass rounded-full px-2 py-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-foreground">{car.rating}</span>
            <span className="text-xs text-muted-foreground">({car.reviews})</span>
          </div>
        </div>

        {/* Details */}
        <div className={size === "vip" ? "p-7" : size === "large" ? "p-6" : "p-5"}>
          <div className={`flex items-start justify-between mb-3 ${showPrice ? "" : "mb-1"}`}>
            <div>
              <p
                className={
                  size === "vip" ? "text-sm text-muted-foreground" : "text-xs text-muted-foreground"
                }
              >
                {car.brand}
              </p>
              <h3
                className={
                  size === "vip"
                    ? "font-display text-2xl font-bold text-foreground md:text-3xl"
                    : size === "large"
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

          {/* Specs */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? 0 : 5 }}
            className={cn(
              "flex flex-wrap items-center gap-4 mb-4",
              size === "vip" && "gap-5 mb-5",
            )}
          >
            <div
              className={cn(
                "flex items-center gap-1.5 text-muted-foreground",
                size === "vip" ? "text-sm" : "text-xs",
              )}
            >
              <Gauge className={size === "vip" ? "w-4 h-4 text-primary" : "w-3.5 h-3.5 text-primary"} />
              <span>{car.horsepower}hp</span>
            </div>
            {(
              [
                [Clock, car.acceleration],
                [Zap, car.fuelType],
                [Users, String(car.seats)],
              ] as const
            ).map(([Icon, label]) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-1.5 text-muted-foreground",
                  size === "vip" ? "text-sm" : "text-xs",
                )}
              >
                <Icon className={size === "vip" ? "w-4 h-4 text-primary" : "w-3.5 h-3.5 text-primary"} />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={goToReservationForm}
            className={cn(
              "w-full rounded-xl bg-primary/10 text-primary font-semibold border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors duration-300",
              size === "vip" ? "py-4 text-base" : "py-3 text-sm",
            )}
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
