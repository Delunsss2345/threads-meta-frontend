import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { key: "/", label: "forYou", nav: "/" },
  { key: "/following", label: "following", nav: "/following" },
];

const FeedTabs: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname; 

  return (
    <div className="sticky z-30 top-12 bg-primary-foreground">
      <div className="relative flex justify-around text-sm font-medium text-muted-foreground">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => navigate(tab.nav)}
              className={`relative py-3 flex-1 text-center transition-colors ${
                isActive
                  ? "text-foreground font-semibold"
                  : "hover:text-foreground/80"
              }`}
            >
              {t(`feed.${tab.label}`)}

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] translate-y-1/2 bg-foreground rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeedTabs;
