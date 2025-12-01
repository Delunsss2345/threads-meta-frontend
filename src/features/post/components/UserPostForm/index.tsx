import AvatarGroup from "@/components/common/AvatarGroup";
import { CardContent } from "@/components/ui/card";
import UserAction from "@/features/user/components/UserAction";
import type { User } from "@/types/user";

interface UserPostFormProps {
  user: User;
  setContent: (value: string) => void;
  setPreviewImage: (value: File[] | null) => void;
  t: (key: string) => string;
}

const UserPostForm = ({
  user,
  setContent,
  setPreviewImage,
  t,
}: UserPostFormProps) => {
  const fallbackName = (user?.username ?? "").slice(0, 2).toUpperCase();

  return (
    <CardContent className="p-4 pt-5">
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <AvatarGroup
            size={10}
            url={user?.avatar_url ?? ""}
            fallBack={fallbackName}
          />

          <div className="w-[2px] flex-1 bg-border my-2 min-h-[40px] rounded-full"></div>

          <AvatarGroup
            size={4}
            url={user?.avatar_url ?? ""}
            fallBack={fallbackName}
            className="object-cover"
            classNameFallback="object-cover text-[8px] text-center border"
          />
        </div>

        <div className="flex-1 pt-1 space-y-4 overflow-x-auto">
          <UserAction
            username={user?.username}
            onChangeContent={(data: any) => {
              setContent(data.content);
              setPreviewImage(data.previewImage);
            }}
          />

          <div className="min-h-[20px] flex items-center text-muted-foreground/50 text-sm pt-3 cursor-pointer">
            {t("post.addToThread")}
          </div>
        </div>
      </div>
    </CardContent>
  );
};

export default UserPostForm;
