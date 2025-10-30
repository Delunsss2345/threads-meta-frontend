import React, { createContext } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export interface AuthModalProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  title = "Đăng ký để dùng",
  description = "Tham gia Threads để chia sẻ ý tưởng, đặt câu hỏi, đăng những suy nghĩ bất chợt và hơn thế nữa.",
  icon,
  onClose,
}) => {
  const defaultIcon = (
    <div className="w-16 h-16 mx-auto mb-6">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#F7931E" />
            <stop offset="100%" stopColor="#E91E63" />
          </linearGradient>
        </defs>
        <path
          d="M50 10 C30 10 15 25 15 45 C15 55 20 63 27 68 L27 85 L42 75 C45 76 47 76 50 76 C70 76 85 61 85 41 C85 21 70 6 50 6"
          fill="none"
          stroke="url(#iconGradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M65 35 L75 25"
          stroke="url(#iconGradient)"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#181818] rounded-3xl max-w-md w-full p-8 relative">
        {icon || defaultIcon}

        <h2 className="text-2xl font-bold text-white text-center mb-3">
          {title}
        </h2>

        <p className="text-gray-400 text-center mb-8 text-sm leading-relaxed">
          {description}
        </p>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-between bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3.5 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Tiếp tục bằng Instagram
                </div>
                <div className="text-sm font-medium text-white">
                  huydarealest
                </div>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-500 group-hover:text-gray-400 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button className="w-full text-sm text-gray-400 hover:text-gray-300 py-2 transition-colors">
            Đăng nhập bằng tên người dùng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
