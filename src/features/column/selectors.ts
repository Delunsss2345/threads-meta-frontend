import type { RootState } from "@/types/redux";

export const selectColumnsState = (state: RootState) => state.columns;

export const selectColumns = (state: RootState) =>
  selectColumnsState(state).columns;
