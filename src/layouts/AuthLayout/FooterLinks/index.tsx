// src/components/login/FooterLinks.tsx
import { useTranslation } from "react-i18next";

export const FooterLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-600 space-x-4">
      <span>{t("footer.copyright")}</span>
      <a href="#" className="hover:text-gray-400">
        {t("footer.termsOfThreads")}
      </a>
      <a href="#" className="hover:text-gray-400">
        {t("footer.privacyPolicy")}
      </a>
      <a href="#" className="hover:text-gray-400">
        {t("footer.cookiePolicy")}
      </a>
      <a href="#" className="hover:text-gray-400">
        {t("footer.reportProblem")}
      </a>
    </div>
  );
};
