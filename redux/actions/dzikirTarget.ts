import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  GET_DZIKIR_TARGETS,
  ADD_DZIKIR_TARGET,
  UPDATE_DZIKIR_TARGET,
  DELETE_DZIKIR_TARGET,
} from '../types';
import {
  insertDzikirTarget,
  fetchDzikirTargets,
  updateDzikirTarget as updateDzikirTargetDB,
  deleteDzikirTarget as deleteDzikirTargetDB,
  fetchDetailsDzikirTarget,
} from '../../helpers/db';

import DzikirTarget from '../../models/dzikirTarget';

export const addDzikirTarget =
  (
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string
  ) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const insertedData = await insertDzikirTarget(
        title,
        target,
        arabic,
        background,
        color
      );

      const data = await fetchDetailsDzikirTarget(insertedData.insertId!);

      dispatch({
        type: ADD_DZIKIR_TARGET,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const getDzikirTargets =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const data: DzikirTarget[] = await fetchDzikirTargets();

      dispatch({
        type: GET_DZIKIR_TARGETS,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const updateDzikirTarget =
  (
    id: number,
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string,
    counter: number
  ) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      await updateDzikirTargetDB(
        id,
        title,
        target,
        arabic,
        background,
        color,
        counter
      );

      dispatch({
        type: UPDATE_DZIKIR_TARGET,
        payload: { id, title, target, arabic, background, color, counter },
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const deleteDzikirTarget =
  (id: number) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      await deleteDzikirTargetDB(id);

      dispatch({
        type: DELETE_DZIKIR_TARGET,
        payload: id,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };
