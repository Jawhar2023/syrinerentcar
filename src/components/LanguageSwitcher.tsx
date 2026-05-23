import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import type { AppLang } from "@/i18n/config";
import { SUPPORTED_LANGS } from "@/i18n/config";

const LABELS: Record<AppLang, string> = {
  fr: "FR",
  en: "EN",
  ar: "AR",
};

type Variant = "default" | "vip" | "contact" | "admin";

interface LanguageSwitcherProps {
  /** Navbar: transparent hero (white text on image/video) */
  heroOverlay?: boolean;
  variant?: Variant;
  className?: string;
}

export function LanguageSwitcher({
  heroOverlay = false,
  variant = "default",
  className,
}: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const lng = (SUPPORTED_LANGS.includes(i18n.language as AppLang)
    ? i18n.language
    : "en") as AppLang;

  const shell =
    variant === "vip"
      ? "border-amber-800/50 bg-black/35"
      : variant === "contact"
        ? "border-primary/25 bg-background/40"
        : variant === "admin"
          ? "border-border bg-sidebar/80"
        : heroOverlay
          ? "border-white/20 bg-black/25 backdrop-blur-md"
          : "border-border/80 bg-muted/30 backdrop-blur-sm";

  const inactiveText =
    variant === "vip"
      ? "text-amber-200/80 hover:text-amber-100"
      : variant === "admin"
        ? "text-sidebar-foreground/80 hover:text-sidebar-foreground"
        : heroOverlay
          ? "text-white/90 hover:text-white"
          : "text-muted-foreground hover:text-foreground";

  const setLang = (code: AppLang) => {
    void i18n.changeLanguage(code);
  };

  return (
    <div
      role="group"
      aria-label={i18n.t("language.switcherLabel")}
      className={cn(
        "inline-flex items-center rounded-full border p-0.5",
        shell,
        className,
      )}
    >
      {SUPPORTED_LANGS.map((code) => {
        const active = lng === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={cn(
              "relative rounded-full px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors sm:px-3",
              active
                ? "bg-primary text-primary-foreground shadow-[0_0_18px_hsl(var(--primary)/0.35)]"
                : inactiveText,
            )}
            aria-pressed={active}
            aria-label={i18n.t("language.setTo", { lang: LABELS[code] })}
          >
            {LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
