import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DzikirTargetNavigator from './DzikirTargetNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <DzikirTargetNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
