import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DzikirTargetHomeScreen, {
  screenOptions as dzikirTargetHomeScreenOptions,
} from '../screens/dzikirTarget/DzikirTargetHomeScreen';

const DzikirTargetStack = createNativeStackNavigator();

const DzikirTargetNavigator = () => {
  return (
    <DzikirTargetStack.Navigator>
      <DzikirTargetStack.Screen
        name="Dzikir Target Home"
        component={DzikirTargetHomeScreen}
        options={dzikirTargetHomeScreenOptions}
      />
    </DzikirTargetStack.Navigator>
  );
};

export default DzikirTargetNavigator;
