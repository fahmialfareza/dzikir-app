import { combineReducers } from 'redux';

import tasbeehTarget from './tasbeehTarget';
import alMatsurat from './alMatsurat';
import AlMatsuratReducer from './alMatsuratReducer';

export default combineReducers({
  tasbeehTarget,
  alMatsurat,
  alMatsuratReducer: AlMatsuratReducer
});
