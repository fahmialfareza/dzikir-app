import TasbeehTarget from '../models/tasbeehTarget';
import AlMatsurat from '../models/alMatsurat';

// Tasbeeh Target
export interface TasbeehTargetState {
  tasbeehTargets: TasbeehTarget[];
  tasbeehTargetDetails: TasbeehTarget | null;
}

export const GET_TASBEEH_TARGETS = 'GET_TASBEEH_TARGETS';
export const ADD_TASBEEH_TARGET = 'ADD_TASBEEH_TARGET';
export const UPDATE_TASBEEH_TARGET = 'UPDATE_TASBEEH_TARGET';
export const DELETE_TASBEEH_TARGET = 'DELETE_TASBEEH_TARGET';

// Dzikir & Dua
export interface AlMatsuratState {
  morningDzikir: AlMatsurat[];
  eveningDzikir: AlMatsurat[];
}

export const GET_AL_MATSURAT = 'GET_AL_MATSURAT';
