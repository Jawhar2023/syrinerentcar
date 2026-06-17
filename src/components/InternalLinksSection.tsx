import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ROUTES } from "@/seo/seoConfig";
import { locationPath } from "@/seo/locations";

/** Contextual internal links with keyword-rich anchor text for SEO. */
export function InternalLinksSection() {
  const { t } = useTranslation();
  const links = t("internalLinks.items", { returnObjects: true }) as { href: string; label: string }[];

  if (!Array.isArray(links) || links.length === 0) return null;

  const routeMap: Record<string, string> = {
    home: ROUTES.home,
    fleet: ROUTES.fleet,
    about: ROUTES.about,
    reservation: ROUTES.reservation,
    contact: ROUTES.contact,
    locationsHub: ROUTES.locationsHub,
    locationSousse: locationPath("sousse"),
    locationMonastir: locationPath("monastir"),
    locationTunis: locationPath("tunis"),
    locationHammamet: locationPath("hammamet"),
    faq: `${ROUTES.home}#faq`,
  };

  return (
    <section
      className="border-t border-border/40 bg-background py-12 md:py-16"
      aria-labelledby="internal-links-heading"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            id="internal-links-heading"
            className="font-display text-lg font-semibold text-foreground md:text-xl"
          >
            {t("internalLinks.title")}
          </h2>
          <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-2" aria-label={t("internalLinks.navLabel")}>
            {links.map((link) => {
              const to = routeMap[link.href] ?? link.href;
              const isHash = to.includes("#");
              if (isHash) {
                return (
                  <a
                    key={link.href}
                    href={to}
                    className="text-sm text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={to}
                  className="text-sm text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
