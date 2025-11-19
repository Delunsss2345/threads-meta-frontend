import FeedTabs from "@/components/FeedTabs";
import Post from "@/components/Post";
import PostForm from "@/components/Post/PostForm";
import SkeletonPost from "@/components/Skeleton/SkeletonPost";
import { getFeeds } from "@/features/post";
import type { PostItem } from "@/types/post";
import type { AppDispatch, RootStateReduce } from "@/types/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: feeds, loading } = useSelector(
    (state: RootStateReduce) => state.posts
  );
  useEffect(() => {
    if (feeds.length === 0) {
      dispatch(getFeeds());
    }
  }, [dispatch]);

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

      {!loading &&
        feeds.map((post: PostItem) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default Home;
