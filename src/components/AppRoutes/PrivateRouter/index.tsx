import { AuthContext } from "@/components/AuthProvider";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [location.pathname]);

  return <>{children}</>;
};

export default PrivateRouter;
