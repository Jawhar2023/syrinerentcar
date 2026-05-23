import type { Car } from "@/data/cars";

export type VipQuizAnswers = {
  journey?: "city" | "long";
  company?: "solo" | "couple" | "family";
  style?: "comfort" | "sporty" | "economy";
  transmission?: "manual" | "auto";
};

export type TransmissionKind = "manual" | "automatic";

/** Normalize FR/EN transmission labels from the fleet catalog. */
export function getTransmissionKind(transmission: string): TransmissionKind {
  const s = transmission.toLowerCase();
  if (s.includes("manu") || s.includes("manual") || s.includes("mécanique") || s.includes("mecanique")) {
    return "manual";
  }
  return "automatic";
}

export function matchesTransmission(car: Car, want: "manual" | "auto"): boolean {
  const kind = getTransmissionKind(car.transmission);
  return want === "manual" ? kind === "manual" : kind === "automatic";
}

function scoreCar(car: Car, a: VipQuizAnswers): number {
  let sc = 0;
  if (a.journey === "city" && (car.type === "city" || car.type === "compact")) sc += 3;
  if (a.journey === "long" && (car.type === "crossover" || car.type === "suv")) sc += 3;
  if (a.company === "family" && car.seats >= 5) sc += 2;
  if (a.company === "couple" && car.seats >= 4) sc += 1;
  if (a.company === "solo") sc += 1;
  if (a.style === "comfort" && (car.type === "suv" || car.type === "crossover")) sc += 3;
  if (a.style === "sporty" && car.type === "compact") sc += 2;
  if (a.style === "economy" && (car.type === "city" || car.type === "compact")) sc += 3;
  if (a.transmission && matchesTransmission(car, a.transmission)) sc += 5;
  return sc;
}

/**
 * Returns every car that matches the client's hard choices (transmission, seats),
 * sorted by how well they fit the softer preferences (journey, style).
 */
export function filterCarsByQuizAnswers(cars: Car[], a: VipQuizAnswers): Car[] {
  let pool = cars.filter((c) => c.available);

  if (a.transmission) {
    pool = pool.filter((c) => matchesTransmission(c, a.transmission));
  }

  if (a.company === "family") {
    pool = pool.filter((c) => c.seats >= 5);
  } else if (a.company === "couple") {
    pool = pool.filter((c) => c.seats >= 4);
  }

  return [...pool].sort((x, y) => scoreCar(y, a) - scoreCar(x, a));
}

/** Best single match (first after filter + sort). */
export function getRecommendedVipCarId(cars: Car[], a: VipQuizAnswers): string {
  const matches = filterCarsByQuizAnswers(cars, a);
  if (matches.length === 0) {
    const fallback = cars.filter((c) => c.available);
    return fallback[0]?.id ?? cars[0]?.id ?? "";
  }
  return matches[0].id;
}
