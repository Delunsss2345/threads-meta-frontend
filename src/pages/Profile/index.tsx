import AvatarGroup from "@/components/AvatarGroup";
import Post from "@/components/Post";
import PostForm from "@/components/Post/PostForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/hook"; // <-- thêm
import { getRepost, selectPostsState } from "@/features/post";
import { useModal } from "@/hooks/use-modal";
import type { PostItem } from "@/types/post";
import type { AppDispatch } from "@/types/redux";
import {
  BarChart3,
  Heart,
  Instagram,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardStepupProfile from "./CardStepupProfile";
import ProfileSettings from "./ProfileSettings";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(
    window.location.pathname.split("/")[2]
  );
  const dispatch = useDispatch<AppDispatch>();
  const { reposts, loading } = useSelector(selectPostsState);
  const { t } = useTranslation();
  const { show, hide } = useModal();
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) return null;
  useEffect(() => {
    if (activeTab === "reposts") {
      dispatch(getRepost(user.id));
    }
  }, [activeTab]);
  return (
    <>
      <div className="h-full px-6 pt-6 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400">{user.username}</p>
          </div>

          <AvatarGroup
            size={20}
            url={user?.avatar_url || ""}
            fallBack={user?.username?.slice(0, 2).toUpperCase()}
            classNameFallback="bg-primary-foreground"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">0 {t("common.followers")}</p>
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="transition-colors text-muted-foreground hover:text-foreground"
            >
              <BarChart3 className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="transition-colors text-muted-foreground hover:text-foreground"
            >
              <Instagram className="size-6" />
            </Button>
          </div>
        </div>

        <Button
          onClick={() => show(<ProfileSettings onClose={() => hide()} />)}
          variant="outline"
          className="w-full mb-6"
        >
          {t("profile.editProfile")}
        </Button>

        <Tabs defaultValue={activeTab} className="mb-4">
          <TabsList className="w-full h-auto p-0 bg-transparent border-b rounded-none border-border/60">
            {[
              { value: "", label: t("profile.thread") },
              { value: "replies", label: t("profile.threadReplies") },
              { value: "media", label: t("profile.mediaFiles") },
              { value: "reposts", label: t("common.reposts") },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  if (tab.value) {
                    navigate(`/profile/${tab.value}`);
                  } else {
                    navigate(`/profile`);
                  }
                }}
                className="flex-1 py-2 text-sm font-medium border-0 rounded-none 
        text-muted-foreground transition-all duration-150 !shadow-none
        data-[state=active]:text-foreground data-[state=active]:border-b-[1px] 
        data-[state=active]:!border-b-accent-foreground hover:text-foreground/90"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="">
            <PostForm />

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {t("profile.completeProfile")}
                </h2>
                <span className="text-gray-400">
                  {t("profile.remaining")} 2
                </span>
              </div>

              <CardStepupProfile />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Star className="w-5 h-5 text-gray-500" />
              <span className="text-gray-400">{t("profile.firstThread")}</span>
            </div>

            <div className="flex gap-3">
              <AvatarGroup
                size={8}
                url={user?.avatar_url || ""}
                fallBack={user?.username?.slice(0, 2).toUpperCase()}
                classNameFallback="bg-primary-foreground"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{user.username}</span>
                  <span className="text-sm text-muted-foreground">1 phút</span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 ml-auto text-muted-foreground hover:text-foreground"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>

                <p className="mb-4 text-foreground">a</p>

                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-foreground"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-foreground"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-foreground"
                  >
                    <Repeat2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-foreground"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="replies">
            <div className="text-center text-gray-400 py-10"></div>
          </TabsContent>

          <TabsContent value="media">
            <div className="text-center text-gray-400 py-10"></div>
          </TabsContent>

          <TabsContent value="reposts">
            <div className="text-center place-items-center text-gray-400 py-10">
              {loading ? (
                <Spinner />
              ) : (
                reposts.map((repost: PostItem) => (
                  <Post key={repost.id} post={repost.original_post} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
