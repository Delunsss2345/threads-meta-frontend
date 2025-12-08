import PostCard from "@/components/post/PostCard";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { selectPostsState } from "@/features/post";
import { mapPost } from "@/features/post/map";
import type { PostItem } from "@/types/post";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileReposts = () => {
  const { reposts, loading } = useSelector(selectPostsState);
  const navigator = useNavigate();
  return (
    <div className="">
      {loading ? (
        <div className="place-items-center mt-5">
          <Spinner />
        </div>
      ) : (
        reposts.map(
          (repost: PostItem) =>
            repost?.original_post && (
              <PostCard
                onClick={() =>
                  navigator(
                    `/${repost.user.username}/post/${repost.original_post_id}`
                  )
                }
                mode="repost"
                key={repost.id}
                post={mapPost(repost.original_post as PostItem)}
              />
            )
        )
      )}
    </div>
  );
};

export default ProfileReposts;
