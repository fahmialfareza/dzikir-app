import React, { useState, useEffect, useCallback } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import AppNavigator from './navigations/AppNavigator';
import store from './redux';

import {
  init,
  fetchDetailsDzikirTarget,
  insertDzikirTarget,
} from './helpers/db';

import dzikirData from './constants/data/dzikirData';

const fetchFonts = () => {
  return Font.loadAsync({
    'dubai-regular': require('./assets/fonts/Dubai-Regular.ttf'),
    'dubai-bold': require('./assets/fonts/Dubai-Bold.ttf'),
    'dubai-light': require('./assets/fonts/Dubai-Light.ttf'),
    'dubai-medium': require('./assets/fonts/Dubai-Medium.ttf'),
    'ds-digi': require('./assets/fonts/ds-digi.ttf'),
    'ds-digib': require('./assets/fonts/ds-digib.ttf'),
    'ds-digii': require('./assets/fonts/ds-digii.ttf'),
    'ds-digit': require('./assets/fonts/ds-digit.ttf'),
  });
};

(async () => {
  try {
    await init();
    console.log('Initialized database');

    // Find data where id = 1 to id = 5
    const dataIds = [1, 2, 3, 4, 5];
    for await (const dzikir of dzikirData) {
      const data = await fetchDetailsDzikirTarget(dzikir.id);

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
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
