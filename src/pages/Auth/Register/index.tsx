import { RegisterForm } from "@/components/auth/RegisterForm";
import { register, resendVerifyEmail } from "@/features/auth";
import type { RegisterSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleRegister = async (values: RegisterSchemaBodyType) => {
    try {
      const res = await dispatch(register(values)).unwrap();
      if (res.success) {
        const token = res.data.access_token;
        await toast.promise(dispatch(resendVerifyEmail({ token })), {
          success: t("auth.verifyEmailSent"),
          loading: t("auth.loading"),
          error: t("auth.verifyEmailError"),
        });
      }
    } catch {
      toast.error(t("auth.registerFailed"));
    }
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default Register;
