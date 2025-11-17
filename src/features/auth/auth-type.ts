export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export type AuthState = {
  currentUser: User | null;
  accessToken: string | null;
  loadingUser: boolean;
  loggingIn: boolean;
  initialized: boolean;
};
