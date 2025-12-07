import type { PostItem, ReplyItem } from "@/types/post";
import type { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import type { PostsState } from "./slice";

export const createInteraction = <Returned, ThunkArg>(
  builder: ActionReducerMapBuilder<PostsState>,
  asyncThunk: AsyncThunk<Returned, ThunkArg, {}>,
  findId: (action: { meta: { arg: ThunkArg } }) => string | number,
  updateCallback: (post: PostItem | ReplyItem) => void,
  fallBackCallback?: (post: PostItem) => void
) => {
  builder.addCase(asyncThunk.pending, (state, action) => {
    state.error = null;
    const id = findId(action);
    const post = state.items.find((p) => p.id === id);
    if (post) updateCallback(post);
    else {
      const reply = state.replies.find((p) => p.id === id);
      if (reply) {
        updateCallback(reply as PostItem);
      }
    }
  });

  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.error = (action.payload as string) || "Lỗi bất ngờ";
    const id = findId(action);
    const post = state.items.find((p) => p.id === id);
    if (post && fallBackCallback) {
      fallBackCallback(post);
      return;
    }
    if (post) updateCallback(post);
    else {
      const reply = state.replies.find((p) => p.id === id);
      if (reply) {
        updateCallback(reply as PostItem);
      }
    }
  });
};
