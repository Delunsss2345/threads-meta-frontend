export interface FollowSuggestion {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followerCount: string;
  isVerified?: boolean;
}