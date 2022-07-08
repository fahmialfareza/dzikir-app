import { AnyAction } from 'redux';
import AlMatsurat from '../../models/alMatsurat';

import { GET_AL_MATSURAT, AlMatsuratState } from '../types';

const initialState: AlMatsuratState = {
  morningDzikir: [],
  eveningDzikir: [],
};

const alMatsuratReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_AL_MATSURAT:
      const alMatsurat: AlMatsurat[] = action.payload;

      const getTargetsState: AlMatsuratState = {
        ...state,
        morningDzikir: alMatsurat.filter((dzikir) => {
          return dzikir.time === 'pagi' || dzikir.time === '';
        }),
        eveningDzikir: alMatsurat.filter((dzikir) => {
          return dzikir.time === 'petang' || dzikir.time === '';
        }),
      };

      return getTargetsState;
    default:
      return state;
  }
};

export default alMatsuratReducer;
