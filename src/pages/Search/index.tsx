// src/pages/SearchPage.tsx
import FollowSuggestionList from "@/components/FollowSuggestion/FollowSuggestionList";
import type { FollowSuggestion } from "@/components/FollowSuggestion/types";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";
// src/data/mockSuggestions.ts

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
  // ... thêm nếu cần
];
export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Search Bar - Sticky */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 h-11 rounded-full bg-muted/50 focus:bg-background"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="max-w-2xl mx-auto p-4 pb-20">
        {query ? (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Kết quả cho "
              <span className="font-medium text-foreground">{query}</span>"
            </p>
            <div className="bg-muted/30 rounded-lg p-8 text-center text-muted-foreground">
              Chưa có kết quả nào.
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
}
