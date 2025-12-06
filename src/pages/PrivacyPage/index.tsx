import { Card, CardContent } from "@/components/ui/card";
import MenuItem from "@/layouts/SettingLayout/ItemSetting/MenuSettings";
import { EyeOff, Heart, Lock, Shield, User, Users, UserX } from "lucide-react";
import { useTranslation } from "react-i18next";

const PrivacyPage = () => {
  const { t } = useTranslation();
  return (
    <Card className="!p-0 !border-none shadow-none bg-primary-foreground text-primary">
      <CardContent className="!px-0 space-y-1 ">
        <MenuItem
          icon={<Lock className="w-5 h-5" />}
          text={t("privacy.privateProfile")}
          hasArrow
        />
        <MenuItem
          icon={<Shield className="w-5 h-5" />}
          text={t("privacy.tagAndMention")}
          hasArrow
        />
        <MenuItem
          icon={<User className="w-5 h-5" />}
          text={t("privacy.onlineStatus")}
          hasArrow
        />
        <MenuItem
          icon={<Users className="w-5 h-5" />}
          text={t("privacy.restrictedProfiles")}
          hasArrow
        />
        <MenuItem
          icon={<UserX className="w-5 h-5" />}
          text={t("privacy.blockedProfiles")}
          hasArrow
        />
        <MenuItem
          icon={<EyeOff className="w-5 h-5" />}
          text={t("privacy.mutedWords")}
          hasArrow
        />
        <MenuItem
          icon={<Heart className="w-5 h-5" />}
          text={t("privacy.hideLikesAndShares")}
          hasArrow
        />
      </CardContent>
    </Card>
  );
};

export default PrivacyPage;
