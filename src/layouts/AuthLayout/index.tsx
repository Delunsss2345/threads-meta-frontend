import Logo from "@/components/Logo";
import { AnimatedBackground } from "@/layouts/AuthLayout/AnimatedBackground";
import { FooterLinks } from "@/layouts/AuthLayout/FooterLinks";
import { Outlet } from "react-router-dom";
import QRCodeSection from "./QRCodeSection";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      <div className=" sm:hidden size-14 mb-5">
        <Logo />
      </div>
      <div className="relative z-10 w-full max-w-md px-6 space-y-6">
        <Outlet />
      </div>

      <QRCodeSection />
      <FooterLinks />
    </div>
  );
};

export default AuthLayout;
