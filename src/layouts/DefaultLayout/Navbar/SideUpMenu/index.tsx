import MenuPopup from "@/components/MenuPopup";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageMenu } from "./LanguageMenu";
import { MainMenu } from "./MainMenu";
import { ThemeMenu } from "./ThemeMenu";

const SlideUpMenu = ({ children }: { children: React.ReactNode }) => {
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
    },
    { label: t("menu.profileInfo") },
    { label: t("menu.settings"), pathName: "settings" },
    { label: t("menu.feed") },
    { label: t("menu.saved") },
    { label: t("menu.liked") },
    {
      label: t("menu.language"),
      icon: <ChevronRight size={16} />,
      onClick: () => setActiveMenu("language"),
    },
    { label: t("menu.logout"), danger: true },
  ];

  const themeMenu = [
    {
      label: t("menu.light"),
      onClick: () => setTheme("light"),
      value: "light",
    },
    { label: t("menu.dark"), onClick: () => setTheme("dark"), value: "dark" },
    {
      label: t("menu.system"),
      onClick: () => setTheme("system"),
      value: "system",
    },
    { label: t("menu.back"), onClick: () => setActiveMenu("main") },
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
      label: t("menu.back"),
      icon: <ArrowLeft size={16} />,
      onClick: () => setActiveMenu("main"),
    },
  ];
  return (
    <MenuPopup buttonActive={children}>
      {activeMenu === "main" && <MainMenu items={mainMenu} />}
      {activeMenu === "theme" && <ThemeMenu items={themeMenu} />}
      {activeMenu === "language" && <LanguageMenu items={languageMenu} />}
    </MenuPopup>
  );
};

export default SlideUpMenu;
