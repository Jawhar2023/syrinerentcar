import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ExternalLink, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { cn } from "@/lib/utils";
import { CONTACT_INFO } from "@/lib/contactInfo";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { BreadCrumb } from "@/seo/BreadCrumb";
import { breadcrumbSchema } from "@/seo/schemas";
import { PAGES, ROUTES } from "@/seo/seoConfig";
import {
  CalendarOutlineIcon,
  ClockOutlineIcon,
  FacebookBrandIcon,
  InstagramBrandIcon,
  LocationPinIcon,
  MailEnvelopeIcon,
  PhoneHandsetIcon,
  WhatsAppBrandIcon,
} from "@/components/icons/SocialContactIcons";

const {
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  faxDisplay: FAX_DISPLAY,
  faxTel: FAX_TEL,
  whatsapp: WHATSAPP_HREF,
  email: EMAIL,
  mapsQuery: MAPS_QUERY,
  address: ADDRESS,
  facebook: FACEBOOK_URL,
  facebookLabel: FACEBOOK_LABEL,
  instagram: INSTAGRAM_URL,
  instagramLabel: INSTAGRAM_LABEL,
  brandName: BRAND_NAME,
  mapEmbedSrc: MAP_EMBED_SRC,
  calendlyUrl: CALENDLY_MEETING_URL,
} = CONTACT_INFO;

const CALENDLY_EMBED_SRC = `${CALENDLY_MEETING_URL}?embed=true&hide_gdpr_banner=1`;

const Contact = () => {
  const { t } = useTranslation();
  const crumbs = [
    { name: "Accueil", path: ROUTES.home },
    { name: "Contact", path: ROUTES.contact },
  ];
  const cardBase =
    "group flex items-start gap-4 rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_32px_-8px_hsl(351_96%_44%/0.22)]";

  const iconWrap =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/18 group-hover:ring-primary/35";

  /** Tighter card for quick Calendly shortcut (matches address row layout, less padding) */
  const cardBookCompact =
    "group flex items-center gap-3 rounded-xl border border-border/70 bg-card/50 px-3.5 py-3 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_-8px_hsl(351_96%_44%/0.18)]";

  const iconBookCompact =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/18 group-hover:ring-primary/30";

  return (
    <div className="min-h-screen bg-[hsl(230_30%_3%)] text-foreground">
      <SEOHead page="contact" />
      <JsonLd schema={breadcrumbSchema(crumbs)} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(351_96%_44%/0.08),transparent_55%)]" />

      <header>
        <Navbar variant="contact" />
      </header>

      <main className="relative z-10 pt-20 pb-16 md:pt-24 md:pb-24">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center md:mb-16 md:text-left"
          >
            <BreadCrumb crumbs={crumbs} className="mb-6 justify-center md:justify-start" />
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">{t("contact.label")}</p>
            <h1
              id="contact-page-heading"
              className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              {PAGES.contact.h1}
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{t("contact.subtitle")}</p>
          </motion.header>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left — contact cards */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-display text-lg font-semibold text-primary md:text-xl">Contact details</h2>
                <p className="mt-1 text-sm text-muted-foreground">Everything you need to reach {BRAND_NAME}.</p>
              </div>

              <div className="space-y-3">
                <a href={`tel:${PHONE_TEL}`} className={cardBase}>
                  <div className={iconWrap}>
                    <PhoneHandsetIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone</p>
                    <p className="mt-0.5 font-medium text-foreground">{PHONE_DISPLAY}</p>
                  </div>
                </a>

                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={cardBase}>
                  <div className={cn(iconWrap, "text-[#25D366]")}>
                    <WhatsAppBrandIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                    <p className="mt-0.5 font-medium text-primary">{PHONE_DISPLAY}</p>
                  </div>
                </a>

                <a href={`tel:${FAX_TEL}`} className={cardBase}>
                  <div className={iconWrap}>
                    <PhoneHandsetIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Fax</p>
                    <p className="mt-0.5 font-medium text-foreground">{FAX_DISPLAY}</p>
                  </div>
                </a>

                <a href={`mailto:${EMAIL}`} className={cardBase}>
                  <div className={iconWrap}>
                    <MailEnvelopeIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                    <p className="mt-0.5 font-medium text-foreground break-all">{EMAIL}</p>
                  </div>
                </a>

                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={cardBase}>
                  <div className={cn(iconWrap, "text-[#1877F2]")}>
                    <FacebookBrandIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Facebook</p>
                    <p className="mt-0.5 font-medium text-foreground">{FACEBOOK_LABEL}</p>
                  </div>
                </a>

                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={cardBase}>
                  <div className={iconWrap}>
                    <InstagramBrandIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Instagram</p>
                    <p className="mt-0.5 font-medium text-foreground">{INSTAGRAM_LABEL}</p>
                  </div>
                </a>

                <a
                  href={CALENDLY_MEETING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardBookCompact}
                >
                  <div className={iconBookCompact}>
                    <CalendarOutlineIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Book appointment
                    </p>
                    <p className="mt-0.5 text-sm font-medium leading-tight text-foreground">
                      Schedule a time via Calendly
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors group-hover:text-primary/90">
                      Book now
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>

                <div className={cardBase}>
                  <div className={iconWrap}>
                    <LocationPinIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Address</p>
                    <p className="mt-0.5 font-medium text-foreground">{ADDRESS}</p>
                    <a
                      href={MAPS_QUERY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Get directions
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                <div className={cardBase}>
                  <div className={iconWrap}>
                    <ClockOutlineIcon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-2 text-sm text-muted-foreground">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Opening hours</p>
                    <p>
                      <span className="text-foreground">Monday – Saturday</span> · 8:00 – 18:00
                    </p>
                    <p>
                      <span className="text-foreground">Sunday</span> · Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — booking */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div
                className={cn(
                  "rounded-2xl border border-primary/30 bg-gradient-to-b from-card/80 to-card/40 p-4 shadow-[0_0_0_1px_hsl(351_96%_44%/0.12),0_0_48px_-16px_hsl(351_96%_44%/0.3)] backdrop-blur-md md:p-5",
                )}
              >
                <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                      <CalendarOutlineIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-bold leading-tight text-foreground md:text-xl">
                        Book a meeting
                      </h2>
                      <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
                        Pick a time in Calendly — confirmation by email.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    Calendly
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <iframe
                    title="Schedule a meeting with Calendly"
                    src={CALENDLY_EMBED_SRC}
                    className="h-[380px] w-full border-0 bg-white sm:h-[420px]"
                    loading="lazy"
                    allow="camera; microphone; fullscreen; payment"
                  />
                </div>

                <a
                  href={CALENDLY_MEETING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80 md:text-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open in a new tab
                </a>

                <p className="mt-3 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 text-center text-xs text-muted-foreground md:text-sm">
                  <span className="text-foreground">Urgent?</span> Call{" "}
                  <a href={`tel:${PHONE_TEL}`} className="font-semibold text-primary hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Location — full width, directly above the site footer */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 border-t border-border/50 pt-14 md:mt-20 md:pt-16"
            aria-labelledby="location-heading"
          >
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Location</p>
              <h2
                id="location-heading"
                className="font-serif mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]"
              >
                Find us
              </h2>
            </div>

            <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-border/60 bg-card/30 shadow-[0_0_0_1px_hsl(351_96%_44%/0.08),0_24px_48px_-24px_rgba(0,0,0,0.5)]">
              <div className="relative h-[280px] w-full sm:h-[320px] md:h-[380px] lg:h-[420px]">
                <iframe
                  title={`${BRAND_NAME} — Google Maps`}
                  src={MAP_EMBED_SRC}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href={MAPS_QUERY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_28px_-6px_hsl(351_96%_44%/0.55)] transition hover:bg-primary/90 hover:shadow-[0_0_32px_-4px_hsl(351_96%_44%/0.45)]"
              >
                <Send className="h-4 w-4" aria-hidden />
                Get directions
              </a>
            </div>
          </motion.section>
        </div>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default Contact;
