import { AnimatePresence } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAuth } from "@/features/auth/hook";
import type { PostItem } from "@/types/post";
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
}: {
  post: PostItem | any;
  onClick?: () => void;
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
    const icon = <Ellipsis className="w-2 h-2" />;
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
    return post.media_urls.map((img, i) => (
      <SwiperSlide key={i} style={{ width: 210 }}>
        <div
          className="rounded-lg overflow-hidden"
          style={{ width: 210, height: 280 }}
        >
          <img src={img} className="w-full h-full object-cover" />
        </div>
      </SwiperSlide>
    ));
  }, [post.media_urls]);

  return (
    <div className="px-6 py-3 border-t border-b border-border cursor-pointer">
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
                className="font-semibold text-sm text-foreground truncate whitespace-nowrap"
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
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}

              <span className="text-muted-foreground text-xs whitespace-nowrap">
                {time}
              </span>
            </div>

            {MenuButton}
          </div>

          {post.content && (
            <p className="text-foreground text-sm leading-relaxed">
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
