import {
  getInteractionAuthConfig,
  type ActionKey,
} from "@/constant/pageTitless";
import AuthSocialModal from "@/features/auth/components/LoginModal";
import { useCurrentUser } from "@/features/auth/hooks";
import { likePost } from "@/features/post";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import type { AppDispatch } from "@/types/redux";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../PostContext";
import ReplyModal from "../ReplyModal";
import RepostMenu from "../RepostMenu";
import ShareMenu from "../ShareMenu";
import type { InteractionBarProps } from "../type";
import ReplyIcon from "./Icons/ReplyIcon";
import RepostIcon from "./Icons/RepostIcon";
import ShareIcon from "./Icons/ShareIcon";
import TymIcon from "./Icons/TymIcon";
import styles from "./interactionbar.module.css";

const InteractionBar = ({
  mode = "auto",
  size = 18,
  iconClass = "",
}: InteractionBarProps & {
  size?: number;
  iconClass?: string;
  className?: string;
}) => {
  const ctx = useContext(PostContext);
  const currentUser = useCurrentUser();
  const { show, hide } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isComment = mode === "comment";
  const iconSize = isComment ? size - 4 : size;
  const textSize = isComment ? "text-[10px]" : "text-xs";
  const gap = isComment ? "gap-0" : "gap-0";

  const handleListen = async (e: React.MouseEvent<HTMLDivElement>) => {
    const button = (e.target as HTMLElement).closest("button");
    if (!button) return;

    const span = button.querySelector<HTMLSpanElement>(".interaction-bar");
    if (!span) return;

    const label = span.dataset.label as ActionKey | undefined | null;

    if (!currentUser) {
      if (!label) {
        show(
          <AuthSocialModal
            onContinue={() => navigate("/login")}
            onClose={hide}
          />
        );
        return;
      }
      const cfg = getInteractionAuthConfig()[label];

      show(
        <AuthSocialModal
          title={cfg.title}
          description={cfg.description}
          buttonText={cfg.buttonText}
          Icon={cfg.Icon}
          iconGradient={cfg.iconGradient}
          onContinue={() => navigate("/login")}
          onClose={hide}
        />
      );
      return;
    } else if (ctx?.post.id) {
      if (!label) return;
      if (label === "like") {
        await dispatch(likePost(ctx?.post.id)).unwrap();
      }
    }
  };

  const handleReply = () => {
    if (!currentUser) {
      show(
        <AuthSocialModal onContinue={() => navigate("/login")} onClose={hide} />
      );
      return;
    }
    if (!ctx?.post) return null;
    show(<ReplyModal post={ctx?.post} onClose={hide} />);
  };

  return (
    <>
      <div
        onClick={handleListen}
        className={cn(
          `flex text-foreground items-center ${gap} ${
            mode === "share" ? "pointer-events-none opacity-50" : ""
          }`
        )}
      >
        <button
          className={`hover:bg-[#ccc] ${styles.interactionButton} ${
            isComment ? "!px-1 scale-90" : ""
          } ${ctx?.post.is_liked_by_auth ? "text-red-500" : ""}`}
        >
          <TymIcon size={iconSize} className={iconClass} />
          <span
            className={`${textSize} interaction-bar`}
            data-label="like"
            title="Like"
          >
            {ctx?.post.likes_count || 0}
          </span>
        </button>

        <button
          onClick={handleReply}
          className={` ${styles.interactionButton} ${
            isComment ? "!px-1 scale-90" : ""
          }`}
        >
          <ReplyIcon size={iconSize} className={iconClass} />
          <span
            className={`${textSize} interaction-bar`}
            data-label="reply"
            title="Reply"
          >
            {ctx?.post.replies_count || 0}
          </span>
        </button>

        <RepostMenu
          post={ctx?.post || undefined}
          isAuth={!!currentUser}
          onUnauthorizedClick={hide}
          className={` ${styles.interactionButton} ${
            isComment ? "!px-1 scale-90" : ""
          } ${ctx?.post.is_reposted_by_auth ? "text-green-500" : ""}`}
        >
          <RepostIcon size={iconSize} className={iconClass} />
          <span
            className={`${textSize} interaction-bar`}
            data-label="repost"
            title="Repost"
          >
            {ctx?.post.reposts_and_quotes_count || 0}
          </span>
        </RepostMenu>

        <ShareMenu
          isAuth={!!currentUser}
          onUnauthorizedClick={hide}
          className={`${styles.interactionButton} ${
            isComment ? "!px-1 scale-90" : ""
          } ${ctx?.post.is_saved_by_auth ? "text-gray-700" : ""}`}
          post={ctx?.post || undefined}
        >
          <ShareIcon size={iconSize} className={iconClass} />
          <span
            className={`${textSize} interaction-bar`}
            data-label="share"
            title="Share"
          >
            {ctx?.post.reposts_and_quotes_count || 0}
          </span>
        </ShareMenu>
      </div>
    </>
  );
};

export default InteractionBar;
