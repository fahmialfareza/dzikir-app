import { Dispatch } from "react";
import { AnyAction } from "redux";

import { EveryDaysDuaFilters } from "../types";

import EveryDaysDua, { Tag } from "../../models/everyDaysDua";

import EveryDaysDuaData from "../../constants/data/everyDaysDuaData";

import isEmptyOrSpaces from "../../helpers/isEmptyOrSpaces";

import { setEveryDaysDua } from "../reducers/everyDaysDua";

class EveryDaysDuaActions {
  static getEveryDaysDua(
    search: string,
    filter: EveryDaysDuaFilters = { before: false, after: false }
  ) {
    return async (dispatch: Dispatch<AnyAction>) => {
      try {
        const regexSearch = new RegExp(`\\b${search}`, "i");
        const data: EveryDaysDua[] = EveryDaysDuaData;
        dispatch(
          setEveryDaysDua(
            data.filter((everyDaysDua) => {
              if (isEmptyOrSpaces(search)) {
                if (filter.before && !filter.after) {
                  return everyDaysDua.tag === Tag.before;
                } else if (filter.after && !filter.before) {
                  return everyDaysDua.tag === Tag.after;
                }

                return true;
              } else {
                if (filter.before && !filter.after) {
                  return (
                    regexSearch.test(everyDaysDua.dua) &&
                    everyDaysDua.tag === Tag.before
                  );
                } else if (filter.after && !filter.before) {
                  return (
                    regexSearch.test(everyDaysDua.dua) &&
                    everyDaysDua.tag === Tag.after
                  );
                }

                return regexSearch.test(everyDaysDua.dua);
              }
            })
          )
        );
      } catch (error) {
        // Add toastify
        throw error;
      }
    };
  }
}

export default EveryDaysDuaActions;
