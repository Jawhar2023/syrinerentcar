import type { Car } from "@/data/cars";

/** Accessible alt text for fleet vehicle photos (French + Tunisia SEO). */
export function carImageAlt(car: Pick<Car, "brand" | "name" | "type" | "transmission">): string {
  return `${car.brand} ${car.name} — location ${car.type} ${car.transmission.toLowerCase()} Tunisie, car rental Tunisia, Syrine Rent Car`;
}

