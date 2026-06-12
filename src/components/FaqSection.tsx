import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** Home page FAQ — supports FAQPage schema and local SEO keywords. */
export function FaqSection() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as { q: string; a: string }[];

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-border/50 bg-muted/20 py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{t("faq.label")}</p>
          <h2 id="faq-heading" className="mt-3 font-display text-3xl font-bold md:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{t("faq.subtitle")}</p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
