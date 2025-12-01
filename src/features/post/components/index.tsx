import { Ellipsis, Repeat2 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import AvatarGroup from "@/components/common/AvatarGroup";
import { useAuth } from "@/features/auth/hooks";
import UserPreviewCard from "@/features/user/components/UserPreviewCard";
import type { PostItem } from "@/types/post";
import { POST_MODE_STYLES, type PostModeKey } from "../constant";
import InteractionBar from "./InteractionBar";
import Menu from "./Menu";
import MenuMe from "./MenuMe";
import PostProvider from "./PostContext";
import Quote from "./QuotePost";
import type { MappedPost } from "./type";

const Post = ({
  post,
  onClick,
  mode = "default",
}: {
  post: MappedPost;
  onClick?: () => void;
  mode?: PostModeKey;
}) => {
  const isStaticOrReply = mode === "static" || mode === "reply";

  const modeConfig = POST_MODE_STYLES[mode];

  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<any>(null);
  const { user } = useAuth();

  const username = post.user?.username ?? "";
  const time = post.created_at;

  const handleMouseEnter = useCallback(() => {
    if (isStaticOrReply) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(true), 300);
  }, [isStaticOrReply]);

  const handleMouseLeave = useCallback(() => {
    if (isStaticOrReply) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(false);
  }, [isStaticOrReply]);

  const MenuButton = useMemo(() => {
    if (isStaticOrReply) return null;

    const icon = <Ellipsis className="w-4 h-4" />;
    return username === user?.username ? (
      <MenuMe threadId={post.id} buttonActive={icon} />
    ) : (
      <Menu
        username={username}
        userId={post.user?.id ?? 0}
        postId={post.id}
        buttonActive={icon}
      />
    );
  }, [isStaticOrReply, username, user?.username, post.id, post.user?.id]);

  const imageSlides = useMemo(
    () =>
      post.media_urls.map((img: string, i: number) => (
        <SwiperSlide key={i} style={{ width: modeConfig.mediaWidth }}>
          <div
            className="rounded-lg overflow-hidden"
            style={{
              width: modeConfig.mediaWidth,
              height: modeConfig.mediaHeight,
            }}
          >
            <img
              src={img}
              className="w-full h-full object-cover"
              alt=""
              onClick={isStaticOrReply ? (e) => e.stopPropagation() : undefined}
            />
          </div>
        </SwiperSlide>
      )),
    [
      post.media_urls,
      isStaticOrReply,
      modeConfig.mediaWidth,
      modeConfig.mediaHeight,
    ]
  );

  return (
    <div
      className={modeConfig.wrapper}
      style={{
        cursor: modeConfig.cursor as React.CSSProperties["cursor"],
      }}
    >
      {mode === "repost" && (
        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs">
          <Repeat2 className="w-4 h-4" />
          <span className="font-medium">{user?.username} đã đăng lại</span>
        </div>
      )}

      <div
        onClick={mode === "static" || mode === "reply" ? undefined : onClick}
        className={`grid ${modeConfig.grid} w-full`}
      >
        <AvatarGroup
          className="my-auto"
          size={modeConfig.avatarSize}
          url={post.user?.avatar_url ?? ""}
          fallBack={username.slice(0, 2).toUpperCase()}
        />

        <div className="min-w-0 flex flex-col">
          <div className="grid grid-cols-[1fr_max-content] gap-1.5 items-center">
            <div className="flex items-center min-w-0 gap-2">
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={
                  isStaticOrReply ? (e) => e.stopPropagation() : undefined
                }
                className="relative inline-flex min-w-0"
              >
                <span
                  className={`font-semibold text-foreground truncate whitespace-nowrap ${
                    isStaticOrReply ? "" : "hover:underline"
                  } ${modeConfig.usernameText}`}
                >
                  {username}
                </span>

                {!isStaticOrReply && open && post.user && (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <UserPreviewCard user={post.user} />
                  </div>
                )}
              </div>

              {post.user?.verified && (
                <svg
                  aria-label="Đã xác minh"
                  role="img"
                  viewBox="0 0 40 40"
                  style={{
                    fill: "rgb(0, 149, 246)",
                    height:
                      modeConfig.usernameText === "text-xs" ? "10px" : "12px",
                    width:
                      modeConfig.usernameText === "text-xs" ? "10px" : "12px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Đã xác minh</title>
                  <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" />
                </svg>
              )}

              <span
                className={`text-muted-foreground whitespace-nowrap ${modeConfig.timeText}`}
              >
                {time}
              </span>
            </div>

            {MenuButton}
          </div>

          {post.content && (
            <p
              className={`text-foreground leading-relaxed mt-1 ${modeConfig.contentText}`}
            >
              {post.content}
            </p>
          )}
        </div>
      </div>

      {post.media_urls.length > 0 && (
        <div className="relative mt-2">
          <div className={`overflow-visible w-auto ${modeConfig.imageOffset}`}>
            <Swiper
              modules={[FreeMode]}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode
              grabCursor={!isStaticOrReply}
              allowTouchMove={!isStaticOrReply}
              className="overflow-visible"
            >
              {imageSlides}
            </Swiper>
          </div>
        </div>
      )}

      {post.original_post && (
        <Quote
          mode={
            mode === "static"
              ? "static"
              : mode === "detail"
              ? "detail"
              : "default"
          }
          post={post.original_post as PostItem}
        />
      )}

      <div className={modeConfig.contentOffset}>
        <PostProvider post={post}>
          {modeConfig.interactionMode !== "hidden" && (
            <InteractionBar
              className={mode === "detail" ? "ml-0" : ""}
              mode={modeConfig.interactionMode}
              size={modeConfig.interactionSize}
            />
          )}
        </PostProvider>
      </div>
    </div>
  );
};

export default Post;
