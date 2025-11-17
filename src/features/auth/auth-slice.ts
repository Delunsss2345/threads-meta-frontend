import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth-api";
import type { AuthResponse, AuthState, LoginPayload, User } from "./auth-type";

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  loadingUser: true,
  loggingIn: false,
  initialized: false,
};

export const login = createAsyncThunk<AuthResponse, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Đăng nhập thất bại");
    }
  }
);

export const getCurrentUser = createAsyncThunk<User>(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getCurrentUser();
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error.message ?? "Lấy thông tin người dùng thất bại"
      );
    }
  }
);

export const logout = createAsyncThunk<void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Đăng xuất có sự cố");
    } finally {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login auth
    builder.addCase(login.pending, (state) => {
      state.loggingIn = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggingIn = false;
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, _) => {
      state.loggingIn = false;
      state.currentUser = null;
      state.accessToken = null;
    });

    // Get me
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loadingUser = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.currentUser = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loadingUser = false;
      state.currentUser = null;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loggingIn = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.loggingIn = false;
      state.currentUser = null;
      state.accessToken = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loggingIn = false;
      state.currentUser = null;
      state.accessToken = null;
    });
  },
});
