import { useState, type ComponentType } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Cog,
  Gauge,
  Heart,
  MapPin,
  Phone,
  Route,
  Sparkles,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMergedFleetCars } from "@/hooks/useDrivexData";
import { filterCarsByQuizAnswers, type VipQuizAnswers } from "@/lib/vipFleetQuizLogic";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/seo/seoConfig";

/** English copy (DriveX VIP). */
const COPY = {
  back: "VIP Fleet",
  badge: "Find your match",
  heroTitle: "Find your ideal car",
  heroSubtitle: "Answer a few questions — we’ll suggest a vehicle from our VIP fleet.",
  journey: {
    title: "What’s your journey?",
    subtitle: "Tell us about your trip",
    city: { label: "City & around", desc: "Short trips, urban driving" },
    long: { label: "Long distance", desc: "Highways, road trips" },
  },
  company: {
    title: "Who’s coming with you?",
    subtitle: "Pick your travel group",
    solo: { label: "Just me", desc: "Solo trip" },
    couple: { label: "Two or three", desc: "2–3 passengers" },
    family: { label: "Family", desc: "4–5 passengers" },
  },
  style: {
    title: "Your driving priority?",
    subtitle: "What matters most",
    comfort: { label: "Comfort first", desc: "Smooth ride & space" },
    sporty: { label: "Sporty & fun", desc: "Dynamic driving" },
    economy: { label: "Smart & efficient", desc: "Best value" },
  },
  transmission: {
    title: "Manual or automatic?",
    subtitle: "Choose your preferred transmission",
    manual: { label: "Manual", desc: "Total control, classic feel" },
    auto: { label: "Automatic", desc: "Easy driving, smooth shifting" },
  },
  resultEyebrow: "Your matches",
  resultTitle: (count: number) =>
    count === 1 ? "We found 1 vehicle for you" : `We found ${count} vehicles for you`,
  resultDesc: "Based on your answers — especially transmission and group size.",
  viewFleet: "View all in fleet",
  viewAllMatches: "See full fleet",
  noMatches: "No vehicle matches every filter. Try again or browse the full fleet.",
  transmissionLabel: (kind: string) => (kind === "manual" ? "Manual" : "Automatic"),
  reserve: "Book",
  tryAgain: "← Try again",
} as const;

type StepKey = "journey" | "company" | "style" | "transmission";

const STEPS: {
  key: StepKey;
  options: { value: string; icon: ComponentType<{ className?: string }> }[];
}[] = [
  {
    key: "journey",
    options: [
      { value: "city", icon: MapPin },
      { value: "long", icon: Route },
    ],
  },
  {
    key: "company",
    options: [
      { value: "solo", icon: User },
      { value: "couple", icon: Users },
      { value: "family", icon: Heart },
    ],
  },
  {
    key: "style",
    options: [
      { value: "comfort", icon: Heart },
      { value: "sporty", icon: Zap },
      { value: "economy", icon: Wallet },
    ],
  },
  {
    key: "transmission",
    options: [
      { value: "manual", icon: Cog },
      { value: "auto", icon: Gauge },
    ],
  },
];

function labelFor(stepKey: StepKey, value: string): { label: string; desc: string } {
  const block = COPY[stepKey] as Record<string, { label: string; desc: string }>;
  return block[value];
}

export default function VipFindCarQuizPage() {
  const vipFleetCars = useMergedFleetCars();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<VipQuizAnswers>({});

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const handleAnswer = (qKey: keyof VipQuizAnswers, value: string) => {
    const next = { ...answers, [qKey]: value } as VipQuizAnswers;
    setAnswers(next);
    window.setTimeout(() => setStep((s) => s + 1), 320);
  };

  const matchingCars =
    step >= STEPS.length ? filterCarsByQuizAnswers(vipFleetCars, answers) : [];

  const goViewFleet = () => {
    const params = new URLSearchParams();
    if (answers.transmission) params.set("transmission", answers.transmission);
    if (answers.journey) params.set("journey", answers.journey);
    if (answers.company) params.set("company", answers.company);
    const qs = params.toString();
    navigate(qs ? `${ROUTES.fleet}?${qs}` : ROUTES.fleet);
    requestAnimationFrame(() => {
      document.getElementById("vip-fleet-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const totalSteps = STEPS.length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef1f4] text-slate-900">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-lg flex-col px-4 pb-16 pt-24 sm:max-w-xl sm:px-6 sm:pt-28">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            to={ROUTES.fleet}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            {COPY.back}
          </Link>
        </header>

        <div className="mb-10 flex w-full max-w-xs justify-center gap-2 sm:mx-auto sm:max-w-sm">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                i <= step ? "bg-primary" : "bg-primary/20",
              )}
            />
          ))}
        </div>

        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {COPY.badge}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{COPY.heroTitle}</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 sm:text-base">{COPY.heroSubtitle}</p>
        </div>

        <AnimatePresence mode="wait">
          {step < STEPS.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mx-auto w-full"
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-primary" aria-hidden />
              <h2 className="mb-2 text-center font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                {COPY[STEPS[step].key].title}
              </h2>
              <p className="mb-8 text-center text-sm text-slate-500 sm:text-base">{COPY[STEPS[step].key].subtitle}</p>

              <div className="flex flex-col gap-3">
                {STEPS[step].options.map((opt) => {
                  const Icon = opt.icon;
                  const { label, desc } = labelFor(STEPS[step].key, opt.value);
                  return (
                    <motion.button
                      key={opt.value}
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(STEPS[step].key as keyof VipQuizAnswers, opt.value)}
                      className="group flex items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-md transition-shadow hover:shadow-lg"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary shadow-inner transition-transform group-hover:scale-[1.02]">
                        <Icon className="h-7 w-7 text-primary-foreground" strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900">{label}</div>
                        <div className="text-sm text-slate-500">{desc}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : step >= STEPS.length ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto w-full text-center"
            >
              <div className="mb-8 flex w-full max-w-xs justify-center gap-2 sm:mx-auto sm:max-w-sm">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className="h-1.5 flex-1 rounded-full bg-primary" />
                ))}
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">{COPY.resultEyebrow}</p>
              <h2 className="mb-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl" style={{ textWrap: "balance" }}>
                {matchingCars.length > 0 ? COPY.resultTitle(matchingCars.length) : COPY.noMatches}
              </h2>
              {answers.transmission ? (
                <p className="mb-6 text-sm text-slate-600">
                  {COPY.transmissionLabel(answers.transmission)} · {matchingCars.length}{" "}
                  {matchingCars.length === 1 ? "vehicle" : "vehicles"}
                </p>
              ) : (
                <p className="mb-6 text-sm text-slate-500">{COPY.resultDesc}</p>
              )}

              {matchingCars.length > 0 ? (
                <div className="space-y-4 text-left">
                  {matchingCars.map((car) => (
                    <article
                      key={car.id}
                      className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.name}`}
                          className="h-40 w-full object-cover sm:h-auto sm:w-44 sm:shrink-0"
                        />
                        <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                          <p className="text-xs font-medium uppercase tracking-widest text-primary">{car.type}</p>
                          <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl">
                            {car.brand} {car.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {car.transmission} · {car.fuelType} · {car.seats} seats
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                              type="button"
                              onClick={() => navigate(ROUTES.fleetCar(car.id))}
                            >
                              Details
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-lg border-slate-200"
                              type="button"
                              onClick={() =>
                                navigate(ROUTES.reservation, { state: { reserveCarId: car.id } })
                              }
                            >
                              <Phone className="mr-1.5 h-3.5 w-3.5" />
                              {COPY.reserve}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="h-12 rounded-xl border-0 bg-primary font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                  type="button"
                  onClick={goViewFleet}
                  disabled={matchingCars.length === 0}
                >
                  {COPY.viewFleet}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-xl border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                  type="button"
                  onClick={() => navigate(ROUTES.fleet)}
                >
                  {COPY.viewAllMatches}
                </Button>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-8 text-sm text-slate-500 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {COPY.tryAgain}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
