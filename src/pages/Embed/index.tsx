import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSinglePost, selectPostsState } from "@/features/post";
import type { AppDispatch } from "@/types/redux";

import ThreadIconSmall from "@/components/common/Icon/TheardIconSmall";
import LoadingFetch from "@/components/common/LoadingFetch";
import PostCard from "@/components/post/PostCard";
import { mapPost } from "@/features/post/map";
import EmbedLayout from "@/layouts/EmbedLayout";
import NotFound from "../NotFound";

const Embed = () => {
  const { id } = useParams();
  const postId = Number(id);
  const { t } = useTranslation("embed");

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
    <EmbedLayout>
      <PostCard post={mapPost(singlePost)} mode="static" />

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
        {t("viewOnThreads")}
        <div className="size-5">
          <ThreadIconSmall />
        </div>
      </a>
    </EmbedLayout>
  );
};

export default Embed;
