import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
} from "lucide-react";
import AvatarGroup from "../AvatarGroup";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Props {
  username: string;
  timeAgo: string;
  content: string;
  likes: number;
  replies: number;
  avatarColor: string;
  hasLink?: boolean;
  link?: string;
}

const Comment = ({
  username,
  timeAgo,
  content,
  likes,
  replies,
  avatarColor,
  hasLink = false,
  link = "",
}: Props) => (
  <Card className="border-0 border-t rounded-none shadow-none bg-primary-foreground">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <AvatarGroup size={8} fallBack="HD" url="s" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{username}</span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          <p className="mb-2 text-sm leading-relaxed">
            {content} {!hasLink && <span className="text-blue-500">Dịch</span>}
          </p>
          {hasLink && (
            <div className="mb-2">
              <a href={link} className="text-sm text-blue-500">
                {link}
              </a>
              <span className="ml-2 text-sm text-blue-500">Dịch</span>
            </div>
          )}
          <div className="flex items-center gap-4 text-gray-600">
            {likes > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <Heart className="w-4 h-4" />
                <span>{likes}</span>
              </div>
            )}
            {!likes && <Heart className="w-4 h-4" />}
            {replies > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <MessageCircle className="w-4 h-4" />
                <span>{replies}</span>
              </div>
            )}
            {!replies && <MessageCircle className="w-4 h-4" />}
            <Repeat2 className="w-4 h-4" />
            <Send className="w-4 h-4" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Comment;
