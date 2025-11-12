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
      {/* Avatar + loại hoạt động */}
      <div className="flex flex-col items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={activity.avatar} alt={activity.username} />
          <AvatarFallback>{activity.displayName[0]}</AvatarFallback>
        </Avatar>
        {activity.type === "follow" && (
          <div className="h-8 w-px bg-border mt-2" />
        )}
      </div>
        
      {/* Nội dung */}
      <div className="flex-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {activity.displayName}
          </span>
          <span>·</span>
          <span>{activity.timeAgo}</span>
        </div>

        {activity.type === "thread" ? (
          <p className="text-sm mt-1 text-foreground">{activity.content}</p>
        ) : (
          <p className="text-sm mt-1 text-muted-foreground">Gợi ý theo dõi</p>
        )}

        {/* Thống kê (chỉ có ở thread) */}
        {activity.type === "thread" && (
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            {activity.likes !== undefined && (
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
                <span>{activity.likes}</span>
              </button>
            )}
            {activity.comments !== undefined && (
              <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>{activity.comments}</span>
              </button>
            )}
            {activity.reposts !== undefined && (
              <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                <Repeat2 className="h-4 w-4" />
                <span>{activity.reposts}</span>
              </button>
            )}
            {activity.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{activity.views}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nút Theo dõi (chỉ ở gợi ý) */}
      {activity.type === "follow" && (
        <Button size="sm" className="rounded-full h-8">
          Theo dõi
        </Button>
      )}
    </div>
  );
}
