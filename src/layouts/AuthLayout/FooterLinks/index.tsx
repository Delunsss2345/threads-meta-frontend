// src/components/login/FooterLinks.tsx
export const FooterLinks = () => {
  return (
    <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-600 space-x-4">
      <span>© 2025</span>
      <a href="#" className="hover:text-gray-400">
        Điều khoản của Threads
      </a>
      <a href="#" className="hover:text-gray-400">
        Chính sách quyền riêng tư
      </a>
      <a href="#" className="hover:text-gray-400">
        Chính sách cookie
      </a>
      <a href="#" className="hover:text-gray-400">
        Báo cáo sự cố
      </a>
    </div>
  );
};
