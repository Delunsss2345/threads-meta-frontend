import ActivityItem from "../ActivityItem";
import type { Activity } from "../types";

interface Props {
  activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
  return (
    <div className="bg-card rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
      <div className="space-y-0">
        {activities.map((act) => (
          <ActivityItem key={act.id} activity={act} />
        ))}
      </div>
    </div>
  );
}
