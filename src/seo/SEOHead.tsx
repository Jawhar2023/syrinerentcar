import { Helmet } from "react-helmet-async";
import { PAGES, SITE, type PageSeo, type PageSeoKey } from "@/seo/seoConfig";

interface SEOHeadProps {
  page: PageSeoKey;
  /** Optional overrides (e.g. vehicle detail pages). */
  overrides?: Partial<PageSeo>;
}

/** Per-page meta, Open Graph, Twitter Card, geo and canonical tags. */
export function SEOHead({ page, overrides }: SEOHeadProps) {
  const meta = { ...PAGES[page], ...overrides };
  const { geo } = SITE;

  return (
    <Helmet prioritizeSeoTags>
      <html lang={SITE.language} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <link rel="canonical" href={meta.canonical} />

      <meta name="geo.region" content={geo.region} />
      <meta name="geo.placename" content={geo.placename} />
      <meta name="geo.position" content={geo.position} />
      <meta name="ICBM" content={geo.icbm} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:image" content={SITE.ogImage} />
      <meta property="og:image:alt" content={`${SITE.name} — agence de location à M'saken`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={SITE.ogImage} />

      <meta name="robots" content="index, follow, max-image-preview:large" />
    </Helmet>
  );
}
