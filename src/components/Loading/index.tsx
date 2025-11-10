import { motion } from "framer-motion";
import Logo from "../Logo";

export const Loading = () => {
  return (
    <div
      className="
        fixed inset-0 flex flex-col items-center justify-center
        bg-primary-foreground 
      "
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 2.5, opacity: 0 }}
        exit={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo className="text-foreground size-20" />
      </motion.div>

      <div className="flex flex-col items-center absolute bottom-10">
        <span className="font-semibold text-blue-300 text-sm">form</span>
        <span className="text-foreground italic">huydarealest</span>
      </div>
    </div>
  );
};
