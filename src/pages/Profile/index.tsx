import AvatarGroup from "@/components/common/AvatarGroup";
import { VerifiedIcon } from "@/components/common/Icon/VerifiedIcon";
import ScrollTop from "@/components/common/ScrollTop";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/hooks"; // <-- thêm
import { getRepost } from "@/features/post";
import { useModal } from "@/hooks/use-modal";
import type { AppDispatch } from "@/types/redux";
import { BarChart3, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileMedia from "./ProfileMedia";
import ProfileReplies from "./ProfileReplies";
import ProfileReposts from "./ProfileReposts";
import ProfileSettings from "./ProfileSettings";
import ProfileThreads from "./ProfileThreads";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(
    window.location.pathname.split("/")[2]
  );
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { show, hide } = useModal();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (activeTab === "reposts") {
      dispatch(getRepost(user.id));
    }
  }, [activeTab]);

  if (!user) return null;

  return (
    <>
      <ScrollTop />
      <div className="h-full px-2 md:px-6 pt-6 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1">
              <h1 className="mb-1 text-2xl font-bold">{user.name}</h1>

              {user.verified && (
                <VerifiedIcon className="size-4 text-[#0095F6]" />
              )}
            </div>

            <p className="text-gray-400">@{user.username}</p>

            {user.bio && (
              <p className="mt-2 text-sm text-muted-foreground">{user.bio}</p>
            )}
          </div>

          <AvatarGroup
            size={20}
            url={user?.avatar_url || ""}
            fallBack={user?.username?.slice(0, 2).toUpperCase()}
            classNameFallback="bg-primary-foreground"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            {user.followers} {t("common.followers")}
          </p>
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

        <Tabs defaultValue={activeTab} className="mb-0!">
          <TabsList className="w-full h-auto mb-0 p-0 bg-transparent border-b rounded-none border-border/60">
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
              text-muted-foreground transition-all duration-150 shadow-none!
              data-[state=active]:text-foreground data-[state=active]:border-b 
              data-[state=active]:border-b-accent-foreground! hover:text-foreground/90"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="">
            <ProfileThreads />
          </TabsContent>

          <TabsContent value="replies">
            <ProfileReplies />
          </TabsContent>

          <TabsContent value="media">
            <ProfileMedia />
          </TabsContent>

          <TabsContent value="reposts">
            <ProfileReposts />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
