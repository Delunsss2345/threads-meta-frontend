import { Card } from "@/components/ui/card";
import ExternalLinkItem from "@/layouts/SettingLayout/ItemSetting/ExtraItem";
import MenuItem from "@/layouts/SettingLayout/ItemSetting/MenuSettings";

const Help = () => {
  return (
    <Card className="p-0 border-none shadow-none gap-1">
      <div className="space-y-1 ">
        <MenuItem text="Trợ giúp về bảo mật và quyền riêng tư" />
        <MenuItem className="border-b-1" text="Yêu cầu hỗ trợ" />
      </div>

      <div className="space-y-1">
        <ExternalLinkItem text="Trung tâm trợ giúp" />
        <ExternalLinkItem text="Chính sách quyền riêng tư của Meta" />
        <ExternalLinkItem text="Điều khoản sử dụng của Meta" />
        <ExternalLinkItem text="Chính sách quyền riêng tư bổ sung của Threads" />
        <ExternalLinkItem text="Điều khoản sử dụng của Threads" />
        <ExternalLinkItem text="Chính sách cookie" />
        <ExternalLinkItem text="Hướng dẫn về mạng xã hội phi tập trung" />
      </div>
    </Card>
  );
};

export default Help;
