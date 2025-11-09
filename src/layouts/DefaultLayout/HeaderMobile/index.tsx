import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const HeaderMobile: React.FC = () => {
  return (
    <header className=" lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-background border-b border-border h-12 px-4 ">
      <div className="w-6" />

      <div className="flex-1 flex justify-center">
        <Logo className="h-6 w-6 text-foreground" />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
      >
        <Menu className="w-5 h-5" />
      </Button>
    </header>
  );
};

export default HeaderMobile;
