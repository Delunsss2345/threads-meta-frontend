import { InteractionBar } from "./InteractionBar";

interface PostProps {
  author: string;
  time: string;
  content: string;
  verified?: boolean;
  like?: number;
  message?: number;
  repost?: number;
  share?: number;
  avatar?: string; // ✅ Thêm ảnh đại diện
}

const Post: React.FC<PostProps> = ({
  author,
  time,
  content,
  verified = false,
  like = 0,
  message = 0,
  repost = 0,
  share = 0,
  avatar, // ✅ nhận prop avatar
}) => {
  return (
    <div className="border-border p-4 hover:bg-accent/50 transition-colors cursor-pointer">
      <div className="flex gap-3">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={`${author} avatar`}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex-shrink-0" />
        )}

        {/* Nội dung */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground">{author}</span>
            {verified && (
              <svg
                className="w-4 h-4 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-gray-500 text-sm">{time}</span>
          </div>

          {/* Nội dung bài viết */}
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            {content}
          </p>

          {/* Thanh tương tác */}
          <InteractionBar
            like={like}
            message={message}
            repost={repost}
            share={share}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
