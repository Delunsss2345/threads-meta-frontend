import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

const MenuPopup = ({ buttonActive, children }: any) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{buttonActive}</Button>
      </DropdownMenuTrigger>

      <AnimatePresence>
        <DropdownMenuContent
          asChild
          sideOffset={8}
          forceMount
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ opacity: 0, x: 25, scale: 0.96 }}
            animate={{ opacity: 1, x: 25, scale: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-56 rounded-xl border border-gray-200 bg-primary-foreground p-1 shadow-lg"
          >
            {children}
          </motion.div>
        </DropdownMenuContent>
      </AnimatePresence>
    </DropdownMenu>
  );
};

export default MenuPopup;
