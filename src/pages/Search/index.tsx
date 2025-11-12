import FollowSuggestionList from "@/components/FollowSuggestion/FollowSuggestionList";
import type { FollowSuggestion } from "@/components/FollowSuggestion/types";
import SkeletonSearch from "@/components/Skeleton/SkeletonSearch";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const mockSuggestions: FollowSuggestion[] = [
  {
    id: "1",
    username: "uespiiiii",
    displayName: "ウエスパ(WES-P/Mr Uekusa) BGT2018",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Come to Instagram! Agent email→mr-uekusa@yoshimoto.co.jp Click Cameo...",
    followerCount: "610K",
    isVerified: true,
  },
  {
    id: "2",
    username: "phap_kieu3",
    displayName: "Pháp Kiều",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "",
    followerCount: "717K",
  },
  {
    id: "3",
    username: "maiquinn_musique",
    displayName: "MAIQUINN",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "music and love is my family",
    followerCount: "142K",
  },
];
const SearchPage = () => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  return (
    <div className="h-full min-h-screen bg-primary-foreground">
      <div className="sticky top-0 z-10 border-b bg-primary-foreground border-border">
        <div className="max-w-2xl p-4 mx-auto">
          <div className="relative">
            <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 rounded-full h-11 bg-muted/50 focus:bg-private name() {
                
              }"
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
          <div className="mt-6">
            <p className="mb-4 text-sm text-muted-foreground">
              Kết quả cho "
              <span className="font-medium text-foreground">{query}</span>"
            </p>
            <div className="space-y-3 text-center rounded-lg bg-muted/30 text-muted-foreground">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonSearch key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <FollowSuggestionList suggestions={mockSuggestions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
