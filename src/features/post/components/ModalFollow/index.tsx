import AvatarGroup from "@/components/common/AvatarGroup";
import ModalPopup from "@/components/common/ModalPopup";
import { Button } from "@/components/ui/button";
import type { MappedUser } from "../type";

interface ModalFollowProps {
  user: MappedUser;
  onClose: () => void;
}

export default function ModalFollow({ user, onClose }: ModalFollowProps) {
  //   const [isFollowing, setIsFollowing] = useState<boolean>(false);
  //   const { t } = useTranslation();
  //   const handleFollowing = async (userId: number) => {
  //     try {
  //       if (isFollowing) {
  //         await userApi.followUser(userId);
  //         setIsFollowing(true);
  //       } else {
  //         await userApi.unFollowUser(userId);
  //         setIsFollowing(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  if (!user) return;
  return (
    <ModalPopup mode="custom" onClose={onClose}>
      <div className="bg-white rounded-2xl w-[360px] max-w-full shadow-xl p-5 relative">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-lg leading-tight">{user?.name}</h2>
            <p className="text-sm text-gray-600">@{user?.username}</p>

            {user?.bio && <p className="text-sm mt-2">{user?.bio}</p>}
          </div>

          <AvatarGroup
            url={user?.avatar_url || "AN"}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* Follow button */}
        <Button
          //   onClick={() => handleFollowing(user.id)}
          className="w-full h-11 mt-6 rounded-xl bg-black text-primary-foreground font-semibold hover:bg-black/90 cursor-pointer"
        >
          {"Theo dõi"}
        </Button>
      </div>
    </ModalPopup>
  );
}
