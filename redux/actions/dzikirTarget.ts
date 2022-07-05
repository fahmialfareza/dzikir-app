import {
  GET_DZIKIR_TARGETS,
  GET_DZIKIR_TARGETS_DETAILS,
  ADD_DZIKIR_TARGET,
  UPDATE_DZIKIR_TARGET,
  DELETE_DZIKIR_TARGET,
} from '../types';
import {
  insertDzikirTarget,
  fetchDzikirTargets,
  updateDzikirTarget as updateDzikirTargetDB,
  deleteDzikirTarget as deleteDzikirTargetDB,
  fetchDetailsDzikirTargets,
} from '../../helpers/db';
import { Dispatch } from 'redux';
import DzikirTarget from '../../models/dzikirTarget';

export const addDzikirTarget =
  (title: string, target: number) => async (dispatch: Dispatch) => {
    try {
      const data: DzikirTarget = await insertDzikirTarget(title, target);

      dispatch({
        type: ADD_DZIKIR_TARGET,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const getDzikirTargets = () => async (dispatch: Dispatch) => {
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

export const getDetailsDzikirTarget =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      const data: DzikirTarget = await fetchDetailsDzikirTargets(id);

      dispatch({
        type: GET_DZIKIR_TARGETS_DETAILS,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const updateDzikirTarget =
  (id: number, title: string, target: number) => async (dispatch: Dispatch) => {
    try {
      await updateDzikirTargetDB(id, title, target);

      dispatch({
        type: UPDATE_DZIKIR_TARGET,
        payload: { id, title, target },
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };

export const deleteDzikirTarget =
  (id: number) => async (dispatch: Dispatch) => {
    try {
      const data: DzikirTarget = await deleteDzikirTargetDB(id);

      dispatch({
        type: DELETE_DZIKIR_TARGET,
        payload: data,
      });
    } catch (error) {
      // Add toastify
      throw error;
    }
  };
