import SkeletonPost from "@/components/common/Skeleton/SkeletonPost";
import { useAuth } from "@/features/auth/hooks";
import { getFeeds, loadMoreThreads, selectPostsState } from "@/features/post";
import Post from "@/features/post/components";
import FeedTabs from "@/features/post/components/FeedTabs";
import PostForm from "@/features/post/components/PostForm";
import { mapPost } from "@/features/post/map";
import type { PostItem } from "@/types/post";
import type { AppDispatch } from "@/types/redux";

import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { KeepAlive } from "react-activation";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);

  // const initialState = useMemo(() => {
  //   const saved = sessionStorage.getItem("feed_state");
  //   return saved ? (JSON.parse(saved) as StateSnapshot) : undefined;
  // }, []);
  const navigate = useNavigate();
  const {
    items: feeds,
    pagination,
    continuePage,
    loaded,
  } = useSelector(selectPostsState);

  useEffect(() => {
    if (!loaded) {
      dispatch(getFeeds());
    }
  }, [loaded, dispatch]);

  const handleNavigateToDetail = (id: number, username: string) => {
    // const state = virtuosoRef.current?.getState();
    // console.log(state);
    // if (state) {
    //   sessionStorage.setItem("feed_state", JSON.stringify(state));
    // }
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

      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        data={filteredFeeds}
        endReached={() =>
          dispatch(loadMoreThreads(pagination.current_page + 1))
        }
        itemContent={(index, post: PostItem) => (
          <Post
            onClick={() => handleNavigateToDetail(post.id, post.user.username)}
            key={index}
            post={mapPost(post)}
          />
        )}
        // computeItemKey={(index, post) => post.id}
        followOutput={false}
        components={{
          Footer: () =>
            !continuePage ? (
              <div className="text-center py-4 text-muted-foreground">
                Không còn bài viết
              </div>
            ) : (
              <SkeletonPost />
            ),
        }}
      />
    </KeepAlive>
  );
};

export default Home;
