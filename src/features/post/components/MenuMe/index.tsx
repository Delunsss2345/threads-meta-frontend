import MenuPopup from "@/components/common/MenuPopup";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks";
import { postApi } from "@/features/post/api";
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
import { toast } from "sonner";

const MenuMe = ({
  buttonActive,
  threadId,
}: {
  buttonActive: ReactNode;
  threadId: number;
}) => {
  const { isAuthenticated } = useAuth();

  const handleDelete = async (id: number) => {
    try {
      const result = await postApi.deleteThread(id);
      if (result?.success) {
        return toast.success("Xoá thành công");
      }
    } catch (error: any) {
      toast.error("Xoá thất bại");
    }
  };

  const items = [
    { label: "Thông tin chi tiết", icon: Info, isAuth: true, isHeader: true },

    { label: "Lưu", icon: Bookmark, isAuth: true },
    { label: "Ghim lên trang cá nhân", icon: Pin, isAuth: true },
    { label: "Ẩn số lượt thích và lượt xem", icon: EyeOff, isAuth: true },

    { label: "Các lựa chọn để kiểm soát", icon: Shield, isAuth: true },

    {
      label: "Xóa",
      icon: Trash2,
      isAuth: true,
      className: "text-destructive hover:bg-destructive/10",
      onClick: () => handleDelete(threadId),
    },

    { label: "Sao chép liên kết", icon: Link2, isAuth: false },
  ];

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
          onClick={item.onClick}
          key={i}
          className={`flex items-center gap-2 ${item.className || ""} ${
            isAuthenticated !== item.isAuth ? "hidden" : ""
          }`}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{item.label}</span>
        </DropdownMenuItem>
      ))}
    </MenuPopup>
  );
};

export default MenuMe;
