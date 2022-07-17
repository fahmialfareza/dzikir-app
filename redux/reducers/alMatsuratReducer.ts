import { createSlice } from "@reduxjs/toolkit";

interface AlMatsuratState {
  morningDzikir: [];
  eveningDzikir: [];
}

const initialState = {
  morningDzikir: [],
  eveningDzikir: [],
} as AlMatsuratState;

const alMatsuratSlice = createSlice({
  name: "alMatsuratReducer",
  initialState: initialState,
  reducers: {
    setMorningDzikir: (state, action) => {
      state.morningDzikir = action.payload;
    },
    setEveningDzikir: (state, action) => {
      state.eveningDzikir = action.payload;
    }
  }
});

export const { setMorningDzikir, setEveningDzikir } = alMatsuratSlice.actions;

export const selectAlMatsurat = (state: any) => state.alMatsurat;

export default alMatsuratSlice.reducer;
