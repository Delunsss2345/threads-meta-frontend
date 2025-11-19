import type { AppDispatch, RootStateReduce } from "@/types/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeds } from "../post";
import { getCurrentUser, logout } from "./auth-slice";

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getFeeds());
  }, [dispatch]);
};

export const useCurrentUser = () => {
  const currentUser = useSelector(
    (state: RootStateReduce) => state.auth.currentUser
  );
  return currentUser;
};

export const useAuth = () => {
  const { currentUser, loadingUser } = useSelector(
    (state: RootStateReduce) => state.auth
  );

  return {
    user: currentUser,
    loadingUser,
    isAuthenticated: !!currentUser,
  };
};
export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const login = () => dispatch(logout());
  return { login };
};
