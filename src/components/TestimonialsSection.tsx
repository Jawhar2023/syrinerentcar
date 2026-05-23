import { motion } from "framer-motion";
import { ExternalLink, MapPin, Send, Star } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contactInfo";

const CLIENT_REVIEWS = [
  {
    author: "amani youssef",
    rating: 5,
    text: "Un service excellant ❤️",
    time: "il y a 6 ans",
  },
  {
    author: "ghaya farhat",
    rating: 5,
    text: "Avis 5 étoiles sur Google",
    time: "il y a 9 mois",
  },
  {
    author: "Mohamed Ben Amor",
    rating: 1,
    text: "Pas très agréable",
    time: "il y a 2 ans",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="reviews" className="relative py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-6xl px-4"
      >
        <div className="mb-14 text-center md:mb-16">
          <h2 className="font-display text-4xl font-bold md:text-6xl">Avis clients</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Partagez votre expérience avec {CONTACT_INFO.brandName} sur Google — votre avis aide d&apos;autres
            clients à nous trouver.
          </p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-xl rounded-2xl border border-border bg-card/45 p-6 text-center shadow-sm md:p-8"
        >
          <p className="font-display text-xl font-semibold text-foreground md:text-2xl">{CONTACT_INFO.brandName}</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="text-lg font-semibold text-foreground">{CONTACT_INFO.googleRating}</span>
            <span>({CONTACT_INFO.googleReviewCount} avis Google)</span>
          </div>
          <a
            href={CONTACT_INFO.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Rédiger un avis
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl border border-border bg-card/45 p-6"
        >
          <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">Ce que disent nos clients</h3>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {CLIENT_REVIEWS.map((review) => (
              <article key={review.author} className="rounded-xl border border-border bg-background/30 p-4">
                <div className="mb-2 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
                <p className="mt-3 text-xs font-medium text-foreground">{review.author}</p>
                <p className="text-xs text-muted-foreground">{review.time}</p>
              </article>
            ))}
          </motion.div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={CONTACT_INFO.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Ajouter votre avis
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Merci de soutenir {CONTACT_INFO.brandName}.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card/30 p-6 shadow-[0_0_60px_hsl(351_96%_44%/0.06)] md:p-8"
          aria-labelledby="home-location-heading"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Localisation</p>
            <h3
              id="home-location-heading"
              className="font-display mt-3 text-2xl font-bold text-foreground md:text-3xl"
            >
              Notre agence
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Retrouvez-nous sur le Bd Dr Taieb Hachicha à M&apos;saken — ouvrez l&apos;itinéraire dans Google Maps.
            </p>
          </motion.div>

          <article className="mx-auto mt-6 max-w-md rounded-xl border border-border bg-card/50 p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold text-foreground">{CONTACT_INFO.brandName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{CONTACT_INFO.address}</p>
                <p className="mt-1 text-xs text-muted-foreground">Lun · 08:00 – 18:00</p>
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

          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-card/30 shadow-[0_0_0_1px_hsl(351_96%_44%/0.08),0_24px_48px_-24px_rgba(0,0,0,0.5)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-[260px] w-full sm:h-[320px] md:h-[380px]"
            >
              <iframe
                title={`${CONTACT_INFO.brandName} — Google Maps`}
                src={CONTACT_INFO.mapEmbedSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center">
            <a
              href={CONTACT_INFO.mapsQuery}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_28px_-6px_hsl(351_96%_44%/0.55)] transition hover:bg-primary/90"
            >
              <Send className="h-4 w-4" aria-hidden />
              Itinéraire
            </a>
          </div>
        </motion.section>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
