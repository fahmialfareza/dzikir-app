import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import {
  fetchDetailsTasbeehTarget,
  fetchTasbeehTargets,
  insertTasbeehTarget,
  updateTasbeehTarget as updateTasbeehTargetDB,
  deleteTasbeehTarget as deleteTasbeehTargetDB,
} from '../../helpers/db';
import TasbeehTarget from '../../models/tasbeehTarget';
import {
  addTasbeehTarget,
  deleteTasbeehTarget,
  setTasbehTargets,
  updateTasbeehTarget,
} from '../reducers/tasbeehTarget';

class TasbeehTargetActions {
  static addTasbeehTarget(items: TasbeehTarget) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const insertedData = await insertTasbeehTarget(
          items.title,
          items.target,
          items.arabic || '',
          items.background || '',
          items.color || ''
        );

        const data = await fetchDetailsTasbeehTarget(insertedData.insertId!);

        dispatch(addTasbeehTarget(data));
      } catch (error) {
        // Add toastify
        throw error;
      }
    };
  }

  static getTasbeehTargets() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const data: TasbeehTarget[] = await fetchTasbeehTargets();

        dispatch(setTasbehTargets(data));
      } catch (error) {
        // Add toastify
        throw error;
      }
    };
  }

  static updateTasbeehTarget(items: TasbeehTarget) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        await updateTasbeehTargetDB(
          items.id,
          items.title,
          items.target,
          items.arabic || '',
          items.background || '',
          items.color || '',
          items.counter
        );

        dispatch(updateTasbeehTarget(items));
      } catch (error) {
        // Add toastify
        throw error;
      }
    };
  }

  static deleteTasbeehTarget(id: number) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        await deleteTasbeehTargetDB(id);

        dispatch(deleteTasbeehTarget(id));
      } catch (error) {
        // Add toastify
        throw error;
      }
    };
  }
}

export default TasbeehTargetActions;
