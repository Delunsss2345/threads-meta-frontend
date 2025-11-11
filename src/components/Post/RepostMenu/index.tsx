import MenuPopup from "@/components/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MessageSquareQuote, Repeat2 } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const RepostMenu = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const { t } = useTranslation();

  const repostMenu = [
    {
      icon: <Repeat2 />,
      label: t("menu.repost"),
    },
    {
      icon: <MessageSquareQuote />,
      label: t("menu.quote"),
    },
  ];
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
