import locationsData from "@/seo/locations.json";
import { SITE } from "@/seo/seoConfig";

export interface LocationCity {
  slug: string;
  name: string;
  governorate: string;
  region: string;
  deliveryNote: string;
  highlights: string[];
  keywordExtras: string;
}

export const LOCATIONS = locationsData as LocationCity[];

export const LOCATION_HUB_SLUG = "tunisie";

export function locationPath(slug: string): string {
  return `/location-voiture-${slug}`;
}

export const LOCATIONS_HUB_PATH = `/location-voiture-${LOCATION_HUB_SLUG}`;

export function getLocationBySlug(slug: string): LocationCity | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLocationsByGovernorate(): Map<string, LocationCity[]> {
  const map = new Map<string, LocationCity[]>();
  for (const loc of LOCATIONS) {
    const list = map.get(loc.governorate) ?? [];
    list.push(loc);
    map.set(loc.governorate, list);
  }
  return map;
}

export function getNearbyLocations(slug: string, limit = 6): LocationCity[] {
  const current = getLocationBySlug(slug);
  if (!current) return LOCATIONS.slice(0, limit);
  const sameGov = LOCATIONS.filter((l) => l.governorate === current.governorate && l.slug !== slug);
  const sameRegion = LOCATIONS.filter(
    (l) => l.region === current.region && l.slug !== slug && l.governorate !== current.governorate,
  );
  return [...sameGov, ...sameRegion, ...LOCATIONS.filter((l) => l.slug !== slug)].slice(0, limit);
}

export function buildLocationSeo(location: LocationCity) {
  const path = locationPath(location.slug);
  const title = `Location voiture ${location.name} | Syrine Rent Car Tunisie`;
  const description = `Louez une voiture à ${location.name} (${location.governorate}) avec Syrine Rent Car. ${location.deliveryNote} Citadines, SUV, automatique. Réservation WhatsApp — agence M'saken.`;
  const keywords = `${location.keywordExtras}, location voiture ${location.governorate}, louer voiture Tunisie, Syrine Rent Car`;
  return {
    title,
    description,
    keywords,
    canonical: `${SITE.url}${path}`,
    h1: `Location de voiture à ${location.name}`,
  };
}

export const MSAKEN_AGENCY_LOCATION: LocationCity = {
  slug: "msaken",
  name: "M'saken",
  governorate: "Sousse",
  region: "Sahel",
  deliveryNote: "Agence au Bd Dr Taieb Hachicha — prise en charge immédiate sur place.",
  highlights: ["agence principale", "Sahel", "livraison nationale"],
  keywordExtras: "location voiture M'saken, location voiture Msaken, louer voiture M'saken Sousse",
};
