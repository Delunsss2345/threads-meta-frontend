import { PAGE_TITLES_BY_PATH } from "@/constant/pageTitless";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="hidden lg:block sticky top-0 bg-primary-foreground z-20 -mx-10">
      <h1 className="text-center py-4 font-semibold text-lg">
        {t(`nav.${PAGE_TITLES_BY_PATH[pathname]}`)}
      </h1>

      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[640px] flex  justify-between">
        <div className="absolute -left-3 bg-primary-foreground -top-[12px] overflow-hidden w-[36px] h-[36px]">
          <div className="absolute w-[48px] h-[48px] top-[12px] left-[12px] rounded-full border border shadow-sm"></div>
        </div>

        <div className="flex-1 h-[2px]  border-t border-gray-200"></div>
        <div className="absolute -right-3 -top-[12px] bg-primary-foreground overflow-hidden w-[36px] h-[36px]">
          <div
            className="absolute w-[48px] h-[48px] top-[12px] right-[12px] rounded-full 
               border border 
               shadow-sm"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
