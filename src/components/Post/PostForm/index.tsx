import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hook";
import { useModal } from "@/hooks/use-modal";
import { useTranslation } from "react-i18next";
import NewPostModal from "../NewPostModal";

const PostForm = () => {
  const { show, hide } = useModal();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  return (
    <>
      <Card className="px-6 py-3 border-0 rounded-none shadow-none cursor-pointer bg-primary-foreground ">
        <CardContent className="flex items-start p-0">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={user?.avatar_url || undefined}
              alt={`@${user?.username}`}
            />
            <AvatarFallback>
              {user?.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              onClick={() => {
                show(<NewPostModal onClose={hide} />);
              }}
              readOnly={true}
              placeholder={t("post.whatsNew")}
              className=" placeholder:align-middle h-auto !bg-transparent rounded-none px-2 text-foreground-100 border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              rows={1}
            />
          </div>

          <Button
            onClick={() => {
              show(<NewPostModal onClose={hide} />);
            }}
            className="border-foreground border transition-none !bg-primary-foreground text-foreground cursor-pointer"
          >
            {t("common.post")}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default PostForm;
