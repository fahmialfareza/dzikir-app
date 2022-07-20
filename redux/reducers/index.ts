import { combineReducers } from "redux";

import tasbeehTarget from "./tasbeehTarget";
import morningAfternoonDzikir from "./morningAfternoonDzikir";
import everyDaysDua from "./everyDaysDua";

export default combineReducers({
  tasbeehTarget,
  morningAfternoonDzikir,
  everyDaysDua,
});
