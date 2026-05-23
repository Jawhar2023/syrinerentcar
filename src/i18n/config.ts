import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

export const SUPPORTED_LANGS = ["fr", "en", "ar"] as const;
export type AppLang = (typeof SUPPORTED_LANGS)[number];

function applyDocumentLang(lng: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    fallbackLng: "fr",
    supportedLngs: [...SUPPORTED_LANGS],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "drivex_lang",
    },
  })
  .then(() => {
    applyDocumentLang(i18n.language);
  });

i18n.on("languageChanged", applyDocumentLang);

export default i18n;
