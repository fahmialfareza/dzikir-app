import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import AlMatsurat, {
  screenOptions as alMatsuratScreenOptions,
} from '../screens/alMatsurat/AlMatsurat';

const defaultAlMatsuratScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const AlMatsuratNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultAlMatsuratScreenOptions}>
      <Stack.Screen
        name="AlMatsuratMenu"
        component={AlMatsurat}
        options={alMatsuratScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default AlMatsuratNavigator;
