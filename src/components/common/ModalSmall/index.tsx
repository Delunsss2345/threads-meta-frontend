import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import ModalPopup from "../ModalPopup";

interface ModalSmallProps {
  mode: "block" | "delete";
  username?: string;
  userId?: number;
  postId?: number;
  onConfirm: (data?: { userId?: number; postId?: number }) => void;
  onCancel: () => void;
}

export default function ModalSmall({
  mode,
  username,
  userId,
  postId,
  onConfirm,
  onCancel,
}: ModalSmallProps) {
  const { t } = useTranslation();

  const name = username || t("modal.anonymous");

  const title =
    mode === "block" ? t("modal.blockTitle", { name }) : t("modal.deleteTitle");

  const description =
    mode === "block" ? t("modal.blockDesc", { name }) : t("modal.deleteDesc");

  const confirmLabel =
    mode === "block" ? t("modal.blockBtn") : t("modal.deleteBtn");

  const handleConfirm = () => {
    onConfirm({ userId, postId });
  };

  return (
    <ModalPopup isMobileSheet={false} mode="custom" onClose={onCancel}>
      <div
        className={cn(
          "bg-primary-foreground border-primary rounded-xl w-[340px] max-w-full",
          "flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.15)]"
        )}
      >
        <div className="px-5 pt-5 pb-4 border-b border-gray-200">
          <h2 className="text-center font-semibold text-base leading-tight">
            {title}
          </h2>
        </div>

        <div className="px-5 py-4">
          <p className="text-center text-sm text-gray-500 leading-snug whitespace-pre-line px-4">
            {description}
          </p>
        </div>

        <div className="px-2 border-t border-gray-200 flex gap-0 relative">
          <Button
            variant="ghost"
            className="flex-1 py-1 px-0  cursor-pointer border-r border-gray-200 rounded-none"
            onClick={onCancel}
          >
            {t("modal.cancel")}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "flex-1 py-1 px-0 cursor-pointer  rounded-none text-red-600 font-semibold"
            )}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </ModalPopup>
  );
}
