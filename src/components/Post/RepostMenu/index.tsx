import MenuPopup from "@/components/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { repostPost } from "@/features/post";
import { cn } from "@/lib/utils";
import type { AppDispatch } from "@/types/redux";
import { MessageSquareQuote, Repeat2 } from "lucide-react";
import type { ReactNode } from "react";
import { isValidElement } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const RepostMenu = ({
  repostedByAuth,
  postId,
  children,
  className,
  isAuth,
  onUnauthorizedClick,
}: {
  repostedByAuth: boolean;
  postId: number;
  children: ReactNode;
  className?: string;
  isAuth: boolean;
  onUnauthorizedClick?: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const handleRepost = async (id: number) => {
    try {
      await toast.promise(dispatch(repostPost(id)), {
        loading: repostedByAuth ? "Đang hủy đăng lại..." : "Đang đăng lại...",
        success: repostedByAuth ? "Đã hủy đăng lại" : "Đăng lại thành công",
        error: "Thao tác thất bại",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const repostIcon = (
    <Repeat2 className={cn(repostedByAuth ? "text-red-500" : "")} />
  );

  const repostLabel = repostedByAuth
    ? t("menu.unrepost") || "Hủy đăng lại"
    : t("menu.repost");

  const repostMenu = [
    { icon: repostIcon, label: repostLabel, onclick: handleRepost },
    {
      icon: <MessageSquareQuote />,
      label: t("menu.quote"),
    },
  ];

  const styledChildren = isValidElement(children)
    ? repostedByAuth && "text-red-500"
    : children;

  if (!isAuth) {
    return (
      <button
        className={cn(
          "flex items-center gap-1",
          repostedByAuth && "text-red-500"
        )}
        onClick={onUnauthorizedClick}
      >
        {styledChildren}
      </button>
    );
  }

  return (
    <MenuPopup
      motionProps={{
        initial: { opacity: 0, x: 0 },
        animate: { opacity: 1, x: 0 },
      }}
      className={cn("p-0 hover:!bg-transparent", className)}
      buttonActive={styledChildren}
    >
      {repostMenu.map((item, i) => (
        <DropdownMenuItem
          key={i}
          onClick={() => item.onclick?.(postId)}
          className="flex items-center justify-between gap-2"
        >
          <span>{item.label}</span>
          {item.icon}
        </DropdownMenuItem>
      ))}
    </MenuPopup>
  );
};

export default RepostMenu;
