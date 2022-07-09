import { AnyAction } from 'redux';

import {
  GET_TASBEEH_TARGETS,
  ADD_TASBEEH_TARGET,
  UPDATE_TASBEEH_TARGET,
  DELETE_TASBEEH_TARGET,
  TasbeehTargetState,
} from '../types';

const initialState: TasbeehTargetState = {
  tasbeehTargets: [],
  tasbeehTargetDetails: null,
};

const tasbeehTargetReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TASBEEH_TARGET:
      const addTasbeehState: TasbeehTargetState = {
        ...state,
        tasbeehTargets: [...state.tasbeehTargets, action.payload],
        tasbeehTargetDetails: null,
      };

      return addTasbeehState;
    case GET_TASBEEH_TARGETS:
      const getTargetsState: TasbeehTargetState = {
        ...state,
        tasbeehTargets: action.payload,
        tasbeehTargetDetails: null,
      };

      return getTargetsState;
    case UPDATE_TASBEEH_TARGET:
      const updateTargetState: TasbeehTargetState = {
        ...state,
        tasbeehTargets: state.tasbeehTargets.map((tasbeehTarget) => {
          if (tasbeehTarget.id === action.payload.id) {
            return action.payload;
          }
          return tasbeehTarget;
        }),
        tasbeehTargetDetails: null,
      };

      return updateTargetState;
    case DELETE_TASBEEH_TARGET:
      const deleteTargetState: TasbeehTargetState = {
        ...state,
        tasbeehTargets: state.tasbeehTargets.filter(
          (tasbeehTarget) => tasbeehTarget.id !== action.payload
        ),
        tasbeehTargetDetails: null,
      };

      return deleteTargetState;
    default:
      return state;
  }
};

export default tasbeehTargetReducer;
