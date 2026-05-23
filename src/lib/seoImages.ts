import type { Car } from "@/data/cars";

/** Accessible French alt text for fleet vehicle photos. */
export function carImageAlt(car: Pick<Car, "brand" | "name" | "type" | "transmission">): string {
  return `${car.brand} ${car.name} — location ${car.type} ${car.transmission.toLowerCase()} à M'saken, Syrine Rent Car`;
}

/** Prefer WebP when a sibling .webp exists in /public; otherwise keep original src. */
export function carImageSources(src: string): { webp?: string; fallback: string } {
  if (!src.startsWith("/") || !/\.(jpe?g|png)$/i.test(src)) {
    return { fallback: src };
  }
  return { webp: src.replace(/\.(jpe?g|png)$/i, ".webp"), fallback: src };
}
