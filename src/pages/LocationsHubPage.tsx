import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { BreadCrumb } from "@/seo/BreadCrumb";
import { breadcrumbSchema } from "@/seo/schemas";
import {
  getLocationsByGovernorate,
  locationPath,
  LOCATIONS,
  LOCATIONS_HUB_PATH,
} from "@/seo/locations";
import { ROUTES, SITE } from "@/seo/seoConfig";

const hubSeo = {
  title: "Location voiture Tunisie — Toutes les villes pas cher | Syrine Rent Car",
  description:
    "Louez une voiture pas cher partout en Tunisie : Sousse, M'saken, Monastir, Tunis, Hammamet, Djerba, Sfax, Tozeur. Livraison aéroport, réservation WhatsApp — agence locale M'saken.",
  keywords:
    "location voiture Tunisie, location voiture pas cher Tunisie, louer voiture Sousse, location voiture Monastir, location voiture Hammamet, location voiture Djerba, location voiture Tunis, location voiture aéroport Tunis, location voiture Sahel, agence location voiture Tunisie, Syrine Rent Car",
  canonical: `${SITE.url}${LOCATIONS_HUB_PATH}`,
  h1: "Location voiture en Tunisie — toutes nos villes",
};

const LocationsHubPage = () => {
  const byGov = getLocationsByGovernorate();
  const sortedGovs = [...byGov.keys()].sort((a, b) => a.localeCompare(b, "fr"));

  const crumbs = [
    { name: "Accueil", path: ROUTES.home },
    { name: "Location voiture Tunisie", path: LOCATIONS_HUB_PATH },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead page="about" overrides={hubSeo} />
      <JsonLd schema={breadcrumbSchema(crumbs)} />

      <header>
        <Navbar variant="default" />
      </header>

      <main className="relative pt-20">
        <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
          <BreadCrumb crumbs={crumbs} className="mb-8" />

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold md:text-5xl">{hubSeo.h1}</h1>
            <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
              Syrine Rent Car, agence à M&apos;saken (Sousse), livre des véhicules dans tout le territoire tunisien.
              Choisissez votre ville pour voir les options de livraison et réserver en ligne.
            </p>
          </motion.div>

          <div className="mt-8 rounded-2xl border border-primary/25 bg-primary/5 p-5">
            <p className="text-sm font-medium text-foreground">
              <MapPin className="mr-2 inline h-4 w-4 text-primary" aria-hidden />
              Agence principale :{" "}
              <Link to={ROUTES.about} className="text-primary hover:underline">
                Location voiture M&apos;saken
              </Link>{" "}
              — {SITE.fullAddress}
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {sortedGovs.map((gov) => {
              const cities = byGov.get(gov) ?? [];
              return (
                <section key={gov} aria-labelledby={`gov-${gov}`}>
                  <h2 id={`gov-${gov}`} className="font-display text-xl font-bold text-primary md:text-2xl">
                    {gov}
                  </h2>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {cities.map((loc) => (
                      <li key={loc.slug}>
                        <Link
                          to={locationPath(loc.slug)}
                          className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-card/50 hover:text-primary"
                        >
                          <MapPin className="h-4 w-4 shrink-0 text-primary/70" aria-hidden />
                          Location voiture {loc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            {LOCATIONS.length} destinations ·{" "}
            <Link to={ROUTES.fleet} className="text-primary hover:underline">
              Voir notre flotte
            </Link>
          </p>
        </div>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default LocationsHubPage;
