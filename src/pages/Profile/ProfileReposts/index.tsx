import Post from "@/components/Post";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { selectPostsState } from "@/features/post";
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
        reposts.map((repost: PostItem) => (
          <Post mode="repost" key={repost.id} post={repost.original_post} />
        ))
      )}
    </div>
  );
};

export default ProfileReposts;
