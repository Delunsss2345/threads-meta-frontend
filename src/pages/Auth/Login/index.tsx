import { login } from "@/features/auth";
import LoginForm from "@/features/auth/components/LoginForm";
import { useAuth } from "@/features/auth/hooks";
import type { LoginSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const verified = location.state?.verified;
  if (isAuthenticated) {
    window.location.replace("/");
    return null;
  }
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (values: LoginSchemaBodyType) => {
    try {
      const response = await dispatch(login(values));
      console.log(response);
      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {verified && (
        <p className="text-green-600 text-sm text-center mb-4">
          Đã xác minh tài khoản thành công. Vui lòng đăng nhập.
        </p>
      )}
      <LoginForm onLogin={handleLogin} />
    </>
  );
};

export default Login;
