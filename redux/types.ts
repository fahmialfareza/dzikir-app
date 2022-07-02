export interface Action {
  type: string;
  payload: any;
}

export const GET_DZIKIR_TARGETS = 'GET_DZIKIR_TARGETS';
export const GET_DZIKIR_TARGETS_DETAILS = 'GET_DZIKIR_TARGETS_DETAILS';
export const ADD_DZIKIR_TARGET = 'ADD_DZIKIR_TARGET';
export const UPDATE_DZIKIR_TARGET = 'UPDATE_DZIKIR_TARGET';
export const DELETE_DZIKIR_TARGET = 'DELETE_DZIKIR_TARGET';
