import MenuPopup from "@/components/common/MenuPopup";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { ReplyOptionsIcon } from "../../Icon/ReplyOptionsIcon";

const Footer = ({
  loading = false,
  onSubmit,
  content,
  loadingLabel,
  label = "Đăng bài",
}: {
  loading: boolean;
  onSubmit?: () => void;
  content?: string;
  loadingLabel?: string;
  label?: string;
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  return (
    <CardFooter className="flex items-center justify-between p-3">
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <MenuPopup
          motionProps={{
            initial: { opacity: 0, y: isMobile ? 0 : 0 },
            animate: { opacity: 1, y: 0 },
          }}
          customPopup={
            isMobile
              ? "bottom-0 left-0 w-full bg-white dark:bg-neutral-900 rounded-t-2xl p-4 shadow-xl z-[999]"
              : "absolute -translate-x-1/5 -translate-y-1/7 h-auto"
          }
          className="p-0 hover:bg-transparent cursor-pointer pl-1"
          buttonActive={
            <div className="flex items-center gap-1">
              <ReplyOptionsIcon className="w-8 h-8 translate-y-1/10" />
              <span className="text-sm">{t("reply.replyOptions")}</span>
            </div>
          }
          mode={isMobile ? "short" : "medium"}
        >
          <div className="font-semibold text-[15px] mb-2 text-gray-600 px-1">
            {t("reply.whoCanReply")}
          </div>

          <div className="flex flex-col">
            <button className="py-2 text-left hover:bg-accent rounded-xl px-2">
              {t("reply.everyone")}
            </button>
            <button className="py-2 text-left hover:bg-accent rounded-xl px-2">
              {t("reply.followers")}
            </button>
            <button className="py-2 text-left hover:bg-accent rounded-xl px-2">
              {t("reply.following")}
            </button>
            <button className="py-2 text-left hover:bg-accent rounded-xl px-2">
              {t("reply.mentioned")}
            </button>
          </div>

          <div className="flex justify-between items-center pt-4 mt-3">
            <span className="text-sm">{t("reply.reviewBefore")}</span>
            <input type="checkbox" className="toggle" />
          </div>
        </MenuPopup>
      </div>

      <Button
        disabled={loading || !content}
        onClick={onSubmit}
        type="submit"
        className="cursor-pointer rounded-full px-5 font-semibold disabled:opacity-30 
                   bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black"
      >
        {loading ? loadingLabel : label}
      </Button>
    </CardFooter>
  );
};

export default Footer;
