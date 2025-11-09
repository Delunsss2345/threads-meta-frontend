import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ThemeMenuItem {
  label: string;
  icon?: ReactNode;
  value?: string;
  onClick?: () => void;
}

interface ThemeMenuProps {
  items: ThemeMenuItem[];
}

export function ThemeMenu({ items }: ThemeMenuProps) {
  const themeNow = localStorage.getItem("vite-ui-theme");

  return (
    <>
      {items.map((item, index) => {
        const isActive = item.value === themeNow;

        return (
          <DropdownMenuItem
            key={index}
            onSelect={(e) => {
              e.preventDefault();
              item.onClick?.();
            }}
            className={cn(
              "flex items-center gap-2 cursor-pointer px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-accent text-accent-foreground pointer-events-none"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </DropdownMenuItem>
        );
      })}
    </>
  );
}
