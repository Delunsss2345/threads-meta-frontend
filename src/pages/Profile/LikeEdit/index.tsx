import { ChevronLeft } from "lucide-react";

const LinksEditModal = ({
  links,
  newLink,
  setNewLink,
  handleAddLink,
  handleRemoveLink,
  setActiveModal,
}: {
  links: { title: string; url: string }[];
  newLink: { title: string; url: string };
  setNewLink: (link: { title: string; url: string }) => void;
  handleAddLink: () => void;
  handleRemoveLink: (index: number) => void;
  setActiveModal: (modal: string) => void;
}) => (
  <div className="bg-white">
    <div className="flex items-center justify-between p-4 border-b">
      <button
        onClick={() => setActiveModal("main")}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h2 className="font-semibold">Mối liên kết</h2>
      <button
        onClick={() => setActiveModal("main")}
        className="text-blue-500 font-semibold"
      >
        Xong
      </button>
    </div>
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <input
          type="text"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tiêu đề (VD: Website)"
        />
        <input
          type="url"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="URL (VD: https://example.com)"
        />
        <button
          onClick={handleAddLink}
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Thêm liên kết
        </button>
      </div>

      {/* {links.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold mb-2">Liên kết của bạn</h3>
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium">{link.title}</p>
                <p className="text-sm text-gray-500 truncate">{link.url}</p>
              </div>
              <button
                onClick={() => handleRemoveLink(index)}
                className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )} */}
    </div>
  </div>
);

export default LinksEditModal;
