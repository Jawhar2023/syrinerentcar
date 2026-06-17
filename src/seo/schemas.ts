import type { Car } from "@/data/cars";
import { LOCATIONS } from "@/seo/locations";
import { SITE } from "@/seo/seoConfig";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["CarRental", "LocalBusiness"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  image: SITE.ogImage,
  logo: `${SITE.url}/syrine-logo-navbar.png`,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: "$$",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  currenciesAccepted: "TND",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  areaServed: [
    { "@type": "City", name: "M'saken" },
    ...LOCATIONS.map((loc) => ({ "@type": "City" as const, name: loc.name })),
    { "@type": "AdministrativeArea", name: "Sousse Governorate" },
    { "@type": "Country", name: "Tunisia" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/SyrineRentCar/",
    "https://www.instagram.com/syrine_rent_car/",
  ],
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/syrine-logo-navbar.png`,
  image: SITE.ogImage,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.countryCode,
  },
  sameAs: [
    "https://www.facebook.com/SyrineRentCar/",
    "https://www.instagram.com/syrine_rent_car/",
  ],
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description:
    "Location voiture pas cher M'saken, Sousse et Tunisie — citadines, SUV, automatique. Livraison aéroport Tunis & Monastir. Réservez par WhatsApp.",
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: ["fr", "en", "ar"],
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/** JSON-LD FAQPage for rich results. */
export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbCrumb {
  name: string;
  path: string;
}

/** JSON-LD BreadcrumbList for rich results. */
export function breadcrumbSchema(crumbs: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path.startsWith("http") ? crumb.path : `${SITE.url}${crumb.path}`,
    })),
  };
}

/** Vehicle listing schema for individual car detail pages. */
export function vehicleProductSchema(car: Car, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.brand} ${car.name}`,
    description:
      car.description ??
      `Rent a ${car.brand} ${car.name} in Tunisia — ${car.transmission}, ${car.fuelType}, ${car.seats} seats.`,
    image: car.image.startsWith("http") ? car.image : `${SITE.url}${car.image}`,
    url: canonicalUrl,
    brand: {
      "@type": "Brand",
      name: car.brand,
    },
    category: car.type,
    offers: {
      "@type": "Offer",
      availability: car.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "TND",
      ...(car.pricePerDay != null && car.pricePerDay > 0
        ? { price: car.pricePerDay, priceSpecification: { "@type": "UnitPriceSpecification", unitText: "DAY" } }
        : {}),
      seller: { "@id": `${SITE.url}/#organization` },
    },
  };
}
