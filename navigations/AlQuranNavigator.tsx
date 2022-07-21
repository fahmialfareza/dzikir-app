import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

import AlQuran, {
  screenOptions as alQuranOptions,
} from "../screens/alQuran/AlQuran";

const defaultAlQuranScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
};

const Stack = createNativeStackNavigator();

const AlQuranNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={defaultAlQuranScreenOptions}>
      <Stack.Screen
        name="AlQuran"
        component={AlQuran}
        options={alQuranOptions}
      />
    </Stack.Navigator>
  );
};

export default AlQuranNavigator;
