export const formatTime = (dateString: string) => {
  const serverTime = Date.parse(dateString);

  const diff = Math.floor((Date.now() - serverTime) / 1000);

  if (diff < 0) return "Vừa xong";
  if (diff < 60) return `${diff} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;

  return `${Math.floor(diff / 86400)} ngày trước`;
};
