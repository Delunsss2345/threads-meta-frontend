import type { RootState } from "@/types/redux";

export const selectModalState = (state: RootState) => state.modal;

export const selectActiveModal = (state: RootState) =>
  selectModalState(state).modal;
