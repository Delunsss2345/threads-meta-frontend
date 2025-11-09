import type { RootState } from "@/types/redux.type";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

interface PrivateRouterProps {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({ children }) => {
  const isAuth =
    Boolean(useSelector((state: RootState) => state.auth.currentUser)) !== null;
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) navigate("/login");
  }, [location.pathname]);

  return <>{children}</>;
};

export default PrivateRouter;
