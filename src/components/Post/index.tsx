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
    <div className="border-border border-t border-b cursor-pointer">
      <div className="flex px-6 py-3 gap-3 relative overflow-x-hidden">
        {avatar ? (
          <img
            src={avatar}
            alt={`${username} avatar`}
            className="w-10 h-10 rounded-full object-cover translate-y-2 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 bg-muted rounded-full flex-shrink-0" />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative font-semibold text-sm text-foreground truncate"
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
                  className="w-4 h-4 text-blue-500 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}

              <span className="text-muted-foreground text-xs flex-shrink-0">
                {time}
              </span>
            </div>

            <Menu buttonActive={<Ellipsis className="w-2 h-2" />} />
          </div>

          {content && (
            <p className="text-foreground text-sm leading-relaxed mt-1">
              {content}
            </p>
          )}

          {images.length > 0 && (
            <div className="mt-3 -mr-6">
              <Swiper
                modules={[FreeMode]}
                spaceBetween={8}
                slidesPerView="auto" //set width tự ăn
                freeMode={true}
                grabCursor={true}
                className="w-full"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i} style={{ width: "210px" }}>
                    <div
                      className={`rounded-lg overflow-hidden`}
                      style={{
                        width: "210px",
                        height: "280px",
                      }}
                    >
                      <img
                        src={img}
                        alt={`Image ${i + 1}`}
                        className="block w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {file && file.type === "audio" && (
            <div className="mt-3">{/* <AudioPlayer url={file.url} /> */}</div>
          )}

          {file && file.type !== "audio" && (
            <div className="mt-3">
              <a
                href={file.url}
                target="_blank"
                className="block p-3 rounded-lg bg-muted/40 text-sm text-blue-500 underline"
              >
                {file.name}
              </a>
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
      </div>
    </div>
  );
};

export default Post;
