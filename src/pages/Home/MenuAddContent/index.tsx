import MenuPopup from "@/components/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

const MenuAddContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [openModalShareImage, setOpenModalShareImage] = useState(false);

  const { t } = useTranslation();
  const menuItems = [
    { label: t("menu.search") },
    { label: t("menu.activity") },
    { label: t("menu.profile") },
    { label: t("menu.profileInfo") },
    { label: t("menu.feed"), icon: <ChevronRight /> },
  ];
  return (
    <>
      <MenuPopup
        motionProps={{
          initial: {
            opacity: 0,
            y: 0,
            x: -30,
          },
          animate: {
            opacity: 1,
            y: 5,
            x: -30,
          },
          transition: {
            duration: 0.18,
            ease: "easeOut",
          },
        }}
        className={`${cn(`p-0 hover:!bg-transparent ${className}`)}`}
        buttonActive={children}
      >
        {menuItems.map((item, i) => (
          <DropdownMenuItem
            key={i}
            className="flex items-center justify-between gap-2"
            // onClick={item.onclick}
          >
            <span>{item.label}</span>
            {item.icon}
          </DropdownMenuItem>
        ))}
      </MenuPopup>
    </>
  );
};

export default MenuAddContent;
