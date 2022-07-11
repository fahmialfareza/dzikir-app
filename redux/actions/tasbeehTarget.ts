import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  GET_TASBEEH_TARGETS,
  ADD_TASBEEH_TARGET,
  UPDATE_TASBEEH_TARGET,
  DELETE_TASBEEH_TARGET,
} from '../types';
import {
  insertTasbeehTarget,
  fetchTasbeehTargets,
  updateTasbeehTarget as updateTasbeehTargetDB,
  deleteTasbeehTarget as deleteTasbeehTargetDB,
  fetchDetailsTasbeehTarget,
} from '../../helpers/db';

import TasbeehTarget from '../../models/tasbeehTarget';

export const addTasbeehTarget =
  (
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string
  ) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const insertedData = await insertTasbeehTarget(
        title,
        target,
        arabic,
        background,
        color
      );

      const data = await fetchDetailsTasbeehTarget(insertedData.insertId!);

      dispatch({
        type: ADD_TASBEEH_TARGET,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const getTasbeehTargets =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const data: TasbeehTarget[] = await fetchTasbeehTargets();

      dispatch({
        type: GET_TASBEEH_TARGETS,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const updateTasbeehTarget =
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
      await updateTasbeehTargetDB(
        id,
        title,
        target,
        arabic,
        background,
        color,
        counter
      );

      dispatch({
        type: UPDATE_TASBEEH_TARGET,
        payload: { id, title, target, arabic, background, color, counter },
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const deleteTasbeehTarget =
  (id: number) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      await deleteTasbeehTargetDB(id);

      dispatch({
        type: DELETE_TASBEEH_TARGET,
        payload: id,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };
