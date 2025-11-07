// src/components/follow-suggestion/FollowSuggestionList.tsx

import FollowSuggestionItem from "../FollowSuggestionItem";
import type { FollowSuggestion } from "../types";

interface Props {
  suggestions: FollowSuggestion[];
}

export default function FollowSuggestionList({ suggestions }: Props) {
  return (
    <div className="bg-card rounded-xl p-4">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        Gợi ý theo dõi
      </h3>
      <div className="space-y-1">
        {suggestions.map((user) => (
          <FollowSuggestionItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
