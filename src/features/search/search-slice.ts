import type { UserSuggestion, UserSuggestionResponse } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "./api";

import { createSlice } from "@reduxjs/toolkit";

interface SuggestionsState {
  loading: boolean;
  items: UserSuggestion[];
  error: string | null;
}

const initialState: SuggestionsState = {
  loading: false,
  items: [],
  error: null,
};
export const fetchSuggestions = createAsyncThunk<UserSuggestionResponse, void>(
  "suggestions/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await searchApi.getSuggestion();
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const searchSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    setFollowingUser(
      state,
      action: { payload: { id: number; isFollowing: boolean } }
    ) {
      const { id, isFollowing } = action.payload;
      const userFollowing = state.items.find((user) => user.id === id);
      if (userFollowing) {
        userFollowing.is_following = isFollowing;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        console.log(state.items);
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
export const {setFollowingUser} = searchSlice.actions