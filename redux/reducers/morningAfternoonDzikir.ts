import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

import {
  MorningAfternoonDzikirState,
} from '../types';

const initialState: MorningAfternoonDzikirState = {
  morningDzikir: [],
  eveningDzikir: [],
};

const morningAfternoonDzikirSlicer = createSlice({
  name: 'morningAfternoonDzikir',
  initialState,
  reducers: {
    setMorningAfternoonDzikir: (state, action) => {
      state.morningDzikir = action.payload;
    },
    setEveningAfternoonDzikir: (state, action) => {
      state.eveningDzikir = action.payload;
    }
  }
});

export const { setMorningAfternoonDzikir, setEveningAfternoonDzikir } = morningAfternoonDzikirSlicer.actions;

export const selectMorningAfternoonDzikir = (state: RootState) => state.morningAfternoonDzikir;

export default morningAfternoonDzikirSlicer.reducer;