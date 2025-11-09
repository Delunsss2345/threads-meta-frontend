import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  danger?: boolean;
  onClick?: () => void;
}

interface MainMenuProps {
  items: MenuItem[];
}

export function MainMenu({ items }: MainMenuProps) {
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
            "cursor-pointer px-3 py-2 text-sm transition-colors",
            item.danger
              ? "text-red-500 hover:bg-red-500/10 hover:text-red-600"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}
        </DropdownMenuItem>
      ))}
    </>
  );
}
