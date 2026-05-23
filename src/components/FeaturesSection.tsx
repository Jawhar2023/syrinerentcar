import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Shield, Zap, Clock, MapPin, Star, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = useMemo(
    () => [
      { icon: Zap, title: t("features.f1t"), description: t("features.f1d") },
      { icon: Shield, title: t("features.f2t"), description: t("features.f2d") },
      { icon: Clock, title: t("features.f3t"), description: t("features.f3d") },
      { icon: MapPin, title: t("features.f4t"), description: t("features.f4d") },
      { icon: Star, title: t("features.f5t"), description: t("features.f5d") },
      { icon: Headphones, title: t("features.f6t"), description: t("features.f6d") },
    ],
    [t],
  );

  return (
    <section className="py-24 relative gradient-mesh">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">{t("features.title")} </span>
            <span className="bg-gradient-to-r from-neon-violet to-primary bg-clip-text text-transparent">
              {t("features.brand")}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("features.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:neon-glow transition-shadow duration-300">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
