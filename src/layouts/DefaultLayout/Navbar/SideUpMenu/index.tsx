import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const SlideUpMenu = ({ children }: { children: React.ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<"main" | "theme">("main");
  const { setTheme } = useTheme();
  const mainMenu = [
    { label: "Giao diện", onClick: () => setActiveMenu("theme") },
    { label: "Thông tin chi tiết" },
    { label: "Cài đặt" },
    { label: "Bảng feed" },
    { label: "Đã lưu" },
    { label: "Đã thích" },
    { label: "Đổi ngôn ngữ" },
    { label: "Đăng xuất", danger: true },
  ];

  const themeMenu = [
    { label: "Sáng", onClick: () => setTheme("light") },
    { label: "Tối", onClick: () => setTheme("dark") },
    { label: "Tự động", onClick: () => setTheme("system") },
    { label: "← Quay lại", onClick: () => setActiveMenu("main") },
  ];

  const items = activeMenu === "main" ? mainMenu : themeMenu;

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
            {items.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={(e) => {
                  e.preventDefault();
                  item.onClick?.();
                }}
                className={cn(
                  "cursor-pointer px-3 py-2 text-sm transition-colors"
                )}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default SlideUpMenu;
