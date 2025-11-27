import AvatarGroup from "@/components/common/AvatarGroup";
import SwiperImage from "@/components/common/SwiperImage";
import type { OriginalPost } from "@/types/post";
import { formatTime } from "@/utils/format-time";
import { useNavigate } from "react-router-dom";

const Quote = ({ post }: { post: OriginalPost }) => {
  if (!post.user) return null;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/post/${post.id}`)}
      className="mt-3 ml-[58px] border rounded-xl p-3 bg-muted/30"
    >
      <div className="flex items-center gap-2">
        <AvatarGroup
          size={8}
          url={post.user?.avatar_url ?? ""}
          fallBack={post.user.username.slice(0, 2).toUpperCase()}
        />

        <span className="font-semibold text-sm">{post.user.username}</span>

        <span className="text-xs text-muted-foreground">
          {formatTime(post.created_at)}
        </span>
      </div>

      {post.content && (
        <p className="text-sm mt-2 text-foreground leading-relaxed">
          {post.content}
        </p>
      )}

      {post?.media_urls && post?.media_urls?.length > 0 && (
        <SwiperImage images={post.media_urls || []} className="relative mt-3" />
      )}
    </div>
  );
};

export default Quote;
