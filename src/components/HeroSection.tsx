import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ElectricBorder from "@/components/ElectricBorder";
import heroBackgroundVideo from "@/video/Scène_initiale_-_2026-05-23_202605231843.mp4";
import { ROUTES } from "@/seo/seoConfig";

const ELECTRIC_BORDER_HEX = "#dd0426";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const isArabic = i18n.language?.startsWith("ar") ?? false;

  const stats = [
    { val: t("hero.stat1Val"), label: t("hero.stat1Label") },
    { val: t("hero.stat2Val"), label: t("hero.stat2Label") },
    { val: t("hero.stat3Val"), label: t("hero.stat3Label") },
    { val: t("hero.stat4Val"), label: t("hero.stat4Label") },
  ];

  return (
    <section
      id="home-hero"
      className="relative flex min-h-screen w-full flex-col items-start overflow-hidden bg-black"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={heroBackgroundVideo} type="video/mp4" />
      </video>

      {/* Readability: dark side follows reading direction (start = text side) */}
      <div
        className={cn(
          "absolute inset-0",
          isRtl
            ? "bg-gradient-to-l from-black/90 via-black/55 to-black/20 md:from-black/85 md:via-black/45"
            : "bg-gradient-to-r from-black/90 via-black/55 to-black/20 md:from-black/85 md:via-black/45",
        )}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" aria-hidden />

      <div
        className={cn(
          "relative z-10 flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32 lg:px-14",
          "text-start",
        )}
      >
        <motion.p
          className={cn(
            "mb-4 w-full font-display text-[11px] font-semibold text-primary md:text-xs",
            isArabic ? "tracking-normal" : "uppercase tracking-[0.4em]",
          )}
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          {t("hero.kicker")}
        </motion.p>

        <motion.h1
          className={cn(
            "w-full font-display text-[clamp(2rem,8vw,4.5rem)] font-black leading-[1.1] tracking-tight text-white",
            isArabic && "font-bold",
          )}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">{t("hero.seoH1")}</span>
        </motion.h1>

        {t("hero.description") ? (
          <motion.p
            className="mt-7 max-w-lg text-start font-body text-sm leading-relaxed text-white/85 md:text-base"
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            {t("hero.description")}
          </motion.p>
        ) : null}

        <motion.div
          className="mt-9 flex flex-wrap items-center justify-start gap-4"
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.58 }}
        >
          <ElectricBorder
            color={ELECTRIC_BORDER_HEX}
            speed={1}
            chaos={0.12}
            borderRadius={12}
            className="inline-flex"
          >
            <Link
              to={ROUTES.reservation}
              className={cn(
                "inline-flex min-h-[48px] items-center justify-center rounded-[12px] bg-primary px-8 py-3 font-display text-xs font-bold text-primary-foreground transition hover:bg-primary/90 md:text-sm",
                !isArabic && "uppercase tracking-[0.2em]",
              )}
            >
              {t("hero.ctaBook")}
            </Link>
          </ElectricBorder>
          <Link
            to={ROUTES.fleet}
            className={cn(
              "inline-flex min-h-[48px] items-center justify-center rounded-lg border-2 border-primary bg-transparent px-8 py-3 font-display text-xs font-bold text-primary transition hover:bg-primary/10 md:text-sm",
              !isArabic && "uppercase tracking-[0.2em]",
            )}
          >
            {t("hero.ctaFleet")}
          </Link>
        </motion.div>

        <motion.div
          className="mt-14 flex w-full flex-wrap justify-start gap-0 border-t border-white/10 pt-10 md:mt-20 md:gap-2"
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.72 }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex min-w-[45%] flex-col items-start gap-1 py-2 text-start sm:min-w-0 sm:flex-none md:py-0",
                i > 0 && "border-s border-primary/80 ps-6 md:ps-10",
              )}
            >
              <span className="font-display text-2xl font-bold tabular-nums text-primary md:text-3xl">{s.val}</span>
              <span
                className={cn(
                  "text-[10px] font-medium text-white/75 md:text-xs",
                  !isArabic && "uppercase tracking-[0.25em]",
                )}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
