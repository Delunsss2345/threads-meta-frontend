import AuthModal, {
  AuthContext,
  type AuthModalProps,
} from "@/components/AuthModal";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Content from "./Content";
import Navbar from "./Navbar";

// Default Layout Component
interface DefaultLayoutProps {
  requireAuth?: boolean;
  authModalProps?: Partial<AuthModalProps>;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  requireAuth = false,
  authModalProps,
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(
    requireAuth && !isAuthenticated
  );

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Content>
        <Outlet />
      </Content>

      {showAuthModal && (
        <AuthModal
          {...authModalProps}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};
export default DefaultLayout;
