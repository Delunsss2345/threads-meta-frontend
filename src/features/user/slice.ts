import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { userApi } from "../../services/userService";
import type { MappedUser } from "../post/components/type";

export type UserState = {
  loadingRequest: boolean;
  peopleNow: MappedUser | null;
};

const initialState: UserState = {
  loadingRequest: false,
  peopleNow: null,
};

export const followUser = createAsyncThunk(
  "user/followUser",
  async (id: number) => {
    const res = await userApi.followUser(id);
    return res.data;
  }
);
export const unFollowUser = createAsyncThunk(
  "user/unFollowUser",
  async (id: number) => {
    const res = await userApi.unFollowUser(id);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPeopleNow(state, action: PayloadAction<MappedUser | null>) {
      state.peopleNow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.loadingRequest = true;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loadingRequest = false;
        // if (state.peopleNow) {
        //   state.peopleNow.is_followed_by_auth = true;
        // }
      })
      .addCase(followUser.rejected, (state) => {
        state.loadingRequest = false;
      });

    //   .addCase(unFollowUser.pending, (state) => {
    //     state.loadingRequest = true;
    //   })
    //   .addCase(unFollowUser.fulfilled, (state) => {
    //     state.loadingRequest = false;
    //     if (state.peopleNow) {
    //       state.peopleNow.is_followed_by_auth = false;
    //     }
    //   })
    //   .addCase(unFollowUser.rejected, (state) => {
    //     state.loadingRequest = false;
    //   });
  },
});

export default userSlice;
