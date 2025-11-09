import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface LanguageMenuItem {
  label: string;
  value?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

interface LanguageMenuProps {
  items: LanguageMenuItem[];
}

export function LanguageMenu({ items }: LanguageMenuProps) {
  return (
    <>
      {items.map((item, index) => (
        <DropdownMenuItem
          key={index}
          onSelect={(e) => {
            e.preventDefault();
            item.onClick?.();
          }}
          className={cn(
            "flex items-center gap-2 cursor-pointer px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {item.icon}
          <span>{item.label}</span>
        </DropdownMenuItem>
      ))}
    </>
  );
}
