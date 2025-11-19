import { z } from "zod";

export const createPostSchema = z
  .object({
    content: z.string().optional(),
    media: z.array(z.any()).optional(),
    reply_permission: z.string().optional(),
    requires_reply_approval: z.boolean().optional(),
    is_ghost: z.boolean().optional(),
    topic_name: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.content && data.content.trim() !== "") ||
      (data.media && data.media.length > 0) ||
      (data.topic_name && data.topic_name.trim() !== ""),
    {
      message: "Bài đăng không thể trống hoàn toàn",
      path: ["content"],
    }
  );

export type CreatePostInput = z.infer<typeof createPostSchema>;
