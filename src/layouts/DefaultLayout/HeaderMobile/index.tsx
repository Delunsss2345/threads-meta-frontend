import BackButton from "@/components/common/BackButton";
import MenuIcon from "@/components/common/Icon/MenuIcon";
import Logo from "@/components/common/Logo";
import { PAGE_CHILDREN_BY_PATH } from "@/constant/pageTitless";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";
import SlideUpMenu from "../Navbar/SideUpMenu";

const HeaderMobile: React.FC = () => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();

  if (!isMobile) return null;

  const isPostDetail = /^(\/[^/]+)?\/post\/[^/]+$/.test(pathname);
  const showBack = PAGE_CHILDREN_BY_PATH[pathname] || isPostDetail;

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-primary-foreground h-12 px-4">
      <div className="w-6 flex items-center justify-center">
        {showBack && <BackButton onClick={() => window.history.back()} />}
      </div>

      <div className="flex-1 flex justify-center">
        <Logo className="h-6 w-6 text-foreground" />
      </div>

      <div className="w-6 flex items-center justify-center">
        {!showBack && (
          <SlideUpMenu
            motionProps={{
              initial: { opacity: 0, x: -10, scale: 0.96 },
              animate: { opacity: 1, x: -10, scale: 1 },
              exit: { opacity: 0, x: 25, scale: 0.96 },
              transition: { duration: 0.18, ease: "easeOut" },
            }}
          >
            <MenuIcon className="w-5 h-5 rotate-180" />
          </SlideUpMenu>
        )}
      </div>
    </header>
  );
};

export default HeaderMobile;
