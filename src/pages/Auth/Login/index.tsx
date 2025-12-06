import { login } from "@/features/auth";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/hooks";
import type { LoginSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const verified = location.state?.verified;
  const dispatch = useDispatch<AppDispatch>();

  if (isAuthenticated) {
    window.location.replace("/");
    return null;
  }


  const handleLogin = async (values: LoginSchemaBodyType) => {
    await toast.promise(dispatch(login(values)), {
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
