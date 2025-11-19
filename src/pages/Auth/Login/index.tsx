import LoginForm from "@/components/LoginForm";
import { login } from "@/features/auth";
import { useAuth } from "@/features/auth/hook";
import type { LoginSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Login = () => {
  const { isAuthenticated } = useAuth();
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
      <LoginForm onLogin={handleLogin} />
    </>
  );
};

export default Login;
