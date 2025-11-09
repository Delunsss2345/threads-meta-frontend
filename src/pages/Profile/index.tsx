import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import CardStepupProfile from "./CardStepupProfile";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("thread");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Phạm Thanh Huy</h1>
            <p className="text-gray-400">huydarealest</p>
          </div>
          <Avatar className="w-20 h-20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-from from-pink-500 to-red-500 text-white text-xl">
              PH
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Followers Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">0 người theo dõi</p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <BarChart3 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Instagram className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button variant="outline" className="w-full mb-6">
          Chỉnh sửa trang cá nhân
        </Button>

        {/* Tabs */}
        <Tabs defaultValue={activeTab} className="mb-6">
          <TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0">
            <TabsTrigger
              value="thread"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Thread
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab("replies")}
              value="replies"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Thread trả lời
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab("media")}
              value="media"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              File phương tiện
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab("reposts")}
              value="reposts"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:bg-transparent py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Bài đăng lại
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-3 items-center mb-8 pb-6 border-b border-border">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-red-500 text-white">
              PH
            </AvatarFallback>
          </Avatar>
          <Input
            type="text"
            placeholder="Có gì mới?"
            className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button variant="outline">Đăng</Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Hoàn tất trang cá nhân</h2>
            <span className="text-gray-400">Còn 2</span>
          </div>

          <CardStepupProfile />
        </div>

        {/* First Thread */}
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-5 h-5 text-gray-500" />
          <span className="text-gray-400">Thread đầu tiên</span>
        </div>

        {/* Thread Post */}
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-red-500 text-white">
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
                className="text-muted-foreground hover:text-foreground h-8 w-8"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-8 w-8"
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-8 w-8"
              >
                <Repeat2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground h-8 w-8"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
