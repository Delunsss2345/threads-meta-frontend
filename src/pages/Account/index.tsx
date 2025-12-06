import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ExternalLinkItem from "@/layouts/SettingLayout/ItemSetting/ExtraItem";
import MenuItem from "@/layouts/SettingLayout/ItemSetting/MenuSettings";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  return (
    <Card className="p-0 border-none shadow-none gap-1 bg-primary-foreground">
      <div className="space-y-1">
        <MenuItem text={t("account.sensitiveContent")} />
        <MenuItem text={t("account.politicalContent")} />
        <MenuItem text={t("account.sitePermissions")} />
        <MenuItem text={t("account.disableOrDeleteProfile")} />
        <MenuItem
          text={t("account.shareToFediverse")}
          badge={
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
              {t("common.beta")}
            </span>
          }
        />
      </div>

      <Separator className="my-4" />

      <div>
        <h3 className="font-semibold mb-2">
          {t("account.otherAccountSettings")}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          {t("account.sharedSettingsDescription")}
        </p>

        <div className="space-y-1">
          <ExternalLinkItem text={t("account.personalInfo")} />
          <ExternalLinkItem text={t("account.security")} />
          <ExternalLinkItem text={t("account.downloadYourInfo")} />
          <ExternalLinkItem text={t("account.transferYourInfo")} />
        </div>
      </div>
    </Card>
  );
};

export default Account;
