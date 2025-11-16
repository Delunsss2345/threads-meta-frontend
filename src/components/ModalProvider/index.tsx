import { useAppSelector } from "@/store";
import { AnimatePresence } from "framer-motion";

export function ModalProvider() {
  const { modal } = useAppSelector((state) => state.modal);
  return <AnimatePresence>{modal && modal()}</AnimatePresence>;
}
