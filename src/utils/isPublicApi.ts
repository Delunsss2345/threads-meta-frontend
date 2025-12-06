import { PUBLIC_API_PATHS } from "@/features/post/constant";

export const isPublicApi = (url?: string) => {
  if (!url) return false;
  return PUBLIC_API_PATHS.some((path) => url.startsWith(path));
};
