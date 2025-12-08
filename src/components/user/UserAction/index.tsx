import EmojiPortal from "@/components/common/EmojiPortal";
import SwiperImage from "@/components/common/SwiperImage";
import ImageAttach from "@/components/post/Icons/ImageAttach";
import ImageConvey from "@/components/post/Icons/ImageConvey";
import ImageGif from "@/components/post/Icons/ImageGif";
import ImageMap from "@/components/post/Icons/ImageMap";
import ImagePost from "@/components/post/Icons/ImagePost";
import ImageSticker from "@/components/post/Icons/ImageSticker";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "@/hooks/use-action";
import EmojiPicker from "emoji-picker-react";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InputSearchTopic from "./InputSearchTopic";
interface UserActionProps {
  username: string;
  onChangeContent?: (data: any) => void;
}
const UserAction = ({ username, onChangeContent }: UserActionProps) => {
  const { t } = useTranslation();
  const {
    content,
    setContent,
    previewImage,
    handleInput,
    inputRef,
    showEmoji,
    setShowEmoji,
  } = useAction();
  const emojiRef = useRef<SVGSVGElement | null>(null);
  const [iconPosition, setIconPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    onChangeContent?.({ content, previewImage });
  }, [content, previewImage]);

  return (
    <>
      <div className="flex items-center gap-1 font-semibold text-sm leading-none mb-1">
        <span>{username || "None"}</span>

        <ChevronRight className="w-3 h-3 text-muted-foreground" />
        <InputSearchTopic />
      </div>

      <div className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("post.whatsNew")}
          className="min-h-[24px] bg-transparent border-none shadow-none resize-none p-0 focus-visible:ring-0 text-base leading-normal"
          rows={1}
        />

        {previewImage && <SwiperImage images={previewImage} />}
      </div>
      <div className="flex items-center gap-2 mt-3 text-muted-foreground/60">
        <div>
          <input
            onChange={handleInput}
            ref={inputRef}
            multiple
            accept="image/*"
            type="file"
            className="hidden"
          />
          <ImagePost
            onClick={() => inputRef.current?.click()}
            className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors"
          />
        </div>

        <div className="rounded-[4px] text-[10px] font-bold px-1 cursor-pointer hover:text-foreground transition-colors">
          <ImageGif />
        </div>

        <div className="relative">
          <ImageSticker
            ref={emojiRef}
            className="w-5 h-5 cursor-pointer hover:text-foreground"
            onClick={() => {
              if (emojiRef.current) {
                const rect = emojiRef.current.getBoundingClientRect();
                setIconPosition({ top: rect.top, left: rect.left });
              }
              setShowEmoji(!showEmoji);
            }}
          />

          {showEmoji && (
            <EmojiPortal>
              <div
                className="absolute z-50 "
                style={{
                  top: iconPosition.top - 10 + "px",
                  left: iconPosition.left + 20 + "px",
                }}
              >
                <EmojiPicker
                  searchDisabled
                  skinTonesDisabled
                  previewConfig={{ showPreview: false }}
                  categories={[]}
                  lazyLoadEmojis={true}
                  height={280}
                  width={280}
                  onEmojiClick={(emoji) => setContent(content + emoji.emoji)}
                />
              </div>
            </EmojiPortal>
          )}
        </div>

        <ImageConvey className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
        <ImageAttach className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
        <ImageMap className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
      </div>
    </>
  );
};

export default UserAction;
