import { Heart } from "lucide-react";

const Post: React.FC<{
  author: string;
  time: string;
  content: string;
  verified?: boolean;
}> = ({ author, time, content, verified = false }) => {
  return (
    <div className=" border-gray-900 p-4 hover:bg-[#0a0a0a] transition-colors cursor-pointer">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-pink-600 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white">{author}</span>
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
          <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
          <div className="flex gap-6 mt-3 text-gray-500">
            <button className="hover:text-red-500 transition-colors flex items-center gap-1">
              <Heart size={18} />
              <span className="text-xs">71</span>
            </button>
            <button className="hover:text-blue-500 transition-colors flex items-center gap-1">
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span className="text-xs">1</span>
            </button>
            <button className="hover:text-green-500 transition-colors flex items-center gap-1">
              <svg
                className="w-[18px] h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span className="text-xs">11</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
