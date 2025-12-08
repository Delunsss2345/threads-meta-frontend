import { PER_PAGE } from "@/constant/pagination";

import type {
  CreatePostResponse,
  PostItem,
  PostResponse,
  ReplyData,
  ReplyItem,
  ReplyResponse,
} from "@/types/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postApi } from "./api";
import { createInteraction } from "./helper";

export interface PostsState {
  items: PostItem[];
  itemsFollowing: PostItem[];
  reposts: PostItem[];
  replies: ReplyData[];
  loading: boolean;
  loadingRequest: boolean;
  loadingReplies: boolean;
  error: string | null;
  singlePost: PostItem | null;
  pagination: {
    current_page: number;
    total: number;
    last_page: number;
  };
  paginationReplies: {
    current_page: number;
    total: number;
    last_page: number;
  };
  paginationFollowing: {
    current_page: number;
    total: number;
    last_page: number;
  };
  continuePageFollowing: boolean;
  continueReplies: boolean;
  continuePage: boolean;
  loaded: boolean;
}

const initialState: PostsState = {
  items: [],
  itemsFollowing: [],
  replies: [],
  reposts: [],
  loading: false,
  loadingRequest: false,
  loadingReplies: false,
  error: null,
  singlePost: null,
  pagination: {
    current_page: 1,
    total: 0,
    last_page: 1,
  },
  paginationReplies: {
    current_page: 1,
    total: 0,
    last_page: 1,
  },
  paginationFollowing: {
    current_page: 1,
    total: 0,
    last_page: 1,
  },
  continuePageFollowing: true,
  continueReplies: true,
  continuePage: true,
  loaded: false,
};

const parseError = (error: any): string => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    error?.toString?.() ||
    "Error"
  );
};

export const getFeeds = createAsyncThunk<PostResponse>(
  "posts/feed",
  async (_, { rejectWithValue }) => {
    try {
      return await postApi.getFeeds();
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const getFeedsByFollowing = createAsyncThunk<PostResponse>(
  "posts/feed-following",
  async (_, { rejectWithValue }) => {
    try {
      return await postApi.getFeedsByFollowing();
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const loadMoreFeedsByFollowing = createAsyncThunk<PostResponse, number>(
  "posts/load-more-following",
  async (page = 2, { rejectWithValue }) => {
    try {
      return await postApi.getFeedsByFollowing(page);
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const getRepost = createAsyncThunk<PostResponse, number>(
  "posts/reposts",
  async (id, { rejectWithValue }) => {
    try {
      return await postApi.getReposts(id);
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const postThreads = createAsyncThunk<CreatePostResponse, FormData>(
  "posts/threads",
  async (payload, { rejectWithValue }) => {
    try {
      return await postApi.postThread(payload);
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const replyThreads = createAsyncThunk<
  CreatePostResponse,
  { id: number; payload: FormData }
>("posts/reply", async ({ id, payload }, { rejectWithValue }) => {
  try {
    return await postApi.replyThread(id, payload);
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

export const loadMoreThreads = createAsyncThunk<PostResponse, number>(
  "posts/load-more",
  async (page = 2, { rejectWithValue }) => {
    try {
      return await postApi.getFeeds(page);
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);
export const loadMoreReply = createAsyncThunk<
  ReplyResponse,
  { id: number; page: number }
>("posts/load-more-reply", async (payload, { rejectWithValue }) => {
  try {
    const res = await postApi.getReplies(payload.id, payload.page);
    return res;
  } catch (error) {
    return rejectWithValue(parseError(error));
  }
});

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.like(id);
      return { id };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const repostPost = createAsyncThunk(
  "posts/repostPost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.repost(id);
      return { id };
    } catch (error) {
      return rejectWithValue(parseError(error));
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
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.save(id);
      return { id };
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const hidePost = createAsyncThunk(
  "posts/hidePost",
  async (id: number, { rejectWithValue }) => {
    try {
      await postApi.hide(id);
      return { id };
    } catch (error) {
      return rejectWithValue(parseError(error));
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
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const getReplies = createAsyncThunk(
  "posts/getReplies",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await postApi.getReplies(id);
      return res;
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (id: number, { rejectWithValue }) => {
    try {
      return await postApi.getThread(id);
    } catch (error) {
      return rejectWithValue(parseError(error));
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.items = [];
      state.pagination = { current_page: 1, total: 0, last_page: 1 };
      state.continuePage = true;
      state.loaded = false;
    },
    resetReplies: (state) => {
      state.continueReplies = false;
      state.paginationReplies.current_page = 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getFeeds.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loaded = true;
    });

    builder.addCase(getFeeds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Load more
    builder.addCase(loadMoreThreads.pending, (state) => {
      state.error = null;
    });

    builder.addCase(loadMoreThreads.fulfilled, (state, action) => {
      const { current_page, total } = action.payload.pagination;

      state.items.push(...action.payload.data);
      state.pagination = action.payload.pagination;

      state.continuePage = current_page * PER_PAGE < total;
    });

    builder.addCase(loadMoreThreads.rejected, (state, action) => {
      state.error = action.payload as string;
      state.continuePage = false;
    });

    builder.addCase(getFeedsByFollowing.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getFeedsByFollowing.fulfilled, (state, action) => {
      state.loading = false;
      state.itemsFollowing = action.payload.data;
      state.paginationFollowing = action.payload.pagination;
      state.continuePageFollowing =
        action.payload.pagination.current_page * PER_PAGE <
        action.payload.pagination.total;
      state.loaded = true;
    });

    builder.addCase(loadMoreFeedsByFollowing.pending, (state) => {
      state.error = null;
    });

    builder.addCase(loadMoreFeedsByFollowing.fulfilled, (state, action) => {
      const { current_page, total } = action.payload.pagination;

      state.itemsFollowing.push(...action.payload.data);
      state.paginationFollowing = action.payload.pagination;

      state.continuePageFollowing = current_page * PER_PAGE < total;
    });

    builder.addCase(loadMoreFeedsByFollowing.rejected, (state, action) => {
      state.error = action.payload as string;
      state.continuePageFollowing = false;
    });

    builder.addCase(getFeedsByFollowing.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Load more replies
    builder.addCase(loadMoreReply.pending, (state) => {
      state.error = null;
      state.continueReplies = true;
      state.paginationReplies.current_page = 1;
    });

    builder.addCase(loadMoreReply.fulfilled, (state, action) => {
      const { current_page, total } = action.payload.pagination;

      state.replies.push(...action.payload.data);
      state.paginationReplies = action.payload.pagination;
      state.continueReplies = current_page * PER_PAGE < total;
    });

    builder.addCase(loadMoreReply.rejected, (state, action) => {
      state.error = action.payload as string;
      state.continueReplies = false;
    });

    // like
    createInteraction(
      builder,
      likePost,
      (action: { meta: { arg: number | string } }) => action.meta.arg,
      (post: PostItem | ReplyItem) => {
        post.is_liked_by_auth = !post.is_liked_by_auth;
        post.likes_count += post.is_liked_by_auth ? 1 : -1;
      }
    );

    // save post
    createInteraction(
      builder,
      savePost,
      (action: { meta: { arg: number | string } }) => action.meta.arg,
      (post: PostItem | ReplyItem) => {
        post.is_saved_by_auth = !post.is_saved_by_auth;
      }
    );

    // reply post
    createInteraction(
      builder,
      replyThreads,
      (action: { meta: { arg: { id: number } } }) => action.meta.arg.id,
      (post: PostItem | ReplyItem) => {
        post.replies_count++;
      },
      (post: PostItem) => {
        post.replies_count--;
      }
    );
    builder.addCase(replyThreads.fulfilled, (state, action) => {
      const newReply = action.payload.data as ReplyData;

      if (
        state.replies.length === 0 ||
        state.replies[0].parent_id === newReply.parent_id
      ) {
        state.replies.unshift(newReply);
      }
    });

    // respost post
    // @ts-nocheck
    createInteraction(
      builder,
      repostPost,
      (action: { meta: { arg: number | string } }) => action.meta.arg,
      (post: PostItem | ReplyItem) => {
        !post.is_reposted_by_auth
          ? post.reposts_and_quotes_count++
          : post.reposts_and_quotes_count--;
        post.is_reposted_by_auth = !post.is_reposted_by_auth;
      }
    );
    //Hide post
    builder.addCase(hidePost.pending, (state) => {
      state.loadingRequest = true;
    });

    builder.addCase(hidePost.fulfilled, (state) => {
      state.loadingRequest = false;
    });

    builder.addCase(hidePost.rejected, (state) => {
      state.loadingRequest = false;
    });

    //Get replies
    builder.addCase(getReplies.pending, (state) => {
      state.loadingReplies = true;
    });

    builder.addCase(getReplies.fulfilled, (state, action) => {
      state.loadingReplies = false;
      state.replies = action.payload.data;
    });
    builder.addCase(getReplies.rejected, (state) => {
      state.loadingReplies = false;
      state.replies = [];
    });

    //Get repost list
    builder.addCase(getRepost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getRepost.fulfilled, (state, action) => {
      state.loading = false;
      state.reposts = action.payload.data;
    });

    builder.addCase(getRepost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //Get single post
    builder.addCase(getSinglePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.singlePost = action.payload.data;
    });

    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetPosts, resetReplies } = postsSlice.actions;
