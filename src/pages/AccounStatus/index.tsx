import AvatarGroup from "@/components/common/AvatarGroup";
import { Card } from "@/components/ui/card";
import CheckboxMenuItem from "@/layouts/SettingLayout/ItemSetting/CheckMenuItem";

const AccountStatus = () => {
  return (
    <Card className="p-0 border-0 shadow-none gap-1">
      <div className="flex items-center gap-5 mb-4">
        <AvatarGroup size={12} url="th" fallBack="PH" />

        <div>
          <div className="font-semibold">@huydarealest@threads.net</div>
          <div className="text-sm text-gray-600">Phạm Thanh Huy</div>
        </div>
      </div>

      <h3 className="font-semibold mb-1">Hành động chúng tôi đã thực hiện</h3>
      <p className="text-sm text-gray-500 mb-2">
        Xem mọi biện pháp mà Threads đã thực hiện khi trang cá nhân hoặc nội
        dung của bạn không tuân thủ nguyên tắc của chúng tôi.{" "}
        <span className="text-blue-600">Tìm hiểu thêm</span>
      </p>

      <div className="space-y-1">
        <CheckboxMenuItem text="Nội dung đã gỡ" checked={true} />
        <CheckboxMenuItem
          text="Tính năng bạn không sử dụng được"
          checked={true}
        />
      </div>
    </Card>
  );
};

export default AccountStatus;
