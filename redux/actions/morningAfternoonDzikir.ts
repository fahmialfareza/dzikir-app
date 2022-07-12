import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { GET_AL_MATSURAT } from '../types';

import MorningAfternoonDzikir from '../../models/morningAfternoonDzikir';

import MorningAfternoonDzikirData from '../../constants/data/morningAfternoonDzikirData';

export const getMorningAfternoonDzikir =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const data: MorningAfternoonDzikir[] = MorningAfternoonDzikirData;

      dispatch({
        type: GET_AL_MATSURAT,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };
