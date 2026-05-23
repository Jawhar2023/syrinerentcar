import { motion } from "framer-motion";
import { ExternalLink, MapPin, Send } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contactInfo";

/** Home page — agency map & address (Localisation). */
export function HomeLocationSection() {
  return (
    <section
      id="localisation"
      className="relative scroll-mt-24 py-20 md:py-24"
      aria-labelledby="home-location-heading"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Localisation</p>
            <h2
              id="home-location-heading"
              className="mt-3 font-display text-2xl font-bold text-foreground md:text-3xl"
            >
              Notre agence
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Retrouvez-nous sur le Bd Dr Taieb Hachicha à M&apos;saken — ouvrez l&apos;itinéraire dans Google Maps.
            </p>
          </div>

          <article className="mx-auto mt-6 max-w-md rounded-xl border border-border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold text-foreground">{CONTACT_INFO.brandName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{CONTACT_INFO.address}</p>
                <p className="mt-1 text-xs text-muted-foreground">Lun–Sam · 08:00 – 18:00</p>
              </div>
            </div>
            <a
              href={CONTACT_INFO.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20"
            >
              Ouvrir dans Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </article>

          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-border bg-muted/20 shadow-sm">
            <div className="relative h-[260px] w-full sm:h-[320px] md:h-[380px]">
              <iframe
                title={`${CONTACT_INFO.brandName} — Google Maps`}
                src={CONTACT_INFO.mapEmbedSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={CONTACT_INFO.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <Send className="h-4 w-4" aria-hidden />
              Itinéraire
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
