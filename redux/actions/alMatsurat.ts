import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { GET_AL_MATSURAT } from '../types';

import AlMatsurat from '../../models/alMatsurat';

import AlMatsuratData from '../../constants/data/alMatsuratData';

export const getAlMatsurat =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const data: AlMatsurat[] = AlMatsuratData;

      dispatch({
        type: GET_AL_MATSURAT,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };
