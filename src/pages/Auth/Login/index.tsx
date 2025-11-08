import { InstagramLoginButton } from "@/components/InstagramLoginButton";
import { LoginForm } from "@/components/LoginForm";
import { Helmet } from "react-helmet";

const Login = () => {
  const handleLogin = (username: string, password: string) => {
    console.log("Login with:", { username, password });
  };

  return (
    <>
      <Helmet>
        <title>Threads · Đăng nhập</title>
      </Helmet>

      <div className="space-y-6">
        <LoginForm onLogin={handleLogin} />

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-500 text-sm">hoặc</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <InstagramLoginButton username="huydarealest" />
      </div>
    </>
  );
};

export default Login;
