import AvatarGroup from "@/components/AvatarGroup";
import ModalPopup from "@/components/ModalPopup";
import SwiperImage from "@/components/SwipterImage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hook";
import { postThreads } from "@/features/post";
import { createPostSchema } from "@/schema/post.schema";
import type { AppDispatch, RootStateReduce } from "@/types/redux";
import { AlignLeft, Hash, Image as ImageIcon, MapPin } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Footer from "../../ModalPopup/Footer";
import Header from "../../ModalPopup/Header";

function NewPostModal({
  onClose,
  mode = "auto",
}: {
  onClose: () => void;
  mode?: "subtract" | "auto";
}) {
  const posts = useSelector((state: RootStateReduce) => state.posts);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<File[] | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPreviewImage(Array.from(files));
    }
  };

  const handlePost = async () => {
    const result = createPostSchema.safeParse({
      content,
      media: previewImage || [],
    });

    console.log(result);
    if (!result.success) {
      console.log(result.error.format());
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (previewImage) {
      previewImage?.forEach((f) => formData.append("media[]", f));
    }
    await toast.promise(dispatch(postThreads(formData)).unwrap(), {
      loading: "Đang đăng bài",
      success: "Đăng thành công",
      error: "Có lỗi xảy ra!",
    });

    onClose();
  };

  return (
    <ModalPopup mode={mode} onClose={onClose}>
      <Card className="gap-0 p-0" onClick={(e) => e.stopPropagation()}>
        <Header headerText={t("post.newThread")} onClose={onClose} />

        <CardContent className="p-4 pt-5">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <AvatarGroup
                size={10}
                url={user?.avatar_url || ""}
                fallBack={user?.username?.slice(0, 2).toUpperCase()}
              />

              <div className="w-[2px] flex-1 bg-border my-2 min-h-[40px] rounded-full"></div>

              <AvatarGroup
                size={5}
                url={user?.avatar_url || ""}
                fallBack={user?.username?.slice(0, 2).toUpperCase()}
              />
            </div>

            <div className="flex-1 pt-1 space-y-4 overflow-x-auto">
              <div>
                <div className="mb-1 text-sm font-semibold leading-none">
                  {user?.username}
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

                <div className="flex items-center gap-4 mt-3 text-muted-foreground/60">
                  <div>
                    <input
                      onChange={handleInput}
                      ref={inputRef}
                      multiple
                      accept="image/*"
                      type="file"
                      className="hidden"
                    />
                    <ImageIcon
                      onClick={() => inputRef.current?.click()}
                      className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors"
                    />
                  </div>

                  <div className="border border-current rounded-[4px] text-[10px] font-bold px-1 cursor-pointer hover:text-foreground transition-colors">
                    GIF
                  </div>

                  <AlignLeft className="w-5 h-5 rotate-90 cursor-pointer hover:text-foreground" />
                  <Hash className="w-5 h-5 cursor-pointer hover:text-foreground" />
                  <MapPin className="w-5 h-5 cursor-pointer hover:text-foreground" />
                </div>
              </div>

              <div className="min-h-[20px] flex items-center text-muted-foreground/50 text-sm pt-3">
                {t("post.addToThread")}
              </div>
            </div>
          </div>
        </CardContent>

        <Footer loading={posts.loading} onSubmit={handlePost} />
      </Card>
    </ModalPopup>
  );
}

export default NewPostModal;
