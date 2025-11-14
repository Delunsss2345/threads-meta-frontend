import FavoriteIcon from "@/components/Icon/FavoriteIcon";
import HomeIcon from "@/components/Icon/HomeIcon";
import SubtractIcon from "@/components/Icon/SubtractIcon";
import UserIcon from "@/components/Icon/UserIcon";
import AuthSocialModal from "@/components/LoginModal";
import NewPostModal from "@/components/Post/NewPostModal";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hook";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { key: "home", icon: <HomeIcon size={26} />, link: "/" },
  { key: "search", icon: <SearchIcon size={26} />, link: "/search" },
  {
    key: "write",
    icon: <SubtractIcon size={20} />,
    isAuth: true,
  },
  {
    key: "activity",
    icon: <FavoriteIcon size={26} />,
    link: "/activity",
    isAuth: true,
  },
  {
    key: "profile",
    icon: <UserIcon size={26} />,
    link: "/profile",
    isAuth: true,
  },
];

const NavMobile: React.FC = () => {
  const [activeNav, setActiveNav] = useState("home");
  const currentUser = useCurrentUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);

  const navigate = useNavigate();
  const isMobile = useIsMobile();
  if (!isMobile) return;
  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isAuth && !Boolean(currentUser)) {
      setShowAuthModal(true);
      return;
    }
    setActiveNav(item.key);
    if (item.link) navigate(item.link);
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
            onClick={
              item.key === "write"
                ? () => setOpenPostModal(!openPostModal)
                : () => handleNavClick(item)
            }
          >
            {item.icon}
          </Button>
        ))}
      </nav>
      {openPostModal ? (
        <AnimatePresence>
          <NewPostModal onClose={() => setOpenPostModal(false)} />
        </AnimatePresence>
      ) : null}
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
