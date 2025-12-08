import SkeletonPost from "@/components/common/Skeleton/SkeletonPost";
import { useAuth } from "@/features/auth/hooks";
import {
  getFeedsByFollowing,
  loadMoreFeedsByFollowing,
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

import LoadingFetch from "@/components/common/LoadingFetch";
import InfiniteList from "@/features/post/components/InfiniteList";
import { KeepAlive } from "react-activation";

const Following = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    itemsFollowing: feeds,
    paginationFollowing,
    continuePageFollowing,
    loaded,
  } = useSelector(selectPostsState);

  useEffect(() => {
    dispatch(getFeedsByFollowing());
  }, [loaded, dispatch]);

  const handleNavigateToDetail = (id: number, username: string) => {
    if (username) {
      navigate(`/${username}/post/${id}`);
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
          dispatch(
            loadMoreFeedsByFollowing(paginationFollowing.current_page + 1)
          )
        }
        contentNotFoundItem="Hết bài viết"
        continuePage={continuePageFollowing}
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

export default Following;
