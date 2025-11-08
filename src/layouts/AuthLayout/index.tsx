import { AnimatedBackground } from "@/layouts/AuthLayout/AnimatedBackground";
import { FooterLinks } from "@/layouts/AuthLayout/FooterLinks";
import { QRCodeSection } from "@/layouts/AuthLayout/QRCodeSection";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md px-6">
        <Outlet />
      </div>

      <QRCodeSection />
      <FooterLinks />
    </div>
  );
};

export default AuthLayout;
