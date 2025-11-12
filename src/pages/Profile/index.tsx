import AvatarGroup from "@/components/AvatarGroup";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CardStepupProfile from "./CardStepupProfile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("thread");
  const { t } = useTranslation();

  return (
    <div className="px-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Phạm Thanh Huy</h1>
          <p className="text-gray-400">huydarealest</p>
        </div>
        <AvatarGroup
          size={20}
          url="htt"
          fallBack="PH"
          classNameFallback="bg-primary-foreground"
        />
      </div>

      {/* Followers Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400">0 {t("common.followers")}</p>
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <BarChart3 className="size-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="size-6" />
          </Button>
        </div>
      </div>

      <Button variant="outline" className="w-full mb-6">
        {t("profile.editProfile")}
      </Button>

      <Tabs defaultValue={activeTab} className="mb-6">
        <TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0">
          <TabsTrigger
            value="thread"
            className="flex-1 py-3 border-0 rounded-none text-muted-foreground transition-colors data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground"
          >
            {t("profile.thread")}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setActiveTab("replies")}
            value="replies"
            className="flex-1 py-3 border-0 rounded-none text-muted-foreground transition-colors data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground"
          >
            {t("profile.threadReplies")}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setActiveTab("media")}
            value="media"
            className="flex-1 py-3 border-0 rounded-none text-muted-foreground transition-colors data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground"
          >
            {t("profile.mediaFiles")}
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setActiveTab("reposts")}
            value="reposts"
            className="flex-1 py-3 border-0 rounded-none text-muted-foreground transition-colors data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground"
          >
            {t("common.reposts")}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-3 items-center mb-8 pb-6 border-b border-border">
        <AvatarGroup
          size={10}
          url="htt"
          fallBack="PH"
          classNameFallback="bg-primary-foreground"
        />
        <Input
          type="text"
          placeholder={t("profile.whatsNew")}
          className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button variant="outline">{t("common.post")}</Button>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {t("profile.completeProfile")}
          </h2>
          <span className="text-gray-400">{t("profile.remaining")} 2</span>
        </div>

        <CardStepupProfile />
      </div>

      {/* First Thread */}
      <div className="flex items-center gap-3 mb-4">
        <Star className="w-5 h-5 text-gray-500" />
        <span className="text-gray-400">{t("profile.firstThread")}</span>
      </div>

      {/* Thread Post */}
      <div className="flex gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
            PH
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">huydarealest</span>
            <span className="text-muted-foreground text-sm">1 phút</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-muted-foreground hover:text-foreground h-8 w-8"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
          <p className="mb-4 text-foreground">a</p>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Repeat2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
