// src/components/follow-suggestion/FollowSuggestionList.tsx

import { useTranslation } from "react-i18next";
import FollowSuggestionItem from "../FollowSuggestionItem";
import type { FollowSuggestion } from "../types";

interface Props {
  suggestions: FollowSuggestion[];
}

export default function FollowSuggestionList({ suggestions }: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-card rounded-xl p-4">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        {t("activity.suggestions")}
      </h3>
      <div className="space-y-1">
        {suggestions.map((user) => (
          <FollowSuggestionItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
