import AvatarGroup from "@/components/AvatarGroup";
import type { OriginalPost } from "@/types/post";
import { formatTime } from "@/utils/format-time";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Quote = ({ post }: { post: OriginalPost }) => {
  if (!post.user) return null;
  return (
    <div className="mt-3 ml-[58px] border rounded-xl p-3 bg-muted/30">
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
        <div className="relative mt-3">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={8}
            slidesPerView="auto"
            freeMode
            grabCursor
            className="overflow-visible"
          >
            {post.media_urls.map((img, i) => (
              <SwiperSlide key={i} style={{ width: 210 }}>
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ width: 210, height: 280 }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Quote;
