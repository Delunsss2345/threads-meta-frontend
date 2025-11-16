import MenuPopup from "@/components/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MessageSquareQuote, Repeat2 } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const RepostMenu = ({
  children,
  className,
  isAuth,
  onUnauthorizedClick,
}: {
  children: ReactNode;
  className: string;
  isAuth: boolean;
  onUnauthorizedClick?: () => void;
}) => {
  const { t } = useTranslation();
  const repostMenu = [
    { icon: <Repeat2 />, label: t("menu.repost") },
    { icon: <MessageSquareQuote />, label: t("menu.quote") },
  ];

  if (!isAuth) {
    return (
      <button className="flex items-center gap-1" onClick={onUnauthorizedClick}>
        {children}
      </button>
    );
  }

  return (
    <MenuPopup
      className={`${cn(`p-0 hover:!bg-transparent ${className}`)}`}
      buttonActive={children}
    >
      {repostMenu.map((item, i) => (
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

export default RepostMenu;
