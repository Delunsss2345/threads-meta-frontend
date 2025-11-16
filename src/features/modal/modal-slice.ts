import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";

interface ModalState {
  modal: () => ReactNode | null;
}

const initialState: ModalState = {
  modal: () => null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<{ modal: () => ReactNode }>) => {
      state.modal = action.payload.modal;
    },
    hideModal: (state) => {
      state.modal = () => null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
