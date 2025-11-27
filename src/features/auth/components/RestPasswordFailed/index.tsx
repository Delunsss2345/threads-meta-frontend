import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const RestPasswordFound = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-lg mb-2 text-center font-bold w-[400px]">
        {t("restPasswordFound.title")}
      </h2>

      <p className="text-[14px] text-muted-foreground max-w-[360px] mb-8">
        {t("restPasswordFound.description")}
      </p>

      <Button className="px-6 rounded-lg" onClick={() => window.history.back()}>
        {t("restPasswordFound.back")}
      </Button>
    </div>
  );
};

export default RestPasswordFound;
