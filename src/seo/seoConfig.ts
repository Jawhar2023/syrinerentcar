import { SEO_KEYWORDS } from "@/seo/keywords";

/** Central SEO + route constants for syrinerentcar.com */

export const SITE = {
  name: "Syrine Rent Car",
  legalName: "Syrine Rent a Car",
  url: "https://www.syrinerentcar.com",
  locale: "fr_TN",
  language: "fr",
  phone: "+21626275640",
  phoneDisplay: "+216 26 275 640",
  fax: "+21673313126",
  email: "syrinerentcar@gmail.com",
  address: {
    street: "Rue Médina Monawra, près du Café Zitouna",
    locality: "M'saken",
    region: "Sousse",
    postalCode: "4070",
    countryCode: "TN",
    countryName: "Tunisie",
  },
  fullAddress:
    "Rue Médina Monawra, à quelques mètres du Café Zitouna, M'saken, Sousse, Tunisie",
  geo: {
    region: "TN-51",
    placename: "M'saken, Sousse, Tunisie",
    position: "35.7301;10.5594",
    icbm: "35.7301, 10.5594",
    lat: 35.7301,
    lng: 10.5594,
  },
  ogImage: "https://www.syrinerentcar.com/syrine-fleet-marketing.png",
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
  locationsHub: "/location-voiture-tunisie",
  locationCity: (slug: string) => `/location-voiture-${slug}`,
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
    title: "Location voiture msaken & Sousse pas cher | Syrine Rent Car",
    description:
      "Location voiture msaken pas cher — agence Syrine Rent Car, Rue Médina Monawra (près du Café Zitouna), M'saken, Sousse. Louez à Msaken, Monastir. Livraison aéroport, réservation WhatsApp.",
    keywords: SEO_KEYWORDS.fr,
    canonical: `${SITE.url}/`,
    h1: "Location voiture msaken, M'saken & Sousse — pas cher",
  },
  about: {
    title: "Location voiture msaken — Agence Syrine Rent Car | M'saken, Sousse",
    description:
      "Location voiture msaken : agence Syrine Rent Car, Rue Médina Monawra (près du Café Zitouna), M'saken, Sousse. Louer voiture Msaken pas cher — livraison aéroport Tunis, Monastir. WhatsApp 26 275 640.",
    keywords:
      "location voiture msaken, location voiture M'saken, agence location voiture msaken, louer voiture msaken, location voiture Msaken pas cher, location voiture Sousse, Syrine Rent Car",
    canonical: `${SITE.url}/location-voiture-msaken`,
    h1: "Location voiture msaken — Agence à M'saken, Sousse",
  },
  fleet: {
    title: "Location voiture pas cher Tunisie — Flotte SUV & automatique | Syrine Rent Car",
    description:
      "Louez Renault Clio, Kia Picanto, Hyundai i20, Dacia Sandero, Fiat Panda City Cross ou Mahindra XUV300. Location voiture pas cher en Tunisie : citadine, SUV, automatique. Prise en charge M'saken, livraison Sousse & aéroports.",
    keywords:
      "location voiture pas cher Tunisie, flotte location auto Sousse, louer SUV Tunisie, location voiture automatique Sousse, location 4x4 Tunisie, citadine pas cher M'saken, economy car rental Tunisia",
    canonical: `${SITE.url}/notre-flotte`,
    h1: "Louer une voiture pas cher en Tunisie — Notre flotte",
  },
  reservation: {
    title: "Réserver location voiture Tunisie en ligne — WhatsApp | Syrine Rent Car",
    description:
      "Réservez votre location de voiture en Tunisie en 2 minutes : formulaire en ligne ou WhatsApp. Dates, modèle, livraison M'saken, Sousse, aéroport Tunis ou Monastir. Confirmation rapide, sans frais cachés.",
    keywords:
      "réserver location voiture Tunisie, réserver voiture WhatsApp, louer voiture en ligne Sousse, réservation location auto M'saken, book car online Tunisia, location voiture aéroport Tunis réservation",
    canonical: `${SITE.url}/reservation`,
    h1: "Réserver votre location de voiture en Tunisie",
  },
  contact: {
    title: "Contact location voiture M'saken & Sousse | WhatsApp +216 26 275 640",
    description:
      "Contactez Syrine Rent Car pour louer une voiture en Tunisie : Rue Médina Monawra, près du Café Zitouna, M'saken, Sousse. Téléphone, WhatsApp, email. Livraison Monastir, Hammamet, aéroport Tunis. Lun–sam 8h–18h.",
    keywords:
      "contact location voiture Sousse, téléphone location voiture M'saken, WhatsApp louer voiture Tunisie, adresse agence location auto Sousse, location voiture aéroport Tunis contact",
    canonical: `${SITE.url}/contact`,
    h1: "Contactez Syrine Rent Car — location voiture Tunisie",
  },
};

/** French FAQ items for FAQPage schema and on-page accordion (home). */
export const FAQ_ITEMS_FR: { question: string; answer: string }[] = [
  {
    question: "Où faire une location voiture msaken pas cher ?",
    answer:
      "Pour une location voiture msaken, rendez-vous chez Syrine Rent Car, Rue Médina Monawra (près du Café Zitouna), au cœur de M'saken, Sousse. Citadines, SUV, automatique — réservation WhatsApp au 26 275 640.",
  },
  {
    question: "Comment réserver une location voiture en Tunisie avec Syrine Rent Car ?",
    answer:
      "Choisissez votre véhicule sur notre flotte, complétez le formulaire de réservation ou contactez-nous par WhatsApp au 26 275 640. Nous confirmons dates, lieu (agence M'saken, Sousse, aéroport Tunis ou Monastir) et modèle en quelques minutes.",
  },
  {
    question: "Proposez-vous la location voiture à l'aéroport de Tunis et Monastir ?",
    answer:
      "Oui — location voiture aéroport Tunis-Carthage (TUN) et aéroport Monastir-Habib Bourguiba (MIR). Prise en charge à l'arrivée de votre vol ou livraison à votre hôtel à Sousse, Hammamet ou Djerba.",
  },
  {
    question: "Dans quelles villes livrez-vous en Tunisie ?",
    answer:
      "Depuis M'saken nous livrons à Sousse, Monastir, Mahdia, Tunis, Hammamet, Nabeul, Sfax, Djerba, Tozeur et 30+ villes. Consultez notre page location voiture Tunisie pour la liste complète.",
  },
  {
    question: "Quels véhicules louer pour un séjour en Tunisie ?",
    answer:
      "Citadine pas cher (Kia Picanto, Renault Clio), compacte automatique (Hyundai i20, Skoda Fabia), crossover familial (Dacia Sandero) et SUV (Mahindra XUV300, Fiat Panda City Cross). Idéal tourisme, affaires ou longue durée.",
  },
  {
    question: "Location voiture longue durée ou mensuelle en Tunisie ?",
    answer:
      "Oui — location à la journée, semaine ou au mois pour particuliers et entreprises. Tarifs dégressifs, livraison M'saken, Sousse et Grand Tunis. Demandez un devis par WhatsApp.",
  },
  {
    question: "Peut-on louer une voiture sans chauffeur en Tunisie ?",
    answer:
      "Oui, toutes nos locations sont sans chauffeur (self-drive). Permis valide requis. Nous expliquons les conditions (caution, assurance) clairement avant la remise des clés.",
  },
];
