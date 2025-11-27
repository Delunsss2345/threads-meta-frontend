import MenuPopup from "@/components/common/MenuPopup";
import ModalSmall from "@/components/common/ModalSmall";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks";
import { hidePost, savePost } from "@/features/post";
import { useModal } from "@/hooks/use-modal";
import type { AppDispatch } from "@/types/redux";
import {
  BellOff,
  Bookmark,
  EyeOff,
  Link2,
  Shield,
  UserMinus,
  UserX,
} from "lucide-react";
import { useMemo, type ReactNode } from "react";
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
  const { isAuthenticated } = useAuth();
  const { show, hide } = useModal();
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async (postId: number) => {
    await toast.promise(
      dispatch(savePost(postId)).unwrap(),

      {
        loading: t("toast.saving"),
        success: (res) => t("toast.saveSuccess"),
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

  const items = useMemo(
    () => [
      { label: t("menu.addToFeed"), isHeader: true, isAuth: true },
      {
        icon: Bookmark,
        label: t("menu.save"),
        isAuth: true,
        action: () => handleSave(postId),
      },
      {
        icon: EyeOff,
        label: t("menu.notInterested"),
        isAuth: true,
        action: () => handleHide(postId),
      },
      { icon: BellOff, label: t("menu.muteNotifications"), isAuth: true },
      { icon: UserMinus, label: t("menu.restrict"), isAuth: true },
      {
        icon: UserX,
        label: t("menu.block"),
        className: "text-destructive hover:bg-destructive/10",
        isAuth: true,
        action: () =>
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
        icon: Shield,
        label: t("menu.report"),
        className: "text-destructive hover:bg-destructive/10",
        isAuth: true,
      },
      { icon: Link2, label: t("menu.copyLink"), isAuth: false },
    ],
    [t, postId, username, userId, show, hide, handleSave]
  );

  return (
    <MenuPopup
      buttonActive={buttonActive}
      customPopup="-translate-x-20"
      motionProps={{
        initial: { opacity: 0, x: 0, scale: 0.96 },
        animate: { opacity: 1, x: 0, scale: 1 },
      }}
    >
      {items.map((item, i) => (
        <DropdownMenuItem
          key={i}
          className={`flex items-center gap-2 ${item.className || ""} ${
            isAuthenticated !== item.isAuth ? "hidden" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            item.action?.();
          }}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{item.label}</span>
        </DropdownMenuItem>
      ))}
    </MenuPopup>
  );
};

export default Menu;
