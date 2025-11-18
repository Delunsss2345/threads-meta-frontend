import type { rootReducer, store } from "@/store";

export type RootStateReduce = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
