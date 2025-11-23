import AuthSocialModal from "@/components/LoginModal";
import {
  getInteractionAuthConfig,
  type ActionKey,
} from "@/constant/pageTitless";
import { useCurrentUser } from "@/features/auth/hook";
import { likePost } from "@/features/post";
import { useModal } from "@/hooks/use-modal";
import type { AppDispatch } from "@/types/redux";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../PostContext";
import ReplyModal from "../ReplyModal";
import RepostMenu from "../RepostMenu";
import ShareMenu from "../ShareMenu";
import type { InteractionBarProps } from "../type";
import styles from "./interactionbar.module.css";

const InteractionBar = ({ mode = "auto" }: InteractionBarProps) => {
  const ctx = useContext(PostContext);
  const currentUser = useCurrentUser();
  const { show, hide } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
  console.log(ctx?.post);
  return (
    <>
      <div
        onClick={handleListen}
        className={`flex text-foreground items-center gap-4 ${
          mode === "share" ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <button
          className={`hover:text-red-500 ${styles.interactionButton} ${
            ctx?.post.is_liked_by_auth ? "text-red-500" : ""
          }`}
        >
          <Heart size={18} />
          <span
            className="text-xs interaction-bar"
            data-label="like"
            title="Like"
          >
            {ctx?.post.like || 0}
          </span>
        </button>

        <button
          onClick={handleReply}
          className={`hover:text-blue-500 ${styles.interactionButton}`}
        >
          <MessageCircle size={18} />
          <span
            className="text-xs interaction-bar"
            data-label="reply"
            title="Reply"
          >
            {ctx?.post.message || 0}
          </span>
        </button>

        <RepostMenu
          isAuth={!!currentUser}
          onUnauthorizedClick={hide}
          className={`hover:text-green-500 !px-0 ${styles.interactionButton} ${
            ctx?.post.is_reposted_by_auth ? "text-green-500" : ""
          }`}
        >
          <Repeat2 size={18} />
          <span
            className="text-xs interaction-bar"
            data-label="repost"
            title="Repost"
          >
            {ctx?.post.repost || 0}
          </span>
        </RepostMenu>

        <ShareMenu
          isAuth={!!currentUser}
          onUnauthorizedClick={hide}
          className={`hover:text-gray-700 !px-0 ${styles.interactionButton}
          
          ${ctx?.post.is_saved_by_auth ? "text-gray-700" : ""}`}
        >
          <Send size={18} />
          <span
            className="text-xs interaction-bar"
            data-label="share"
            title="Share"
          >
            {ctx?.post.share || 0}
          </span>
        </ShareMenu>
      </div>
    </>
  );
};

export default InteractionBar;
