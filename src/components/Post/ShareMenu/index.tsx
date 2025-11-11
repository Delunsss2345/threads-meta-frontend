import MenuPopup from "@/components/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Code, Image, Link2 } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const ShareMenu = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const { t } = useTranslation();
  const shareMenu = [
    {
      icon: <Link2 />,
      label: t("menu.copyLink"),
    },
    {
      icon: <Image />,
      label: t("menu.copyAsImage"),
    },
    {
      icon: <Code />,
      label: t("menu.embedCode"),
    },
  ];
  return (
    <MenuPopup
      className={`${cn(`p-0 hover:!bg-transparent ${className}`)}`}
      buttonActive={children}
    >
      {shareMenu.map((item, i) => (
        <DropdownMenuItem
          key={i}
          className="flex items-center justify-between gap-2"
        >
          <span>{item.label}</span>
          {item.icon}
        </DropdownMenuItem>
      ))}
    </MenuPopup>
  );
};

export default ShareMenu;
