import AvatarGroup from "@/components/AvatarGroup";
import ModalPopup from "@/components/ModalPopup";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/features/auth/hook"; // <-- thêm
import { AlignLeft, Hash, Image as ImageIcon, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import Footer from "../../ModalPopup/Footer";
import Header from "../../ModalPopup/Header";

function NewPostModal({
  onClose,
  mode = "auto",
}: {
  onClose: () => void;
  mode?: "subtract" | "auto";
}) {
  const { t } = useTranslation();
  const { user } = useAuth(); // <-- lấy user

  return (
    <ModalPopup mode={mode} onClose={onClose}>
      <Card className="gap-0 p-0 " onClick={(e) => e.stopPropagation()}>
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

            <div className="flex-1 pt-1 space-y-4">
              <div>
                {/* Username */}
                <div className="mb-1 text-sm font-semibold leading-none">
                  {user?.username}
                </div>

                <Textarea
                  placeholder={t("post.whatsNew")}
                  className="min-h-[24px] !bg-transparent border-none shadow-none resize-none p-0 focus-visible:ring-0 text-base leading-normal overflow-hidden"
                  rows={1}
                />

                <div className="flex items-center gap-4 mt-3 text-muted-foreground/60">
                  <ImageIcon className="w-5 h-5 transition-colors cursor-pointer hover:text-foreground" />
                  <div className="border border-current rounded-[4px] text-[10px] font-bold px-1 cursor-pointer hover:text-foreground transition-colors">
                    GIF
                  </div>
                  <AlignLeft className="w-5 h-5 transition-colors rotate-90 cursor-pointer hover:text-foreground" />
                  <Hash className="w-5 h-5 transition-colors cursor-pointer hover:text-foreground" />
                  <MapPin className="w-5 h-5 transition-colors cursor-pointer hover:text-foreground" />
                </div>
              </div>

              <div className="min-h-[20px] flex items-center text-muted-foreground/50 text-sm pt-3">
                {t("post.addToThread")}
              </div>
            </div>
          </div>
        </CardContent>

        <Footer />
      </Card>
    </ModalPopup>
  );
}

export default NewPostModal;
