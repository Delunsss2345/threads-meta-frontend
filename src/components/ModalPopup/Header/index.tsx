import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Layers, MoreHorizontal, X } from "lucide-react";

const Header = ({
  onClose,
  headerText,
  mode,
}: {
  onClose: () => void;
  headerText: string;
  mode?: "x";
}) => {
  return (
    <>
      <CardHeader className={`flex flex-row items-center border-b space-y-0 !py-2 ${mode ? "!px-2" : ""}`}>
        <div className="flex-1 text-left">
          <Button
            variant="ghost"
            className="h-auto p-0 text-base hover:bg-transparent"
            onClick={onClose}
          >
            {mode === "x" ? <X /> : "Hủy"}
          </Button>
        </div>

        <div className="flex-1 text-base font-bold text-center">
          {headerText}
        </div>

        <div className="flex justify-end flex-1 gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
            <Layers className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
    </>
  );
};

export default Header;
