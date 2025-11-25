import Post from "@/components/Post";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { selectPostsState } from "@/features/post";
import { mapPost } from "@/features/post/map";
import type { PostItem } from "@/types/post";
import { useSelector } from "react-redux";

const ProfileReposts = () => {
  const { reposts, loading } = useSelector(selectPostsState);

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
              <Post
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
