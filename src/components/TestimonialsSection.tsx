import { motion } from "framer-motion";
import { ExternalLink, MessageSquareQuote, Star } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contactInfo";
import { cn } from "@/lib/utils";

const CLIENT_REVIEWS = [
  {
    author: "Amani Youssef",
    initials: "AY",
    rating: 5,
    text: "Un service excellant ❤️",
    time: "il y a 6 ans",
  },
  {
    author: "Ghaya Farhat",
    initials: "GF",
    rating: 5,
    text: "Avis 5 étoiles sur Google — très satisfaite de la location.",
    time: "il y a 9 mois",
  },
  {
    author: "Mohamed Ben Amor",
    initials: "MB",
    rating: 1,
    text: "Pas très agréable",
    time: "il y a 2 ans",
  },
];

function StarRow({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <motion.div
      className="flex items-center gap-0.5"
      aria-label={`${rating} sur 5 étoiles`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            iconClass,
            i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/25",
          )}
        />
      ))}
    </motion.div>
  );
}

const TestimonialsSection = () => {
  const sortedReviews = [...CLIENT_REVIEWS].sort((a, b) => b.rating - a.rating);

  return (
    <section id="reviews" className="relative overflow-hidden bg-muted/40 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,hsl(351_96%_44%/0.08),transparent_65%)]"
        aria-hidden
      />

      <motion.div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
            <MessageSquareQuote className="h-3.5 w-3.5" />
            Google Reviews
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Avis clients
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            La confiance de nos clients à M&apos;saken compte pour nous. Partagez votre expérience sur Google.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-10">
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] md:p-8 lg:sticky lg:top-28"
          >
            <motion.div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background shadow-sm ring-1 ring-border">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Note Google</p>
                  <p className="font-display text-lg font-bold text-foreground">{CONTACT_INFO.brandName}</p>
                </div>
              </div>

              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-5xl font-bold leading-none text-foreground">
                  {CONTACT_INFO.googleRating}
                </span>
                <div className="pb-1">
                  <StarRow rating={Math.round(Number(CONTACT_INFO.googleRating))} />
                  <p className="mt-1 text-xs text-muted-foreground">{CONTACT_INFO.googleReviewCount} avis</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const pct = stars === 5 ? 60 : stars === 4 ? 20 : stars === 1 ? 20 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-3">{stars}</span>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full rounded-full bg-amber-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href={CONTACT_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Rédiger un avis
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.aside>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sortedReviews.map((review, i) => (
              <motion.article
                key={review.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition duration-300",
                  "hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_12px_32px_-16px_rgba(221,4,38,0.2)]",
                )}
              >
                <MessageSquareQuote
                  className="absolute right-4 top-4 h-8 w-8 text-primary/10 transition group-hover:text-primary/20"
                  aria-hidden
                />
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      review.rating >= 4 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {review.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.time}</p>
                  </div>
                </div>
                <StarRow rating={review.rating} size="sm" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
