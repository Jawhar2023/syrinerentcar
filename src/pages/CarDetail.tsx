import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Gauge,
  Star,
  Clock,
  Users,
  Zap,
  Settings2,
  ShieldCheck,
  Car as CarIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { CarImage } from "@/components/CarImage";
import { Button } from "@/components/ui/button";
import { useMergedFleetCars } from "@/hooks/useDrivexData";
import { carImageAlt } from "@/lib/seoImages";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { BreadCrumb } from "@/seo/BreadCrumb";
import { breadcrumbSchema } from "@/seo/schemas";
import { ROUTES, SITE } from "@/seo/seoConfig";

const CarDetail = () => {
  const { t } = useTranslation();
  const { carId } = useParams<{ carId: string }>();
  const navigate = useNavigate();
  const fleet = useMergedFleetCars();

  const car = useMemo(() => fleet.find((c) => c.id === carId), [fleet, carId]);

  const crumbs = useMemo(
    () =>
      car
        ? [
            { name: "Accueil", path: ROUTES.home },
            { name: "Notre flotte", path: ROUTES.fleet },
            { name: `${car.brand} ${car.name}`, path: ROUTES.fleetCar(car.id) },
          ]
        : [
            { name: "Accueil", path: ROUTES.home },
            { name: "Notre flotte", path: ROUTES.fleet },
          ],
    [car],
  );

  const seoOverrides = useMemo(() => {
    if (!car) return undefined;
    const title = `Location ${car.brand} ${car.name} M'saken | Syrine Rent Car`;
    const description =
      car.description ??
      `Louez ${car.brand} ${car.name} (${car.transmission}, ${car.fuelType}) à M'saken avec Syrine Rent Car. Réservez par WhatsApp.`;
    return {
      title,
      description,
      keywords: `location ${car.brand} ${car.name} M'saken, louer ${car.name} Sousse, ${car.transmission} ${car.type}`,
      canonical: `${SITE.url}${ROUTES.fleetCar(car.id)}`,
      h1: `Location ${car.brand} ${car.name} à M'saken`,
    };
  }, [car]);

  const goReserve = () => {
    if (!car) return;
    navigate(ROUTES.reservation, { state: { reserveCarId: car.id } });
  };

  if (!carId || !car) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SEOHead page="fleet" />
        <header>
          <Navbar variant="default" />
        </header>
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24">
          <h1 className="font-display text-2xl font-bold">{t("carDetail.notFoundTitle")}</h1>
          <p className="mt-2 max-w-md text-center text-muted-foreground">{t("carDetail.notFoundBody")}</p>
          <Button asChild className="mt-8">
            <Link to={ROUTES.fleet}>{t("carDetail.backFleet")}</Link>
          </Button>
        </main>
        <footer>
          <FooterSection />
        </footer>
      </div>
    );
  }

  const typeColorsDetail: Record<string, string> = {
    city: "bg-emerald-500/25 text-emerald-300 border-emerald-500/30",
    compact: "bg-primary/25 text-primary border-primary/35",
    crossover: "bg-amber-500/25 text-amber-300 border-amber-500/30",
    suv: "bg-sky-500/25 text-sky-300 border-sky-500/30",
    luxury: "bg-amber-500/25 text-amber-300 border-amber-500/30",
    sport: "bg-red-500/25 text-red-300 border-red-500/30",
    electric: "bg-primary/25 text-primary border-primary/35",
    economy: "bg-emerald-500/25 text-emerald-300 border-emerald-500/30",
  };

  const showPrice = car.pricePerDay != null && car.pricePerDay > 0;

  const specItems = useMemo(
    () => [
      { icon: Gauge, label: t("carDetail.specPower"), value: `${car.horsepower} hp` },
      { icon: Clock, label: t("carDetail.specAccel"), value: car.acceleration },
      { icon: Zap, label: t("carDetail.specFuel"), value: car.fuelType },
      { icon: Users, label: t("carDetail.specSeats"), value: String(car.seats) },
      { icon: Settings2, label: t("carDetail.specTransmission"), value: car.transmission },
      {
        icon: Star,
        label: t("carDetail.specRating"),
        value: t("carDetail.ratingLine", { rating: car.rating, count: car.reviews }),
      },
    ],
    [car, t],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead page="fleet" overrides={seoOverrides} />
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <header>
        <Navbar variant="default" />
      </header>

      <main className="relative pt-20">
        <section
          className="grid min-h-[calc(100svh-5rem)] w-full lg:grid-cols-2 lg:grid-rows-1"
          aria-labelledby="car-detail-heading"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-[42vh] w-full overflow-hidden border-b border-border/60 bg-black lg:sticky lg:top-20 lg:min-h-[calc(100svh-5rem)] lg:self-start lg:border-b-0 lg:border-r"
          >
            <CarImage
              src={car.image}
              alt={carImageAlt(car)}
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/25 lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-background/30"
              aria-hidden
            />
          </motion.div>

          <div className="flex flex-col px-4 py-10 lg:px-10 lg:py-16 xl:px-14">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mx-auto w-full max-w-xl flex-1"
            >
              <BreadCrumb crumbs={crumbs} className="mb-6" />

              <Link
                to={ROUTES.fleet}
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Notre flotte
              </Link>

              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">Fiche véhicule</p>
              <h1 id="car-detail-heading" className="font-display text-3xl font-bold leading-tight md:text-4xl">
                {seoOverrides?.h1 ?? `${car.brand} ${car.name}`}
              </h1>
              <p className="mt-3 text-muted-foreground">{car.description ?? t("carDetail.intro")}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                    typeColorsDetail[car.type] ?? "border-border bg-muted/30 text-foreground",
                  )}
                >
                  {car.type}
                </span>
                {car.limitedAvailability && (
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-200">
                    {t("carDetail.limited")}
                  </span>
                )}
                {!car.available && (
                  <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {t("carDetail.unavailable")}
                  </span>
                )}
              </div>

              <h2 className="sr-only">Caractéristiques du véhicule</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {specItems.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
                      <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
                {car.registration && (
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-5 sm:col-span-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <CarIcon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {t("carDetail.registration")}
                      </p>
                      <p className="mt-1 font-mono text-base font-semibold text-foreground">{car.registration}</p>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={cn(
                  "mt-10 flex flex-col gap-4",
                  showPrice ? "sm:flex-row sm:items-center sm:justify-between" : "",
                )}
              >
                {showPrice ? (
                  <div>
                    <p className="text-sm text-muted-foreground">{t("carDetail.from")}</p>
                    <p className="font-display text-3xl font-bold text-primary md:text-4xl">{car.pricePerDay}</p>
                    <p className="text-sm text-muted-foreground">{t("carDetail.perDay")}</p>
                  </div>
                ) : null}
                <Button
                  type="button"
                  size="lg"
                  className={cn(
                    "neon-glow shrink-0 bg-primary text-primary-foreground hover:bg-primary/90",
                    !showPrice && "w-full sm:w-auto",
                  )}
                  onClick={goReserve}
                >
                  {t("carDetail.bookNow")}
                </Button>
              </div>

              <p className="mt-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {t("carDetail.insured")}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default CarDetail;
