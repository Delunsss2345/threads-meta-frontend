import AuthSocialModal from "@/components/LoginModal";
import Logo from "@/components/Logo";
import { useCurrentUser } from "@/features/auth/hook";
import { Heart, Home, Menu, Plus, Search, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import SlideUpMenu from "./SideUpMenu";

const navItems = [
  { key: "home", icon: <Home size={30} />, link: "/" },
  { key: "search", icon: <Search size={30} />, link: "/search" },
  {
    key: "write",
    icon: <Plus size={20} strokeWidth={2.5} />,
    link: "/write",
    isAuth: true,
  },
  {
    key: "activity",
    icon: <Heart size={30} />,
    link: "/activity",
    isAuth: true,
  },
  {
    key: "profile",
    icon: <User size={30} />,
    link: "/profile",
    isAuth: true,
  },
];
const Navbar: React.FC = () => {
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
  const handleLogin = () => {
    setShowAuthModal(false);
  };

  return (
    <nav className="bg-background border-border h-screen fixed left-0 top-0 flex flex-col p-4 z-20">
      {/* Logo */}
      <div className="mb-8 size-10 hover:scale-110 transition cursor-pointer">
        <Logo />
      </div>

      {/* Navigation Items */}
      <div className="space-y-1 flex-1 gap-5 flex flex-col justify-center">
        {navItems.map((item) => (
          <NavItem
            key={item.key}
            icon={item.icon}
            active={activeNav === item.key}
            onClick={() => handleNavClick(item)}
            link={item.link}
          />
        ))}
      </div>

      {/* Bottom Items */}
      <div className="space-y-1 border-t border-border pt-4">
        {/* <NavItem icon={<Pin size={24} />} />
         */}

        <SlideUpMenu>
          <NavItem
            className="hover:bg-transparent hover:text-current"
            icon={<Menu size={24} />}
          />
        </SlideUpMenu>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthSocialModal
          open={showAuthModal}
          onClose={closeAuthModal}
          onContinue={handleLogin}
          title="Login to continue"
          description="Join Threads to share thoughts, find out what's going on, follow your people and more."
        />
      )}
    </nav>
  );
};

export default Navbar;
