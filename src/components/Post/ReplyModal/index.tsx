import ModalPopup from "@/components/ModalPopup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hook";
import { replyThreads } from "@/features/post";
import type { AppDispatch, RootStateReduce } from "@/types/redux";
import { AlignLeft, Hash, Image as ImageIcon, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../ModalPopup/Footer";
import Header from "../../ModalPopup/Header";
import { type PostProps } from "../PostContext";

function ReplyModal({
  post,
  onClose,
}: {
  post: PostProps;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootStateReduce) => state.posts);
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  const handleReply = async () => {
    if (!content || !post.id) return;

    const data = new FormData();
    data.append("content", content);

    await toast.promise(
      dispatch(replyThreads({ id: post.id, payload: data })).unwrap(),
      {
        loading: "Đang bình luận",
        success: "Bình luận thành công",
        error: "Có lỗi xảy ra!",
      }
    );
    post.message += 1;
    onClose();
    setContent("");
  };

  if (!post || !user) return null;
  return (
    <ModalPopup onClose={onClose}>
      <Card className="p-0 gap-0" onClick={(e) => e.stopPropagation()}>
        <Header headerText={t("post.replyTo")} onClose={onClose} />

        <CardContent className="p-4 pt-5">
          <div className="flex gap-3 mb-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-10 h-10 cursor-pointer hover:opacity-90 transition-opacity">
                <AvatarImage src={post.avatar || undefined} />
                <AvatarFallback>
                  {post.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="w-[2px] flex-1 bg-border my-2 rounded-full" />
            </div>

            {/* Content */}
            <div className="flex-1 pt-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{post.username}</span>
                <span className="text-xs text-muted-foreground">
                  {post.time}
                </span>
              </div>

              {post.content && (
                <div className="text-foreground text-sm leading-relaxed">
                  {post.content}
                </div>
              )}
              {post.images.length > 0 && (
                <div className="relative mt-3 ">
                  <div className="overflow-visible w-auto">
                    <Swiper
                      modules={[FreeMode]}
                      spaceBetween={8}
                      slidesPerView="auto"
                      freeMode={true}
                      grabCursor={true}
                      className="overflow-visible"
                    >
                      {post.images.map((img, i) => (
                        <SwiperSlide
                          key={i}
                          className="overflow-visible"
                          style={{ width: "210px" }}
                        >
                          <div
                            className="rounded-lg overflow-hidden"
                            style={{ width: "210px", height: "280px" }}
                          >
                            <img
                              src={img}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Avatar className="w-10 h-10 cursor-pointer hover:opacity-90 transition-opacity">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="w-[2px] flex-1 bg-border my-2 rounded-full" />

              <Avatar className="w-5 h-5 opacity-50">
                <AvatarImage src={user.avatar_url || undefined} />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4 pt-1">
              <div>
                <div className="font-semibold text-sm leading-none mb-1">
                  {user.username}
                </div>

                <Textarea
                  ref={textareaRef}
                  placeholder={t("post.whatsNew")}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[24px] border-none shadow-none resize-none p-0 focus-visible:ring-0 text-base leading-normal overflow-hidden"
                  rows={1}
                />

                <div className="flex items-center gap-4 mt-3 text-muted-foreground/60">
                  <ImageIcon className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
                  <div className="border border-current rounded-[4px] text-[10px] font-bold px-1 cursor-pointer hover:text-foreground transition-colors">
                    GIF
                  </div>
                  <AlignLeft className="w-5 h-5 rotate-90 cursor-pointer hover:text-foreground transition-colors" />
                  <Hash className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
                  <MapPin className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors" />
                </div>
              </div>

              <div className="min-h-[20px] flex items-center text-muted-foreground/50 text-sm pt-3">
                {t("post.addToThread")}
              </div>
            </div>
          </div>
        </CardContent>

        <Footer
          loading={loading}
          loadingLabel="Đang bình luận"
          onSubmit={handleReply}
          label="Bình luận"
          content={content}
        />
      </Card>
    </ModalPopup>
  );
}

export default ReplyModal;
