import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks";
import UserAction from "@/features/user/components/UserAction";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
function NewPostCustom({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  console.log(user);
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: 100, scale: 0.75 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, y: 100, scale: 0.75 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformOrigin: "bottom right" }}
      className="w-full absolute -bottom-20 right-[360px] bg-background rounded-3xl mb-20 text-foreground  shadow-xl border-none sm:border"
    >
      <Card
        className="gap-0 p-0 w-[450px] "
        onClick={(e) => e.stopPropagation()}
      >
        <Header mode="x" headerText={t("post.newThread")} onClose={onClose} />
        <CardContent className="p-4 pt-5">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              {/* Avatar chính */}
              <Avatar className="w-10 h-10 transition-opacity cursor-pointer hover:opacity-90">
                <AvatarImage
                  src={user?.avatar_url || undefined}
                  alt={`@${user?.username}`}
                />
                <AvatarFallback>
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="w-[2px] flex-1 bg-border my-2 min-h-[40px] rounded-full"></div>

              {/* Avatar nhỏ dưới */}
              <Avatar className="w-5 h-5 opacity-50">
                <AvatarImage
                  src={user?.avatar_url || undefined}
                  alt={`@${user?.username}`}
                />
                <AvatarFallback>
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 pt-1 space-y-4">
              <UserAction username={user.username} />

              <div className="min-h-[20px] flex items-center text-muted-foreground/50 text-sm pt-3">
                {t("post.addToThread")}
              </div>
            </div>
          </div>
        </CardContent>

        <Footer loading={false} onSubmit={() => {}} />
      </Card>
    </motion.div>
  );
}

export default NewPostCustom;
