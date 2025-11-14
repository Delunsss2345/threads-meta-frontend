import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ExternalLinkItem from "@/layouts/SettingLayout/ItemSetting/ExtraItem";
import MenuItem from "@/layouts/SettingLayout/ItemSetting/MenuSettings";

const Account = () => {
  return (
    <>
      <Card className="p-0 border-none shadow-none gap-1">
        <div className="space-y-1">
          <MenuItem text="Nội dung nhạy cảm" />
          <MenuItem text="Nội dung mang tính chính trị" />
          <MenuItem text="Quyền trên trang web" />
          <MenuItem text="Vô hiệu hóa hoặc xóa trang cá nhân" />
          <MenuItem
            text="Chia sẻ lên mạng xã hội phi tập trung"
            badge={
              <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                BETA
              </span>
            }
          />
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="font-semibold mb-2">Cài đặt khác cho tài khoản</h3>
          <p className="text-sm text-gray-500 mb-4">
            Một số cài đặt (chẳng hạn như tên người dùng và mật khẩu) sẽ áp dụng
            cho cả Threads lẫn Instagram và có thể quản lý trên Instagram.
          </p>
          <div className="space-y-1">
            <ExternalLinkItem text="Thông tin cá nhân" />
            <ExternalLinkItem text="Bảo mật" />
            <ExternalLinkItem text="Tải thông tin của bạn xuống" />
            <ExternalLinkItem text="Chuyển thông tin của bạn" />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Account;
