import TasbeehTarget from "../models/tasbeehTarget";
import MorningAfternoonDzikir from "../models/morningAfternoonDzikir";

// Tasbeeh Target
export interface TasbeehTargetState {
  tasbeehTargets: TasbeehTarget[];
  tasbeehTargetDetails: TasbeehTarget | null;
}

export const GET_TASBEEH_TARGETS = "GET_TASBEEH_TARGETS";
export const ADD_TASBEEH_TARGET = "ADD_TASBEEH_TARGET";
export const UPDATE_TASBEEH_TARGET = "UPDATE_TASBEEH_TARGET";
export const DELETE_TASBEEH_TARGET = "DELETE_TASBEEH_TARGET";

// Dzikir & Dua
export interface MorningAfternoonDzikirState {
  morningDzikir: MorningAfternoonDzikir[];
  eveningDzikir: MorningAfternoonDzikir[];
}

export const GET_MORNING_AFTERNOON_DZIKIR = "GET_MORNING_AFTERNOON_DZIKIR";
