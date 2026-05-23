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
    { "@type": "AdministrativeArea", name: "Sousse" },
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
