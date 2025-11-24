import LoadingFetch from "@/components/LoadingFetch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getReplies, selectPostsState } from "@/features/post";
import type { PostItem, ReplyData } from "@/types/post";
import type { AppDispatch } from "@/types/redux";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import CommentItem from "./CommentItem";
import Header from "./Header";
import EngagementStats from "./Interacter";
import QuoteCard from "./QuoteCard";

const PostDetail = () => {
  const { id } = useParams();

  const postId = Number(id);
  const {
    items: posts,
    loadingRequest,
    replies,
  } = useSelector(selectPostsState);
  const dispatch = useDispatch<AppDispatch>();

  const postDetail = posts.find((post: PostItem) => post.id === postId);

  useEffect(() => {
    if (id) dispatch(getReplies(postId));
  }, [id, postId, dispatch]);

  if (!id) return <NotFound />;
  if (!postDetail) return null;

  return (
    <div className="px-6 py-2">
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

      <div>
        {loadingRequest ? (
          <LoadingFetch />
        ) : (
          replies.map((reply: ReplyData) => (
            <CommentItem
              key={reply.id}
              username={reply.user.username}
              timeAgo={reply.updated_at}
              avatarUrl={reply.user?.avatar_url}
              content={reply.content}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PostDetail;
