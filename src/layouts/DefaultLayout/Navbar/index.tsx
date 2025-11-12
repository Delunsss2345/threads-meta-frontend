import AuthSocialModal from "@/components/LoginModal";
import Logo from "@/components/Logo";
import NewPostModal from "@/components/Post/NewPostModal";
import { useCurrentUser } from "@/features/auth/hook";
import { AnimatePresence } from "framer-motion";
import { Heart, Home, Menu, Plus, Search, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import SlideUpMenu from "./SideUpMenu";

const navItems = [
  { key: "home", icon: <Home size={25} />, link: "/" },
  { key: "search", icon: <Search size={25} />, link: "/search" },
  {
    key: "write",
    icon: <Plus size={20} strokeWidth={2.5} />,

    isAuth: true,
  },
  {
    key: "activity",
    icon: <Heart size={25} />,
    link: "/activity",
    isAuth: true,
  },
  {
    key: "profile",
    icon: <User size={25} />,
    link: "/profile",
    isAuth: true,
  },
];
const Navbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [openPostModal, setOpenPostModal] = useState(false);
  const currentUser = useCurrentUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isAuth && !Boolean(currentUser)) {
      setShowAuthModal(true);
      return;
    }
    setActiveNav(item.key);
    if (item.link) navigate(item.link);
  };

  const closeAuthModal = () => setShowAuthModal(false);
  const handleLogin = () => {
    setShowAuthModal(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-20 flex flex-col items-center h-screen p-3 bg-background border-border">
      {/* Logo */}
      <div
        onClick={() => {
          navigate("/");
          setActiveNav("home");
        }}
        className="mb-8 transition cursor-pointer size-10 hover:scale-110"
      >
        <Logo />
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col justify-center flex-1 gap-5 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.key}
            icon={item.icon}
            active={activeNav === item.key}
            onClick={
              item.key === "write"
                ? () => setOpenPostModal(!openPostModal)
                : () => handleNavClick(item)
            }
            link={item.link}
          />
        ))}

        {openPostModal ? (
          <AnimatePresence>
            <NewPostModal onClose={() => setOpenPostModal(false)} />
          </AnimatePresence>
        ) : null}
      </div>

      {/* Bottom Items */}
      <div className="pt-4 space-y-1 border-t border-border">
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
          title={t("modal.loginToContinue")}
          description={t("modal.joinThreads")}
        />
      )}
    </nav>
  );
};

export default Navbar;
