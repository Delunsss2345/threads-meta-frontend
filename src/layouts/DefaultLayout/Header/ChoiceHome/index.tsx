import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  { key: "", label: "Dành cho bạn" },
  { key: "following", label: "Đang theo dõi" },
  { key: "autoDelete", label: "Bài viết tự hủy" },
];

interface ChoiceHomeProps {
  defaultTab?: string;
  onChange?: (tab: string) => void;
}

const ChoiceHome = ({
  defaultTab = `${location.pathname}`.split("/")[1] || "",
  onChange,
}: ChoiceHomeProps) => {
  const [active, setActive] = useState(defaultTab);
  const navigate = useNavigate();
  const handleChange = (key: string) => {
    setActive(key);
    onChange?.(key);
    navigate(key);
  };

  return (
    <>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleChange(tab.key)}
          className={`
            text-md
            ${active === tab.key ? "font-semibold text-primary" : "text-gray-500"}
          `}
        >
          {tab.label}
        </button>
      ))}
    </>
  );
};

export default ChoiceHome;
