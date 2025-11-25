import { CardContent } from "@/components/ui/card";
import { ChevronLeft, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const LinksEditModal = ({
  links,
  newLink,
  setNewLink,
  handleAddLink,
  handleRemoveLink,
  handleUpdateLink,
  setActiveModal,
}: {
  links: { title: string; url: string }[];
  newLink: { title: string; url: string };
  setNewLink: (link: { title: string; url: string }) => void;
  handleAddLink: () => void;
  handleRemoveLink: (index: number) => void;
  handleUpdateLink: (
    index: number,
    field: "title" | "url",
    value: string
  ) => void;
  setActiveModal: (modal: "main" | "name" | "bio" | "links") => void;
}) => {
  const { t } = useTranslation();
  return (
    <CardContent className="p-0 bg-white rounded-full">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => setActiveModal("main")}
          className="p-2 hover:bg-gray-100 "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="font-semibold">{t("profileSettings.linkModalTitle")}</h2>

        <button
          onClick={() => setActiveModal("main")}
          className="text-blue-500 font-semibold"
        >
          {t("profileSettings.done")}
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-3">
          <input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("profileSettings.linkTitlePlaceholder")}
          />

          <input
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t("profileSettings.linkUrlPlaceholder")}
          />

          <button
            onClick={handleAddLink}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            {t("profileSettings.addLink")}
          </button>
        </div>

        {links.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">{t("profileSettings.yourLinks")}</h3>

            {links.map((link, index) => (
              <div
                key={index}
                className="relative p-4 border rounded-lg space-y-3 bg-gray-50"
              >
                {/* Title */}
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) =>
                    handleUpdateLink(index, "title", e.target.value)
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("profileSettings.linkTitle")}
                />

                <input
                  type="url"
                  value={link.url}
                  onChange={(e) =>
                    handleUpdateLink(index, "url", e.target.value)
                  }
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t("profileSettings.linkUrl")}
                />

                <button
                  onClick={() => handleRemoveLink(index)}
                  className="absolute top-3 right-3 p-2 text-red-500 hover:bg-red-100 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </CardContent>
  );
};

export default LinksEditModal;
