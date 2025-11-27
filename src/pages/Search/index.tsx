import SkeletonSearch from "@/components/common/Skeleton/SkeletonSearch";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fetchSuggestions } from "@/features/search";
import { selectSuggestions } from "@/features/search/selector";
import FollowSuggestionItem from "@/features/user/components/FollowSuggestion/FollowSuggestionItem";
import type { AppDispatch } from "@/types/redux";
import type { UserSuggestion } from "@/types/user";
import { useDispatch, useSelector } from "react-redux";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector(selectSuggestions);

  useEffect(() => {
    if (!query) {
      dispatch(fetchSuggestions());
    }
  }, [query]);

  return (
    <>
      <div className="top-0 z-10 border-b bg-primary-foreground border-border">
        <div className="p-4 mx-auto">
          <div className="relative">
            <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              autoFocus
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 rounded-lg h-11 bg-muted/50 focus:bg-private focus:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute -translate-y-1/2 right-3 top-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl p-4 pb-20 mx-auto">
        {query ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Kết quả cho "
              <span className="font-medium text-foreground">{query}</span>"
            </p>

            <div className="space-y-3 rounded-lg bg-muted/30 text-muted-foreground text-center">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonSearch key={index} />
              ))}
            </div>
          </>
        ) : (
          <div>
            {loading ? (
              <div className="space-y-3 rounded-lg bg-muted/30 text-muted-foreground text-center">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonSearch key={index} />
                ))}
              </div>
            ) : (
              <div className="p-4 bg-primary-foreground rounded-xl">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  {t("activity.suggestions")}
                </h3>
                <div className="space-y-1">
                  {items?.map((user: UserSuggestion) => (
                    <FollowSuggestionItem key={user.id} user={user} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
