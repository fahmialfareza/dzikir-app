import { Provider } from 'react-redux';

import AppNavigator from './navigations/AppNavigator';
import store from './redux';

import { init } from './helpers/db';

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Initializing db failed.');
    console.log(err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
