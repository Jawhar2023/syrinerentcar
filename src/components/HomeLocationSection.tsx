import { motion } from "framer-motion";
import { Clock, ExternalLink, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contactInfo";

const STOREFRONT_IMAGE = "/syrine-agency-storefront.png";

/** Home page — agency map & address (Localisation). */
export function HomeLocationSection() {
  return (
    <section
      id="localisation"
      className="relative scroll-mt-24 overflow-hidden py-20 md:py-28"
      aria-labelledby="home-location-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,hsl(351_96%_44%/0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <MapPin className="h-3.5 w-3.5" />
            Localisation
          </span>
          <h2
            id="home-location-heading"
            className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            Notre agence à M&apos;saken
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Passez nous voir au Bd Dr Taieb Hachicha — prise en charge sur place et livraison possible.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-stretch lg:gap-10">
          {/* Info panel */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)]"
          >
            <div className="relative h-44 overflow-hidden sm:h-52">
              <img
                src={STOREFRONT_IMAGE}
                alt="Façade Syrine Rent Car — agence de location M'saken"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{CONTACT_INFO.brandName}</p>
                <p className="font-display text-lg font-bold text-white">M&apos;saken · Sousse</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              <ul className="space-y-4">
                <li className="flex gap-3 rounded-xl bg-muted/40 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Adresse</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{CONTACT_INFO.address}</p>
                    <p className="text-xs text-muted-foreground">Sousse, Tunisie</p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-xl bg-muted/40 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Horaires</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">Lundi – Samedi</p>
                    <p className="text-sm text-muted-foreground">08:00 – 18:00 · Fermé dimanche</p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-xl bg-muted/40 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Téléphone</p>
                    <a href={`tel:${CONTACT_INFO.phoneTel}`} className="mt-0.5 block text-sm font-medium text-primary hover:underline">
                      {CONTACT_INFO.phoneDisplay}
                    </a>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <Mail className="h-3 w-3" />
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <a
                  href={CONTACT_INFO.mapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                  <Navigation className="h-4 w-4" />
                  Itinéraire
                </a>
                <a
                  href={CONTACT_INFO.mapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:text-primary"
                >
                  Google Maps
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.aside>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[320px] overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] sm:min-h-[420px] lg:min-h-0"
          >
            <iframe
              title={`${CONTACT_INFO.brandName} — Google Maps`}
              src={CONTACT_INFO.mapEmbedSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
