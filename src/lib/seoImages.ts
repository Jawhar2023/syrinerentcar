import type { Car } from "@/data/cars";

/** Accessible French alt text for fleet vehicle photos. */
export function carImageAlt(car: Pick<Car, "brand" | "name" | "type" | "transmission">): string {
  return `${car.brand} ${car.name} — location ${car.type} ${car.transmission.toLowerCase()} à M'saken, Syrine Rent Car`;
}

