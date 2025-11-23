import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { selectPostsItems } from "@/features/post";
import type { PostItem } from "@/types/post";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentItem from "./CommentItem";
import Header from "./Header";
import EngagementStats from "./Interacter";
import QuoteCard from "./QuoteCard";

const PostDetail = () => {
  const { id } = useParams();
  const postId = Number(id);
  const posts = useSelector(selectPostsItems);
  const postDetail = posts.find((post: PostItem) => post.id === postId);
  if (!postDetail) return null;
  console.log(postDetail);

  return (
    <div className="px-6 py-2">
      {/* Post */}
      <Card className="border-0 shadow-none bg-primary-foreground rounded-none">
        <CardContent className="space-y-3 p-0!">
          <Header
            username={postDetail.user.username}
            timeAgo={postDetail.time_ago}
            avatarUrl={postDetail.user.avatar_url}
            hasTranslate={true}
          />

          <QuoteCard content={postDetail.content} />
          <EngagementStats
            likes={postDetail.likes_count}
            comments={postDetail.replies_count}
            reposts={postDetail.quotes_count}
            shares={postDetail.shares_count}
          />

          <Separator />
          {/* Top section */}
          <div className="flex items-center justify-between text-sm pt-2">
            <button className="flex items-center gap-1 font-semibold">
              Hàng đầu <ChevronDown size={13} />
            </button>
            <button className="flex items-center gap-1 text-muted-foreground text-sm">
              <p>Xem hoạt động</p> <ChevronRight size={13} />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Comments list container */}
      <div>
        <CommentItem
          username="hadihajhasan21"
          timeAgo="25 phút"
          content="Hiz"
          avatarUrl="/your-avatar.png"
          likes={1}
          sends={1}
        />
      </div>
    </div>
  );
};

export default PostDetail;
