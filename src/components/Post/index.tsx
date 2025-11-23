import { AnimatePresence } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAuth } from "@/features/auth/hook";
import type { PostItem } from "@/types/post";
import { useNavigate } from "react-router-dom";
import AvatarGroup from "../AvatarGroup";
import { UserPreviewCard } from "../UserPreview";
import InteractionBar from "./InteractionBar";
import Menu from "./Menu";
import MenuMe from "./MenuMe";
import PostProvider from "./PostContext";

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const diff = (Date.now() - date.getTime()) / 1000;

  if (diff < 60) return `${Math.floor(diff)} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;

  return `${Math.floor(diff / 86400)} ngày trước`;
};

const Post = ({ post, onClick }: { post: PostItem; onClick?: () => void }) => {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<any | null>(null);
  const username = post.user.username;
  const avatar = post.user.avatar_url;
  const verified = post.user.verified;
  const content = post.content;
  const images = post.media_urls;
  const like = post.likes_count;
  const message = post.replies_count;
  const repost = post.reposts_and_quotes_count;
  const share = 0;
  const time = formatTime(post.created_at);
  const { user } = useAuth();
  const navigator = useNavigate();
  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setOpen(true), 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(false);
  };

  return (
    <div className="px-6 py-3 border-t border-b border-border cursor-pointer">
      <div
        onClick={onClick}
        className=" grid [grid-template-columns:48px_minmax(0,1fr)] gap-3 w-full"
      >
        {/* Avatar */}
        <div>
          <AvatarGroup
            size={10}
            url={avatar ?? ""}
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
                      avatar={avatar || ""}
                    />
                  )}
                </AnimatePresence>
              </span>

              {verified && (
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

            {username === user?.username ? (
              <MenuMe
                threadId={post.id}
                buttonActive={<Ellipsis className="w-2 h-2" />}
              />
            ) : (
              <Menu buttonActive={<Ellipsis className="w-2 h-2" />} />
            )}
          </div>

          {/* Content */}
          {content && (
            <p className="text-foreground text-sm leading-relaxed">{content}</p>
          )}
        </div>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="relative mt-3 ">
          <div className="ml-[12px] pl-[48px] overflow-visible w-auto">
            <Swiper
              modules={[FreeMode]}
              spaceBetween={8}
              slidesPerView="auto"
              freeMode={true}
              grabCursor={true}
              className="overflow-visible"
            >
              {images.map((img, i) => (
                <SwiperSlide
                  key={i}
                  className="overflow-visible"
                  style={{ width: "210px" }}
                >
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{ width: "210px", height: "280px" }}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <div className="mt-3 ">
        <PostProvider
          post={{
            id: post.id,

            avatar: post.user.avatar_url,
            username: post.user.username,
            name: post.user.name,

            verified: post.user.verified,
            time,
            content,
            images,

            like,
            message,
            repost,
            share,
            is_liked_by_auth: post.is_liked_by_auth,
            is_saved_by_auth: post.is_saved_by_auth,
            is_reposted_by_auth: post.is_reposted_by_auth,

            original_post: post.original_post
              ? {
                  username: post.original_post.user.username,
                  content: post.original_post.content,
                  avatar: post.original_post.user.avatar_url,
                }
              : null,
          }}
        >
          <div className="pl-[58px]">
            <InteractionBar mode="auto" />
          </div>
        </PostProvider>
      </div>
    </div>
  );
};

export default Post;
