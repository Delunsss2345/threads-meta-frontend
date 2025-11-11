import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import { useState } from "react";
import ReplyModal from "../ReplyModal";
import RepostMenu from "../RepostMenu";
import ShareMenu from "../ShareMenu";
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
      <div className="flex gap-6 mt-3 items-center text-foreground">
        <button className="hover:text-red-500 flex items-center gap-1 cursor-pointer">
          <Heart size={18} />
          <span className="text-xs">{like}</span>
        </button>

        <button
          onClick={handleReply}
          className="hover:text-blue-500 flex items-center gap-1 cursor-pointer"
        >
          <MessageCircle size={18} />
          <span className="text-xs">{message}</span>
        </button>

        <RepostMenu className="hover:text-green-500 flex items-center gap-1 cursor-pointer !px-0">
          <Repeat2 size={18} />
          <span className="text-xs">{repost}</span>
        </RepostMenu>

        <ShareMenu className="hover:text-gray-700 flex items-center gap-1 cursor-pointer !px-0">
          <Send size={18} />
          <span className="text-xs">{share}</span>
        </ShareMenu>
      </div>

      {/* Modal Reply */}
      {openModalReply && (
        <ReplyModal user={user} onClose={() => setOpenModalReply(false)} />
      )}
    </>
  );
};

export default InteractionBar;
