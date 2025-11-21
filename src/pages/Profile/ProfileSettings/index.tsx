import AvatarGroup from "@/components/AvatarGroup";
import MenuPopup from "@/components/MenuPopup";
import ModalPopup from "@/components/ModalPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/features/auth/hook";
import { uploadApi } from "@/features/upload/upload-api";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Globe, Lock } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const ProfileSettings = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [previewAvatar, setPreviewAvatar] = useState<File | null>(null);
  if (!user) return null;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;
    setPreviewAvatar(image);
  };

  const updateUser = async () => {
    if (!previewAvatar) return;
    try {
      const avatar = new FormData();
      avatar.append("avatar", previewAvatar || "");
      const res = await uploadApi.uploadAvatar(avatar || "");
      console.log(res);
      toast.success("Thay đổi ảnh đại diện thành công");
      onClose();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <ModalPopup onClose={onClose}>
      <Card className="!p-0">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                {t("profileSettings.name")}
              </h3>
              <div className="flex items-center gap-2 text-sm">
                {user.is_private ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Globe className="w-4 h-4" />
                )}
                <span>
                  {user.name} (@{user.username})
                </span>
              </div>
            </div>
            <input
              onChange={handleChangeImage}
              ref={inputRef}
              accept="image/*"
              type="file"
              className="hidden"
            />
            <MenuPopup
              className={
                "hover:!bg-transparent !p-0 size-14 cursor-pointer border rounded-full"
              }
              mode="long"
              buttonActive={
                <AvatarGroup
                  size={12}
                  url={
                    (previewAvatar && URL.createObjectURL(previewAvatar)) ||
                    user?.avatar_url ||
                    ""
                  }
                  fallBack={user?.username?.slice(0, 2).toUpperCase()}
                  classNameFallback="bg-primary-foreground"
                />
              }
              motionProps={{
                initial: {
                  opacity: 0,
                  x: 0,
                },
                animate: {
                  opacity: 1,
                  x: 0,
                },
                exit: {
                  opacity: 0,
                  x: 0,
                },
              }}
              customPopup="-translate-x-1/2"
            >
              <DropdownMenuItem
                onClick={handleUploadFile}
                className="text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <span>Tải ảnh lên</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                <span className="text-red-500">Gỡ ảnh hiện tại</span>
              </DropdownMenuItem>
            </MenuPopup>
          </div>

          <Separator />

          <div className="p-4">
            <h3 className="font-semibold mb-1">{t("profileSettings.bio")}</h3>
            <p className="text-sm text-muted-foreground">
              {user?.bio ?? "Tài khoản mới tạo làm gì có tiểu sử"}
            </p>
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-none font-normal"
          >
            <div>
              <h3 className="font-semibold text-left">
                {t("profileSettings.interests")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("profileSettings.addInterests")}
              </p>
            </div>
          </Button>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-none font-normal"
          >
            <span className="font-semibold">{t("profileSettings.links")}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Button>

          <Separator />

          <div className="flex items-start justify-between p-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                {t("profileSettings.showInstagramBadge")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("profileSettings.showInstagramBadgeDesc")}
              </p>
            </div>
            <Switch defaultChecked className="ml-4" />
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 rounded-none font-normal"
          >
            <div className="flex-1 text-left">
              <h3 className="font-semibold mb-1">
                {t("profileSettings.profilePrivacy")}
              </h3>
              <p className="text-sm text-muted-foreground whitespace-break-spaces">
                {t("profileSettings.profilePrivacyDesc")}
              </p>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-muted-foreground">
                {user.is_private
                  ? t("profileSettings.private")
                  : t("profileSettings.public")}
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Button>

          <Separator />

          <div className="p-4">
            <Button
              onClick={updateUser}
              className="w-full bg-black hover:bg-black/90 text-white h-12 rounded-xl font-semibold"
            >
              {t("profileSettings.done")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </ModalPopup>
  );
};

export default ProfileSettings;
