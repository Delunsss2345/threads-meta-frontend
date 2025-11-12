import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Heart, MessageCircle, Repeat2 } from "lucide-react";
import type { Activity } from "../types";

interface Props {
  activity: Activity;
}

export default function ActivityItem({ activity }: Props) {
  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-0">
      <div className="flex flex-col items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src={activity.avatar} alt={activity.username} />
          <AvatarFallback>{activity.displayName[0]}</AvatarFallback>
        </Avatar>
        {activity.type === "follow" && (
          <div className="w-px h-8 mt-2 bg-border" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {activity.displayName}
          </span>
          <span>·</span>
          <span>{activity.timeAgo}</span>
        </div>

        {activity.type === "thread" ? (
          <p className="mt-1 text-sm text-foreground">{activity.content}</p>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">Gợi ý theo dõi</p>
        )}

        {activity.type === "thread" && (
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            {activity.likes !== undefined && (
              <button className="flex items-center gap-1 transition-colors hover:text-red-500">
                <Heart className="w-4 h-4" />
                <span>{activity.likes}</span>
              </button>
            )}
            {activity.comments !== undefined && (
              <button className="flex items-center gap-1 transition-colors hover:text-blue-500">
                <MessageCircle className="w-4 h-4" />
                <span>{activity.comments}</span>
              </button>
            )}
            {activity.reposts !== undefined && (
              <button className="flex items-center gap-1 transition-colors hover:text-green-500">
                <Repeat2 className="w-4 h-4" />
                <span>{activity.reposts}</span>
              </button>
            )}
            {activity.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{activity.views}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {activity.type === "follow" && (
        <Button size="sm" className="h-8 rounded-full">
          Theo dõi
        </Button>
      )}
    </div>
  );
}
