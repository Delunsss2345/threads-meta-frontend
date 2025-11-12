import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Props {
  username: string;
  timeAgo: string;
  hasTranslate?: boolean;
}

const Header = ({ username, timeAgo, hasTranslate = false }: Props) => (
  <div className="flex items-start justify-between mb-3 bg-primary-foreground">
    <div className="flex items-center gap-3">
      <Avatar className="w-10 h-10 bg-red-900">
        <AvatarFallback className="font-bold text-white bg-red-900">
          {username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{username}</span>
          <span className="text-sm text-gray-500">{timeAgo}</span>
        </div>
        {hasTranslate && (
          <p className="text-sm text-gray-600">
            Thông điệp ngẫu nhiên: <span className="text-blue-500">Dịch</span>
          </p>
        )}
      </div>
    </div>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="w-5 h-5" />
    </Button>
  </div>
);
export default Header;
