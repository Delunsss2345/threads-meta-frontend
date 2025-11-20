import type { CreatePostResponse, PostItem, PostResponse } from "@/types/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "./post-api";

export interface PostsState {
  items: PostItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    current_page: number;
    total: number;
    last_page: number;
  };
}
const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    current_page: 1,
    total: 0,
    last_page: 1,
  },
};
export const getFeeds = createAsyncThunk<PostResponse>(
  "posts/feed",
  async (_, { rejectWithValue }) => {
    try {
      const res = await postApi.getFeeds();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postThreads = createAsyncThunk<CreatePostResponse, FormData>(
  "posts/threads",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await postApi.postThread(payload);
      return res;
    } catch (error : any) {
      console.log(error.message);
      return rejectWithValue(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.items = [];
      state.pagination = {
        current_page: 1,
        total: 0,
        last_page: 1,
      };
    },
  },
  extraReducers: (builder) => {
    // get feed
    builder.addCase(getFeeds.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.data;
      state.pagination = action.payload.pagination;
    });
    builder.addCase(getFeeds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // add thread
    builder.addCase(postThreads.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(postThreads.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(postThreads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetPosts } = postsSlice.actions;
