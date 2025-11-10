import { useLanguage } from "@/components/LanguageProvider";
import { PAGE_TITLES_BY_PATH } from "@/constant/pageTitless";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  return (
    <div className="hidden lg:block fixed top-0 left-0 right-0 bg-background z-10">
      <h1 className="text-center py-4 font-semibold text-lg">
        {t("nav", PAGE_TITLES_BY_PATH[pathname])}
      </h1>
    </div>
  );
};

export default Header;
