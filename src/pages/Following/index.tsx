import SkeletonPost from "@/components/common/Skeleton/SkeletonPost";
import { useAuth } from "@/features/auth/hooks";
import { getFeeds, selectPostsState } from "@/features/post";
import FeedTabs from "@/features/post/components/FeedTabs";
import PostForm from "@/features/post/components/PostForm";
import type { AppDispatch } from "@/types/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Following = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: feeds, loading } = useSelector(selectPostsState);
  useEffect(() => {
    if (feeds.length === 0) {
      dispatch(getFeeds());
    }
  }, [dispatch]);

  const { user } = useAuth();

  return (
    <>
      <div className="hidden md:block">
        <PostForm />
      </div>

      <div className="block md:hidden">
        <FeedTabs />
      </div>

      {loading &&
        Array.from({ length: 10 }).map((_, i) => <SkeletonPost key={i} />)}

      {/* {!loading &&
        feeds.map((post: PostItem) => {
          if (post.user.username !== user?.username) {
            return <Post key={post.id} post={post} />;
          }
        })} */}
    </>
  );
};

export default Following;
