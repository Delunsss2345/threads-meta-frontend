import type { PostItem } from "@/types/post";
import type { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import type { PostsState } from "./post-slice";

export const createInteraction = <Returned, ThunkArg>(
  builder: ActionReducerMapBuilder<PostsState>,
  asyncThunk: AsyncThunk<Returned, ThunkArg, {}>,
  findId: (action: { meta: { arg: ThunkArg } }) => string | number,
  updateCallback: (post: PostItem) => void,
  fallBackCallback?: (post: PostItem) => void
) => {
  builder.addCase(asyncThunk.pending, (state, action) => {
    state.error = null;
    state.loadingRequest = true;
    const id = findId(action);
    const post = state.items.find((p) => p.id === id);
    if (post) updateCallback(post);
  });

  builder.addCase(asyncThunk.fulfilled, (state) => {
    state.loadingRequest = false;
  });

  builder.addCase(asyncThunk.rejected, (state, action) => {
    state.error = (action.payload as string) || "Lỗi bất ngờ";
    state.loadingRequest = false;
    const id = findId(action);
    const post = state.items.find((p) => p.id === id);
    if (post && fallBackCallback) {
      fallBackCallback(post);
      return;
    }
    if (post) updateCallback(post);
  });
};
