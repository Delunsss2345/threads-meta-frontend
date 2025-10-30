// src/components/login/QRCodeSection.tsx
export const QRCodeSection = () => {
  return (
    <div className="absolute bottom-8 right-8   flex-col items-end gap-4 hidden sm:block">
      <div className="text-xs text-gray-500 mx-auto mb-2">
        Quét để tải ứng dụng
      </div>
      <div className="w-32 h-32 bg-white p-2 rounded-lg">
        <div className="w-full h-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
