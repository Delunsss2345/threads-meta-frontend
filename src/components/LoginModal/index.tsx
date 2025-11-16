import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import ModalPopup from "../ModalPopup";

interface AuthSocialModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  onContinue: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  Icon?: LucideIcon;
  iconGradient?: string;
}

const AuthSocialModal: React.FC<AuthSocialModalProps> = ({
  onClose,
  onContinue,
  title,
  description,
  buttonText,
  Icon,
  iconGradient = "from-pink-500 via-red-500 to-yellow-400",
}) => {
  const { t } = useTranslation();

  return (
    <ModalPopup customModalClassName="w-120" onClose={onClose}>
      <Card className="bg-primary-foreground border-none text-center rounded-2xl shadow-xl">
        <CardContent className="p-6 space-y-5">
          <div className={`flex justify-center ${Icon ? "" : "hidden"}`}>
            <div
              className={`w-20 h-20 rounded-lg bg-gradient-to-from ${iconGradient} flex items-center justify-center`}
            >
              {Icon && <Icon size={30} className="text-foreground w-12 h-12" />}
            </div>
          </div>

          <h2 className="text-foreground font-bold text-3xl">
            {title || t("authModal.signUpToPost")}
          </h2>
          <p className="text-foreground text-sm leading-relaxed ">
            {description || t("modal.joinThreads")}
          </p>

          <Button
            onClick={onContinue}
            className="w-full bg-primary-foreground border cursor-pointer hover:!bg-transparent text-foreground justify-between py-6 rounded-xl"
          >
            <div onClick={onContinue} className="flex items-center space-x-3">
              <span>{buttonText || t("authModal.continueWithLogin")}</span>
            </div>
            <span className="text-foreground">{">"}</span>
          </Button>
        </CardContent>
      </Card>
    </ModalPopup>
  );
};

export default AuthSocialModal;
