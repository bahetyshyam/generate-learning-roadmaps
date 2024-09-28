import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend) // Use the backend plugin
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      // Path to load translations. {{lng}} and {{ns}} are dynamic
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
