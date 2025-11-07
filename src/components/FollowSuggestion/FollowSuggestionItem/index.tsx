// src/components/follow-suggestion/FollowSuggestionItem.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import type { FollowSuggestion } from "../types";

interface Props {
  user: FollowSuggestion;
}

export default function FollowSuggestionItem({ user }: Props) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm truncate max-w-[180px]">
              {user.displayName}
            </span>
            {user.isVerified && (
              <Badge variant="default" className="h-4 px-1 text-xs">
                Verified
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            @{user.username}
          </span>
          {user.bio && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-[200px]">
              {user.bio}
            </p>
          )}
          <span className="text-xs text-muted-foreground mt-1">
            {user.followerCount} người theo dõi
          </span>
        </div>
      </div>

      <Button size="sm" className="rounded-full">
        Theo dõi
      </Button>
    </div>
  );
}
