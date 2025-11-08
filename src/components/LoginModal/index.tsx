import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface AuthSocialModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  Icon?: LucideIcon;
  iconGradient?: string;
}

const AuthSocialModal: React.FC<AuthSocialModalProps> = ({
  open,
  onClose,
  onContinue,
  title = "Sign up to post",
  description = "Join Threads to share thoughts, find out what's going on, follow your people and more.",
  buttonText = "Continue with login",
  Icon,
  iconGradient = "from-pink-500 via-red-500 to-yellow-400",
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-foreground/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[340px] sm:w-[400px]"
          >
            <Card className="bg-neutral-900 border-none text-center rounded-2xl shadow-xl">
              <CardContent className="p-6 space-y-5">
                <div className={`flex justify-center ${Icon ? "" : "hidden"}`}>
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-from ${iconGradient} flex items-center justify-center`}
                  >
                    {Icon && <Icon className="text-white w-5 h-5" />}
                  </div>
                </div>

                <h2 className="text-white font-bold text-3xl">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed ">
                  {description}
                </p>

                <Button
                  onClick={onContinue}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white justify-between py-6 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <span>{buttonText}</span>
                  </div>
                  <span className="text-gray-400">{">"}</span>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthSocialModal;
