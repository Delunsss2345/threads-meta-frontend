import type { AppDispatch } from "@/types/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeds } from "../post";
import { getCurrentUser, logout } from "./auth-slice";
import { selectAuthLoadingUser, selectCurrentUser } from "./selector";

export const useFetchCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getFeeds());
  }, [dispatch]);
};

export const useCurrentUser = () => {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser;
};

export const useAuth = () => {
  const currentUser = useSelector(selectCurrentUser);
  const loadingUser = useSelector(selectAuthLoadingUser);

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
