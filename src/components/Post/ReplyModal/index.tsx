import ModalPopup from "@/components/ModalPopup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AlignLeft, Hash, Image as ImageIcon, MapPin } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../ModalPopup/Footer";
import Header from "../../ModalPopup/Header";
import { PostContext } from "../PostContext";

function ReplyModal({ onClose }: { onClose: () => void }) {
  const [content, setContent] = useState("");
  const ctxPost = useContext(PostContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);
  return (
    <ModalPopup onClose={onClose}>
      <Card className="p-0 gap-0 " onClick={(e) => e.stopPropagation()}>
        <Header headerText={t("post.replyTo")} onClose={onClose} />
        <CardContent className="p-4 pt-5">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Avatar className="w-10 h-10 cursor-pointer hover:opacity-90 transition-opacity">
                <AvatarImage
                  src={`${ctxPost?.post.avatar}`}
                  alt="@huydarealest"
                />
                <AvatarFallback>HD</AvatarFallback>
              </Avatar>
              <div className="w-[2px] flex-1 bg-border my-2 min-h-[40px] rounded-full"></div>
            </div>

            <div className="flex-1 space-y-4 pt-1">
              <div>
                <div className="font-semibold text-sm leading-none mb-1">
                  <span>{ctxPost?.post.username}</span>
                </div>

                <span>{ctxPost?.post.content}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <Avatar className="w-10 h-10 cursor-pointer hover:opacity-90 transition-opacity">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@huydarealest"
                />
                <AvatarFallback>HD</AvatarFallback>
              </Avatar>
              <div className="w-[2px] flex-1 bg-border my-2 min-h-[40px] rounded-full"></div>
              <Avatar className="w-5 h-5 opacity-50">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@huydarealest"
                />
                <AvatarFallback>HD</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4 pt-1">
              <div>
                <div className="font-semibold text-sm leading-none mb-1">
                  huydarealest
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
                  <AlignLeft className="w-5 h-5 cursor-pointer hover:text-foreground transition-colors rotate-90" />{" "}
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

        <Footer content={content} />
      </Card>
    </ModalPopup>
  );
}

export default ReplyModal;
