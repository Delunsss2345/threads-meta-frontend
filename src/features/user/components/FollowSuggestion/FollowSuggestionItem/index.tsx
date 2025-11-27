import AvatarGroup from "@/components/common/AvatarGroup";
import { Button } from "@/components/ui/button";
import type { UserSuggestion } from "@/types/user";

interface Props {
  user: UserSuggestion;
}

export default function FollowSuggestionItem({ user }: Props) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <AvatarGroup
          size={10}
          url={user.avatar_url ?? ""}
          fallBack={user.username.slice(0, 1)}
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm truncate max-w-[180px]">
              {user.name}
            </span>

            {user.verified && (
              <span>
                <svg
                  aria-label="Đã xác minh"
                  role="img"
                  viewBox="0 0 40 40"
                  style={{
                    fill: "rgb(0, 149, 246)",
                    height: "12px",
                    width: "12px",
                  }}
                >
                  <title>Đã xác minh</title>
                  <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"></path>
                </svg>
              </span>
            )}
          </div>

          {/* Username */}
          <span className="text-xs text-muted-foreground">
            @{user.username}
          </span>

          {/* Bio */}
          {user.bio && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-[200px]">
              {user.bio}
            </p>
          )}

          {/* Followers */}
          <span className="mt-1 text-xs text-muted-foreground">
            {user.followers_count} người theo dõi
          </span>
        </div>
      </div>

      <Button size="sm" className="!rounded-lg px-4 py-2">
        Theo dõi
      </Button>
    </div>
  );
}
