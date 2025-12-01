import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks";
import { useCreatePost } from "@/hooks/use-create-post";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import UserPostForm from "../../UserPostForm";

function NewPostCustom({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    content,
    setContent,
    previewImage,
    setPreviewImage,
    loadingPosts,
    handlePost,
  } = useCreatePost(onClose);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: 100, scale: 0.75 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, y: 100, scale: 0.75 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformOrigin: "bottom right" }}
      className="w-full absolute -bottom-20 right-[360px] bg-background rounded-3xl mb-20 text-foreground shadow-xl border-none sm:border"
    >
      <Card
        className="gap-0 p-0 w-[450px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Header mode="x" headerText={t("post.newThread")} onClose={onClose} />

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
    </motion.div>
  );
}

export default NewPostCustom;
