import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

interface EngagementStatsProps {
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
}
const EngagementStats = ({
  likes,
  comments,
  reposts,
  shares,
}: EngagementStatsProps) => (
  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
    <div className="flex items-center gap-1">
      <Heart className="w-4 h-4" />
      <span>{likes}</span>
    </div>
    <div className="flex items-center gap-1">
      <MessageCircle className="w-4 h-4" />
      <span>{comments}</span>
    </div>
    <div className="flex items-center gap-1">
      <Repeat2 className="w-4 h-4" />
      <span>{reposts}</span>
    </div>
    <div className="flex items-center gap-1">
      <Send className="w-4 h-4" />
      <span>{shares}</span>
    </div>
  </div>
);

export default EngagementStats;
