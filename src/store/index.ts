import { authSlice } from "@/features/auth";
import { columnsSlice } from "@/features/column";
import { modalSlice } from "@/features/modal/modal-slice";
import type { AppDispatch, RootState } from "@/types/redux.type";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REHYDRATE,
} from "redux-persist";
import { REGISTER } from "redux-persist/es/constants";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    authSlice.reducerPath,
    columnsSlice.reducerPath,
    modalSlice.reducerPath,
  ],
};

const authPersistConfig = {
  key: authSlice.reducerPath,
  storage: storage,
  blacklist: ["fetching"],
};

export const rootReducer = combineReducers({
  [authSlice.reducerPath]: persistReducer(authPersistConfig, authSlice.reducer),
  [columnsSlice.reducerPath]: columnsSlice.reducer,
  [modalSlice.reducerPath]: modalSlice.reducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "modal/showModal",
        ],
        ignoredPaths: ["modal.modal"],
      },
    }),
});
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
const persist = persistStore(store);

export { persist, store };
