import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useIntroGate } from "@/contexts/IntroGateContext";
import { ROUTES } from "@/seo/seoConfig";

const NAVBAR_LOGO = "/syrine-logo-navbar.png";

export type NavbarVariant = "default" | "vip" | "about" | "contact";

interface NavbarProps {
  variant?: NavbarVariant;
}

const NAV_PATHS: { key: string; to: string; end?: boolean }[] = [
  { key: "home", to: ROUTES.home, end: true },
  { key: "vipFleet", to: ROUTES.fleet },
  { key: "about", to: ROUTES.about },
  { key: "contact", to: ROUTES.contact },
];

const Navbar = ({ variant = "default" }: NavbarProps) => {
  const { t } = useTranslation();
  const { introVisible } = useIntroGate();
  const [open, setOpen] = useState(false);
  const [heroPast, setHeroPast] = useState(false);
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    const update = () => {
      if (variant !== "default" || (path !== ROUTES.home && path !== ROUTES.fleet)) {
        setHeroPast(true);
        return;
      }
      const heroId = path === ROUTES.home ? "home-hero" : "vip-fleet-hero";
      const hero = document.getElementById(heroId);
      if (!hero) {
        setHeroPast(window.scrollY > 48);
        return;
      }
      const rect = hero.getBoundingClientRect();
      setHeroPast(rect.bottom <= 72);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [path, variant]);

  const mirrorNav =
    variant === "default" && (path === ROUTES.home || path === ROUTES.fleet) && !heroPast;

  /** No dark slab: transparent over hero; light blur strip after scroll (not glass-strong). */
  const shellClass =
    variant === "vip"
      ? "border-b border-amber-900/40 bg-[hsl(40_25%_6%/0.88)] backdrop-blur-2xl"
      : variant === "contact"
        ? "glass-strong border-b border-primary/25"
        : mirrorNav
          ? "bg-transparent shadow-none border-none"
          : "border-b border-border bg-background/95 backdrop-blur-xl shadow-sm";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm transition-colors whitespace-nowrap",
      variant === "vip"
        ? isActive
          ? "text-amber-200 font-semibold"
          : "text-amber-200/65 hover:text-amber-100"
        : mirrorNav
          ? isActive
            ? "text-primary font-semibold"
            : "text-white/85 hover:text-white"
          : isActive
            ? "text-primary font-semibold"
            : "text-muted-foreground hover:text-foreground",
    );

  const langVariant =
    variant === "vip" ? "vip" : variant === "contact" ? "contact" : "default";

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        shellClass,
        introVisible && "hidden",
      )}
      aria-hidden={introVisible}
    >
      <div className="grid h-[5.25rem] grid-cols-[auto_1fr_auto] items-center gap-2 px-2 sm:px-3 lg:px-4">
        <Link
          to="/"
          className="flex w-fit shrink-0 items-center py-1"
          aria-label={t("intro.brand")}
        >
          <img
            src={NAVBAR_LOGO}
            alt="Syrine Rent a Car"
            className={cn(
              "h-14 w-auto max-w-[min(100%,300px)] object-contain object-left sm:h-[4.25rem] md:h-[5rem]",
              "bg-transparent contrast-[1.12] saturate-110",
              mirrorNav
                ? "drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] drop-shadow-[0_0_1px_rgba(255,255,255,0.4)]"
                : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]",
            )}
            width={300}
            height={80}
            decoding="async"
          />
        </Link>

        <nav
          className="hidden items-center justify-center gap-6 lg:flex"
          aria-label="Main"
        >
          {NAV_PATHS.map((item) => {
            const label = t(`nav.${item.key}`);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => cn(linkClass({ isActive }))}
              >
                {label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <LanguageSwitcher variant={langVariant} heroOverlay={mirrorNav} className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
              "lg:hidden",
              variant === "vip" ? "text-amber-100" : mirrorNav ? "text-white" : "text-foreground",
            )}
            aria-expanded={open}
            aria-label={t("nav.toggleMenu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "lg:hidden border-t",
              variant === "vip"
                ? "border-amber-900/40 bg-[hsl(40_25%_6%/0.95)]"
                : mirrorNav
                  ? "border-white/10 bg-background/92 backdrop-blur-xl"
                  : "border-border bg-background/90 backdrop-blur-xl",
            )}
          >
            <div className="flex flex-col gap-3 px-4 py-4">
              <div className="flex justify-center sm:hidden">
                <LanguageSwitcher variant={langVariant} heroOverlay={mirrorNav} />
              </div>
              <div className="flex flex-col gap-1">
                {NAV_PATHS.map((item) => {
                  const label = t(`nav.${item.key}`);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn("rounded-lg px-1 py-2.5 text-sm", linkClass({ isActive }))
                      }
                    >
                      {label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
