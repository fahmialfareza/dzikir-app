import { AnyAction } from 'redux';

import {
  GET_DZIKIR_TARGETS,
  GET_DZIKIR_TARGETS_DETAILS,
  ADD_DZIKIR_TARGET,
  UPDATE_DZIKIR_TARGET,
  DELETE_DZIKIR_TARGET,
} from '../types';

import DzikirTarget from '../../models/dzikirTarget';

interface DzikirTargetState {
  dzikirTargets: DzikirTarget[];
  dzikirTargetDetails: DzikirTarget | null;
}

const initialState: DzikirTargetState = {
  dzikirTargets: [],
  dzikirTargetDetails: null,
};

const dzikirTargetReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_DZIKIR_TARGET:
      const addDzikirState: DzikirTargetState = {
        ...state,
        dzikirTargets: [...state.dzikirTargets, action.payload],
        dzikirTargetDetails: null,
      };

      return addDzikirState;
    case GET_DZIKIR_TARGETS:
      const getTargetsState: DzikirTargetState = {
        ...state,
        dzikirTargets: action.payload,
        dzikirTargetDetails: null,
      };

      return getTargetsState;
    case GET_DZIKIR_TARGETS_DETAILS:
      const getTargetDetailsState: DzikirTargetState = {
        ...state,
        dzikirTargetDetails: action.payload,
      };

      return getTargetDetailsState;
    case UPDATE_DZIKIR_TARGET:
      const updateTargetState: DzikirTargetState = {
        ...state,
        dzikirTargets: state.dzikirTargets.map((dzikirTarget) => {
          if (dzikirTarget.id === action.payload.id) {
            return action.payload;
          }
          return dzikirTarget;
        }),
        dzikirTargetDetails: null,
      };

      return updateTargetState;
    case DELETE_DZIKIR_TARGET:
      const deleteTargetState: DzikirTargetState = {
        ...state,
        dzikirTargets: state.dzikirTargets.filter(
          (dzikirTarget) => dzikirTarget.id !== action.payload.id
        ),
        dzikirTargetDetails: null,
      };

      return deleteTargetState;
    default:
      return state;
  }
};

export default dzikirTargetReducer;
