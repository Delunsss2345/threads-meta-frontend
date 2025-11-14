import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  label: string;
  danger?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
  pathName?: string;
}

interface MainMenuProps {
  items: MenuItem[];
}

export function MainMenu({ items }: MainMenuProps) {
  const navigator = useNavigate();
  return (
    <>
      {items.map((item, index) => (
        <DropdownMenuItem
          key={index}
          onSelect={(e) => {
            if (!item.pathName) {
              e.preventDefault();
              item.onClick?.();
            } else {
              navigator("/" + item.pathName);
            }
          }}
          className={cn(
            "cursor-pointer px-3 py-2 text-sm transition-colors",
            item.danger
              ? "text-red-500 hover:bg-red-500/10 hover:text-red-600"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}{" "}
          {item?.icon && <span className="ml-auto">{item.icon}</span>}
        </DropdownMenuItem>
      ))}
    </>
  );
}
