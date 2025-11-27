import BackButton from "@/components/common/BackButton";
import MoreIcon from "@/components/common/Icon/MoreIcon";
import MenuPopup from "@/components/common/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  PAGE_CHILDREN_BY_PATH,
  PAGE_TITLES_BY_PATH,
} from "@/constant/pageTitless";
import { useAuth } from "@/features/auth/hooks";
import { columnsSlice } from "@/features/column";
import { MinusCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ChoiceHome from "./ChoiceHome";

const Header = ({
  id,
  textHeader,
  dragHandleProps,
}: {
  id?: number;
  textHeader?: string;
  dragHandleProps?: any;
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const handleDelCol = (id: number) => {
    dispatch(columnsSlice.actions.removeColumn(id));
  };
  const { isAuthenticated } = useAuth();
  const isPostDetail = /^\/post\/[^/]+$/.test(pathname);
  return (
    <div
      className={`bg-background header-container sticky top-0 hidden -mx-3 md:block z-4`}
    >
      {(PAGE_CHILDREN_BY_PATH[pathname] || isPostDetail) && (
        <div className="absolute top-1/2 -translate-y-1/2 left-10 z-10 ">
          <BackButton onClick={() => window.history.back()} />
        </div>
      )}
      <h1
        to={textHeader ?? pathname}
        {...dragHandleProps}
        className={`block py-4 text-sm font-semibold text-center ${
          isAuthenticated ? "flex gap-10 justify-center" : ""
        }`}
      >
        {!PAGE_TITLES_BY_PATH[textHeader ?? pathname] ? (
          "Threads"
        ) : isAuthenticated &&
          ["/", "/following", "/autoDelete"].includes(pathname) ? (
          <ChoiceHome />
        ) : (
          t(`nav.${PAGE_TITLES_BY_PATH[textHeader || pathname]}`)
        )}
      </h1>

      {textHeader !== "/" && pathname === "/" && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
          <MenuPopup
            className="
        flex items-center justify-center
        size-6
        rounded-full
        bg-primary-foreground
        shadow-sm
        border
        hover:bg-neutral-100
        active:scale-95
        transition
      "
            buttonActive={<MoreIcon />}
          >
            <DropdownMenuItem
              onClick={() => {
                if (id) handleDelCol(id);
              }}
            >
              {t("menu.removeColumn")} <MinusCircle />
            </DropdownMenuItem>
          </MenuPopup>
        </div>
      )}
      <div className="!bg-transparent header-column-extra absolute top-[52px] left-1/2  -translate-x-1/2 w-[var(--col-1-lg)] flex  justify-between z-1">
        <div className="absolute -left-3  -top-[12px] overflow-hidden w-[36px] h-[36px] z-1">
          <div className="shadow-[0_0_12px_0_rgba(0,0,0,0.04),_0_0_0_48px_var(--color-background)] overflow-hidden absolute w-[48px] h-[48px] top-[12px] left-[12px] rounded-full border border "></div>
        </div>

        <div className="flex-1 h-[2px]  border-t border-gray-200"></div>
        <div className="absolute -right-3 -top-[12px]  overflow-hidden w-[36px] h-[36px] z-1">
          <div
            className="absolute shadow-[0_0_12px_0_rgba(0,0,0,0.04),_0_0_0_48px_var(--color-background))] overflow-hidden w-[48px] h-[48px] top-[12px] right-[12px] rounded-full 
               border border 
             "
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
