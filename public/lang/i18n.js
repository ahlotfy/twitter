import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arTrans from "./locales/ar/ar";
import enTrans from "./locales/en/en";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTrans,
    },
    ar: {
      translation: arTrans,
    },
  },
  lang: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
