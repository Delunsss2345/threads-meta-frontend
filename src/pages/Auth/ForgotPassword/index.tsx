import { forgotPassword } from "@/features/auth";
import { authApi } from "@/features/auth/api";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import type { ForgotPasswordSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleForgotPassword = async (values: ForgotPasswordSchemaBodyType) => {
    try {
      const res = await authApi.validateEmail(values);

      if (!res.data.available) {
        await toast.promise(dispatch(forgotPassword(values)), {
          loading: t("auth.forgotSending"),
          success: t("auth.forgotSuccess"),
          error: t("auth.forgotError"),
        });
      } else {
        toast.error(t("auth.emailNotFound"));
      }
    } catch (error) {
      toast.error(t("auth.unknownError"));
    }
  };

  return <ForgotPasswordForm onForgotPassword={handleForgotPassword} />;
};

export default ForgotPassword;
