import DzikirTarget from '../models/dzikirTarget';
import AlMatsurat from '../models/alMatsurat';

// Dzikir Target
export interface DzikirTargetState {
  dzikirTargets: DzikirTarget[];
  dzikirTargetDetails: DzikirTarget | null;
}

export const GET_DZIKIR_TARGETS = 'GET_DZIKIR_TARGETS';
export const ADD_DZIKIR_TARGET = 'ADD_DZIKIR_TARGET';
export const UPDATE_DZIKIR_TARGET = 'UPDATE_DZIKIR_TARGET';
export const DELETE_DZIKIR_TARGET = 'DELETE_DZIKIR_TARGET';

// Al-Matsurat
export interface AlMatsuratState {
  morningDzikir: AlMatsurat[];
  eveningDzikir: AlMatsurat[];
}

export const GET_AL_MATSURAT = 'GET_AL_MATSURAT';
