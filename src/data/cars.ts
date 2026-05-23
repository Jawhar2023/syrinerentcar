export interface Car {
  id: string;
  name: string;
  brand: string;
  type: string;
  /** Omitted or 0 when prices are not shown on the site */
  pricePerDay?: number;
  horsepower: number;
  acceleration: string;
  fuelType: string;
  image: string;
  rating: number;
  reviews: number;
  available: boolean;
  seats: number;
  transmission: string;
  limitedAvailability?: boolean;
  registration?: string;
  /** Short description for detail page */
  description?: string;
}

export const cars: Car[] = [
  {
    id: "renault-clio",
    name: "Clio",
    brand: "Renault",
    type: "compact",
    horsepower: 130,
    acceleration: "9.0s",
    fuelType: "Essence",
    image: "/cars/renault-clio.jpeg",
    rating: 4.8,
    reviews: 42,
    available: true,
    seats: 5,
    transmission: "Automatique",
    description:
      "Citadine moderne, idéale en ville et pour les trajets quotidiens. Finition Esprit Alpine, confortable et économique.",
  },
  {
    id: "kia-picanto",
    name: "Picanto",
    brand: "Kia",
    type: "city",
    horsepower: 84,
    acceleration: "11.5s",
    fuelType: "Essence",
    image: "/cars/kia-picanto.jpeg",
    rating: 4.7,
    reviews: 38,
    available: true,
    seats: 5,
    transmission: "Manuelle",
    description:
      "Petite citadine agile et facile à garer — parfaite pour M'saken et les déplacements urbains.",
  },
  {
    id: "skoda-fabia",
    name: "Fabia Monte Carlo",
    brand: "Skoda",
    type: "compact",
    horsepower: 110,
    acceleration: "9.7s",
    fuelType: "Essence",
    image: "/cars/skoda-fabia.jpeg",
    rating: 4.8,
    reviews: 35,
    available: true,
    seats: 5,
    transmission: "Automatique",
    description:
      "Compacte sportive à toit noir, finition Monte Carlo. Confort et style pour la ville et la route.",
  },
  {
    id: "hyundai-i20",
    name: "i20",
    brand: "Hyundai",
    type: "compact",
    horsepower: 100,
    acceleration: "10.2s",
    fuelType: "Essence",
    image: "/cars/hyundai-i20.jpeg",
    rating: 4.7,
    reviews: 31,
    available: true,
    seats: 5,
    transmission: "Automatique",
    description:
      "Berline compacte récente, équipements modernes et consommation maîtrisée.",
  },
  {
    id: "dacia-sandero-stepway",
    name: "Sandero Stepway",
    brand: "Dacia",
    type: "crossover",
    horsepower: 110,
    acceleration: "10.5s",
    fuelType: "Essence",
    image: "/cars/dacia-sandero-stepway.jpeg",
    rating: 4.6,
    reviews: 48,
    available: true,
    seats: 5,
    transmission: "Manuelle",
    description:
      "Crossover accessible avec garde au sol renforcée — idéal pour la famille et les routes tunisiennes.",
  },
  {
    id: "fiat-panda-4x4",
    name: "Panda 4x4",
    brand: "Fiat",
    type: "crossover",
    horsepower: 85,
    acceleration: "12.0s",
    fuelType: "Essence",
    image: "/cars/fiat-panda-4x4.jpeg",
    rating: 4.5,
    reviews: 29,
    available: true,
    seats: 5,
    transmission: "Manuelle",
    description:
      "Compacte 4x4 pratique et robuste, parfaite pour la ville comme pour les chemins secondaires.",
  },
  {
    id: "mahindra-xuv300",
    name: "XUV300",
    brand: "Mahindra",
    type: "suv",
    horsepower: 130,
    acceleration: "9.5s",
    fuelType: "Diesel",
    image: "/cars/mahindra-xuv300.jpeg",
    rating: 4.7,
    reviews: 44,
    available: true,
    seats: 5,
    transmission: "Automatique",
    description:
      "SUV spacieux avec bonne habitabilité et position de conduite haute — confort pour toute la famille.",
  },
];

export const carTypes = ["all", "city", "compact", "crossover", "suv"] as const;

export const vipFleetCars = cars;
