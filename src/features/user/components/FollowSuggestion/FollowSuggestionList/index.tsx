import type { UserSuggestion } from "@/types/user";
import { useTranslation } from "react-i18next";
import FollowSuggestionItem from "../FollowSuggestionItem";

interface Props {
  suggestions: UserSuggestion[];
}

const FollowSuggestionList = ({ suggestions }: Props) => {
  const { t } = useTranslation();
  console.log(suggestions);
  return (
    <div className="p-4 bg-primary-foreground rounded-xl">
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">
        {t("activity.suggestions")}
      </h3>
      <div className="space-y-1">
        {suggestions?.map((user) => (
          <FollowSuggestionItem key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default FollowSuggestionList;
