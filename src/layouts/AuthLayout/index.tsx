import BackButton from "@/components/common/BackButton";
import { Loading } from "@/components/common/Loading";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/features/auth/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatedBackground } from "@/layouts/AuthLayout/AnimatedBackground";
import { FooterLinks } from "@/layouts/AuthLayout/FooterLinks";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import QRCodeSection from "./QRCodeSection";

const AuthLayout = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
        {isMobile ? (
          <div className="absolute top-10 left-5">
            <BackButton onClick={() => window.location.replace("/")} />
          </div>
        ) : (
          ""
        )}
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
    </Suspense>
  );
};

export default AuthLayout;
