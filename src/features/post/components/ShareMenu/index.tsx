import MenuPopup from "@/components/common/MenuPopup";
import SheetPopup from "@/components/common/SheetPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { Code, Image, Link2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import ModalEmbedCode from "../ModalEmbedCode";
import ModalShare from "../ModalShare";
import type { MappedPost } from "../type";

const ShareMenu = ({
  children,
  className,
  isAuth,
  onUnauthorizedClick,
  post,
}: {
  post: MappedPost | undefined;
  children: ReactNode;
  className: string;
  isAuth: boolean;
  onUnauthorizedClick?: () => void;
}) => {
  const { t } = useTranslation();
  const { show, hide } = useModal();
  const isMobile = useIsMobile();
  const [openSheet, setOpenSheet] = useState(false);

  const shareMenu = [
    {
      icon: <Link2 />,
      label: t("menu.copyLink"),
      onclick: async () => {
        await toast.promise(
          navigator.clipboard.writeText(
            `${window.location.origin}/post/${post?.id}`
          ),
          {
            loading: "Đang sao chép",
            success: "Sao chép thành công",
            error: "Sao chép thất bại",
          }
        );
        setOpenSheet(false);
      },
    },
    {
      icon: <Image />,
      label: t("menu.copyAsImage"),
      onclick: () => {
        setOpenSheet(false);
        show(<ModalShare post={post ?? null} onClose={hide} />);
      },
    },
    {
      icon: <Code />,
      label: t("menu.embedCode"),
      onclick: () => {
        setOpenSheet(false);
        show(<ModalEmbedCode post={post!} onClose={hide} />);
      },
    },
  ];

  if (!isAuth) {
    return (
      <button
        className="flex items-center gap-1 cursor-pointer"
        onClick={onUnauthorizedClick}
      >
        {children}
      </button>
    );
  }

  if (isMobile) {
    return (
      <>
        <button className={cn(className)} onClick={() => setOpenSheet(true)}>
          {children}
        </button>

        <SheetPopup title="repost" open={openSheet} onOpenChange={setOpenSheet}>
          <div className="p-2 space-y-1">
            {shareMenu.map((item, i) => (
              <button
                key={i}
                onClick={item.onclick}
                className="w-full flex items-center justify-between px-4 py-4 
                   text-sm rounded-lg bg-background transition border"
              >
                <span className="font-semibold text-md">{item.label}</span>
                {item.icon}
              </button>
            ))}
          </div>
        </SheetPopup>
      </>
    );
  }

  return (
    <MenuPopup
      motionProps={{
        initial: { opacity: 0, x: 0 },
        animate: { opacity: 1, x: 0 },
      }}
      className={cn(className)}
      buttonActive={children}
    >
      {shareMenu.map((item, i) => (
        <DropdownMenuItem
          key={i}
          className="flex items-center justify-between gap-2"
          onClick={item.onclick}
        >
          <span>{item.label}</span>
          {item.icon}
        </DropdownMenuItem>
      ))}
    </MenuPopup>
  );
};

export default ShareMenu;
