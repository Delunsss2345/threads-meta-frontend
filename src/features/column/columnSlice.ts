import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ColumnType {
  id: number;
  pathName: string;
  element: string;
}

interface ColumnState {
  columns: ColumnType[];
}

const initialState: ColumnState = {
  columns: [{ id: 1, pathName: "/", element: "Home" }],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addNewState: (state, action: PayloadAction<ColumnType[]>) => {
      state.columns = action.payload;
      localStorage.setItem("column", JSON.stringify(state.columns));
    },
    addColumn: (state, action: PayloadAction<ColumnType>) => {
      state.columns.push(action.payload);
      localStorage.setItem("column", JSON.stringify(state.columns));
    },
    removeColumn(state, action: PayloadAction<number>) {
      state.columns = state.columns.filter((i) => i.id !== action.payload);
      localStorage.setItem("columns", JSON.stringify(state.columns));
    },
  },
});

export const { addColumn } = columnsSlice.actions;

export default columnsSlice.reducer;
