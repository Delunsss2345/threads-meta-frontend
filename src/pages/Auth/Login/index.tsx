import LoginForm from "@/components/LoginForm";
import type { LoginSchemaBodyType } from "@/schema/auth.schema";

const Login = () => {
  const handleLogin = (values: LoginSchemaBodyType) => {};

  return (
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
};

export default Login;
