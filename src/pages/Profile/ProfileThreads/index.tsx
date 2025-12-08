import PostForm from "@/components/post/PostForm";
import { useAuth } from "@/features/auth/hooks";
import { useTranslation } from "react-i18next";
import CardStepupProfile from "../CardStepupProfile";

const ProfileThreads = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  return (
    <>
      <PostForm />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {t("profile.completeProfile")}
          </h2>
          <span className="text-gray-400">{t("profile.remaining")} 2</span>
        </div>

        <CardStepupProfile />
      </div>

      {/* <Virtuoso
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
      /> */}
    </>
  );
};

export default ProfileThreads;
