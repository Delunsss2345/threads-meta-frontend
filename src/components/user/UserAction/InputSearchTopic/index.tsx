import { useDebounceSearch } from "@/hooks/use-debouce-search";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const InputSearchTopic = () => {
  const { t } = useTranslation();
  const [topic, setTopic] = useState<string | null>(null);
  useDebounceSearch({ query: topic });
  return (
    <>
      <input
        onChange={(e) => {
          e.stopPropagation();
          if (e.target.value) {
            setTopic(e.target.value);
          }
        }}
        placeholder={`${t("reply.addTopic")}`}
        className="text-xs focus:outline-0 whitespace-nowrap"
      />
    </>
  );
};

export default InputSearchTopic;
