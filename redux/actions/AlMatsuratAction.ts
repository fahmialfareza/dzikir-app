import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { setEveningDzikir, setMorningDzikir } from "../reducers/alMatsuratReducer";
import AlMatsuratData from '../../constants/data/alMatsuratData';

class AlMatsuratAction {
  static getAlMatsurat() {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      try {
        const alMatsurat = AlMatsuratData;
        dispatch(setMorningDzikir(alMatsurat.filter((dzikir) => dzikir.time === 'pagi' || dzikir.time === '')));
        dispatch(setEveningDzikir(alMatsurat.filter((dzikir) => dzikir.time === 'petang' || dzikir.time === '')));
      } catch (error) {
        // Add toastify
        throw error;
      }
    }
  }
}

export default AlMatsuratAction;