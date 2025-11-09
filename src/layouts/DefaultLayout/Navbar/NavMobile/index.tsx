import AuthSocialModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hook";
import { Heart, Home, Plus, Search, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { key: "home", icon: <Home size={26} />, link: "/" },
  { key: "search", icon: <Search size={26} />, link: "/search" },
  {
    key: "write",
    icon: <Plus size={20} strokeWidth={2.5} />,
    link: "/write",
    isAuth: true,
  },
  {
    key: "activity",
    icon: <Heart size={26} />,
    link: "/activity",
    isAuth: true,
  },
  {
    key: "profile",
    icon: <User size={26} />,
    link: "/profile",
    isAuth: true,
  },
];

const NavMobile: React.FC = () => {
  const [activeNav, setActiveNav] = useState("home");
  const currentUser = useCurrentUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isAuth && !Boolean(currentUser)) {
      setShowAuthModal(true);
      return;
    }
    setActiveNav(item.key);
    navigate(item.link);
  };

  const closeAuthModal = () => setShowAuthModal(false);
  const handleLogin = () => setShowAuthModal(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex justify-around items-center py-2 ">
        {navItems.map((item) => (
          <Button
            key={item.key}
            variant="ghost"
            size="icon"
            className={`rounded-full transition ${
              activeNav === item.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => handleNavClick(item)}
          >
            {item.icon}
          </Button>
        ))}
      </nav>

      {showAuthModal && (
        <AuthSocialModal
          open={showAuthModal}
          onClose={closeAuthModal}
          onContinue={handleLogin}
          title="Login to continue"
          description="Join Threads to share thoughts, find out what's going on, follow your people and more."
        />
      )}
    </>
  );
};

export default NavMobile;
