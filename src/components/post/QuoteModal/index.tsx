import ModalPopup from "@/components/common/ModalPopup";
import { useAuth } from "@/features/auth/hooks";
import { quotePost, selectPostsLoading } from "@/features/post";
import type { AppDispatch } from "@/types/redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import "swiper/css";
import PostContentModal from "../PostContentModal";
import type { MappedPost } from "../type";

function QuoteModal({
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

  const handleQuote = async () => {
    if (!content || !post.id) return;

    await toast.promise(
      dispatch(quotePost({ id: post.id, content })).unwrap(),
      {
        loading: t("post.quoteLoading"),
        success: t("post.quoteSuccess"),
        error: t("common.error"),
      }
    );

    post.reposts_and_quotes_count += 1;

    onClose();
    setContent("");
  };

  if (!post || !user) return null;

  return (
    <ModalPopup onClose={onClose}>
      <PostContentModal
        title={t("post.quoteTo")}
        mode="quote"
        post={post}
        user={user}
        content={content}
        setContent={setContent}
        onSubmit={handleQuote}
        loading={loading}
        loadingLabel={t("post.quoteLoading")}
        submitLabel={t("post.quote")}
        addToThreadText={t("post.addToThread")}
        onClose={onClose}
      />
    </ModalPopup>
  );
}

export default QuoteModal;
