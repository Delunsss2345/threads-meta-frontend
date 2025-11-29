import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";

interface MenuPopupProps {
  buttonActive: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  customPopup?: string;
  motionProps?: {
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    exit?: Record<string, any>;
    transition?: Record<string, any>;
  };
  mode?: "short" | "long" | "medium";
}

const MenuPopup = ({
  buttonActive,
  children,
  motionProps,
  className,
  customPopup,
  mode = "short",
}: MenuPopupProps) => {
  const sizeClasses = {
    short: "w-56 *:px-2",
    medium: "w-72 *:px-3",
    long: "w-96 *:px-4",
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
        <Button className={className} variant="ghost">
          {buttonActive}
        </Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        <DropdownMenuContent
          asChild
          sideOffset={8}
          forceMount
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{
              opacity: 0,
              x: 25,
              scale: 0.96,
              ...(motionProps?.initial || {}),
            }}
            animate={{
              opacity: 1,
              x: 25,
              scale: 1,
              ...(motionProps?.animate || {}),
            }}
            exit={{
              opacity: 0,
              x: 25,
              scale: 0.96,
              ...(motionProps?.exit || {}),
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
              ...(motionProps?.transition || {}),
            }}
            className={`
                rounded-xl border border-gray-200 p-2 bg-primary-foreground 
                *:text-[15px] *:py-3 *:font-semibold *:rounded-xl shadow-lg
                ${sizeClasses[mode] || sizeClasses.long}
                ${customPopup || ""}
            `}
          >
            {children}
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default MenuPopup;
