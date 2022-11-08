import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../reducers";
import { AppState, Bill } from "./types";

export const initialState: AppState = {
  bills: [],
  grandTotal: 0,
};

export const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addBill: (
      state,
      action: PayloadAction<{ bills: Bill[]; grandTotal: number }>
    ) => {
      state.bills = action.payload.bills;
      state.grandTotal = action.payload.grandTotal;
    },
  },
});

export const { addBill } = appSlice.actions;

export const appSelector = (state: RootState) => state.app;
