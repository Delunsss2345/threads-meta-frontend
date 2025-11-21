import { http } from "@/utils/http";

export const uploadApi = {
  uploadAvatar: (avatar: FormData) =>
    http.post("/upload/avatar", avatar, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  uploadMedia: () => http.post("/upload/media"),
};
