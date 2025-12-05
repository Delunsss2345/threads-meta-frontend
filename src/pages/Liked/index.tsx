import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Liked = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Heart className="w-20 h-20 text-muted-foreground mb-4 opacity-50" />

      <h2 className="text-lg font-semibold text-foreground">
        {t("liked.emptyTitle")}
      </h2>

      <p className="text-sm text-muted-foreground mt-1">
        {t("liked.emptyDescription")}
      </p>
    </div>
  );
};

export default Liked;
