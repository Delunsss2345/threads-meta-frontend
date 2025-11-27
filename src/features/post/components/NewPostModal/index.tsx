import AvatarGroup from "@/components/common/AvatarGroup";
import ModalPopup from "@/components/common/ModalPopup";
import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks";
import { selectPostsLoading } from "@/features/post";
import { postThreads } from "@/features/post/slice";
import UserAction from "@/features/user/components/UserAction";
import { createPostSchema } from "@/schema/post.schema";
import type { AppDispatch } from "@/types/redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function NewPostModal({
  onClose,
  mode = "auto",
}: {
  onClose: () => void;
  mode?: "subtract" | "auto";
}) {
  const loadingPosts = useSelector(selectPostsLoading);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<File[] | null>(null);

  const handlePost = async () => {
    const result = createPostSchema.safeParse({
      content,
      media: previewImage || [],
    });

    console.log(result);
    if (!result.success) {
      console.log(result.error.format());
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (previewImage) {
      previewImage?.forEach((f) => formData.append("media[]", f));
    }
    await toast.promise(dispatch(postThreads(formData)).unwrap(), {
      loading: "Đang đăng bài",
      success: "Đăng thành công",
      error: "Có lỗi xảy ra!",
    });

    onClose();
  };

  return (
    <ModalPopup mode={mode} onClose={onClose}>
      <Card className="gap-0 p-0" onClick={(e) => e.stopPropagation()}>
        <Header headerText={t("post.newThread")} onClose={onClose} />

        <CardContent className="p-4 pt-5">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <AvatarGroup
                size={10}
                url={user?.avatar_url || ""}
                fallBack={user?.username?.slice(0, 2).toUpperCase()}
              />

              <div className="w-[2px] flex-1 bg-border my-2 min-h-[40px] rounded-full"></div>

              <AvatarGroup
                size={5}
                url={user?.avatar_url || ""}
                fallBack={user?.username?.slice(0, 2).toUpperCase()}
              />
            </div>

            <div className="flex-1 pt-1 space-y-4 overflow-x-auto">
              <UserAction
                username={user?.username}
                onChangeContent={(data: any) => {
                  setContent(data.content);
                  setPreviewImage(data.previewImage);
                }}
              />
              <div className="min-h-[20px] flex items-center text-muted-foreground/50 text-sm pt-3">
                {t("post.addToThread")}
              </div>
            </div>
          </div>
        </CardContent>

        <Footer loading={loadingPosts} onSubmit={handlePost} />
      </Card>
    </ModalPopup>
  );
}

export default NewPostModal;
