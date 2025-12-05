import { Bookmark } from "lucide-react";
import { useTranslation } from "react-i18next";

const Saved = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Bookmark className="w-20 h-20 text-muted-foreground mb-4 opacity-50" />

      <h2 className="text-lg font-semibold text-foreground">
        {t("saved.emptyTitle")}
      </h2>

      <p className="text-sm text-muted-foreground mt-1">
        {t("saved.emptyDescription")}
      </p>
    </div>
  );
};

export default Saved;
