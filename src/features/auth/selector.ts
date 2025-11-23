import type { RootState } from "@/types/redux";

export const selectAuthState = (state: RootState) => state.auth;

export const selectCurrentUser = (state: RootState) =>
  selectAuthState(state).currentUser;

export const selectAccessToken = (state: RootState) =>
  selectAuthState(state).accessToken;

export const selectAuthLoadingUser = (state: RootState) =>
  selectAuthState(state).loadingUser;

export const selectAuthLoggingIn = (state: RootState) =>
  selectAuthState(state).loggingIn;

export const selectAuthInitialized = (state: RootState) =>
  selectAuthState(state).initialized;

export const selectAuthLoadingRequest = (state: RootState) =>
  selectAuthState(state).loadingRequest;

export const selectAuthValidateToken = (state: RootState) =>
  selectAuthState(state).validateToken;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(selectCurrentUser(state));
