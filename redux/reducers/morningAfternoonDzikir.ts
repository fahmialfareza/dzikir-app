import { AnyAction } from 'redux';
import MorningAfternoonDzikir from '../../models/morningAfternoonDzikir';

import { GET_AL_MATSURAT, MorningAfternoonDzikirState } from '../types';

const initialState: MorningAfternoonDzikirState = {
  morningDzikir: [],
  eveningDzikir: [],
};

const morningAfternoonDzikirReducer = (
  state = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case GET_AL_MATSURAT:
      const morningAfternoonDzikir: MorningAfternoonDzikir[] = action.payload;

      const getTargetsState: MorningAfternoonDzikirState = {
        ...state,
        morningDzikir: morningAfternoonDzikir.filter((dzikir) => {
          return dzikir.time === 'pagi' || dzikir.time === '';
        }),
        eveningDzikir: morningAfternoonDzikir.filter((dzikir) => {
          return dzikir.time === 'petang' || dzikir.time === '';
        }),
      };

      return getTargetsState;
    default:
      return state;
  }
};

export default morningAfternoonDzikirReducer;
