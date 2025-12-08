import ModalPopup from "@/components/common/ModalPopup";
import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks";
import { useCreatePost } from "@/hooks/use-create-post";
import { useTranslation } from "react-i18next";
import UserPostForm from "../../user/UserPostForm";

function NewPostModal({
  onClose,
  mode = "auto",
}: {
  onClose: () => void;
  mode?: "subtract" | "auto";
}) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const { content, setContent, setPreviewImage, loadingPosts, handlePost } =
    useCreatePost(onClose);

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
