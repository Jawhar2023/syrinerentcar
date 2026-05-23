import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Car } from "lucide-react";
import { SocialSpeedDial } from "@/components/SocialSpeedDial";
import { CONTACT_INFO } from "@/lib/contactInfo";
import { ROUTES } from "@/seo/seoConfig";
import {
  ClockOutlineIcon,
  FacebookBrandIcon,
  InstagramBrandIcon,
  LocationPinIcon,
  MailEnvelopeIcon,
  PhoneHandsetIcon,
} from "@/components/icons/SocialContactIcons";

const IT2LAB_URL = "https://it2lab-alpha.vercel.app/";

const socialLinks = [
  {
    labelKey: CONTACT_INFO.facebookLabel,
    href: CONTACT_INFO.facebook,
    icon: FacebookBrandIcon,
    iconClass: "text-[#1877F2]",
  },
  {
    labelKey: CONTACT_INFO.instagramLabel,
    href: CONTACT_INFO.instagram,
    icon: InstagramBrandIcon,
    iconClass: "",
  },
] as const;

export function FooterSection() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const quickLinks = [
    { labelKey: "vipFleet" as const, to: ROUTES.fleet },
    { labelKey: "aboutUs" as const, to: ROUTES.about },
    { labelKey: "contact" as const, to: ROUTES.contact },
  ];

  return (
    <>
      <footer className="relative border-t border-border bg-muted/40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          aria-hidden
        />

        <div className="container mx-auto px-4 py-12 md:py-14 lg:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <Link to={ROUTES.home} className="inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-[0_0_20px_hsl(351_96%_44%/0.25)]">
                  <Car className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-foreground">{CONTACT_INFO.brandName}</span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("footer.tagline")}</p>
            </div>

            {/* Quick links */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t("footer.quickLinks")}
              </h3>
              <nav className="flex flex-col gap-2.5" aria-label="Quick links">
                {quickLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t(`footer.${item.labelKey}`)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t("footer.contactTitle")}
              </h3>
              <ul className="space-y-3.5 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <PhoneHandsetIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary/90" />
                  <a href={`tel:${CONTACT_INFO.phoneTel}`} className="transition-colors hover:text-foreground">
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MailEnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary/90" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="break-all transition-colors hover:text-foreground">
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <LocationPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary/90" />
                  <span>{CONTACT_INFO.address}</span>
                </li>
                <li className="flex gap-3">
                  <ClockOutlineIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary/90" />
                  <span>{t("footer.open247")}</span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                {t("footer.followUs")}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {socialLinks.map(({ labelKey, href, icon: Icon, iconClass }) => (
                  <li key={labelKey}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span className={iconClass || "inline-flex"}>
                        <Icon className="h-5 w-5" />
                      </span>
                      {labelKey}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border/40 pt-8">
            <p className="text-center text-xs text-muted-foreground sm:text-sm">
              {t("footer.copyright", { year })}
            </p>
            <p className="mt-2 text-center text-xs text-muted-foreground/90 sm:text-sm">
              <span>{t("footer.creditPrefix")}</span>{" "}
              <a
                href={IT2LAB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary/90 underline-offset-2 transition-colors hover:text-primary hover:underline"
              >
                {t("footer.creditLink")}
              </a>
            </p>
          </div>
        </div>
      </footer>

      <SocialSpeedDial />
    </>
  );
}

export default FooterSection;
