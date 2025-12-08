import SkeletonPost from "@/components/common/Skeleton/SkeletonPost";
import { useAuth } from "@/features/auth/hooks";
import { getFeeds, loadMoreThreads, selectPostsState } from "@/features/post";
import type { PostItem } from "@/types/post";
import type { AppDispatch } from "@/types/redux";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingFetch from "@/components/common/LoadingFetch";
import FeedTabs from "@/components/post/FeedTabs";
import InfiniteList from "@/components/post/InfiniteList";
import PostCard from "@/components/post/PostCard";
import PostForm from "@/components/post/PostForm";
import { KeepAlive } from "react-activation";
import { mapPost } from "@/features/post/map";
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    items: feeds,
    pagination,
    continuePage,
    loaded,
  } = useSelector(selectPostsState);

  useEffect(() => {
    dispatch(getFeeds());
  }, [loaded, dispatch]);

  const handleNavigateToDetail = (id: number, username: string) => {
    if (username) {
      navigate(`${username}/post/${id}`);
    } else {
      navigate(`/post/${id}`);
    }
  };
  const { user } = useAuth();

  const filteredFeeds = useMemo(() => {
    return feeds.filter(
      (post: PostItem) => post.user.username !== user?.username
    );
  }, [feeds, user?.username]);

  if (!loaded) {
    return <LoadingFetch />;
  }
  return (
    <KeepAlive>
      <div className="hidden md:block">
        <PostForm />
      </div>

      <div className="block md:hidden">
        <FeedTabs />
      </div>

      <InfiniteList
        data={filteredFeeds}
        endReached={() =>
          dispatch(loadMoreThreads(pagination.current_page + 1))
        }
        contentNotFoundItem="Hết bài viết"
        continuePage={continuePage}
        skeleton={<SkeletonPost />}
        itemContent={(index, post: PostItem) => (
          <PostCard
            onClick={() => handleNavigateToDetail(post.id, post.user.username)}
            post={mapPost(post)}
          />
        )}
      />
    </KeepAlive>
  );
};

export default Home;
