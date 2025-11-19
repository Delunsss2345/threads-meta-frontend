import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";
import type { User, UserResponse } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth-api";

export type AuthState = {
  currentUser: User | null;
  accessToken: string | null;
  loadingUser: boolean;
  loggingIn: boolean;
  initialized: boolean;
};

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  loadingUser: true,
  loggingIn: false,
  initialized: false,
};

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Đăng ký thất bại");
    }
  }
);

export const register = createAsyncThunk<RegisterResponse, RegisterPayload>(
  "auth/register",

  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Đăng ký thất bại");
    }
  }
);

export const getCurrentUser = createAsyncThunk<UserResponse>(
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
      state.currentUser = action.payload.data.user;

      state.accessToken = action.payload.data.access_token;

      localStorage.setItem("accessToken", action.payload.data.access_token);
      localStorage.setItem("refreshToken", action.payload.data.refresh_token);
    });

    builder.addCase(login.rejected, (state) => {
      state.loggingIn = false;
      state.currentUser = null;
      state.accessToken = null;
    });

    // Register auth
    builder.addCase(register.pending, (state) => {
      state.loggingIn = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loggingIn = false;
      state.currentUser = action.payload.data.user;
      state.accessToken = action.payload.data.access_token;

      localStorage.setItem("accessToken", action.payload.data.access_token);
      localStorage.setItem("refreshToken", action.payload.data.refresh_token);
    });

    builder.addCase(register.rejected, (state) => {
      state.loggingIn = false;
      state.currentUser = null;
      state.accessToken = null;
    }),
      // Get me
      builder.addCase(getCurrentUser.pending, (state) => {
        state.loadingUser = true;
      });

    // fulfilled trả về User
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.currentUser = action.payload.data;
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
