import type {
  ForgotPasswordType,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  RestPasswordBody,
  ValidateTokenBody,
  ValidateTokenResponse,
} from "@/types/auth";
import type { User, UserResponse } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../user/api";
import { authApi } from "./api";
export type AuthState = {
  currentUser: User | null;
  accessToken: string | null;
  loadingUser: boolean;
  loggingIn: boolean;
  initialized: boolean;
  loadingRequest: boolean;
  validateToken: boolean;
};

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,
  loadingUser: true,
  loggingIn: false,
  initialized: false,
  loadingRequest: false,
  validateToken: false,
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
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      return rejectWithValue(error.message ?? "Đăng xuất có sự cố");
    } finally {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
  }
);

export const forgotPassword = createAsyncThunk<void, ForgotPasswordType>(
  "auth/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.forgotPassword(payload);
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Gửi mail có sự cố");
    }
  }
);

export const validateRestToken = createAsyncThunk<
  ValidateTokenResponse,
  ValidateTokenBody
>("auth/validateRestToken", async (payload, { rejectWithValue }) => {
  try {
    return await authApi.validateRestToken(payload);
  } catch (error: any) {
    return rejectWithValue(error.message ?? "Liên kết hết hạn");
  }
});

export const restPassword = createAsyncThunk<void, RestPasswordBody>(
  "auth/restPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.resetPassword(payload);
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Liên kết hết hạn");
    }
  }
);

export const updateAuthForUser = createAsyncThunk<any, FormData>(
  "auth/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await userApi.updateUser(payload);
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Liên kết hết hạn");
    }
  }
);

export const verifyEmail = createAsyncThunk<void, ValidateTokenBody>(
  "auth/verifyEmail",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.verifyEmail(payload);
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Liên kết hết hạn");
    }
  }
);

export const resendVerifyEmail = createAsyncThunk<any, ValidateTokenBody>(
  "auth/resendVerifyEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.resendVerifyEmail(payload);
      console.log(res);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message ?? "Liên kết hết hạn");
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
    });

    builder.addCase(register.rejected, (state) => {
      state.loggingIn = false;
      state.currentUser = null;
      state.accessToken = null;
    });
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });

    //forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.loadingRequest = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.loadingRequest = false;
    });

    builder.addCase(forgotPassword.rejected, (state) => {
      state.loadingRequest = false;
    });

    // validate password
    builder.addCase(validateRestToken.pending, (state) => {
      state.loadingRequest = true;
    });
    builder.addCase(validateRestToken.fulfilled, (state, action) => {
      state.loadingRequest = false;
      state.validateToken = action.payload.data.valid;
    });

    builder.addCase(validateRestToken.rejected, (state) => {
      state.loadingRequest = false;
      state.validateToken = false;
    });
    // reset password
    builder.addCase(restPassword.pending, (state) => {
      state.loadingRequest = true;
    });
    builder.addCase(restPassword.fulfilled, (state) => {
      state.loadingRequest = false;
    });
    builder.addCase(restPassword.rejected, (state) => {
      state.loadingRequest = false;
    });

    builder.addCase(updateAuthForUser.pending, (state) => {
      state.loadingRequest = true;
    });

    builder.addCase(updateAuthForUser.fulfilled, (state, action) => {
      state.loadingRequest = false;
      state.currentUser = action.payload.data;
    });

    builder.addCase(updateAuthForUser.rejected, (state) => {
      state.loadingRequest = false;
    });

    builder.addCase(verifyEmail.pending, (state) => {
      state.loadingRequest = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.loadingRequest = false;
    });
    builder.addCase(verifyEmail.rejected, (state) => {
      state.loadingRequest = false;
    });

    builder.addCase(resendVerifyEmail.pending, (state) => {
      state.loadingRequest = true;
    });

    builder.addCase(resendVerifyEmail.fulfilled, (state) => {
      state.loadingRequest = false;
    });

    builder.addCase(resendVerifyEmail.rejected, (state) => {
      state.loadingRequest = false;
    });
  },
});
