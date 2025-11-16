import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function LoginCard() {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  if (isMobile) return null;
  return (
    <div className=" sticky top-[60px] flex justify-center items-center">
      <Card className="w-[320px] text-center border border-gray-200 shadow-sm overflow-hidden rounded-2xl">
        <CardContent className="flex flex-col items-center p-6 space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              {t("loginCard.title")}
            </h2>
            <p className="text-sm text-gray-500">
              {t("loginCard.description")}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 border rounded-lg py-5 font-medium"
          >
            <Instagram className="w-5 h-5" />
            <span>{t("auth.continueWithInstagram")}</span>
          </Button>

          <NavLink
            to={"/login"}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
          >
            {t("loginCard.loginWithUsername")}
          </NavLink>
        </CardContent>
      </Card>
    </div>
  );
}
