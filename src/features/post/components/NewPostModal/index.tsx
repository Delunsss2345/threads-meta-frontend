import ModalPopup from "@/components/common/ModalPopup";
import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks";
import { selectPostsLoading } from "@/features/post";
import { postThreads } from "@/features/post/slice";
import { createPostSchema } from "@/schema/post.schema";
import type { AppDispatch } from "@/types/redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import UserPostForm from "../UserPostForm";

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

    if (!result.success) {
      console.log(result.error.format());
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    previewImage?.forEach((f) => formData.append("media[]", f));

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

        <UserPostForm
          user={user}
          setContent={setContent}
          setPreviewImage={setPreviewImage}
          t={t}
        />

        <Footer
          content={content}
          loading={loadingPosts}
          onSubmit={handlePost}
        />
      </Card>
    </ModalPopup>
  );
}

export default NewPostModal;
