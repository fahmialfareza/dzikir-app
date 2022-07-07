import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigations/AppNavigator';
import store from './redux';

import {
  init,
  fetchDetailsDzikirTargets,
  insertDzikirTarget,
} from './helpers/db';

import dzikirData from './constants/dzikirData';

(async () => {
  try {
    await init();
    console.log('Initialized database');

    // Find data where id = 1 to id = 5
    const dataIds = [1, 2, 3, 4, 5];
    for await (const dzikir of dzikirData) {
      const data = await fetchDetailsDzikirTargets(dzikir.id);

      if (!data) {
        await insertDzikirTarget(
          dzikir.title,
          dzikir.target,
          dzikir.arabic!,
          dzikir.background!,
          dzikir.color!
        );
      }
    }
  } catch (error) {
    console.log('Initializing db failed.');
    console.log(error);
  }
})();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
