import type { PostItem, ReplyItem } from "@/types/post";
import { formatTime } from "@/utils/format-time";

export const mapPost = (post: PostItem | ReplyItem) => {
  return {
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    parent_id: post.parent_id,
    original_post_id: post.original_post_id,
    is_quote: post.is_quote,
    reply_permission: post.reply_permission,
    requires_reply_approval: post.requires_reply_approval,
    status: post.status,
    is_ghost: post.is_ghost,
    ghost_expires_at: post.ghost_expires_at,
    topic_id: post.topic_id,
    created_at: formatTime(post.created_at),
    updated_at: formatTime(post.updated_at),
    deleted_at: post.deleted_at,

    likes_count: post.likes_count,
    replies_count: post.replies_count,
    reposts_and_quotes_count: post.reposts_and_quotes_count,

    media_urls: post.media_urls ?? [],

    is_liked_by_auth: post.is_liked_by_auth ?? false,
    is_saved_by_auth: post.is_saved_by_auth ?? false,
    is_reposted_by_auth: post.is_reposted_by_auth ?? false,

    user: post.user
      ? {
          id: post.user.id,
          name: post.user.name,
          username: post.user.username,
          bio: post.user.bio,
          is_private: post.user.is_private,
          verified: post.user.verified,
          created_at: formatTime(post.user.created_at),
          updated_at: post.user.updated_at,
          avatar_url: post.user.avatar_url,
        }
      : null,

    original_post:
      "original_post" in post && post.original_post
        ? {
            id: post.original_post.id,
            user_id: post.original_post.user_id,
            content: post.original_post.content,
            parent_id: post.original_post.parent_id,
            original_post_id: post.original_post.original_post_id,
            is_quote: post.original_post.is_quote,
            reply_permission: post.original_post.reply_permission,
            requires_reply_approval: post.original_post.requires_reply_approval,
            status: post.original_post.status,
            is_ghost: post.original_post.is_ghost,
            ghost_expires_at: post.original_post.ghost_expires_at,
            topic_id: post.original_post.topic_id,
            created_at: post.original_post.created_at,
            updated_at: post.original_post.updated_at,
            deleted_at: post.original_post.deleted_at,

            user: post.original_post.user
              ? {
                  id: post.original_post.user.id,
                  name: post.original_post.user.name,
                  username: post.original_post.user.username,
                  bio: post.original_post.user.bio,
                  is_private: post.original_post.user.is_private,
                  verified: post.original_post.user.verified,
                  created_at: post.original_post.user.created_at,
                  updated_at: post.original_post.user.updated_at,
                  avatar_url: post.original_post.user.avatar_url,
                }
              : null,
          }
        : null,
  };
};
