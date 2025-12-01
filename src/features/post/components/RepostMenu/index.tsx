import MenuPopup from "@/components/common/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { repostPost } from "@/features/post";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import type { AppDispatch } from "@/types/redux";
import { MessageSquareQuote, Repeat2 } from "lucide-react";
import type { ReactNode } from "react";
import { isValidElement } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import QuoteModal from "../QuoteModal";
import type { MappedPost } from "../type";

const RepostMenu = ({
  post,
  children,
  className,
  isAuth,
  onUnauthorizedClick,
}: {
  post: MappedPost | undefined;
  children: ReactNode;
  className?: string;
  isAuth: boolean;
  onUnauthorizedClick?: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { show, hide } = useModal();

  const handleRepost = async () => {
    if (!post) return;

    try {
      await toast.promise(dispatch(repostPost(post.id)), {
        loading: post.is_reposted_by_auth
          ? "Đang hủy đăng lại..."
          : "Đang đăng lại...",
        success: post.is_reposted_by_auth
          ? "Đã hủy đăng lại"
          : "Đăng lại thành công",
        error: "Thao tác thất bại",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const repostIcon = (
    <Repeat2 className={cn(post?.is_reposted_by_auth && "text-red-500")} />
  );

  const repostLabel = post?.is_reposted_by_auth
    ? t("menu.unrepost") || "Hủy đăng lại"
    : t("menu.repost");

  const repostMenu = [
    {
      icon: repostIcon,
      label: repostLabel,
      onClick: handleRepost,
    },
    {
      icon: <MessageSquareQuote />,
      label: t("menu.quote"),
      onClick: () => {
        if (!post) return;
        show(<QuoteModal post={post} onClose={hide} />);
      },
    },
  ];

  const styledChildren = isValidElement(children) ? (
    <span className={cn(post?.is_reposted_by_auth && "text-red-500")}>
      {children}
    </span>
  ) : (
    children
  );

  if (!isAuth) {
    return (
      <button
        className={cn(
          "flex items-center gap-1",
          post?.is_reposted_by_auth && "text-red-500"
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
      className={cn(className)}
      buttonActive={styledChildren}
    >
      {repostMenu.map((item, i) => (
        <DropdownMenuItem
          key={i}
          onClick={item.onClick}
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
