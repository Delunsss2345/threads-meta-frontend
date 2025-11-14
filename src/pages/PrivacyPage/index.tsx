import { Card, CardContent } from "@/components/ui/card";
import MenuItem from "@/layouts/SettingLayout/ItemSetting/MenuSettings";
import { EyeOff, Heart, Lock, Shield, User, Users, UserX } from "lucide-react";

const PrivacyPage = () => {
  return (
    <Card className="!p-0 !border-none shadow-none">
      <CardContent className="!px-0 space-y-1">
        <MenuItem
          icon={<Lock className="w-5 h-5" />}
          text="Trang cá nhân riêng tư"
          hasArrow
        />
        <MenuItem
          icon={<Shield className="w-5 h-5" />}
          text="Gắn thẻ và nhắc đến"
          hasArrow
        />
        <MenuItem
          icon={<User className="w-5 h-5" />}
          text="Trạng thái online"
          hasArrow
        />
        <MenuItem
          icon={<Users className="w-5 h-5" />}
          text="Trang cá nhân đã hạn chế"
          hasArrow
        />
        <MenuItem
          icon={<UserX className="w-5 h-5" />}
          text="Trang cá nhân đã chặn"
          hasArrow
        />
        <MenuItem
          icon={<EyeOff className="w-5 h-5" />}
          text="Từ bị ẩn"
          hasArrow
        />
        <MenuItem
          icon={<Heart className="w-5 h-5" />}
          text="Ẩn lượt thích & lượt chia sẻ"
          hasArrow
        />
      </CardContent>
    </Card>
  );
};

export default PrivacyPage;
