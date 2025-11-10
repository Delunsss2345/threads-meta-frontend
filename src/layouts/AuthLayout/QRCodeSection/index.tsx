// src/components/login/QRCodeSection.tsx
import { useLanguage } from "@/components/LanguageProvider";

export const QRCodeSection = () => {
  const { t } = useLanguage();

  return (
    <div className="absolute bottom-8 right-8   flex-col items-end gap-4 hidden sm:block">
      <div className="text-xs text-muted-foreground mx-auto mb-2">
        {t("qr", "scanToDownload")}
      </div>
      <div className="w-32 h-32 bg-card border border-border p-2 rounded-lg">
        <div className="w-full h-full bg-accent rounded"></div>
      </div>
    </div>
  );
};
