import { PAGE_TITLES_BY_PATH } from "@/constant/pageTitless";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 hidden -mx-5 lg:block bg-background z-4">
      <h1 className="py-4 text-lg font-semibold text-center">
        {!PAGE_TITLES_BY_PATH[pathname]
          ? "Threads"
          : t(`nav.${PAGE_TITLES_BY_PATH[pathname]}`)}
      </h1>

      <div className="header-column-extra absolute top-[60px] left-1/2  -translate-x-1/2 w-[640px] flex  justify-between z-1">
        <div className="absolute -left-3  -top-[12px] overflow-hidden w-[36px] h-[36px] z-1">
          <div className="shadow-[0_0_12px_0_rgba(0,0,0,0.04),_0_0_0_48px_rgb(250,250,250)] absolute w-[48px] h-[48px] top-[12px] left-[12px] rounded-full border border "></div>
        </div>

        <div className="flex-1 h-[2px]  border-t border-gray-200"></div>
        <div className="absolute -right-3 -top-[12px]  overflow-hidden w-[36px] h-[36px] z-1">
          <div
            className="absolute shadow-[0_0_12px_0_rgba(0,0,0,0.04),_0_0_0_48px_rgb(250,250,250)] w-[48px] h-[48px] top-[12px] right-[12px] rounded-full 
               border border 
             "
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
