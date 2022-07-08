import React, { useState } from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';

import TabNavigator from './TabNavigator';

const ref = createNavigationContainerRef();

const AppNavigator = () => {
  const [routeName, setRouteName] = useState<string>();

  return (
    <NavigationContainer
      ref={ref}
      onReady={() => {
        setRouteName(ref.getCurrentRoute()?.name);
      }}
      onStateChange={async () => {
        const currentRouteName = ref.getCurrentRoute()?.name;
        setRouteName(currentRouteName);
      }}
    >
      <TabNavigator routeName={routeName} />
    </NavigationContainer>
  );
};

export default AppNavigator;
