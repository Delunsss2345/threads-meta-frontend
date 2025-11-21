import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postInteractionApi } from "./interaction-api";

export const likePost = createAsyncThunk(
  "interactions/likePost",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await postInteractionApi.like(id);
      return { id };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error");
    }
  }
);

interface InteractionState {
  loading: boolean;
  error: string | null;
}

const initialState: InteractionState = {
  loading: false,
  error: null,
};

export const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(likePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(likePost.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(likePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default interactionSlice.reducer;
