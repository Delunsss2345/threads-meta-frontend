import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import { useState } from "react";
import ReplyModal from "../ReplyModal";
import type { InteractionBarProps } from "../type";

const InteractionBar = ({
  like = 0,
  message = 0,
  repost = 0,
  share = 0,
  user,
}: InteractionBarProps) => {
  const { avatar, username, content } = user;
  const [openModalReply, setOpenModalReply] = useState(false);
  if (!avatar || !username || !content) {
    return null;
  }

  const handleReply = () => {
    setOpenModalReply(true);
  };

  return (
    <>
      <div className="flex gap-6 mt-3 text-foreground">
        {/* Like */}
        <button className="hover:text-red-500 flex items-center gap-1">
          <Heart size={18} />
          <span className="text-xs">{like}</span>
        </button>

        {/* Comment */}
        <button
          onClick={handleReply}
          className="hover:text-blue-500 flex items-center gap-1"
        >
          <MessageCircle size={18} />
          <span className="text-xs">{message}</span>
        </button>

        {/* Repost */}
        <button className="hover:text-green-500 flex items-center gap-1">
          <Repeat2 size={18} />
          <span className="text-xs">{repost}</span>
        </button>

        {/* Share */}
        <button className="hover:text-gray-700 flex items-center gap-1">
          <Send size={18} />
          <span className="text-xs">{share}</span>
        </button>
      </div>

      {/* Modal Reply */}
      {openModalReply && (
        <ReplyModal user={user} onClose={() => setOpenModalReply(false)} />
      )}
    </>
  );
};

export default InteractionBar;
