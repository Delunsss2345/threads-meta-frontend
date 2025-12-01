import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";

const NameEdit = ({
  nameText,
  setNameText,
  handleSaveName,
  setActiveModal,
}: {
  nameText: string;
  setNameText: (value: string) => void;
  handleSaveName: () => void;
  setActiveModal: (value: "main" | "name" | "links") => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <CardContent className="p-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => {
            setActiveModal("main");
            setNameText(nameText);
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="font-semibold">Chỉnh sửa tên</h2>

        <button
          onClick={() => {
            handleSaveName();
            nameText = inputRef.current?.value || nameText;
          }}
          className="text-primary font-semibold"
        >
          Lưu
        </button>
      </div>

      {/* Input */}
      <div className="p-4">
        <Input
          ref={inputRef}
          value={nameText}
          onChange={(e) => setNameText(e.target.value)}
          className="w-full h-12 text-base rounded-lg shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập tên của bạn..."
        />
      </div>
    </CardContent>
  );
};

export default NameEdit;
