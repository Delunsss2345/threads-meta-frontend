import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
    { label: t("menu.appearance"), onClick: () => setActiveMenu("theme") },
    { label: t("menu.profileInfo") },
    { label: t("menu.settings") },
    { label: t("menu.feed") },
    { label: t("menu.saved") },
    { label: t("menu.liked") },
    { label: t("menu.language"), onClick: () => setActiveMenu("language") },
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </DropdownMenuTrigger>
      <AnimatePresence mode="wait">
        <DropdownMenuContent
          asChild
          sideOffset={8}
          forceMount
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 20 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="w-56 rounded-xl border border-gray-200 bg-primary-foreground p-1 shadow-lg"
          >
            {activeMenu === "main" && <MainMenu items={mainMenu} />}
            {activeMenu === "theme" && <ThemeMenu items={themeMenu} />}
            {activeMenu === "language" && <LanguageMenu items={languageMenu} />}
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default SlideUpMenu;
