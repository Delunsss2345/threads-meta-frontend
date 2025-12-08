import MenuPopup, { type MenuItem } from "@/components/common/MenuPopup";
import ModalSmall from "@/components/common/ModalSmall";
import { useAuth } from "@/features/auth/hooks";
import { useModal } from "@/hooks/use-modal";
import { postApi } from "@/services/postService";
import {
  Bookmark,
  EyeOff,
  Info,
  Link2,
  Pin,
  Shield,
  Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const MenuMe = ({
  buttonActive,
  threadId,
}: {
  buttonActive: ReactNode;
  threadId: number;
}) => {
  const { t } = useTranslation();
  const { show, hide } = useModal();
  const { user } = useAuth();
  const handleDelete = async (id: number) => {
    try {
      const result = await postApi.deleteThread(id);
      if (result?.success) {
        return toast.success(t("menu.deleteSuccess"));
      }
    } catch {
      toast.error(t("menu.deleteError"));
    } finally {
      hide();
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/${user.username}/post/${threadId}`;
    await navigator.clipboard.writeText(url);
    toast.success(t("menu.copyLinkSuccess"));
  };

  const items: MenuItem[] = [
    {
      label: t("menu.postDetails"),
      icon: <Info />,
      isAuth: true,
      isHeader: true,
    },
    {
      label: t("menu.save"),
      icon: <Bookmark />,
      isAuth: true,
    },
    {
      label: t("menu.pinToProfile"),
      icon: <Pin />,
      isAuth: true,
    },
    {
      label: t("menu.hideStats"),
      icon: <EyeOff />,
      isAuth: true,
    },
    {
      label: t("menu.controlOptions"),
      icon: <Shield />,
      isAuth: true,
    },
    {
      label: t("menu.delete"),
      icon: <Trash2 />,
      isAuth: true,
      className: "text-destructive hover:bg-destructive/10",
      onClick: () =>
        show(
          <ModalSmall
            onCancel={hide}
            onConfirm={() => handleDelete(threadId)}
            mode="delete"
          />
        ),
    },
    {
      label: t("menu.copyLink"),
      icon: <Link2 />,
      isAuth: false,
      onClick: handleCopyLink,
    },
  ];

  return (
    <MenuPopup
      items={items}
      className="cursor-pointer "
      buttonActive={buttonActive}
      customPopup="-translate-x-20"
      motionProps={{
        initial: { opacity: 0, x: 0, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
      }}
    ></MenuPopup>
  );
};

export default MenuMe;
