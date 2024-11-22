import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "./en/global.json";
import global_ru from "./ru/global.json";

const resources = {
  en: {
    translation: global_en,
  },
  ru: {
    translation: global_ru,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
