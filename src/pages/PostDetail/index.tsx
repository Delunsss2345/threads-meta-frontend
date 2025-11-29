import LoadingFetch from "@/components/common/LoadingFetch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getReplies, getSinglePost, selectPostsState } from "@/features/post";
import Post from "@/features/post/components";
import { mapPost } from "@/features/post/map";
import type { PostItem, ReplyData } from "@/types/post";
import type { AppDispatch } from "@/types/redux";
import { ChevronDown, ChevronRight } from "lucide-react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import CommentItem from "./CommentItem";

const PostDetail = () => {
  const { id } = useParams();
  const postId = Number(id);

  const location = useLocation();
  const isQuoteClick = location.state?.quoteClick === true;

  const {
    items: posts,
    loadingRequest,
    replies,
    singlePost,
    error,
  } = useSelector(selectPostsState);

  const dispatch = useDispatch<AppDispatch>();
  let postDetail = null;
  if (!isQuoteClick) {
    postDetail = posts.find((post: PostItem) => post.id === postId);
  }

  useEffect(() => {
    if (!id) return;

    if (isQuoteClick) {
      dispatch(getSinglePost(postId));
    } else if (!postDetail) {
      dispatch(getSinglePost(postId));
    }

    dispatch(getReplies(postId));
  }, [id, postId, dispatch, postDetail, isQuoteClick]);

  if (!id || isNaN(postId) || error) return <NotFound />;
  if (!postDetail && !singlePost) return <LoadingFetch />;

  return (
    <div className="px-6 py-2">
      <Card className="border-0 shadow-none bg-primary-foreground rounded-none">
        <CardContent className="space-y-3 p-0!">
          <Post mode="detail" post={mapPost(postDetail ?? singlePost)} />

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
