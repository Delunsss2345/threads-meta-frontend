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

import Footer from "@/components/common/ModalPopup/Footer";
import Header from "@/components/common/ModalPopup/Header";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import UserPostForm from "@/features/post/components/UserPostForm";
import { useCreatePost } from "@/hooks/use-create-post";
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
  const {
    content,
    setContent,
    previewImage,
    loadingPosts,
    setPreviewImage,
    handlePost,
  } = useCreatePost(() => setOpenSheet(false));
  const { t } = useTranslation();

  if (!isMobile) return null;

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isAuth && !isAuthenticated) {
      show(
        <AuthSocialModal
          onClose={hide}
          onContinue={hide}
          title="Login to continue"
          description="Join Threads to share thoughts..."
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
          description="Join Threads to share thoughts..."
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
              headerText={t("post.newThread")}
              onClose={() => setOpenSheet(false)}
            />
          </SheetHeader>

          <UserPostForm
            user={user}
            setContent={setContent}
            setPreviewImage={setPreviewImage}
            t={t}
          />

          <Footer
            content={content}
            loading={loadingPosts}
            onSubmit={handlePost}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavMobile;
