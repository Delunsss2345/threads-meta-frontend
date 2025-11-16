import type { InitStateAuth } from "@/types/auth.type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitStateAuth = {
  currentUser: null,
  isLoggedIn: false,
  fetching: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});
