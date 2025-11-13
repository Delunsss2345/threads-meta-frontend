import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Column {
  id: number;
  pathName: string;
}

interface ColumnState {
  columns: Column[];
}

const initialState: ColumnState = {
  columns: JSON.parse(localStorage.getItem("columns") || "[]") || [
    { id: 1, pathName: "/" },
  ],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
      localStorage.setItem("columns", JSON.stringify(state.columns));
    },
    removeColumn(state, action: PayloadAction<number>) {
      state.columns = state.columns.filter((i) => i.id !== action.payload);
      localStorage.setItem("columns", JSON.stringify(state.columns));
    },
    clearColumns(state) {
      state.columns = [{ id: 1, pathName: "/" }];
      localStorage.setItem("columns", JSON.stringify(state.columns));
    },
  },
});

export const { addColumn } = columnsSlice.actions;

export default columnsSlice.reducer;
