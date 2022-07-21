import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

import SalatTime, {
  screenOptions as salatTimeOptions,
} from "../screens/salatTime/SalatTime";

const defaultSalatTimeScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
};

const Stack = createNativeStackNavigator();

const SalatTimeNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={defaultSalatTimeScreenOptions}>
      <Stack.Screen
        name="SalatTime"
        component={SalatTime}
        options={salatTimeOptions}
      />
    </Stack.Navigator>
  );
};

export default SalatTimeNavigator;
