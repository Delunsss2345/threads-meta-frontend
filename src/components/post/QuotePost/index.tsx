import AvatarGroup from "@/components/common/AvatarGroup";
import SwiperImage from "@/components/common/SwiperImage";
import type { OriginalPost } from "@/types/post";
import { formatTime } from "@/utils/format-time";
import { useNavigate } from "react-router-dom";

const Quote = ({
  post,
  mode = "default",
}: {
  post: OriginalPost;
  mode: "default" | "static" | "detail";
}) => {
  const navigate = useNavigate();

  if (!post.user) return null;

  const wrapperClass =
    mode === "static" || mode === "detail"
      ? "mt-3 border rounded-xl bg-muted/30 py-3 px-0 ml-0"
      : "mt-3 ml-[58px] border rounded-xl bg-muted/30 p-3";

  return (
    <div
      data-set-quote="true"
      onClick={
        mode === "static"
          ? undefined
          : () =>
              navigate(`/post/${post.id}`, {
                state: {
                  quote: true,
                  loading: true,
                },
              })
      }
      className={wrapperClass}
      style={{
        cursor: mode === "static" ? "default" : "pointer",
      }}
    >
      <div className="flex items-center gap-2 px-3">
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
        <p className="text-sm mt-2 text-foreground leading-relaxed px-3">
          {post.content}
        </p>
      )}

      {post?.media_urls?.length > 0 && (
        <div className="mt-3 px-3">
          <SwiperImage images={post.media_urls} />
        </div>
      )}
    </div>
  );
};

export default Quote;
