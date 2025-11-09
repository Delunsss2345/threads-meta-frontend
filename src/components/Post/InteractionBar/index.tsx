import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

interface InteractionBarProps {
  like?: number;
  message?: number;
  repost?: number;
  share?: number;
}

const InteractionBar = ({
  like = 0,
  message = 0,
  repost = 0,
  share = 0,
}: InteractionBarProps) => {
  return (
    <div className="flex gap-6 mt-3 text-foreground">
      {/* Like */}
      <button className="hover:text-red-500 transition-colors flex items-center gap-1">
        <Heart size={18} />
        <span className="text-xs">{like}</span>
      </button>

      {/* Comment */}
      <button className="hover:text-blue-500 transition-colors flex items-center gap-1">
        <MessageCircle size={18} />
        <span className="text-xs">{message}</span>
      </button>

      {/* Repost */}
      <button className="hover:text-green-500 transition-colors flex items-center gap-1">
        <Repeat2 size={18} />
        <span className="text-xs">{repost}</span>
      </button>

      {/* Share */}
      <button className="hover:text-gray-700 transition-colors flex items-center gap-1">
        <Send size={18} />
        <span className="text-xs">{share}</span>
      </button>
    </div>
  );
};

export default InteractionBar;
