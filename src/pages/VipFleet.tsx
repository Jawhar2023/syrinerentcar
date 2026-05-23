import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Search, Shield, Sparkles, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import CarShowcase from "@/components/CarShowcase";
import { VipReservationSection } from "@/components/VipReservationSection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { carTypes, type Car } from "@/data/cars";
import { useMergedFleetCars } from "@/hooks/useDrivexData";
import { filterCarsByQuizAnswers, type VipQuizAnswers } from "@/lib/vipFleetQuizLogic";
import vipHeroVideo from "@/video/Luxury_sports_car_reveal_studio_3e29641b7d (1).mp4";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { BreadCrumb } from "@/seo/BreadCrumb";
import { breadcrumbSchema } from "@/seo/schemas";
import { PAGES, ROUTES } from "@/seo/seoConfig";

function filterCarsByQuery(cars: Car[], query: string): Car[] {
  const q = query.trim().toLowerCase();
  if (!q) return cars;
  return cars.filter((c) => {
    const blob = `${c.brand} ${c.name} ${c.type} ${c.fuelType} ${c.description ?? ""}`.toLowerCase();
    return q.split(/\s+/).every((word) => word.length === 0 || blob.includes(word));
  });
}

function applyHeroFilters(cars: Car[], typeKey: string, brand: string, modelId: string): Car[] {
  let out = cars;
  if (typeKey !== "all") out = out.filter((c) => c.type === typeKey);
  if (brand !== "all") out = out.filter((c) => c.brand === brand);
  if (modelId !== "all") out = out.filter((c) => c.id === modelId);
  return out;
}

const VipFleet = () => {
  const { t } = useTranslation();
  const crumbs = [
    { name: "Accueil", path: ROUTES.home },
    { name: "Notre flotte", path: ROUTES.fleet },
  ];
  const vipFleetCars = useMergedFleetCars();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [heroType, setHeroType] = useState<string>("all");
  const [heroBrand, setHeroBrand] = useState<string>("all");
  const [heroModel, setHeroModel] = useState<string>("all");

  useEffect(() => {
    setHeroModel("all");
  }, [heroBrand]);

  /** After adding a car in admin, hero brand/model/budget can hide it — widen filters when the fleet grows. */
  const prevFleetLen = useRef(vipFleetCars.length);
  useEffect(() => {
    const n = vipFleetCars.length;
    if (n > prevFleetLen.current) {
      setHeroType("all");
      setHeroBrand("all");
      setHeroModel("all");
    }
    prevFleetLen.current = n;
  }, [vipFleetCars.length]);

  /** Deep-link from quiz “View in fleet” → scroll to that car card. */
  const pickCarId = searchParams.get("car");
  useEffect(() => {
    if (!pickCarId) return;
    requestAnimationFrame(() => {
      document.getElementById("vip-fleet-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
      requestAnimationFrame(() => {
        document.getElementById(`vip-car-${pickCarId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("car");
        return next;
      },
      { replace: true },
    );
  }, [pickCarId, setSearchParams]);

  const brandOptions = useMemo(
    () => [...new Set(vipFleetCars.map((c) => c.brand))].sort(),
    [vipFleetCars],
  );

  const modelScope = useMemo(() => {
    if (heroBrand === "all") return vipFleetCars;
    return vipFleetCars.filter((c) => c.brand === heroBrand);
  }, [heroBrand, vipFleetCars]);

  const heroScoped = useMemo(
    () => applyHeroFilters(vipFleetCars, heroType, heroBrand, heroModel),
    [vipFleetCars, heroType, heroBrand, heroModel],
  );

  const quizAnswers = useMemo((): VipQuizAnswers | null => {
    const transmission = searchParams.get("transmission");
    const journey = searchParams.get("journey");
    const company = searchParams.get("company");
    if (!transmission && !journey && !company) return null;
    return {
      ...(transmission === "manual" || transmission === "auto" ? { transmission } : {}),
      ...(journey === "city" || journey === "long" ? { journey } : {}),
      ...(company === "solo" || company === "couple" || company === "family" ? { company } : {}),
    };
  }, [searchParams]);

  const quizFiltered = useMemo(() => {
    if (!quizAnswers) return heroScoped;
    return filterCarsByQuizAnswers(heroScoped, quizAnswers);
  }, [heroScoped, quizAnswers]);

  const filteredCars = useMemo(
    () => filterCarsByQuery(quizFiltered, searchQuery),
    [quizFiltered, searchQuery],
  );

  const scrollToGrid = () => {
    document.getElementById("vip-fleet-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroSelectTrigger =
    "h-11 w-[132px] sm:w-[150px] rounded-md border border-white/15 bg-black/45 text-white shadow-none backdrop-blur-md focus:ring-2 focus:ring-primary/45 data-[placeholder]:text-white/70 [&>span]:text-white/95";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead page="fleet" />
      <JsonLd schema={breadcrumbSchema(crumbs)} />
      <header>
        <Navbar variant="default" />
      </header>
      <main className="relative z-10">
        <section
          id="vip-fleet-hero"
          className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-black px-4 pb-20 pt-24"
          aria-labelledby="fleet-hero-heading"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          >
            <source src={vipHeroVideo} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/85"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="mb-4 w-full max-w-md">
              <BreadCrumb crumbs={crumbs} className="justify-center text-white/70 [&_a]:text-white/80 [&_a:hover]:text-white [&_span]:text-white" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.28em] text-primary sm:text-sm"
            >
              {t("vipFleet.premium")}
            </motion.p>
            <motion.h1
              id="fleet-hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
              style={{ textWrap: "balance" }}
            >
              {PAGES.fleet.h1}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/90 md:text-lg"
              style={{ textWrap: "pretty" }}
            >
              {t("vipFleet.heroSubtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-10 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              <Select value={heroType} onValueChange={setHeroType}>
                <SelectTrigger className={heroSelectTrigger}>
                  <SelectValue placeholder={t("vipFleet.all")} />
                </SelectTrigger>
                <SelectContent className="max-h-64 border-border bg-popover text-popover-foreground">
                  {carTypes.map((ct) => (
                    <SelectItem key={ct} value={ct}>
                      {ct === "all" ? t("vipFleet.all") : ct.charAt(0).toUpperCase() + ct.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={heroBrand} onValueChange={setHeroBrand}>
                <SelectTrigger className={heroSelectTrigger}>
                  <SelectValue placeholder={t("vipFleet.allMakes")} />
                </SelectTrigger>
                <SelectContent className="max-h-64 border-border bg-popover text-popover-foreground">
                  <SelectItem value="all">{t("vipFleet.allMakes")}</SelectItem>
                  {brandOptions.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={heroModel} onValueChange={setHeroModel}>
                <SelectTrigger className={`${heroSelectTrigger} w-[150px] sm:w-[170px]`}>
                  <SelectValue placeholder={t("vipFleet.allModels")} />
                </SelectTrigger>
                <SelectContent className="max-h-64 border-border bg-popover text-popover-foreground">
                  <SelectItem value="all">{t("vipFleet.allModels")}</SelectItem>
                  {modelScope.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <Button
                type="button"
                size="lg"
                className="h-11 rounded-lg border-0 bg-primary px-10 font-semibold text-primary-foreground shadow-none hover:bg-primary/90"
                onClick={scrollToGrid}
              >
                <Search className="h-4 w-4" />
                {t("vipFleet.search")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90"
            >
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {t("vipFleet.open247")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {t("vipFleet.insured")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 shrink-0 fill-primary text-primary" aria-hidden />
                {t("vipFleet.reviews")}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="h-11 rounded-lg border-0 bg-primary px-6 font-semibold text-primary-foreground shadow-none hover:bg-primary/90"
                asChild
              >
                <a href="#vip-fleet-grid">
                  {t("vipFleet.explore")}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-lg border border-white/40 bg-transparent font-medium text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to={ROUTES.fleetFind}>
                  <Sparkles className="h-4 w-4" aria-hidden />
                  {t("vipFleet.findCarQuiz")}
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <CarShowcase
          sectionId="vip-fleet-grid"
          sourceCars={filteredCars}
          cardSize="vip"
          toolbarLayout="split"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSectionHeader={false}
          showCategoryPills
          categoryPillVariant="vipFleet"
        />
        <VipReservationSection />
      </main>
      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default VipFleet;
