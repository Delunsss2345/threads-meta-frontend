import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Instagram, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProfileDetail = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>("threads");
  return (
    <div className="px-6 py-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hoàng Phước</h1>
            <p className="text-muted-foreground">hwanz_17</p>
          </div>

          <img
            src="/your-avatar.png"
            className="w-12 h-12 rounded-full object-cover"
            alt="avatar"
          />
        </div>

        <div className="space-y-1">
          <p>🎶🌹</p>
          <p className="text-sm">
            Nơi trái tim có thể sẽ được chữa lành hoặc vỡ tan….
            <br />
            Mình thích hát và nếu có thể mình sẽ chữa lành cảm xúc của bạn bằng
            âm nhạc.
          </p>

          <div className="flex gap-2 flex-wrap pt-2">
            <span className="px-3 py-1 rounded-full bg-accent text-sm">
              guitar
            </span>
            <span className="px-3 py-1 rounded-full bg-accent text-sm">
              hát linh tinh
            </span>
            <span className="px-3 py-1 rounded-full bg-accent text-sm">
              suymotchut
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">1.105 người theo dõi</p>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Instagram className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1">Theo dõi</Button>
          <Button variant="outline" className="flex-1">
            Nhắc đến
          </Button>
        </div>

        <Tabs defaultValue={active} className="mb-4">
          <TabsList className="w-full h-auto p-0 bg-transparent border-b rounded-none border-border/60">
            {[
              { value: "thread", label: t("profile.thread") },
              { value: "replies", label: t("profile.threadReplies") },
              { value: "media", label: t("profile.mediaFiles") },
              { value: "reposts", label: t("common.reposts") },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onClick={() => setActive(tab.value)}
                className="flex-1 py-2 text-sm font-medium border-0 rounded-none 
                text-muted-foreground transition-all duration-150 !shadow-none
                data-[state=active]:text-foreground data-[state=active]:border-b-[1px] 
                data-[state=active]:!border-b-accent-foreground hover:text-foreground/90"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Đã ghim</p>

            <div className="flex gap-3">
              <img src="/avatar.png" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold">
                  hwanz_17{" "}
                  <span className="text-sm text-muted-foreground">4 ngày</span>
                </p>
                <p>Giá duyên trời đừng cho 2 chúng ta gặp được nhau….</p>

                <div className="mt-3">
                  <div className="rounded-lg bg-accent/40 p-4 flex items-center gap-3">
                    <Play className="w-5 h-5" />
                    <div className="flex-1 h-1 bg-muted rounded-full" />
                  </div>
                </div>

                <div className="flex gap-6 text-sm pt-2 text-muted-foreground">
                  <span>582</span>
                  <span>40</span>
                  <span>57</span>
                  <span>14</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <img src="/avatar.png" className="w-10 h-10 rounded-full" />

            <div className="flex-1">
              <p className="font-semibold">
                hwanz_17{" "}
                <span className="text-sm text-muted-foreground">12 phút</span>
              </p>
              <p>Từ ngày mình chia tay….</p>

              <div className="mt-3">
                <div className="rounded-lg bg-accent/40 p-4 flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  <div className="flex-1 h-1 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <img src="/avatar.png" className="w-10 h-10 rounded-full" />

            <div className="flex-1">
              <p className="font-semibold">
                hwanz_17{" "}
                <span className="text-sm text-muted-foreground">35 phút</span>
              </p>
              <p>Đừng vì anh mà khóc….</p>

              <div className="mt-3">
                <div className="rounded-lg bg-accent/40 p-4 flex items-center gap-3">
                  <Play className="w-5 h-5" />
                  <div className="flex-1 h-1 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileDetail;
