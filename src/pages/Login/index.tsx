// src/pages/Login.tsx
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FooterLinks } from "@/components/FooterLinks";
import { InstagramLoginButton } from "@/components/InstagramLoginButton";
import { LoginForm } from "@/components/LoginForm";
import Logo from "@/components/Logo";
import { QRCodeSection } from "@/components/QRCodeSection";
import { Helmet } from "react-helmet";
const Login = () => {
  const handleLogin = (username: string, password: string) => {
    console.log("Login with:", { username, password });
    // Xử lý login ở đây
  };

  return (
    <>
      <Helmet>
        <title>Threads · Đăng nhập</title>
      </Helmet>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
        <AnimatedBackground />
        <div className=" sm:hidden size-14 mb-5">
          <Logo />
        </div>
        <div className="relative z-10 w-full max-w-md px-6">
          <h1 className="text-center text-base font-bold mb-8">
            Đăng nhập bằng tài khoản Instagram
          </h1>

          <div className="space-y-6">
            <LoginForm onLogin={handleLogin} />

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="text-gray-500 text-sm">hoặc</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            <InstagramLoginButton username="huydarealest" />
          </div>
        </div>

        <QRCodeSection />
        <FooterLinks />
      </div>
    </>
  );
};

export default Login;
