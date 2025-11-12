import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import { useContext, useState } from "react";
import { PostContext } from "../PostContext";
import ReplyModal from "../ReplyModal";
import RepostMenu from "../RepostMenu";
import ShareMenu from "../ShareMenu";
import type { InteractionBarProps } from "../type";
import styles from "./interactionbar.module.css";

const InteractionBar = ({ mode = "auto" }: InteractionBarProps) => {
  const ctx = useContext(PostContext);
  const [openModalReply, setOpenModalReply] = useState(false);

  const handleReply = () => {
    setOpenModalReply(true);
  };

  return (
    <>
      <div
        className={`flex text-foreground items-center gap-4 ${
          mode === "share" ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <button className={`hover:text-red-500 ${styles.interactionButton}`}>
          <Heart size={18} />
          <span className="text-xs">{ctx?.post.like || 0}</span>
        </button>

        <button
          onClick={handleReply}
          className={`hover:text-blue-500 ${styles.interactionButton}`}
        >
          <MessageCircle size={18} />
          <span className="text-xs">{ctx?.post.message || 0}</span>
        </button>

        <RepostMenu className={`hover:text-green-500 !px-0 ${styles.interactionButton}`}>
          <Repeat2 size={18} />
          <span className="text-xs">{ctx?.post.repost || 0}</span>
        </RepostMenu>

        <ShareMenu className={`hover:text-gray-700 !px-0 ${styles.interactionButton}`}>
          <Send size={18} />
          <span className="text-xs">{ctx?.post.share || 0}</span>
        </ShareMenu>
      </div>

      {/* Modal Reply */}
      {openModalReply && (
        <ReplyModal onClose={() => setOpenModalReply(false)} />
      )}
    </>
  );
};

export default InteractionBar;
