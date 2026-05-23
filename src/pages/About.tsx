import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  Clock,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { CONTACT_INFO } from "@/lib/contactInfo";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/seo/SEOHead";
import { JsonLd } from "@/seo/JsonLd";
import { BreadCrumb } from "@/seo/BreadCrumb";
import { breadcrumbSchema } from "@/seo/schemas";
import { PAGES, ROUTES } from "@/seo/seoConfig";

const STOREFRONT_IMAGE = "/syrine-agency-storefront.png";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const About = () => {
  const { t } = useTranslation();

  const stats = useMemo(
    () => [
      { val: CONTACT_INFO.googleRating, label: t("about.statRating"), icon: Star },
      { val: t("about.statLocationVal"), label: t("about.statLocation"), icon: MapPin },
      { val: t("about.statFleetVal"), label: t("about.statFleet"), icon: Car },
      { val: t("about.statHoursVal"), label: t("about.statHours"), icon: Clock },
    ],
    [t],
  );

  const services = useMemo(
    () => [
      { icon: Car, title: t("about.s1t"), body: t("about.s1d") },
      { icon: Sparkles, title: t("about.s2t"), body: t("about.s2d") },
      { icon: Users, title: t("about.s3t"), body: t("about.s3d") },
      { icon: Shield, title: t("about.s4t"), body: t("about.s4d") },
    ],
    [t],
  );

  const values = useMemo(
    () => [
      { title: t("about.v1t"), body: t("about.v1d") },
      { title: t("about.v2t"), body: t("about.v2d") },
      { title: t("about.v3t"), body: t("about.v3d") },
    ],
    [t],
  );

  const crumbs = [
    { name: "Accueil", path: ROUTES.home },
    { name: "Agence M'saken", path: ROUTES.about },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead page="about" />
      <JsonLd schema={breadcrumbSchema(crumbs)} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(351_96%_44%/0.05),transparent_55%)]" />

      <header>
        <Navbar variant="about" />
      </header>

      <main className="relative z-10 pt-20">
        <section className="border-b border-border/50" aria-labelledby="about-page-heading">
          <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
            <BreadCrumb crumbs={crumbs} className="mb-6" />
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">{t("about.label")}</p>
                <h1
                  id="about-page-heading"
                  className="font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
                >
                  {PAGES.about.h1}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("about.lead")}</p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/90">{t("about.lead2")}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.fleet}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-primary/90"
                  >
                    {t("about.ctaFleet")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={ROUTES.contact}
                    className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary transition hover:bg-primary/20"
                  >
                    {t("about.ctaContact")}
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="overflow-hidden rounded-2xl border border-border/60 shadow-[0_0_0_1px_hsl(351_96%_44%/0.12),0_32px_64px_-24px_rgba(0,0,0,0.65)]">
                  <img
                    src={STOREFRONT_IMAGE}
                    alt="Façade de l'agence Syrine Rent Car — location de voiture Bd Dr Taieb Hachicha, M'saken 4070"
                    className="aspect-[4/3] w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">{t("about.agencyBadge")}</p>
                    <p className="mt-1 font-display text-lg font-bold text-white md:text-xl">{CONTACT_INFO.brandName}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl"
                  aria-hidden
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border/50 bg-card/20 py-12 md:py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="rounded-2xl border border-border/70 bg-card/40 p-5 text-center md:p-6 md:text-start"
                >
                  <s.icon className="mx-auto mb-3 h-5 w-5 text-primary md:mx-0" aria-hidden />
                  <p className="font-display text-2xl font-bold text-foreground md:text-3xl">{s.val}</p>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story + mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <motion.div {...fadeUp} className="lg:col-span-5">
                <h2 className="font-display text-3xl font-bold md:text-4xl">{t("about.storyTitle")}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.story1")}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.story2")}</p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ delay: 0.08 }}
                className="lg:col-span-7 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/30 to-card/10 p-8 md:p-10"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{t("about.missionLabel")}</p>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{t("about.missionTitle")}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.missionText")}</p>
                <ul className="mt-6 space-y-3">
                  {[t("about.bullet1"), t("about.bullet2"), t("about.bullet3")].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full-width agency photo */}
        <section className="border-y border-border/50 bg-card/15 py-16 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div {...fadeUp} className="mb-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{t("about.agencyTitle")}</p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t("about.agencySubtitle")}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("about.agencyCaption")}</p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="overflow-hidden rounded-2xl border border-border/60 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)]"
            >
              <img
                src={STOREFRONT_IMAGE}
                alt="Agence Syrine Rent Car à M'saken — location voiture Sousse, Tunisie"
                className="max-h-[520px] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">{t("about.servicesTitle")}</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("about.servicesLead")}</p>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <motion.article
                  key={s.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="group rounded-2xl border border-border/70 bg-card/40 p-6 transition hover:border-primary/35 hover:bg-card/60"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25 transition group-hover:bg-primary/20">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border/50 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div {...fadeUp} className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">{t("about.valuesTitle")}</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("about.valuesLead")}</p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-border/70 bg-card/35 p-8",
                    i === 1 && "md:-translate-y-2 md:shadow-[0_20px_40px_-20px_hsl(351_96%_44%/0.25)]",
                  )}
                >
                  <span className="font-display text-5xl font-black text-primary/15">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              {...fadeUp}
              className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/15 via-card/50 to-card/30 p-8 text-center md:p-12"
            >
              <h2 className="font-display text-2xl font-bold md:text-3xl">{t("about.ctaTitle")}</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{t("about.ctaSubtitle")}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to={ROUTES.contact}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_0_28px_-6px_hsl(351_96%_44%/0.55)] transition hover:bg-primary/90"
                >
                  {t("about.ctaContact")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={CONTACT_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#25D366]/50 bg-[#25D366]/10 px-7 py-3.5 text-sm font-bold text-[#25D366] transition hover:bg-[#25D366]/20"
                >
                  WhatsApp · {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer>
        <FooterSection />
      </footer>
    </div>
  );
};

export default About;
