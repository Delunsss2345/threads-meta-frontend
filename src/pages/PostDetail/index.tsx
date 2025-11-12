import Comment from "@/components/Comment";
import { Card, CardContent } from "@/components/ui/card";
import Header from "./Header";
import EngagementStats from "./Interacter";
import QuoteCard from "./Quote";

const PostDetail = () => {
  const comments = [
    {
      username: "deset.healing",
      timeAgo: "19 giờ",
      content:
        "Nếu tối nay bạn thấy lòng nặng hơn thường ngày, suy nghĩ cứ chạy hoài không dừng thì đó không phải điềm xấu mà là dấu hiệu năng lượng bên trong đang muốn bạn chậm lại chính mình, những lúc tâm đạo động chính là lúc mệnh đang dịch chuyển sang một nhịp mới, cảm xúc trôi sút để bảo chứng. Bạn cứ thở chậm một nhịp, để lòng nói hết điều cần nói.",
      likes: 117,
      replies: 1,
      avatarColor: "bg-red-800",
    },
    {
      username: "tramtram_gada",
      timeAgo: "7 giờ",
      content: "Xin cảm ơn và đón nhận thông điệp a",
      likes: 0,
      replies: 0,
      avatarColor: "bg-gray-400",
    },
    {
      username: "ling_xbabyy",
      timeAgo: "23 giờ",
      content: "Manifest",
      likes: 19,
      replies: 1,
      avatarColor: "bg-gray-600",
    },
    {
      username: "maanh.377",
      timeAgo: "1 giờ",
      content: "Ai ngủ đây hay bị ngứa người thì mua ngay em này nhé",
      likes: 0,
      replies: 0,
      avatarColor: "bg-gray-500",
      hasLink: true,
      link: "s.shopee.vn/6VEz8",
    },
  ];

  return (
    <>
      <Card className="border-0 shadow-none bg-primary-foreground ">
        <CardContent className="p-4">
          <Header username="lochaycuol_" timeAgo="1 ngày" hasTranslate={true} />

          <QuoteCard
            title="Thông điệp ngẫu nhiên:"
            content="Bạn sắp được nhận lại những gì xứng đang thuộc về bạn."
          />

          <EngagementStats likes={14} comments={63} reposts={12} shares={81} />

          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Hàng đầu</span>
            <span className="text-blue-500">Xem hoạt động →</span>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-2xl mx-auto">
        {comments.map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    </>
  );
};

export default PostDetail;
