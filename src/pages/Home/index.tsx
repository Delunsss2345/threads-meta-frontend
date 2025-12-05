import SkeletonPost from "@/components/common/Skeleton/SkeletonPost";
import { useAuth } from "@/features/auth/hooks";
import {
  getFeeds,
  loadMoreThreads,
  resetPosts,
  selectPostsState,
} from "@/features/post";
import Post from "@/features/post/components";
import FeedTabs from "@/features/post/components/FeedTabs";
import PostForm from "@/features/post/components/PostForm";
import { mapPost } from "@/features/post/map";
import type { PostItem } from "@/types/post";
import type { AppDispatch } from "@/types/redux";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import InfiniteList from "@/features/post/components/InfiniteList";
import { KeepAlive } from "react-activation";
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
    if (!loaded) {
      dispatch(resetPosts());
      dispatch(getFeeds());
    }
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
          <Post
            onClick={() => handleNavigateToDetail(post.id, post.user.username)}
            post={mapPost(post)}
          />
        )}
      />
    </KeepAlive>
  );
};

export default Home;
