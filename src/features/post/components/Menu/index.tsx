import MenuPopup, { type MenuItem } from "@/components/common/MenuPopup";
import ModalSmall from "@/components/common/ModalSmall";
import { hidePost, savePost } from "@/features/post";
import { useModal } from "@/hooks/use-modal";
import type { AppDispatch } from "@/types/redux";
import { Bookmark, EyeOff, Link2, UserX } from "lucide-react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Menu = ({
  username,
  userId,
  postId,
  buttonActive,
}: {
  username: string;
  userId: number;
  postId: number;
  buttonActive: ReactNode;
}) => {
  const { t } = useTranslation();
  const { show, hide } = useModal();
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async (postId: number) => {
    await toast.promise(
      dispatch(savePost(postId)).unwrap(),

      {
        loading: t("toast.saving"),
        success: () => t("toast.saveSuccess"),
        error: (err) => err || t("toast.saveError"),
      }
    );
  };
  const handleHide = async (postId: number) => {
    hide();

    await toast.promise(dispatch(hidePost(postId)).unwrap(), {
      loading: t("toast.hiding"),
      success: t("toast.hideSuccess"),
      error: (err) => err || t("toast.hideError"),
    });
  };
  const handleCopyLink = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/${username}/post/${postId}`;
    await navigator.clipboard.writeText(url);
    toast.success(t("menu.copyLinkSuccess"));
  };

  const items : MenuItem[] = [
    {
      icon: <Bookmark />,
      label: t("menu.save"),
      isAuth: true,
      onClick: () => handleSave(postId),
    },
    {
      icon: <EyeOff />,
      label: t("menu.notInterested"),
      isAuth: true,
      onClick: () => handleHide(postId),
    },
    {
      icon: <UserX />,
      label: t("menu.block"),
      className: "text-destructive hover:bg-destructive/10",
      isAuth: true,
      onClick: () =>
        show(
          <ModalSmall
            username={username}
            userId={userId}
            mode="block"
            onCancel={hide}
            onConfirm={hide}
          />
        ),
    },
    {
      icon: <Link2 />,
      label: t("menu.copyLink"),
      isAuth: false,
      onClick: handleCopyLink,
    },
  ];

  return (
    <MenuPopup
      items={items}
      buttonActive={buttonActive}
      customPopup="-translate-x-20"
      motionProps={{
        initial: { opacity: 0, x: 0, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
      }}
    ></MenuPopup>
  );
};

export default Menu;
