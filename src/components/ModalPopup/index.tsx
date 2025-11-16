import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import PortalModal from "../PortalModal";

interface ModalPopupProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  customModalClassName?: string;
  mode?: "subtract" | "auto";
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
}

const ModalPopup = ({
  children,
  onClose,
  className,
  customModalClassName,
  mode = "auto",
  closeOnBackdropClick = true,
}: ModalPopupProps) => {
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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={cn(
          "fixed inset-0 bg-black/50 flex items-center pt-[10vh] justify-center z-20",
          className,
          mode === "subtract" && "block absolute bg-transparent"
        )}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "w-full max-w-[630px] bg-background rounded-3xl mb-20 text-foreground shadow-xl border-none sm:border z-50",
            customModalClassName
          )}
        >
          {children}
        </motion.div>
      </motion.div>
    </PortalModal>
  );
};

export default ModalPopup;
