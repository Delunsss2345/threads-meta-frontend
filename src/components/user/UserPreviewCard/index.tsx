import AvatarGroup from "@/components/common/AvatarGroup";
import { Button } from "@/components/ui/button";
import type { MappedUser } from "@/features/post/components/type";
import { useTranslation } from "react-i18next";
interface UserPreviewCardProps {
  user: MappedUser;
}

export default function UserPreviewCard({ user }: UserPreviewCardProps) {
  const { t } = useTranslation();
  if (!user) return null;

  return (
    <div className="flex flex-col gap-4 justify-between absolute z-50 p-4 top-6 rounded-2xl border border-border bg-background shadow-xl -translate-x-1/2">
      <div className="flex items-center justify-between gap-30">
        <div>
          <div className="text-lg font-semibold text-foreground z-20 max-w-full">
            {user.name}
          </div>
          <div className="text-sm text-muted-foreground z-20 max-w-full">
            @{user.username}
          </div>
        </div>
        <AvatarGroup
          classNameFallback="border"
          size={20}
          url={user.avatar_url || ""}
          fallBack={user.username.slice(0, 2).toUpperCase()}
        />
      </div>

      {/* Follow Button */}
      <Button className="w-full bg-foreground text-background font-semibold rounded-lg hover:opacity-90 transition">
        {t("common.follow")}
      </Button>
    </div>
  );
}
