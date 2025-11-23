import FeedTabs from "@/components/FeedTabs";
import Post from "@/components/Post";
import PostForm from "@/components/Post/PostForm";
import SkeletonPost from "@/components/Skeleton/SkeletonPost";
import { useAuth } from "@/features/auth/hook";
import { getFeeds, loadMoreThreads, selectPostsState } from "@/features/post";
import type { PostItem } from "@/types/post";
import type { AppDispatch } from "@/types/redux";

import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Virtuoso,
  type StateSnapshot,
  type VirtuosoHandle,
} from "react-virtuoso";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const virtuosoRef = useRef<VirtuosoHandle | null>(null);

  const initialState = useMemo(() => {
    const saved = sessionStorage.getItem("feed_state");
    return saved ? (JSON.parse(saved) as StateSnapshot) : undefined;
  }, []);
  const navigate = useNavigate();
  const {
    items: feeds,
    pagination,
    continuePage,
  } = useSelector(selectPostsState);

  useEffect(() => {
    if (feeds.length === 0) {
      dispatch(getFeeds());
    }
  }, []);

  const handleNavigateToDetail = (id: number) => {
    // const state = virtuosoRef.current?.getState();
    // console.log(state);
    // if (state) {
    //   sessionStorage.setItem("feed_state", JSON.stringify(state));
    // }
    navigate(`/post/${id}`);
  };
  const { user } = useAuth();

  const filteredFeeds = feeds.filter(
    (post) => post.user.username !== user?.username
  );

  return (
    <>
      <div className="hidden md:block">
        <PostForm />
      </div>

      <div className="block md:hidden">
        <FeedTabs />
      </div>

      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        // restoreStateFrom={initialState || undefined}
        data={filteredFeeds}
        endReached={() =>
          dispatch(loadMoreThreads(pagination.current_page + 1))
        }
        itemContent={(index, post: PostItem) => (
          <Post
            onClick={() => handleNavigateToDetail(post.id)}
            key={post.id}
            post={post}
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
    </>
  );
};

export default Home;
