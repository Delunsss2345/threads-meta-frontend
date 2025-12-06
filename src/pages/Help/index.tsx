import { Card } from "@/components/ui/card";
import ExternalLinkItem from "@/layouts/SettingLayout/ItemSetting/ExtraItem";
import MenuItem from "@/layouts/SettingLayout/ItemSetting/MenuSettings";
import { useTranslation } from "react-i18next";

const Help = () => {
  const { t } = useTranslation();

  return (
    <Card className="p-0 border-none shadow-none gap-1 bg-primary-foreground">
      <div className="space-y-1">
        <MenuItem text={t("help.securityAndPrivacyHelp")} />
        <MenuItem className="border-b-1" text={t("help.requestSupport")} />
      </div>

      <div className="space-y-1">
        <ExternalLinkItem text={t("help.helpCenter")} />
        <ExternalLinkItem text={t("help.metaPrivacyPolicy")} />
        <ExternalLinkItem text={t("help.metaTerms")} />
        <ExternalLinkItem text={t("help.threadsAdditionalPrivacy")} />
        <ExternalLinkItem text={t("help.threadsTerms")} />
        <ExternalLinkItem text={t("help.cookiePolicy")} />
        <ExternalLinkItem text={t("help.fediverseGuidelines")} />
      </div>
    </Card>
  );
};

export default Help;
