import ScrollTop from "@/components/common/ScrollTop";
import { useAuth } from "@/features/auth/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  <ScrollTop />;

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [location.pathname]);

  return <>{children}</>;
};

export default PrivateRouter;
