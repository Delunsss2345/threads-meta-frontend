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
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  
  const { setTheme } = useTheme();
  const mainMenu = [
    { label: "Giao diện", onClick: () => setActiveMenu("theme") },
    { label: "Thông tin chi tiết" },
    { label: "Cài đặt" },
    { label: "Bảng feed" },
    { label: "Đã lưu" },
    { label: "Đã thích" },
    { label: "Đổi ngôn ngữ", onClick: () => setActiveMenu("language") },
    { label: "Đăng xuất", danger: true },
  ];

  const themeMenu = [
    { label: "Sáng", onClick: () => setTheme("light"), value: "light" },
    { label: "Tối", onClick: () => setTheme("dark"), value: "dark" },
    { label: "Tự động", onClick: () => setTheme("system"), value: "system" },
    { label: "Quay lại", onClick: () => setActiveMenu("main") },
  ];
  const languageMenu = [
    {
      label: "Tiếng Việt",
      value: "vi",
      onClick: () => changeLanguage("vi"),
    },
    {
      label: "English",
      value: "en",
      onClick: () => changeLanguage("en"),
    },
    {
      label: "Quay lại",
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
