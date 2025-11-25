import { AnimatePresence } from "framer-motion";
import { Ellipsis, Repeat2 } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAuth } from "@/features/auth/hook";
import { formatTime } from "@/utils/format-time";
import AvatarGroup from "../AvatarGroup";
import { UserPreviewCard } from "../UserPreview";
import InteractionBar from "./InteractionBar";
import Menu from "./Menu";
import MenuMe from "./MenuMe";
import PostProvider from "./PostContext";

const Post = ({
  post,
  onClick,
  mode = "default",
}: {
  post: any;
  onClick?: () => void;
  mode?: "default" | "repost";
}) => {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<any>(null);
  const { user } = useAuth();
  const username = post.user.username;
  const time = formatTime(post.created_at);

  const handleMouseEnter = useCallback(() => {
    hoverTimer.current = setTimeout(() => setOpen(true), 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(false);
  }, []);

  const MenuButton = useMemo(() => {
    const icon = <Ellipsis className="w-4 h-4" />;
    return username === user?.username ? (
      <MenuMe threadId={post.id} buttonActive={icon} />
    ) : (
      <Menu buttonActive={icon} />
    );
  }, [username, user?.username, post.id]);

  const postContextValue = useMemo(
    () => ({
      id: post.id,
      avatar: post.user.avatar_url,
      username,
      name: post.user.name,
      verified: post.user.verified,
      time,
      content: post.content,
      images: post.media_urls,
      like: post.likes_count,
      message: post.replies_count,
      repost: post.reposts_and_quotes_count,
      share: 0,
      is_liked_by_auth: post.is_liked_by_auth ?? false,
      is_quoted_by_auth: post.is_quoted_by_auth ?? false,
      is_reposted_by_auth: post.is_reposted_by_auth ?? false,
      original_post: post.original_post
        ? {
            username: post.original_post.user.username,
            content: post.original_post.content,
            avatar: post.original_post.user.avatar_url,
          }
        : null,
    }),
    [post, username, time]
  );

  const imageSlides = useMemo(() => {
    if (!Array.isArray(post.media_urls)) return null;
    return post.media_urls.map((img: string, i: number) => (
      <SwiperSlide key={i} style={{ width: 210 }}>
        <div
          className="rounded-lg overflow-hidden"
          style={{ width: 210, height: 280 }}
        >
          <img src={img} className="w-full h-full object-cover" alt="" />
        </div>
      </SwiperSlide>
    ));
  }, [post.media_urls]);

  return (
    <div
      className={`px-6 py-3 cursor-pointer ${
        mode === "default" ? "border-t border-b border-border" : ""
      }`}
    >
      {mode === "repost" && (
        <div className="flex items-center gap-2 mb-2 text-muted-foreground text-xs">
          <Repeat2 className="w-4 h-4" />
          <span className="font-medium">{user.username} đã đăng lại</span>
        </div>
      )}

      <div
        onClick={onClick}
        className="grid [grid-template-columns:48px_minmax(0,1fr)] gap-3 w-full"
      >
        <div>
          <AvatarGroup
            size={10}
            url={post.user.avatar_url ?? ""}
            fallBack={username.slice(0, 2).toUpperCase()}
          />
        </div>

        <div className="min-w-0">
          <div className="grid [grid-template-columns:1fr_max-content] gap-[6px] items-center">
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="font-semibold text-sm text-foreground truncate whitespace-nowrap relative"
              >
                {username}

                <AnimatePresence>
                  {open && (
                    <UserPreviewCard
                      name={post.user.name}
                      username={post.user.username}
                      bio={post.user.bio || ""}
                      followers={0}
                      avatar={post.user.avatar_url || ""}
                    />
                  )}
                </AnimatePresence>
              </span>

              {post.user.verified && (
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
              )}

              <span className="text-muted-foreground text-xs whitespace-nowrap">
                {time}
              </span>
            </div>

            {MenuButton}
          </div>

          {post.content && (
            <p className="text-foreground text-sm leading-relaxed mt-1">
              {post.content}
            </p>
          )}
        </div>
      </div>

      {post?.media_urls && post.media_urls.length > 0 && (
        <div className="relative mt-3">
          <div className="ml-[12px] pl-[48px] overflow-visible w-auto">
            <Swiper
              modules={[FreeMode]}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode
              grabCursor
              className="overflow-visible"
            >
              {imageSlides}
            </Swiper>
          </div>
        </div>
      )}

      <div className="mt-3">
        <PostProvider post={postContextValue}>
          <div className="pl-[58px]">
            <InteractionBar mode="auto" />
          </div>
        </PostProvider>
      </div>
    </div>
  );
};

export default Post;
