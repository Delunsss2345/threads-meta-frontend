import { DarkIcon } from "@/components/common/Icon/DarkIcon";
import LightModeIcon from "@/components/common/Icon/LightModeIcon";
import MenuPopup from "@/components/common/MenuPopup";
import { useTheme } from "@/components/layout/ThemeProvider";
import { logout } from "@/features/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import type { AppDispatch } from "@/types/redux";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LanguageMenu } from "./LanguageMenu";
import { MainMenu } from "./MainMenu";
import { ThemeMenu } from "./ThemeMenu";

const SlideUpMenu = ({
  children,
  motionProps,
  customPopup,
}: {
  children: React.ReactNode;
  motionProps?: {
    initial?: Record<string, unknown>;
    animate?: Record<string, unknown>;
    exit?: Record<string, unknown>;
    transition?: Record<string, unknown>;
  };
  customPopup?: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();
  const isMobile = useIsMobile();
  const [activeMenu, setActiveMenu] = useState<"main" | "theme" | "language">(
    "main"
  );
  const { t, i18n } = useTranslation();
  const { setTheme } = useTheme();
  const mainMenu = [
    {
      label: t("menu.appearance"),
      icon: <ChevronRight size={16} />,
      onClick: () => setActiveMenu("theme"),
      isAuth: false,
    },
    { label: t("menu.profileInfo"), isAuth: true },
    {
      label: t("menu.settings"),
      pathName: `${isMobile ? "settings" : "settings/privacy"}`,
      isAuth: true,
    },
    { label: t("menu.feed"), isAuth: true },
    { label: t("menu.saved"), pathName: "saved", isAuth: true },
    { label: t("menu.liked"), pathName: "liked", isAuth: true },
    {
      label: t("menu.language"),
      icon: <ChevronRight size={16} />,
      onClick: () => setActiveMenu("language"),
    },
    {
      label: t("menu.logout"),
      onClick: async () => {
        await dispatch(logout());
        navigator("/", { replace: true });
      },
      danger: true,
      isAuth: true,
    },
  ];

  const themeMenu = [
    {
      label: "Light",
      icon: <LightModeIcon className="w-4 h-4" />,
      onClick:() => setTheme("light"),
    },
    {
      label: "Dark",
      icon: <DarkIcon className="w-4 h-4" />,
      onClick: () => setTheme("dark"),
    },
    {
      label: "Auto",
      onClick: () => setTheme("system"),
    },
  ];

  const languageMenu = [
    {
      label: t("menu.vietnamese"),
      value: "vi",
      onClick: () => i18n.changeLanguage("vi"),
    },
    {
      label: t("menu.english"),
      value: "en",
      onClick: () => i18n.changeLanguage("en"),
    },
    {
      value : "back",
      label: t("menu.back"),
      icon: <ArrowLeft size={16} />,
      onClick: () => setActiveMenu("main"),
    },
  ];
  return (
    <MenuPopup
      customPopup={customPopup}
      motionProps={motionProps}
      buttonActive={children}
    >
      {activeMenu === "main" && <MainMenu items={mainMenu} />}
      {activeMenu === "theme" && (
        <ThemeMenu onClick={() => setActiveMenu("main")} items={themeMenu} />
      )}
      {activeMenu === "language" && <LanguageMenu onClick={() => setActiveMenu("main")} items={languageMenu} />}
    </MenuPopup>
  );
};

export default SlideUpMenu;
