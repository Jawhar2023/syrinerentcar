import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Car, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { CONTACT_INFO } from "@/lib/contactInfo";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { BreadCrumb } from "@/seo/BreadCrumb";
import { breadcrumbSchema } from "@/seo/schemas";
import { locationServiceSchema } from "@/seo/locationSchemas";
import {
  buildLocationSeo,
  getLocationBySlug,
  getNearbyLocations,
  locationPath,
  LOCATIONS_HUB_PATH,
} from "@/seo/locations";
import { ROUTES } from "@/seo/seoConfig";

const LocationCityPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const location = citySlug ? getLocationBySlug(citySlug) : undefined;

  if (!location) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SEOHead page="about" noindex overrides={{ title: "Page introuvable", canonical: ROUTES.home }} />
        <header>
          <Navbar variant="default" />
        </header>
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-24">
          <h1 className="font-display text-2xl font-bold">Ville introuvable</h1>
          <Link to={LOCATIONS_HUB_PATH} className="mt-6 text-primary hover:underline">
            Voir toutes les villes
          </Link>
        </main>
        <footer>
          <FooterSection />
        </footer>
      </div>
    );
  }

  const seo = buildLocationSeo(location);
  const nearby = getNearbyLocations(location.slug);
  const crumbs = [
    { name: "Accueil", path: ROUTES.home },
    { name: "Location voiture Tunisie", path: LOCATIONS_HUB_PATH },
    { name: location.name, path: locationPath(location.slug) },
  ];

  const faq = [
    {
      q: `Comment louer une voiture à ${location.name} ?`,
      a: `Choisissez un véhicule sur notre flotte en ligne, puis réservez par WhatsApp ou formulaire. Nous organisons la livraison à ${location.name} : ${location.deliveryNote}`,
    },
    {
      q: `Livrez-vous à ${location.name} depuis M'saken ?`,
      a: `Oui. Syrine Rent Car est basée à M'saken (Sousse). Nous livrons à ${location.name} et dans tout le gouvernorat ${location.governorate} sur réservation.`,
    },
    {
      q: `Quels véhicules sont disponibles pour ${location.name} ?`,
      a: "Renault Clio, Kia Picanto, Skoda Fabia, Hyundai i20, Dacia Sandero Stepway, Fiat Panda 4x4 et Mahindra XUV300 — citadines, compactes et SUV pour tourisme ou affaires.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        page="about"
        overrides={{
          title: seo.title,
          description: seo.description,
          keywords: seo.keywords,
          canonical: seo.canonical,
          h1: seo.h1,
        }}
      />
      <JsonLd schema={breadcrumbSchema(crumbs)} />
      <JsonLd schema={locationServiceSchema(location)} />

      <header>
        <Navbar variant="default" />
      </header>

      <main className="relative pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(351_96%_44%/0.06),transparent_55%)]" />

        <div className="container relative mx-auto max-w-4xl px-4 py-12 md:py-16">
          <BreadCrumb crumbs={crumbs} className="mb-8" />

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {location.governorate} · {location.region}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">{seo.h1}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Syrine Rent Car vous propose la <strong className="text-foreground">location de voiture à {location.name}</strong>{" "}
              avec livraison depuis notre agence à M&apos;saken. {location.deliveryNote} Tarifs clairs, véhicules récents,
              réservation rapide par WhatsApp.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: MapPin, title: "Livraison locale", body: location.deliveryNote },
              { icon: Car, title: "Flotte variée", body: "Citadines, SUV et automatiques pour tous vos déplacements." },
              { icon: Phone, title: "WhatsApp rapide", body: `Réservez au ${CONTACT_INFO.phoneDisplay} — confirmation sous 24h.` },
              { icon: ShieldCheck, title: "Agence de confiance", body: "Basée à M'saken depuis des années — service local et transparent." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card/40 p-5">
                <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden />
                <h2 className="font-display text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          {location.highlights.length > 0 && (
            <section className="mt-12" aria-labelledby="highlights-heading">
              <h2 id="highlights-heading" className="font-display text-xl font-bold md:text-2xl">
                Pourquoi louer à {location.name} ?
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {location.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-12 flex flex-col gap-4 sm:flex-row" aria-label="Actions">
            <Link
              to={ROUTES.fleet}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4" />
              Voir la flotte
            </Link>
            <Link
              to={ROUTES.reservation}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/50 px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary/10"
            >
              Réserver maintenant
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="mt-14" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="font-display text-xl font-bold md:text-2xl">
              Questions fréquentes — location voiture {location.name}
            </h2>
            <div className="mt-6 space-y-4">
              {faq.map((item) => (
                <details key={item.q} className="group rounded-2xl border border-border bg-card/30 p-5">
                  <summary className="cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          {nearby.length > 0 && (
            <section className="mt-14" aria-labelledby="nearby-heading">
              <h2 id="nearby-heading" className="font-display text-xl font-bold md:text-2xl">
                Autres villes desservies
              </h2>
              <nav className="mt-4 flex flex-wrap gap-2" aria-label="Villes proches">
                {nearby.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={locationPath(loc.slug)}
                    className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    Location voiture {loc.name}
                  </Link>
                ))}
                <Link
                  to={LOCATIONS_HUB_PATH}
                  className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
                >
                  Toute la Tunisie →
                </Link>
              </nav>
            </section>
          )}
        </div>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default LocationCityPage;
