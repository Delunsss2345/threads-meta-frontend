import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SheetPopup from "../SheetPopup";

interface MenuPopupProps {
  buttonActive: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  customPopup?: string;
  motionProps?: {
    initial?: Record<string, any>;
    animate?: Record<string, any>;
    exit?: Record<string, any>;
    transition?: Record<string, any>;
  };
  mode?: "short" | "long" | "medium";
  isMobilePopup?: boolean;
  items?: any[];
}

const MenuPopup = ({
  buttonActive,
  children,
  motionProps,
  className,
  customPopup,
  mode = "short",
  items,
}: MenuPopupProps) => {
  const { isAuthenticated } = useAuth();
  const sizeClasses = {
    short: "w-56 *:px-2",
    medium: "w-72 *:px-3",
    long: "w-96 *:px-4",
  };
  const [openSheet, setOpenSheet] = useState(false);
  const isMobile = useIsMobile();
  if (isMobile && items?.length >= 1) {
    return (
      <>
        <button
          className={cn(className)}
          onClick={(e) => {
            e.stopPropagation();
            setOpenSheet(true);
          }}
        >
          {buttonActive}
        </button>

        <SheetPopup
          title="MenuPopup"
          open={openSheet}
          onOpenChange={setOpenSheet}
        >
          <div className="p-2 space-y-1">
            {items.map((item, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.onClick) {
                    item.onClick();
                    setOpenSheet(false);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-4 
       text-sm rounded-lg bg-background transition border ${
         item.isAuth ? (isAuthenticated !== item?.isAuth ? "hidden" : "") : ""
       }`}
              >
                <span className="font-semibold text-md">{item.label}</span>
                {item.icon}
              </button>
            ))}
          </div>
        </SheetPopup>
      </>
    );
  }
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
              h-fit
                rounded-xl border border-gray-200 p-2 bg-primary-foreground 
                *:text-[15px] *:py-3 *:font-semibold *:rounded-xl shadow-lg
                ${sizeClasses[mode] || sizeClasses.long}
                ${customPopup || ""}
            `}
          >
            {items && items.length > 0
              ? items.map((item, i) => (
                  <DropdownMenuItem
                    key={i}
                    className={`flex items-center justify-between gap-2 ${
                      item?.isAuth
                        ? isAuthenticated !== item.isAuth
                          ? "hidden"
                          : ""
                        : ""
                    } `}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.onClick) {
                        item.onClick();
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {item.icon}
                  </DropdownMenuItem>
                ))
              : children}
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default MenuPopup;
