import TasbeehTarget from "../models/tasbeehTarget";
import MorningAfternoonDzikir from "../models/morningAfternoonDzikir";
import EveryDaysDua from "../models/everyDaysDua";

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

export interface EveryDaysDuaState {
  everyDaysDua: EveryDaysDua[];
}

export interface EveryDaysDuaFilters {
  before: boolean;
  after: boolean;
}

export const GET_EVERY_DAYS_DUA = "GET_EVERY_DAYS_DUA";
