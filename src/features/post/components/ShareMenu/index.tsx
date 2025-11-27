import MenuPopup from "@/components/common/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Code, Image, Link2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ModalShare from "../ModalShare";

const ShareMenu = ({
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
  const [openModalShareImage, setOpenModalShareImage] = useState(false);
  const { t } = useTranslation();

  const shareMenu = [
    {
      icon: <Link2 />,
      label: t("menu.copyLink"),
    },
    {
      icon: <Image />,
      label: t("menu.copyAsImage"),
      onclick: () => setOpenModalShareImage(true),
    },
    {
      icon: <Code />,
      label: t("menu.embedCode"),
    },
  ];

  if (!isAuth) {
    return (
      <button
        className="flex items-center gap-1 cursor-pointer"
        onClick={onUnauthorizedClick}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      <MenuPopup
        motionProps={{
          initial: { opacity: 0, x: 0 },
          animate: { opacity: 1, x: 0 },
        }}
        className={`${cn(`p-0 hover:!bg-transparent ${className}`)}`}
        buttonActive={children}
      >
        {shareMenu.map((item, i) => (
          <DropdownMenuItem
            key={i}
            className="flex items-center justify-between gap-2"
            onClick={item.onclick}
          >
            <span>{item.label}</span>
            {item.icon}
          </DropdownMenuItem>
        ))}
      </MenuPopup>

      {openModalShareImage && (
        <ModalShare onClose={() => setOpenModalShareImage(false)} />
      )}
    </>
  );
};

export default ShareMenu;
