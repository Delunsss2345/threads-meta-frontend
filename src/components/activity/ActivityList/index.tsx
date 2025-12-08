import { useTranslation } from "react-i18next";
import ActivityItem from "../ActivityItem";
import type { Activity } from "../types";

interface Props {
  activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
  const { t } = useTranslation();

  return (
    <div className="h-full px-6 bg-primary-foreground rounded-xl">
      <h2 className="mb-4 text-lg font-semibold">
        {t("activity.recentActivity")}
      </h2>
      <div className="h-full space-y-0 ">
        {activities.map((act) => (
          <ActivityItem key={act.id} activity={act} />
        ))}
      </div>
    </div>
  );
}
