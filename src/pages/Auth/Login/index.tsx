import LoginForm from "@/components/LoginForm";
import { login } from "@/features/auth";
import type { LoginSchemaBodyType } from "@/schema/auth.schema";
import type { AppDispatch } from "@/types/redux";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (values: LoginSchemaBodyType) => {
    try {
      const response = await dispatch(login(values));
      console.log(response);
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
