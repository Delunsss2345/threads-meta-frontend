import AvatarGroup from "@/components/AvatarGroup";
import MenuPopup from "@/components/MenuPopup";
import ModalPopup from "@/components/ModalPopup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Switch } from "@/components/ui/switch";
import { selectAuthState, updateAuthForUser } from "@/features/auth";
import { useAuth } from "@/features/auth/hook";
import { uploadApi } from "@/features/upload/upload-api";
import type { AppDispatch } from "@/types/redux";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Globe, Lock } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import BioEditModal from "../BioEdit";
import LinksEditModal from "../LinksEditModal";
import NameEdit from "../NameEdit";

const ProfileSettings = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { loadingRequest } = useSelector(selectAuthState);

  const [activeModal, setActiveModal] = useState<
    "main" | "name" | "bio" | "links"
  >("main");

  const [previewAvatar, setPreviewAvatar] = useState<File | null>(null);
  const [previewBio, setPreviewBio] = useState<string | null | undefined>(
    user?.bio
  );
  const [previewName, setPreviewName] = useState<string | null | undefined>(
    user?.name
  );

  const [links, setLinks] = useState<{ title: string; url: string }[]>([]);
  const [newLink, setNewLink] = useState<{ title: string; url: string }>({
    title: "",
    url: "",
  });

  if (!user) return null;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = () => {
    inputRef.current?.click();
  };

  const handleSaveBio = () => {
    setActiveModal("main");
  };

  const handleSaveName = () => {
    setActiveModal("main");
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;
    setPreviewAvatar(image);
  };

  const handleAddLink = () => {
    if (!newLink.title.trim() || !newLink.url.trim()) return;
    setLinks((prev) => [...prev, newLink]);
    setNewLink({ title: "", url: "" });
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateLink = (
    index: number,
    field: "title" | "url",
    value: string
  ) => {
    setLinks((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const updateUser = async () => {
    try {
      if (previewAvatar) {
        const avatar = new FormData();
        avatar.append("avatar", previewAvatar);
        await uploadApi.uploadAvatar(avatar);
      }

      const updateUserFormData = new FormData();
      updateUserFormData.append("_method", "PUT");
      if (previewBio !== undefined && previewBio !== null) {
        updateUserFormData.append("bio", previewBio);
      }
      if (previewName !== undefined && previewName !== null) {
        updateUserFormData.append("name", previewName);
      }

      await toast.promise(dispatch(updateAuthForUser(updateUserFormData)), {
        success: "Cập nhập thành công",
        error: "Có lỗi xảy ra",
      });
      onClose();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <ModalPopup onClose={onClose}>
      <Card className="!p-0">
        {activeModal === "main" && (
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-1">
                  {t("profileSettings.name")}
                </h3>
                <div
                  onClick={() => setActiveModal("name")}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  {user.is_private ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                  <span>
                    {previewName || user.name} (@{user.username})
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

            <div
              onClick={() => setActiveModal("bio")}
              className="p-4 cursor-pointer"
            >
              <h3 className="font-semibold mb-1">{t("profileSettings.bio")}</h3>
              <p className="text-sm text-muted-foreground">
                {previewBio ||
                  user?.bio ||
                  "Tài khoản mới tạo làm gì có tiểu sử"}
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
              onClick={() => setActiveModal("links")}
            >
              <span className="font-semibold">
                {t("profileSettings.links")}
              </span>
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
                disabled={loadingRequest}
                onClick={updateUser}
                className="w-full bg-black hover:bg-black/90 text-white h-12 rounded-xl font-semibold place-items-center cursor-pointer"
              >
                {loadingRequest ? <Spinner /> : t("profileSettings.done")}
              </Button>
            </div>
          </CardContent>
        )}

        {activeModal === "bio" && (
          <BioEditModal
            previewBio={previewBio || null}
            bioText={user.bio}
            setBioText={setPreviewBio}
            handleSaveBio={handleSaveBio}
            setActiveModal={setActiveModal}
          />
        )}

        {activeModal === "name" && (
          <NameEdit
            nameText={previewName ?? user.username}
            setNameText={setPreviewName}
            handleSaveName={handleSaveName}
            setActiveModal={setActiveModal}
          />
        )}

        {activeModal === "links" && (
          <LinksEditModal
            links={links}
            newLink={newLink}
            setNewLink={setNewLink}
            handleAddLink={handleAddLink}
            handleRemoveLink={handleRemoveLink}
            handleUpdateLink={handleUpdateLink}
            setActiveModal={setActiveModal}
          />
        )}
      </Card>
    </ModalPopup>
  );
};

export default ProfileSettings;
