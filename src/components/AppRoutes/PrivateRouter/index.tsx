import { useAuth } from "@/features/auth/hook";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [location.pathname]);

  return <>{children}</>;
};

export default PrivateRouter;
