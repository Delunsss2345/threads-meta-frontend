import type { RootState } from "@/types/redux";

export const selectPostsState = (state: RootState) => state.posts;

export const selectPostsItems = (state: RootState) =>
  selectPostsState(state).items;

export const selectPostsLoading = (state: RootState) =>
  selectPostsState(state).loading;

export const selectPostsError = (state: RootState) =>
  selectPostsState(state).error;

export const selectPostsPagination = (state: RootState) =>
  selectPostsState(state).pagination;

export const selectPostsContinuePage = (state: RootState) =>
  selectPostsState(state).continuePage;

export const selectPostsAndLoadingRequest = (state: RootState) => {
  return {
    posts: selectPostsItems(state),
    loadingRequest: selectPostsState(state).loadingRequest,
  };
};
