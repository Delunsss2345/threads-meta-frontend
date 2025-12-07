import ModalPopup from "@/components/common/ModalPopup";
import { useAuth } from "@/features/auth/hooks";
import { selectPostsLoading } from "@/features/post";
import { replyThreads } from "@/features/post/slice";
import type { AppDispatch } from "@/types/redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import PostContentModal from "@/features/post/components/PostContentModal";
import type { MappedPost } from "../type";

function ReplyModal({
  post,
  onClose,
}: {
  post: MappedPost;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectPostsLoading);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleReply = async () => {
    if (!content || !post.id) return;

    const data = new FormData();
    data.append("content", content);

    await toast.promise(
      dispatch(replyThreads({ id: post.id, payload: data })).unwrap(),
      {
        loading: t("post.replyLoading"),
        success: t("post.replySuccess"),
        error: t("common.error"),
      }
    );

    onClose();
    setContent("");
  };

  if (!post || !user) return null;

  return (
    <ModalPopup onClose={onClose}>
      <PostContentModal
        title={t("post.replyTo")}
        mode="reply"
        post={post}
        user={user}
        content={content}
        setContent={setContent}
        onSubmit={handleReply}
        loading={loading}
        loadingLabel={t("post.replyLoading")}
        submitLabel={t("post.reply")}
        addToThreadText={t("post.addToThread")}
        onClose={onClose}
      />
    </ModalPopup>
  );
}

export default ReplyModal;
