import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";
import { EveryDaysDuaState } from "../types";

const initialState: EveryDaysDuaState = {
  everyDaysDua: [],
};

const everyDaysDuaSlicer = createSlice({
  name: "everyDaysDua",
  initialState,
  reducers: {
    setEveryDaysDua: (state, action) => {
      state.everyDaysDua = action.payload;
    },
  },
});

export const { setEveryDaysDua } = everyDaysDuaSlicer.actions;

export const selectEveryDaysDua = (state: RootState) => state.everyDaysDua;

export default everyDaysDuaSlicer.reducer;
