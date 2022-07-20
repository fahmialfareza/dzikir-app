import { Dispatch } from "react";
import { AnyAction } from "redux";

import MorningAfternoonDzikir from "../../models/morningAfternoonDzikir";

import MorningAfternoonDzikirData from "../../constants/data/morningAfternoonDzikirData";

import {
  setEveningAfternoonDzikir,
  setMorningAfternoonDzikir,
} from "../reducers/morningAfternoonDzikir";

class MorningAfternoonDzikirActions {
  static getMorningAfternoonDzikir() {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const data: MorningAfternoonDzikir[] = MorningAfternoonDzikirData;
        dispatch(
          setMorningAfternoonDzikir(
            data.filter(
              (dzikir) => dzikir.time === "pagi" || dzikir.time === ""
            )
          )
        );
        dispatch(
          setEveningAfternoonDzikir(
            data.filter(
              (dzikir) => dzikir.time === "petang" || dzikir.time === ""
            )
          )
        );
      } catch (error) {
        // Add toastify
        throw error;
      }
    };
  }
}

export default MorningAfternoonDzikirActions;
