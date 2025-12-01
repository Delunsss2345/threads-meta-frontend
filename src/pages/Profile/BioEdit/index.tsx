import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";
const BioEditModal = ({
  bioText,
  setBioText,
  handleSaveBio,
  setActiveModal,
  previewBio,
}: {
  bioText: string;
  setBioText: (value: string) => void;
  handleSaveBio: () => void;
  setActiveModal: (value: "main" | "bio" | "links") => void;
  previewBio: string | null;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <CardContent className="p-0">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => {
            setActiveModal("main");
            setBioText(bioText);
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold">Chỉnh sửa tiểu sử</h2>
        <button
          onClick={() => {
            handleSaveBio();
            bioText = textAreaRef.current?.textContent || bioText;
          }}
          className="text-primary font-semibold"
        >
          Lưu
        </button>
      </div>

      <div className="p-4">
        <Textarea
          ref={textAreaRef}
          value={previewBio ?? ""}
          onChange={(e) => setBioText(e.target.value)}
          className="w-full h-32 p-3  rounded-lg resize-none shadow-none focus:outline-none focus:ring-2 focus:ring-none border-0 "
          placeholder="Viết vài dòng về bản thân..."
        />
        <p className="text-sm text-gray-500 mt-2 text-right">/150</p>
      </div>
    </CardContent>
  );
};
export default BioEditModal;
