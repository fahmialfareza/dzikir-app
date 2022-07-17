import { configureStore } from '@reduxjs/toolkit';
// import reducers
import rootReducers from './reducers';

const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;