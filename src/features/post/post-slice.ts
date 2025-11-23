import { PER_PAGE } from "@/constant/pagination";
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
  continuePage: boolean;
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
  continuePage: true,
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
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error);
    }
  }
);

export const replyThreads = createAsyncThunk<
  CreatePostResponse,
  {
    id: number;
    payload: FormData;
  }
>("posts/reply", async (data, { rejectWithValue }) => {
  try {
    const res = await postApi.replyThread(data.id, data.payload);
    return res;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});
export const loadMoreThreads = createAsyncThunk<PostResponse, number>(
  "posts/load-more",
  async (page = 2, { rejectWithValue }) => {
    try {
      const res = await postApi.getFeeds(page);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.like(id);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const repostPost = createAsyncThunk(
  "posts/repostPost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.repost(id);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const quotePost = createAsyncThunk(
  "posts/quotePost",
  async (
    { id, content }: { id: number; content: string },
    { rejectWithValue }
  ) => {
    try {
      await postApi.quote(id, content);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.save(id);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const hidePost = createAsyncThunk(
  "posts/hidePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.hide(id);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const reportPost = createAsyncThunk(
  "posts/reportPost",
  async (
    { id, reason }: { id: number; reason: string },
    { rejectWithValue }
  ) => {
    try {
      await postApi.report(id, reason);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
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

    //Load more
    builder.addCase(loadMoreThreads.pending, (state) => {
      state.error = null;
    });

    builder.addCase(loadMoreThreads.fulfilled, (state, action) => {
      state.items.push(...action.payload.data);
      state.pagination = action.payload.pagination;
      state.continuePage =
        action.payload.pagination.current_page * PER_PAGE <
        state.pagination.total;
    });

    builder.addCase(loadMoreThreads.rejected, (state, action) => {
      state.error = action.payload as string;
      state.continuePage = false;
    });

    // reply thread
    builder.addCase(replyThreads.pending, (state) => {
      state.error = null;
    });
    builder.addCase(replyThreads.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      const post = state.items.find((p) => p.id === id);
      if (post) {
        post.replies_count += 1;
      }
    });
    builder.addCase(replyThreads.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    //like
    builder.addCase(likePost.pending, (state) => {
      state.error = null;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      const id = action.payload.id;
      const post = state.items.find((p: PostItem) => p.id === id);
      if (post) {
        post.is_liked_by_auth = !post.is_liked_by_auth;
        post.likes_count += post.is_liked_by_auth ? 1 : -1;
      }
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.error = "Lỗi khi like";
    });
  },
});

export const { resetPosts } = postsSlice.actions;
