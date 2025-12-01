import FavoriteIcon from "@/components/common/Icon/FavoriteIcon";
import HomeIcon from "@/components/common/Icon/HomeIcon";
import SubtractIcon from "@/components/common/Icon/SubtractIcon";
import UserIcon from "@/components/common/Icon/UserIcon";
import { Button } from "@/components/ui/button";
import AuthSocialModal from "@/features/auth/components/LoginModal";
import { useAuth } from "@/features/auth/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { useModal } from "@/hooks/use-modal";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AvatarGroup from "@/components/common/AvatarGroup";
import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import UserAction from "@/features/user/components/UserAction";
import { useTranslation } from "react-i18next";

const navItems = [
  { key: "home", icon: <HomeIcon size={26} />, link: "/" },
  { key: "search", icon: <SearchIcon size={26} />, link: "/search" },
  { key: "write", icon: <SubtractIcon size={20} />, isAuth: true },
  {
    key: "activity",
    icon: <FavoriteIcon size={26} />,
    link: "/activity",
    isAuth: true,
  },
  {
    key: "profile",
    icon: <UserIcon size={26} />,
    link: "/profile",
    isAuth: true,
  },
];

const NavMobile: React.FC = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [openSheet, setOpenSheet] = useState(false);

  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isAuthenticated, user } = useAuth();
  const { show, hide } = useModal();
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<File[] | null>(null);
  const { t } = useTranslation();
  if (!isMobile) return null;

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isAuth && !isAuthenticated) {
      show(
        <AuthSocialModal
          onClose={hide}
          onContinue={hide}
          title="Login to continue"
          description="Join Threads to share thoughts, find out what's going on, follow your people and more."
        />
      );
      return;
    }

    setActiveNav(item.key);
    if (item.link) navigate(item.link);
  };

  const handleWriteClick = () => {
    if (!isAuthenticated) {
      show(
        <AuthSocialModal
          onClose={hide}
          onContinue={hide}
          title="Login to continue"
          description="Join Threads to share thoughts, find out what's going on, follow your people and more."
        />
      );
      return;
    }

    setOpenSheet(true);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Button
            key={item.key}
            variant="ghost"
            size="icon"
            className={`rounded-full transition ${
              activeNav === item.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={
              item.key === "write"
                ? handleWriteClick
                : () => handleNavClick(item)
            }
          >
            {item.icon}
          </Button>
        ))}
      </nav>

      <Sheet modal={false} open={openSheet}>
        <SheetContent side="bottom" className="h-[100vh]">
          <SheetHeader className="p-0">
            <Header
              className="p-10"
              headerText="Threads mới"
              onClose={() => setOpenSheet(!openSheet)}
            />
          </SheetHeader>

          <CardContent className="p-4 pt-5">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <AvatarGroup
                  size={10}
                  url={user?.avatar_url || ""}
                  fallBack={user?.username?.slice(0, 2).toUpperCase()}
                />

                <div className="w-[2px] flex-1 bg-border my-2 min-h-[40px] rounded-full"></div>

                <AvatarGroup
                  size={5}
                  url={user?.avatar_url || ""}
                  fallBack={user?.username?.slice(0, 2).toUpperCase()}
                />
              </div>

              <div className="flex-1 pt-1 space-y-4 overflow-x-auto">
                <UserAction
                  username={user?.username}
                  onChangeContent={(data: any) => {
                    setContent(data.content);
                    setPreviewImage(data.previewImage);
                  }}
                />
                <div className="min-h-[20px] flex items-center text-muted-foreground/50 text-sm pt-3">
                  {t("post.addToThread")}
                </div>
              </div>
            </div>
          </CardContent>

          <Footer
            content={content}
            // loading={loadingPosts}
            // onSubmit={handlePost}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavMobile;
