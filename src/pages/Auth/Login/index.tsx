import LoginForm from "@/components/auth/LoginForm";
import { login } from "@/features/auth";
import type { LoginSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const verified = location.state?.verified;
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async (values: LoginSchemaBodyType) => {
    await toast.promise(dispatch(login(values)).unwrap(), {
      loading: t("auth.loggingIn"),
      success: t("auth.loginSuccess"),
      error: t("auth.loginFailed"),
    });
  };

  return (
    <>
      {verified && (
        <p className="text-green-600 text-sm text-center mb-4">
          {t("auth.accountVerified")}
        </p>
      )}
      <LoginForm onLogin={handleLogin} />
    </>
  );
};

export default Login;
