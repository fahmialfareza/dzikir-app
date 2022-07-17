import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { TasbeehTargetState } from "../types";

const initialState: TasbeehTargetState = {
  tasbeehTargets: [],
  tasbeehTargetDetails: null,
};

const tasbeehTargetSlicer = createSlice({
  name: "tasbeehTarget",
  initialState,
  reducers: {
    addTasbeehTarget: (state, action) => {
      state.tasbeehTargets.push(action.payload);
    },
    setTasbehTargets: (state, action) => {
      state.tasbeehTargets = action.payload;
    },
    updateTasbeehTarget: (state, action) => {
      state.tasbeehTargets = state.tasbeehTargets.map((tasbeehTarget) => {
        if (tasbeehTarget.id === action.payload.id) {
          return action.payload;
        }
        return tasbeehTarget;
      });
    },
    deleteTasbeehTarget: (state, action) => {
      state.tasbeehTargets = state.tasbeehTargets.filter(
        (tasbeehTarget) => tasbeehTarget.id !== action.payload
      );
    },
  },
});

export const {
  addTasbeehTarget,
  setTasbehTargets,
  updateTasbeehTarget,
  deleteTasbeehTarget,
} = tasbeehTargetSlicer.actions;

export const selectTasbeehTargets = (state: RootState) => state.tasbeehTarget;

export default tasbeehTargetSlicer.reducer;
