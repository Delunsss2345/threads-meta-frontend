import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleChange = (lng: string) => setLanguage(lng);
    i18n.on("languageChanged", handleChange); //giong socket io
    return () => {
      i18n.off("languageChanged", handleChange);
    };
  }, [i18n]);
  return (
    <>
      {items.map((item, index) => {
        const isActive = item.value === language;

        return (
          <>
            <DropdownMenuItem
              key={index}
              onSelect={(e) => {
                e.preventDefault();
                item.onClick?.();
              }}
              className={cn(
                "flex items-center gap-2 cursor-pointer px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                `${isActive ? "bg-accent text-accent-foreground" : ""}}`
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          </>
        );
      })}
    </>
  );
}
