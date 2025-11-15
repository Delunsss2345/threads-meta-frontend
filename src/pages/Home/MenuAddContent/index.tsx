import MenuPopup from "@/components/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { columnsSlice } from "@/features/column";
import { cn } from "@/lib/utils";
import type { RootState } from "@/types/redux.type";
import { ChevronRight } from "lucide-react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
const MenuAddContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.columns.columns);
  const { t } = useTranslation();
  const menuItems = [
    {
      label: t("menu.search"),
      onClick: () => {
        handleAddMenu("Search");
      },
    },
    {
      label: t("menu.activity"),
      onClick: () => {
        handleAddMenu("Activity");
      },
    },
    {
      label: t("menu.profile"),
      onClick: () => {
        handleAddMenu("Profile");
      },
    },
    { label: t("menu.profileInfo") },
    { label: t("menu.feed"), icon: <ChevronRight /> },
  ];
  const handleAddMenu = (component: string) => {
    dispatch(
      columnsSlice.actions.addColumn({
        id: Number(columns.length + 1),
        pathName: `/${component.toLowerCase()}`,
        element: component,
      })
    );
  };
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
            {...(item?.onClick && { onClick: item.onClick })}
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
