import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import PortalModal from "../PortalModal";
import SheetModal from "../SheetModal";

interface ModalPopupProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  customModalClassName?: string;
  mode?: "subtract" | "auto" | "custom";
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
  title?: string;
  isMobileSheet?: boolean;
  modeSheet?: "auto" | "fit";
}

const ModalPopup = ({
  children,
  onClose,
  title,
  className,
  customModalClassName,
  mode = "auto",
  closeOnBackdropClick = true,
  isMobileSheet = true,
  modeSheet = "auto",
}: ModalPopupProps) => {
  const isMobile = useIsMobile();

  if (isMobile && isMobileSheet) {
    return (
      <SheetModal mode={modeSheet} open={true} onClose={onClose} title={title}>
        {children}
      </SheetModal>
    );
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
      e.stopPropagation();
    }
  };

  return (
    <PortalModal>
      <motion.div
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "fixed inset-0 bg-black/50 flex items-center pt-[10vh] justify-center z-50",
          className,
          mode === "subtract" && "block absolute bg-transparent"
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={
            mode === "custom"
              ? customModalClassName ?? ""
              : cn(
                  "w-full max-w-[630px] bg-background rounded-3xl mb-20 text-foreground shadow-xl border-none sm:border z-50",
                  customModalClassName
                )
          }
        >
          {children}
        </motion.div>
      </motion.div>
    </PortalModal>
  );
};

export default ModalPopup;
