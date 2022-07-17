import { combineReducers } from 'redux';

import tasbeehTarget from './tasbeehTarget';
import morningAfternoonDzikir from './morningAfternoonDzikir';

export default combineReducers({
  tasbeehTarget,
  morningAfternoonDzikir,
});
