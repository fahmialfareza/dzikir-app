import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import Dzikir, {
  screenOptions as dzikirScreenOptions,
} from '../screens/dzikir/Dzikir';
import DzikirCounter, {
  screenOptions as dzikirCounterScreenOptions,
} from '../screens/dzikir/DzikirConter';

const defaultDzikirScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const DzikirNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultDzikirScreenOptions}>
      <Stack.Screen
        name="DzikirMenu"
        component={Dzikir}
        options={dzikirScreenOptions}
      />
      <Stack.Screen
        name="DzikirDetails"
        component={DzikirCounter}
        options={dzikirCounterScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default DzikirNavigator;
