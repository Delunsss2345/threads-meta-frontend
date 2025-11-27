import AvatarGroup from "@/components/common/AvatarGroup";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks";
import PostForm from "@/features/post/components/PostForm";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CardStepupProfile from "../CardStepupProfile";

const ProfileThreads = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <>
      <PostForm />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {t("profile.completeProfile")}
          </h2>
          <span className="text-gray-400">{t("profile.remaining")} 2</span>
        </div>

        <CardStepupProfile />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Star className="w-5 h-5 text-gray-500" />
        <span className="text-gray-400">{t("profile.firstThread")}</span>
      </div>

      <div className="flex gap-3">
        <AvatarGroup
          size={8}
          url={user?.avatar_url || ""}
          fallBack={user?.username?.slice(0, 2).toUpperCase()}
          classNameFallback="bg-primary-foreground"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">{user.username}</span>
            <span className="text-sm text-muted-foreground">1 phút</span>

            <Button variant="ghost" size="icon" className="ml-auto w-8 h-8">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          <p className="mb-4 text-foreground">a</p>

          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Repeat2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileThreads;
