import { selectActiveModal } from "@/features/modal";
import { useAppSelector } from "@/store";
import { AnimatePresence } from "framer-motion";

export function ModalProvider() {
  const modal = useAppSelector(selectActiveModal);
  return <AnimatePresence>{modal && modal()}</AnimatePresence>;
}
