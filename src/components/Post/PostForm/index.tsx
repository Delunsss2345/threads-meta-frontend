import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/features/auth/hook";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NewPostModal from "../NewPostModal";

const PostForm = () => {
  const [openModalNewPost, setOpenModalNewContent] = useState(false);
  const { t } = useTranslation();
  const currentUser = useCurrentUser();
  if (!currentUser) return null;
  return (
    <>
      <Card className="px-6 py-3 border-0 rounded-none shadow-none cursor-pointer bg-primary-foreground ">
        <CardContent className="flex items-start p-0">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/avatar.png" alt="user" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              onClick={() => setOpenModalNewContent(true)}
              readOnly={true}
              placeholder={t("post.whatsNew")}
              className=" placeholder:align-middle h-auto !bg-transparent rounded-none px-2 text-foreground-100 border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              rows={1}
            />
          </div>

          <Button
            onClick={() => setOpenModalNewContent(true)}
            className="border-foreground border transition-none !bg-primary-foreground text-foreground cursor-pointer"
          >
            {t("common.post")}
          </Button>
        </CardContent>
      </Card>
      {openModalNewPost && (
        <NewPostModal onClose={() => setOpenModalNewContent(false)} />
      )}
    </>
  );
};

export default PostForm;
