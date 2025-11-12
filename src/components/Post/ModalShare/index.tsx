import ModalPopup from "@/components/ModalPopup";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Share } from "lucide-react";

const ModalShare = ({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) => {
  return (
    <ModalPopup onClose={onClose}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=vixw" />
              <AvatarFallback>VX</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">vixw_tx</div>
              <div className="text-xs text-muted-foreground">13 giờ</div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Báo cáo</DropdownMenuItem>
              <DropdownMenuItem>Ẩn bài viết</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-secondary/50 rounded-2xl p-4 mb-4 border">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=urbestblues" />
              <AvatarFallback>UB</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm">urbestblues</span>
          </div>
          <div className="bg-yellow-300 text-black inline-block px-2 py-1 rounded text-sm font-medium">
            ภาษารักเราไม่ตรงกัน
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4"></div>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-background shadow-sm"></div>
            <div className="w-6 h-6 bg-black rounded-full border-2 border-background shadow-sm"></div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="show-numbers" defaultChecked />
            <label
              htmlFor="show-numbers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Hiển thị số liệu
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share className="w-4 h-4" />
            Tự động
          </Button>

          <Button size="sm" className="bg-black hover:bg-black/90">
            Sao chép
          </Button>
        </div>
      </div>
    </ModalPopup>
  );
};

export default ModalShare;
