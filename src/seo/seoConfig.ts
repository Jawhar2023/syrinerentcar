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
    title: "Location voiture Tunisie & M'saken | Car Rental Tunisia — Syrine Rent Car",
    description:
      "Louez une voiture en Tunisie avec Syrine Rent Car : citadines, SUV, automatique ou manuelle à M'saken et Sousse. Réservation en ligne, livraison aéroport Tunis, tarifs transparents. Car rental Tunisia — book online.",
    keywords:
      "location voiture Tunisie, car rental Tunisia, rent a car Tunisia, Tunisia car hire, cheap car rental Tunisia, airport car rental Tunisia, car rental Tunis, car rental Sousse, SUV rental Tunisia, economy car rental Tunisia, automatic car rental Tunisia, book a car online Tunisia, louer voiture M'saken",
    canonical: `${SITE.url}/`,
    h1: "Location de voiture en Tunisie — Syrine Rent Car, M'saken",
  },
  about: {
    title: "Agence location voiture M'saken & Tunisie | Syrine Rent Car",
    description:
      "Syrine Rent Car : agence de location de voitures au Bd Dr Taieb Hachicha, M'saken (4070). Service local, transfert aéroport Tunis, livraison Sousse, Monastir, Hammamet. Best car rental company in Tunisia.",
    keywords:
      "agence location voiture M'saken, car rental Tunis, car rental Sousse, airport transfer Tunisia, Tunisia airport pickup, business car rental Tunisia, long term car rental Tunisia, monthly car rental Tunisia",
    canonical: `${SITE.url}/location-voiture-msaken`,
    h1: "Agence de location de voiture en Tunisie — M'saken, Sousse",
  },
  fleet: {
    title: "Notre flotte — Location voiture Tunisie | SUV, citadine, automatique",
    description:
      "Parcourez notre flotte : Renault Clio, Kia Picanto, Hyundai i20, Dacia Sandero, Fiat Panda 4x4, Mahindra XUV300. SUV rental Tunisia, economy & automatic cars. Réservez en ligne à M'saken.",
    keywords:
      "flotte location voiture Tunisie, SUV rental Tunisia, economy car rental Tunisia, automatic car rental Tunisia, luxury car rental Tunisia, family car rental Tunisia, affordable SUV rental Tunisia, louer voiture Sousse",
    canonical: `${SITE.url}/notre-flotte`,
    h1: "Notre flotte de véhicules à louer en Tunisie",
  },
  reservation: {
    title: "Réserver une voiture en ligne Tunisie — Syrine Rent Car",
    description:
      "Réservez votre location de voiture en Tunisie en quelques clics via WhatsApp. Indiquez dates, modèle et lieu de prise en charge — confirmation rapide à M'saken, Sousse ou aéroport Tunis.",
    keywords:
      "réserver voiture Tunisie, book a car online Tunisia, reserve rental car Tunisia, louer voiture WhatsApp Tunisie, réservation location auto Sousse, no deposit car rental Tunisia",
    canonical: `${SITE.url}/reservation`,
    h1: "Réserver votre voiture de location en Tunisie",
  },
  contact: {
    title: "Contact — Syrine Rent Car Tunisie | Tél. +216 26 275 640",
    description:
      "Contactez Syrine Rent Car pour une location en Tunisie : Bd Dr Taieb Hachicha, M'saken 4070. Téléphone, WhatsApp, email, plan d'accès. Lun–sam 8h–18h. Airport pickup & delivery available.",
    keywords:
      "contact location voiture Tunisie, Syrine Rent Car téléphone, adresse agence Sousse, WhatsApp location auto M'saken, car rental Tunis Airport contact",
    canonical: `${SITE.url}/contact`,
    h1: "Contactez Syrine Rent Car — location voiture Tunisie",
  },
};

/** French FAQ items for FAQPage schema and on-page accordion (home). */
export const FAQ_ITEMS_FR: { question: string; answer: string }[] = [
  {
    question: "Comment réserver une voiture en Tunisie avec Syrine Rent Car ?",
    answer:
      "Choisissez votre véhicule sur notre flotte en ligne, puis complétez le formulaire de réservation ou contactez-nous par WhatsApp. Nous confirmons rapidement les dates, le lieu de prise en charge (agence M'saken, aéroport Tunis ou livraison) et le modèle souhaité.",
  },
  {
    question: "Proposez-vous la location de voiture à l'aéroport de Tunis ?",
    answer:
      "Oui. Nous organisons la prise en charge et la livraison à l'aéroport Tunis-Carthage (TUN) ainsi que dans les gares. Idéal pour un airport car rental Tunisia sans stress — contactez-nous pour organiser votre Tunisia airport pickup.",
  },
  {
    question: "Quelles villes couvrez-vous en Tunisie ?",
    answer:
      "Notre agence est à M'saken, près de Sousse. Nous desservons Tunis, Sousse, Monastir, Hammamet, Mahdia, Djerba et Sfax pour la livraison, les transferts et la location courte ou longue durée.",
  },
  {
    question: "Quels types de véhicules sont disponibles ?",
    answer:
      "Citadines économiques, compactes automatiques, crossovers familiaux et SUV spacieux (Renault Clio, Kia Picanto, Hyundai i20, Dacia Sandero, Fiat Panda 4x4, Mahindra XUV300). Options economy, automatic, family et SUV rental Tunisia.",
  },
  {
    question: "Proposez-vous la location longue durée ou mensuelle ?",
    answer:
      "Oui — location à la journée, à la semaine ou monthly car rental Tunisia pour particuliers et business car rental Tunisia. Tarifs transparents, sans frais cachés. Contactez-nous pour un devis long term vehicle rental Tunisia.",
  },
  {
    question: "Faut-il un dépôt pour louer une voiture ?",
    answer:
      "Les conditions varient selon le véhicule et la durée. Nous privilégions une location simple et transparente — demandez nos options no deposit car rental Tunisia lors de votre réservation par WhatsApp ou en agence.",
  },
];
