import { resources } from "@/i18n";
import React, { createContext, useContext, useState } from "react";

const LanguageType = ["vi", "en"] as const;

const LanguageContext = createContext<{
  language: string;
  changeLanguage: (newLang: string) => void;
  t: (key: string, field: string, params?: Record<string, string>) => string;
} | null>(null);

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem("appLanguage") || "vi";
  });

  const t = (key: string, field: string) => {
    let text =
      (resources as any)[language].translation[`${key}`][`${field}`] || key;
    return text;
  };

  const changeLanguage = (newLang: string) => {
    if (!LanguageType.includes(newLang as any)) return;
    setLanguage(newLang);
    localStorage.setItem("appLanguage", newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage phải được dùng trong LanguageProvider");
  }
  return context;
}

export default LanguageProvider;
