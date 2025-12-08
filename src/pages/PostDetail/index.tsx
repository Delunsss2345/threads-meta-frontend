import LoadingFetch from "@/components/common/LoadingFetch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getReplies,
  getSinglePost,
  loadMoreReply,
  resetReplies,
  selectPostsState,
} from "@/features/post";
import { mapPost } from "@/features/post/map";
import type { PostItem, ReplyItem } from "@/types/post";
import type { AppDispatch } from "@/types/redux";
import { ChevronDown, ChevronRight } from "lucide-react";

import ScrollTop from "@/components/common/ScrollTop";
import InfiniteList from "@/components/post/InfiniteList";
import PostCard from "@/components/post/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";
let postDetail = null;

const PostDetail = () => {
  const { id } = useParams();
  const postId = Number(id);
  const location = useLocation();
  const isQuoteClick = location.state?.quoteClick === true;
  const navigator = useNavigate();
  const {
    items: posts,
    replies,
    singlePost,
    continueReplies,
    paginationReplies,
    error,
    loading,
    loadingReplies,
  } = useSelector(selectPostsState);

  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(resetReplies());
    dispatch(getReplies(postId));
  }, [id, postId, dispatch, isQuoteClick]);

  if (!id || isNaN(postId) || error) return <NotFound />;
  if (!postDetail && !singlePost) return <LoadingFetch />;
  if (loading && location?.state?.loading) {
    return <LoadingFetch />;
  }
  return (
    <>
      <ScrollTop />
      <Card className="border-0 shadow-none bg-primary-foreground rounded-none">
        <CardContent className="space-y-3 p-0!">
          <PostCard mode="detail" post={mapPost(postDetail ?? singlePost)} />

          <div className="flex flex-col items-center justify-between text-sm pt-2 px-4 gap-4">
            <Separator />

            {replies.length < 1 ? (
              ""
            ) : (
              <>
                <div className="flex w-full justify-between">
                  <button className="flex items-center gap-1 font-semibold">
                    Hàng đầu <ChevronDown size={13} />
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground text-sm">
                    <p>Xem hoạt động</p> <ChevronRight size={13} />
                  </button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <div>
        {loadingReplies ? (
          <LoadingFetch />
        ) : (
          <InfiniteList
            data={replies}
            continuePage={continueReplies}
            skeleton={<Skeleton />}
            contentNotFoundCheck={false}
            endReached={() =>
              dispatch(
                loadMoreReply({
                  id: postId,
                  page: paginationReplies.current_page + 1,
                })
              )
            }
            itemContent={(index, reply: ReplyItem) => (
              <PostCard
                key={reply.id}
                onClick={() =>
                  navigator(`/${reply.user.username}/post/${reply.id}`, {
                    state: {
                      loading: true,
                    },
                  })
                }
                mode="comment"
                post={mapPost(reply)}
              />
            )}
          />
        )}
      </div>
    </>
  );
};

export default PostDetail;
