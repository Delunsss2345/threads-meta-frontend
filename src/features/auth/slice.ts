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
  authLoading: boolean;
  loggingIn: boolean;
  loadingRequest: boolean;
  initialized: boolean;

  validateToken: boolean;
};

const initialState: AuthState = {
  currentUser: null,
  accessToken: null,

  loadingUser: false,
  loggingIn: false,
  initialized: false,
  authLoading: false,
  loadingRequest: false,
  validateToken: false,
};

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.login(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const register = createAsyncThunk<RegisterResponse, RegisterPayload>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk<UserResponse>(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getCurrentUser();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk<void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  }
);

export const forgotPassword = createAsyncThunk<void, ForgotPasswordType>(
  "auth/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.forgotPassword(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const validateRestToken = createAsyncThunk<
  ValidateTokenResponse,
  ValidateTokenBody
>("auth/validateRestToken", async (payload, { rejectWithValue }) => {
  try {
    return await authApi.validateRestToken(payload);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const restPassword = createAsyncThunk<void, RestPasswordBody>(
  "auth/restPassword",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.resetPassword(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAuthForUser = createAsyncThunk<any, FormData>(
  "auth/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await userApi.updateUser(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyEmail = createAsyncThunk<void, ValidateTokenBody>(
  "auth/verifyEmail",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.verifyEmail(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resendVerifyEmail = createAsyncThunk<any, ValidateTokenBody>(
  "auth/resendVerifyEmail",
  async (payload, { rejectWithValue }) => {
    try {
      return await authApi.resendVerifyEmail(payload);
    } catch (error) {
      return rejectWithValue(error);
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
    resetAuthLoading(state) {
      state.authLoading = false;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.authLoading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.authLoading = false;

      state.currentUser = action.payload.data.user;
      state.accessToken = action.payload.data.access_token;

      localStorage.setItem("accessToken", action.payload.data.access_token);
      localStorage.setItem("refreshToken", action.payload.data.refresh_token);
    });

    builder.addCase(login.rejected, (state) => {
      state.authLoading = false;
      state.currentUser = null;
      state.accessToken = null;
    });

    // register
    builder.addCase(register.pending, (state) => {
      state.authLoading = true;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.authLoading = false;
      state.currentUser = action.payload.data.user;
      state.accessToken = action.payload.data.access_token;
    });

    builder.addCase(register.rejected, (state) => {
      state.authLoading = false;
      state.currentUser = null;
      state.accessToken = null;
    });

    // getCurrent
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loadingUser = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loadingUser = false;
      state.currentUser = action.payload.data;
    });

    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loadingUser = false;
      state.currentUser = null;
    });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.loadingUser = true;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.loadingUser = false;
      state.currentUser = null;
      state.accessToken = null;
    });

    builder.addCase(logout.rejected, (state) => {
      state.loadingUser = false;
      state.currentUser = null;
      state.accessToken = null;
    });

    // forgot
    builder.addCase(forgotPassword.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.authLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.authLoading = false;
    });

    // validate reset token
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

    // reset password handler
    builder.addCase(restPassword.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(restPassword.fulfilled, (state) => {
      state.authLoading = false;
    });
    builder.addCase(restPassword.rejected, (state) => {
      state.authLoading = false;
    });

    // update user handler
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

    // verify email
    builder.addCase(verifyEmail.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.authLoading = false;
    });
    builder.addCase(verifyEmail.rejected, (state) => {
      state.authLoading = false;
    });

    // resend
    builder.addCase(resendVerifyEmail.pending, (state) => {
      state.authLoading = true;
    });
    builder.addCase(resendVerifyEmail.fulfilled, (state) => {
      state.authLoading = false;
    });
    builder.addCase(resendVerifyEmail.rejected, (state) => {
      state.authLoading = false;
    });
  },
});

export const { resetAuthLoading } = authSlice.actions;
