import { useTranslation } from "react-i18next";
import { SITE_IMAGES } from "@/lib/siteImages";

/** Home page — parallax fleet promo between fleet grid and testimonials. */
export function PromoBannerSection() {
  const { t } = useTranslation();

  return (
    <section className="promo-banner" aria-label={t("home.promoImageAlt")}>
      <div className="promo-banner__inner">
        <div className="promo-banner__media promo-banner__media--parallax">
          <picture className="promo-banner__picture">
            <img
              src={SITE_IMAGES.fleetPromo}
              alt={t("home.promoImageAlt")}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
