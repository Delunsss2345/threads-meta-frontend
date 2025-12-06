import type { AppDispatch } from "@/types/redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeeds } from "../post";
import { selectAuthState, selectCurrentUser } from "./selectors";
import { getCurrentUser, logout, resetAuthLoading } from "./slice";

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
  const { currentUser, authLoading } = useSelector(selectAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetAuthLoading());
  }, [dispatch]);
  return {
    user: currentUser,
    authLoading,
    isAuthenticated: !!currentUser,
  };
};
export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const login = () => dispatch(logout());
  return { login };
};
