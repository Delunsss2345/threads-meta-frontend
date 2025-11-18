import FavoriteIcon from "@/components/Icon/FavoriteIcon";
import HomeIcon from "@/components/Icon/HomeIcon";
import MenuIcon from "@/components/Icon/MenuIcon";
import SearchIcon from "@/components/Icon/SearchIcon";
import SubtractIcon from "@/components/Icon/SubtractIcon";
import UserIcon from "@/components/Icon/UserIcon";
import AuthSocialModal from "@/components/LoginModal";
import Logo from "@/components/Logo";
import NewPostModal from "@/components/Post/NewPostModal";
import { useCurrentUser } from "@/features/auth/hook";
import { useModal } from "@/hooks/use-modal";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./NavItem";
import SlideUpMenu from "./SideUpMenu";

const NAV_CONFIG = [
  { key: "home", Icon: HomeIcon, link: "/" },
  { key: "search", Icon: SearchIcon, link: "/search" },
  { key: "write", Icon: SubtractIcon, isAuth: true },
  { key: "activity", Icon: FavoriteIcon, link: "/activity", isAuth: true },
  { key: "profile", Icon: UserIcon, link: "/profile", isAuth: true },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const modal = useModal();

  const activeNav = useMemo(() => {
    const current = NAV_CONFIG.find((item) => item.link === location.pathname);
    return current?.key || "home";
  }, [location.pathname]);

  const handleNavClick = (item: (typeof NAV_CONFIG)[number]) => {
    if (item?.isAuth && !currentUser) {
      modal.show(
        <AuthSocialModal
          onClose={() => modal.hide()}
          onContinue={() => {
            modal.hide();
            navigate("/login");
          }}
          title={t("modal.loginToContinue")}
          description={t("modal.joinThreads")}
        />
      );
      return;
    }
    if (item?.link) navigate(item?.link);
  };

  const handleWriteClick = () => {
    if (!currentUser) {
      modal.show(
        <AuthSocialModal
          onClose={() => modal.hide()}
          onContinue={() => {
            modal.hide();
            navigate("/login");
          }}
          title={t("modal.loginToContinue")}
          description={t("modal.joinThreads")}
        />
      );
      return;
    }

    modal.show(<NewPostModal onClose={() => modal.hide()} />);
  };

  return (
    <nav className="fixed top-0 left-0 z-20 flex flex-col items-center h-screen py-3 px-2 backdrop-blur-[15px] bg-background/85 border-border">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 transition size-10 hover:scale-110"
        aria-label="Go to home"
      >
        <Logo />
      </button>

      {/* Navigation Items */}
      <div className="flex flex-col justify-center flex-1 gap-5">
        {NAV_CONFIG.map((item) => (
          <NavItem
            key={item.key}
            icon={<item.Icon size={25} />}
            active={activeNav === item.key}
            onClick={
              item.key === "write"
                ? handleWriteClick
                : () => handleNavClick(item)
            }
          />
        ))}
      </div>

      <div className="pt-4 space-y-1 border-t border-border">
        <SlideUpMenu
          customPopup="translate-x-5"
          motionProps={{
            initial: { opacity: 0, x: 0, scale: 0.96 },
            animate: { opacity: 1, x: 0, scale: 1 },
          }}
        >
          <NavItem
            className="hover:bg-transparent hover:text-current !p-0"
            icon={<MenuIcon size={26} />}
          />
        </SlideUpMenu>
      </div>
    </nav>
  );
};

export default Navbar;
