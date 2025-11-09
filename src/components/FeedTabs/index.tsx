import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  { key: "foryou", label: "Dành cho bạn" },
  { key: "following", label: "Đang theo dõi" },
];

const FeedTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("foryou");

  return (
    <div className="sticky top-12 z-30 bg-background border-b border-border">
      <div className="flex justify-around text-sm font-medium text-muted-foreground relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative py-3 flex-1 text-center transition-colors ${
                isActive
                  ? "text-foreground font-semibold"
                  : "hover:text-foreground/80"
              }`}
            >
              {tab.label}

              {isActive && (
                <motion.div
                  layoutId="feedTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] translate-y-1/2 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeedTabs;
