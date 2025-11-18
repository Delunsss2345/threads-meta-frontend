import { AnimatePresence } from "framer-motion";
import { Ellipsis } from "lucide-react";
import { useRef, useState } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { UserPreviewCard } from "../UserPreview";
import InteractionBar from "./InteractionBar";
import Menu from "./Menu";
import PostProvider from "./PostContext";
import type { Post } from "./type";

const Post = ({
  username,
  time,
  content,
  verified = false,
  like = 0,
  message = 0,
  repost = 0,
  share = 0,
  file,
  images = [],
  avatar,
}: Post) => {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<any | null>(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setOpen(true), 500);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(false);
  };

  return (
    <div className="px-6 py-3 border-t border-b border-border cursor-pointer">
      <div className="grid [grid-template-columns:48px_minmax(0,1fr)] gap-3 w-full">
        <div>
          {avatar ? (
            <img src={avatar} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 bg-muted rounded-full" />
          )}
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
                      name="Sue mingze"
                      username="nthg_sue"
                      bio="糸🪣"
                      followers={50}
                      avatar="https://i.imgur.com/FbQHdT0.jpg"
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

            <Menu buttonActive={<Ellipsis className="w-2 h-2" />} />
          </div>

          {content && (
            <p className="mt-2 text-foreground text-sm leading-relaxed">
              {content}
            </p>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="relative mt-3 ">
          <div className="-ml-[48px] pl-[48px] overflow-visible w-auto">
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

      <div className="mt-3">
        <PostProvider
          post={{
            username,
            time,
            content,
            verified,
            like,
            message,
            repost,
            share,
            file,
            images,
            avatar,
          }}
        >
          <InteractionBar mode="auto" />
        </PostProvider>
      </div>
    </div>
  );
};

export default Post;
