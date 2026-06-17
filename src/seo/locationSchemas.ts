import type { LocationCity } from "@/seo/locations";
import { SITE } from "@/seo/seoConfig";

export function locationServiceSchema(location: LocationCity) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Location de voiture à ${location.name}`,
    description: location.deliveryNote,
    serviceType: "Car Rental",
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.governorate,
      },
    },
    provider: { "@id": `${SITE.url}/#organization` },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TND",
      seller: { "@id": `${SITE.url}/#organization` },
    },
  };
}
