/** Central SEO + route constants for syrinerentcar.com */

export const SITE = {
  name: "Syrine Rent Car",
  legalName: "Syrine Rent a Car",
  url: "https://www.syrinerentcar.com",
  locale: "fr_TN",
  language: "fr",
  phone: "+21626275645",
  phoneDisplay: "+216 26 275 645",
  fax: "+21673313126",
  email: "syrinerentcar@gmail.com",
  address: {
    street: "Bd Dr Taieb Hachicha",
    locality: "M'saken",
    region: "Sousse",
    postalCode: "4070",
    countryCode: "TN",
    countryName: "Tunisie",
  },
  fullAddress: "Bd Dr Taieb Hachicha, M'saken 4070, Sousse, Tunisie",
  geo: {
    region: "TN-51",
    placename: "M'saken, Sousse, Tunisie",
    position: "35.7301;10.5594",
    icbm: "35.7301, 10.5594",
    lat: 35.7301,
    lng: 10.5594,
  },
  ogImage: "https://www.syrinerentcar.com/syrine-agency-storefront.png",
  twitterHandle: "@syrine_rent_car",
  ga4Id: "G-XXXXXXXXXX",
  gscVerification: "google-site-verification=XXXXXXXXXXXXXXXX",
} as const;

export const ROUTES = {
  home: "/",
  about: "/location-voiture-msaken",
  fleet: "/notre-flotte",
  fleetFind: "/notre-flotte/trouver",
  fleetCar: (carId: string) => `/notre-flotte/voiture/${encodeURIComponent(carId)}`,
  reservation: "/reservation",
  contact: "/contact",
} as const;

export type PageSeoKey = "home" | "about" | "fleet" | "reservation" | "contact";

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  h1: string;
}

export const PAGES: Record<PageSeoKey, PageSeo> = {
  home: {
    title: "Syrine Rent Car — Location de voiture à M'saken, Sousse",
    description:
      "Louez une voiture à M'saken avec Syrine Rent Car : citadines, SUV, automatique ou manuelle. Réservation WhatsApp, livraison locale, tarifs transparents. Ouvert lun–sam 8h–18h.",
    keywords:
      "location voiture M'saken, location auto Sousse, louer voiture Tunisie, Syrine Rent Car, location voiture pas cher M'saken, voiture automatique Sousse",
    canonical: `${SITE.url}/`,
    h1: "Location de voiture à M'saken — Syrine Rent Car",
  },
  about: {
    title: "Agence de location voiture M'saken — Syrine Rent Car | Sousse",
    description:
      "Découvrez Syrine Rent Car, votre agence de location de voitures au Bd Dr Taieb Hachicha à M'saken (4070). Service local, flotte entretenue, réservation simple.",
    keywords:
      "agence location voiture M'saken, Syrine Rent Car adresse, location auto Sousse Tunisie, louer voiture M'saken centre",
    canonical: `${SITE.url}/location-voiture-msaken`,
    h1: "Agence de location de voiture à M'saken, Sousse",
  },
  fleet: {
    title: "Notre flotte — Location voiture M'saken | Syrine Rent Car",
    description:
      "Parcourez la flotte Syrine Rent Car : Renault Clio, Kia Picanto, Hyundai i20, Dacia Sandero, Fiat Panda 4x4, Mahindra XUV300. Réservez votre véhicule à M'saken.",
    keywords:
      "flotte location voiture M'saken, voiture automatique Sousse, SUV location Tunisie, citadine location M'saken, Syrine Rent Car véhicules",
    canonical: `${SITE.url}/notre-flotte`,
    h1: "Notre flotte de véhicules à louer à M'saken",
  },
  reservation: {
    title: "Réservation location voiture M'saken — Syrine Rent Car",
    description:
      "Réservez votre voiture en quelques clics via WhatsApp. Indiquez dates, modèle et coordonnées — Syrine Rent Car vous confirme rapidement à M'saken.",
    keywords:
      "réserver voiture M'saken, réservation location auto Sousse, louer voiture WhatsApp Tunisie, Syrine Rent Car réservation",
    canonical: `${SITE.url}/reservation`,
    h1: "Réserver votre voiture de location à M'saken",
  },
  contact: {
    title: "Contact — Syrine Rent Car M'saken | Tél. +216 26 275 645",
    description:
      "Contactez Syrine Rent Car : Bd Dr Taieb Hachicha, M'saken 4070. Téléphone, WhatsApp, email, plan d'accès Google Maps. Lun–sam 8h–18h.",
    keywords:
      "contact location voiture M'saken, Syrine Rent Car téléphone, adresse agence Sousse, WhatsApp location auto M'saken",
    canonical: `${SITE.url}/contact`,
    h1: "Contactez Syrine Rent Car à M'saken",
  },
};
