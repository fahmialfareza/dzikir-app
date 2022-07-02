import {
  GET_DZIKIR_TARGETS,
  GET_DZIKIR_TARGETS_DETAILS,
  ADD_DZIKIR_TARGET,
  UPDATE_DZIKIR_TARGET,
  DELETE_DZIKIR_TARGET,
  Action,
} from '../types';

import DzikirTarget from '../../models/dzikirTarget';

interface InitialState {
  dzikirTargets: DzikirTarget[];
  dzikirTargetDetails: DzikirTarget | null;
}

const initialState: InitialState = {
  dzikirTargets: [],
  dzikirTargetDetails: null,
};

const dzikirTargetReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_DZIKIR_TARGET:
      return {
        ...state,
        dzikirTargets: [...state.dzikirTargets, action.payload],
        dzikirTargetDetails: null,
      };
    case GET_DZIKIR_TARGETS:
      return {
        ...state,
        dzikirTargets: action.payload,
        dzikirTargetDetails: null,
      };
    case GET_DZIKIR_TARGETS_DETAILS:
      return {
        ...state,
        dzikirTargetDetails: action?.payload[0],
      };
    case UPDATE_DZIKIR_TARGET:
      return {
        ...state,
        dzikirTargets: state.dzikirTargets.map((dzikirTarget) => {
          if (dzikirTarget.id === action.payload.id) {
            return action.payload;
          }
          return dzikirTarget;
        }),
        dzikirTargetDetails: null,
      };
    case DELETE_DZIKIR_TARGET:
      return {
        ...state,
        dzikirTargets: state.dzikirTargets.filter(
          (dzikirTarget) => dzikirTarget.id !== action.payload
        ),
        dzikirTargetDetails: null,
      };
    default:
      return state;
  }
};

export default dzikirTargetReducer;
