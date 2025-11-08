// import { getCurrentUser } from "@/services/auth";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

import type { RootStateReduce } from "@/types/redux.type";
import { useSelector } from "react-redux";

// export const useFetchCurrentUser = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(getCurrentUser());
//   }, [dispatch]);
// };

export const useCurrentUser = () => {
  const currentUser = useSelector(
    (state: RootStateReduce) => state.auth.currentUser
  );
  return currentUser;
};
