import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Repeat2,
  Send,
} from "lucide-react";
import type { FC } from "react";

type CommentProps = {
  username: string;
  timeAgo: string;
  content: string;
  avatarUrl?: string;
  likes?: number;
  sends?: number;
};

const CommentItem: FC<CommentProps> = ({
  username,
  timeAgo,
  content,
  avatarUrl,
  likes = 0,
  sends = 0,
}) => {
  const initials =
    username
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="flex items-start gap-3">
      {/* Avatar + dấu cộng */}
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-black border border-background flex items-center justify-center">
          <Plus className="h-3 w-3 text-white" />
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex-1 min-w-0">
        {/* Header: tên + thời gian + 3 chấm */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold">{username}</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
            <p className="text-sm mt-1 break-words">{content}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Hàng icon */}
        <div className="mt-3 flex items-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Heart className="h-4 w-4" />
            </Button>
            <span>{likes}</span>
          </div>

          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MessageCircle className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Repeat2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Send className="h-4 w-4" />
            </Button>
            <span>{sends}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
