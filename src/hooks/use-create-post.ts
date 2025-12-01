import { postThreads, selectPostsLoading } from "@/features/post";
import { createPostSchema } from "@/schema/post.schema";
import { useAppDispatch } from "@/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const useCreatePost = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const loadingPosts = useSelector(selectPostsLoading);

  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<File[] | null>(null);

  const handlePost = async () => {
    const result = createPostSchema.safeParse({
      content,
      media: previewImage || [],
    });

    if (!result.success) {
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

    if (onSuccess) onSuccess();

    setContent("");
    setPreviewImage(null);
  };

  return {
    content,
    setContent,
    previewImage,
    setPreviewImage,
    loadingPosts,
    handlePost,
  };
};
export { useCreatePost };
