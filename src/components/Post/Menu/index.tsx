import MenuPopup from "@/components/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hook";
import {
  BellOff,
  Bookmark,
  EyeOff,
  Link2,
  Shield,
  UserMinus,
  UserX,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const Menu = ({ buttonActive }: { buttonActive: ReactNode }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const items = [
    { label: t("menu.addToFeed"), isHeader: true, isAuth: true },
    { icon: Bookmark, label: t("menu.save"), isAuth: true },
    { icon: EyeOff, label: t("menu.notInterested"), isAuth: true },
    { icon: BellOff, label: t("menu.muteNotifications"), isAuth: true },
    { icon: UserMinus, label: t("menu.restrict"), isAuth: true },
    {
      icon: UserX,
      label: t("menu.block"),
      className: "text-destructive hover:bg-destructive/10",
      isAuth: true,
    },
    {
      icon: Shield,
      label: t("menu.report"),
      className: "text-destructive hover:bg-destructive/10",
      isAuth: true,
    },
    { icon: Link2, label: t("menu.copyLink"), isAuth: false },
  ];

  return (
    <MenuPopup
      buttonActive={buttonActive}
      customPopup="-translate-x-20"
      motionProps={{
        initial: { opacity: 0, x: 0, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
      }}
    >
      {items.map((item, i) => (
        <DropdownMenuItem
          key={i}
          className={`flex items-center gap-2 ${item.className || ""} ${
            isAuthenticated !== item.isAuth ? "hidden" : ""
          }`}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{item.label}</span>
        </DropdownMenuItem>
      ))}
    </MenuPopup>
  );
};

export default Menu;
