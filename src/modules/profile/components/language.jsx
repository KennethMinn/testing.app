import { useTranslation } from "react-i18next";
import Image from "../../../components/ui/image";
import { useEffect } from "react";
import { useLanguage } from "../../../hooks/use_store";

const Language = () => {
  const { language, setLanguage } = useLanguage();
  const { t, i18n } = useTranslation();

  const onToggle = () => {
    if (language.lng === "en") {
      setLanguage({ label: "Russian", lng: "ru" });
    } else {
      setLanguage({ label: "English", lng: "en" });
    }
  };

  useEffect(() => {
    i18n.changeLanguage(language.lng);
  }, [language.lng, i18n]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <Image
          src="/new_design/icons/language_icon.webp"
          className=" h-[24px]"
        />
        <p className=" text-label-xl">{t("language")}</p>
      </div>
      <p className=" text-label-xl text-primary-border" onClick={onToggle}>
        {language.label}
      </p>
    </div>
  );
};

export default Language;
