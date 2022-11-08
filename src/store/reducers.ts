import { combineReducers } from "@reduxjs/toolkit";
import { appSlice } from "./app/reducer";

const rootReducer = combineReducers({
  app: appSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
