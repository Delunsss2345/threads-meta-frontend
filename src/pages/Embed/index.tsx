import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSinglePost, selectPostsState } from "@/features/post";
import type { AppDispatch } from "@/types/redux";

import ThreadIconSmall from "@/components/common/Icon/TheardIconSmall";
import LoadingFetch from "@/components/common/LoadingFetch";
import Post from "@/features/post/components";
import { mapPost } from "@/features/post/map";
import NotFound from "../NotFound";

const Embed = () => {
  const { id } = useParams();
  const postId = Number(id);

  const dispatch = useDispatch<AppDispatch>();
  const { singlePost, loadingRequest, error } = useSelector(selectPostsState);

  useEffect(() => {
    if (!id) return;
    dispatch(getSinglePost(postId));
  }, [id, postId, dispatch]);

  if (!id || isNaN(postId) || error) return <NotFound />;
  if (loadingRequest || !singlePost || singlePost.id !== postId)
    return <LoadingFetch />;

  return (
    <div className="relative p-4 border rounded-xl">
      <Post post={mapPost(singlePost)} mode="static" />

      <a
        href={`${import.meta.env.VITE_BASE_URL}/post/${singlePost.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
        
      absolute bottom-4 right-4
      flex items-center gap-2
      px-4 py-2 bg-gray-100 
      rounded-lg shadow-sm
      text-sm font-medium
      hover:bg-gray-200 transition
        translate-y-1/4
      "
      >
        Xem trên Threads
        <div className="size-5">
          <ThreadIconSmall />
        </div>
      </a>
    </div>
  );
};

export default Embed;
