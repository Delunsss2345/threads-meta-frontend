import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Layers, MoreHorizontal } from "lucide-react";

const Header = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <CardHeader className="flex flex-row items-center border-b space-y-0 !py-2">
        <div className="flex-1 text-left">
          <Button
            variant="ghost"
            className="h-auto p-0 text-base hover:bg-transparent"
            onClick={onClose}
          >
            Hủy
          </Button>
        </div>

        <div className="font-bold text-base flex-1 text-center">Thread mới</div>

        <div className="flex-1 flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Layers className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
    </>
  );
};

export default Header;
