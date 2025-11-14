import MenuIcon from "@/components/Icon/MenuIcon";
import Logo from "@/components/Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import SlideUpMenu from "../Navbar/SideUpMenu";

const HeaderMobile: React.FC = () => {
  const isMobile = useIsMobile();
  if (!isMobile) return;
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-primary-foreground border-none h-12 px-4 ">
      <div className="w-6" />

      <div className="flex-1 flex justify-center">
        <Logo className="h-6 w-6 text-foreground" />
      </div>

      <div className="md:hidden">
        <SlideUpMenu
          motionProps={{
            initial: {
              opacity: 0,
              x: -10,
              y: 0,
              scale: 0.96,
            },
            animate: {
              opacity: 1,
              x: -10,
              y: 0,
              scale: 1,
            },
            exit: {
              opacity: 0,
              x: 25,
              scale: 0.96,
            },
            transition: {
              duration: 0.18,
              ease: "easeOut",
            },
          }}
        >
          <MenuIcon className="w-5 h-5 rotate-180" />
        </SlideUpMenu>
      </div>
    </header>
  );
};

export default HeaderMobile;
