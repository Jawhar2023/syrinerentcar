import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Car, ShieldCheck, KeyRound, MapPin } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-[2px] md:block"
      aria-hidden
    >
      <div className="h-full w-full bg-border/60" />
      <motion.div
        className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-primary/40 via-primary to-neon-blue"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%" }}
      />
    </div>
  );
}

const SimpleProcessSection = () => {
  const { t } = useTranslation();

  const steps = useMemo(
    () => [
      {
        step: "01",
        title: t("process.step1t"),
        description: t("process.step1d"),
        Icon: Car,
      },
      {
        step: "02",
        title: t("process.step2t"),
        description: t("process.step2d"),
        Icon: ShieldCheck,
      },
      {
        step: "03",
        title: t("process.step3t"),
        description: t("process.step3d"),
        Icon: KeyRound,
      },
      {
        step: "04",
        title: t("process.step4t"),
        description: t("process.step4d"),
        Icon: MapPin,
      },
    ],
    [t],
  );

  return (
    <section id="process" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(351_96%_44%/0.08),transparent)]" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-20"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">{t("process.label")}</p>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("process.how")}{" "}
            <span className="bg-gradient-to-r from-primary via-neon-blue to-neon-violet bg-clip-text text-transparent neon-text">
              {t("process.works")}
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <ProcessLine />

          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-6 md:gap-y-0"
          >
            {steps.map(({ step, title, description, Icon }) => (
              <motion.li key={step} variants={item} className="relative flex flex-col items-center text-center">
                <motion.div
                  className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/50 bg-background shadow-[0_0_0_1px_hsl(351_96%_44%/0.15)] md:mb-8"
                  whileHover={{
                    scale: 1.08,
                    borderColor: "hsl(351 96% 44% / 0.9)",
                    boxShadow: "0 0 28px hsl(351 96% 44% / 0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </motion.div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary md:text-xs">
                  {t("process.step", { step })}
                </p>
                <h3 className="mb-3 font-display text-base font-bold uppercase tracking-wide text-foreground md:text-lg">
                  {title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default SimpleProcessSection;
