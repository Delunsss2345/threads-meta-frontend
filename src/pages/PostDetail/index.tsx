import { Card, CardContent } from "@/components/ui/card";
import type { PostItem } from "@/types/post";
import type { RootState } from "@/types/redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./Header";
import EngagementStats from "./Interacter";
import QuoteCard from "./Quote";

const PostDetail = () => {
  const { id } = useParams();
  const postId = Number(id);

  const postDetail = useSelector((state: RootState) =>
    state.posts.items.find((post: PostItem) => post.id === postId)
  );
  console.log(postDetail);
  if (!postDetail) return null;

  return (
    <>
      <Card className="border-0 shadow-none bg-primary-foreground ">
        <CardContent className="p-4">
          <Header
            content={postDetail.content}
            username={postDetail.user.username}
            timeAgo={postDetail.time_ago}
            avatarUrl={postDetail.user.avatar_url}
            hasTranslate={true}
          />

          <QuoteCard
            title="Thông điệp ngẫu nhiên:"
            content="Bạn sắp được nhận lại những gì xứng đáng thuộc về bạn."
          />

          <EngagementStats
            likes={postDetail.likes_count}
            comments={postDetail.replies_count}
            reposts={postDetail.quotes_count}
            shares={postDetail.shares_count}
          />

          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Hàng đầu</span>
            <span className="text-blue-500">Xem hoạt động →</span>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-2xl mx-auto">{/* để yên comment */}</div>
    </>
  );
};

export default PostDetail;
