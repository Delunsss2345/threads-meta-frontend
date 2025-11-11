import { AnimatePresence } from "framer-motion";
import { Ellipsis } from "lucide-react"; // icon 3 chấm gọn nhẹ
import { useRef, useState } from "react";
import { UserPreviewCard } from "../UserPreview";
import InteractionBar from "./InteractionBar";
import Menu from "./Menu";
import type { PostProps } from "./type";

const Post = ({
  author,
  time,
  content,
  verified = false,
  like = 0,
  message = 0,
  repost = 0,
  share = 0,
  avatar,
}: PostProps) => {
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
    <div className="border-border border-t border-b cursor-pointer ">
      <div className="flex gap-3 px-6 py-3 relative">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={`${author} avatar`}
            className="w-10 h-10 rounded-full object-cover "
          />
        ) : (
          <div className="w-10 h-10 rounded-full " />
        )}

        {/* Nội dung */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-1 ">
            <div className="flex items-center gap-2">
              <span
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative font-semibold text-foreground"
              >
                {author}
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
              <span className="text-muted-foreground text-sm relative">
                {time}
              </span>
            </div>

            <Menu buttonActive={<Ellipsis className="w-4 h-4" />} />
          </div>

          <p className="text-foreground text-sm leading-relaxed mb-2">
            {content}
          </p>

          {/* Thanh tương tác */}
          <InteractionBar
            user={{ avatar, username: author, content: content }}
            like={like}
            message={message}
            repost={repost}
            share={share}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
