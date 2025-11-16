import ModalPopup from "@/components/ModalPopup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProfileSettings = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  return (
    <ModalPopup onClose={onClose}>
      <Card className="!p-0">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{t("profileSettings.name")}</h3>
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4" />
                <span>Phạm Thanh Huy (@huydarealest)</span>
              </div>
            </div>
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
          </div>

          <Separator />

          <div className="p-4">
            <h3 className="font-semibold mb-1">{t("profileSettings.bio")}</h3>
            <p className="text-sm text-muted-foreground">
              dev dang test ui dùng qtam tui nhé
            </p>
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-none font-normal"
          >
            <div>
              <h3 className="font-semibold text-left">{t("profileSettings.interests")}</h3>
              <p className="text-sm text-muted-foreground">{t("profileSettings.addInterests")}</p>
            </div>
          </Button>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-none font-normal"
          >
            <span className="font-semibold">{t("profileSettings.links")}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Button>

          <Separator />

          <div className="flex items-start justify-between p-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                {t("profileSettings.showInstagramBadge")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("profileSettings.showInstagramBadgeDesc")}
              </p>
            </div>
            <Switch defaultChecked className="ml-4" />
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-none font-normal"
          >
            <div className="flex-1 text-left">
              <h3 className="font-semibold mb-1">
                {t("profileSettings.profilePrivacy")}
              </h3>
              <p className="text-sm text-muted-foreground whitespace-break-spaces">
                {t("profileSettings.profilePrivacyDesc")}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-muted-foreground">{t("profileSettings.public")}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Button>

          <Separator />

          <div className="p-4">
            <Button className="w-full bg-black hover:bg-black/90 text-white h-12 rounded-xl font-semibold">
              {t("profileSettings.done")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </ModalPopup>
  );
};
export default ProfileSettings;
