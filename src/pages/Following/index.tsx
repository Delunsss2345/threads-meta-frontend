import SkeletonPost from "@/components/common/Skeleton/SkeletonPost";
import { useAuth } from "@/features/auth/hooks";
import {
  getFeedsByFollowing,
  loadMoreFeedsByFollowing,
  selectPostsState,
} from "@/features/post";
import { mapPost } from "@/features/post/map";
import type { PostItem } from "@/types/post";
import type { AppDispatch } from "@/types/redux";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoadingFetch from "@/components/common/LoadingFetch";
import { KeepAlive } from "react-activation";
import PostForm from "@/components/post/PostForm";
import FeedTabs from "@/components/post/FeedTabs";
import InfiniteList from "@/components/post/InfiniteList";
import PostCard from "@/components/post/PostCard";

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
          <PostCard
            onClick={() => handleNavigateToDetail(post.id, post.user.username)}
            post={mapPost(post)}
          />
        )}
      />
    </KeepAlive>
  );
};

export default Following;
