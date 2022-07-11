import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import Tasbeeh, {
  screenOptions as tasbeehScreenOptions,
} from '../screens/tasbeeh/Tasbeeh';
import TasbeehCounter, {
  screenOptions as tasbeehCounterScreenOptions,
} from '../screens/tasbeeh/TasbeehCounter';

const defaultTasbeehScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const TasbeehNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultTasbeehScreenOptions}>
      <Stack.Screen
        name="TasbeehMenu"
        component={Tasbeeh}
        options={tasbeehScreenOptions}
      />
      <Stack.Screen
        name="TasbeehDetails"
        component={TasbeehCounter}
        options={tasbeehCounterScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default TasbeehNavigator;
