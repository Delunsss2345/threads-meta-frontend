import ModalPopup from "@/components/ModalPopup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import UserAction from "@/components/UserAction";
import { useAuth } from "@/features/auth/hook";
import { quotePost, selectPostsLoading } from "@/features/post";
import type { AppDispatch } from "@/types/redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../ModalPopup/Footer";
import Header from "../../ModalPopup/Header";
import type { MappedPost } from "../type";

function QuoteModal({
  post,
  onClose,
}: {
  post: MappedPost;
  onClose: () => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectPostsLoading);
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { t } = useTranslation();

  const handleQuote = async () => {
    if (!content || !post.id) return;

    await toast.promise(
      dispatch(quotePost({ id: post.id, content })).unwrap(),
      {
        loading: "Đang trích dẫn bài viết",
        success: "Trích dẫn thành công",
        error: "Có lỗi xảy ra!",
      }
    );
    post.reposts_and_quotes_count += 1;

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
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.user?.avatar_url || undefined} />
                <AvatarFallback>
                  {post.user?.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="w-[2px] flex-1 bg-border my-2 rounded-full" />
            </div>

            <div className="flex-1 pt-1 space-y-2">
              {/* Username + Time */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  {post.user?.username}
                </span>
                <span className="text-xs text-muted-foreground">
                  {post.created_at}
                </span>
              </div>

              {post.content && (
                <div className="text-foreground text-sm leading-relaxed">
                  {post.content}
                </div>
              )}

              {post.media_urls.length > 0 && (
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
                      <SwiperSlide key={i} style={{ width: "210px" }}>
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
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Avatar className="w-10 h-10 cursor-pointer">
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
              <UserAction
                username={user.username}
                onChangeContent={(data: any) => setContent(data.content)}
              />

              <div className="text-muted-foreground/50 text-sm pt-3">
                {t("post.addToThread")}
              </div>
            </div>
          </div>
        </CardContent>

        <Footer
          loading={loading}
          loadingLabel="Đang trích dẫn"
          onSubmit={handleQuote}
          label="Trích dẫn"
          content={content}
        />
      </Card>
    </ModalPopup>
  );
}

export default QuoteModal;
