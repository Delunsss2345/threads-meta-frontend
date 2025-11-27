import AvatarGroup from "@/components/common/AvatarGroup";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Props {
  username: string;
  timeAgo: string;
  avatarUrl?: string;
  hasTranslate?: boolean;
}

const Header = ({
  username,
  timeAgo,
  avatarUrl,
  hasTranslate = false,
}: Props) => {
  return (
    <div className="flex items-start justify-between mb-3 bg-primary-foreground">
      <div className="flex items-center gap-3">
        <AvatarGroup
          url={avatarUrl ?? ""}
          size={10}
          fallBack={username.slice(0, 2).toUpperCase()}
        />

        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{username}</span>
            <span className="text-sm text-gray-500">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* More Button */}
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Header;
