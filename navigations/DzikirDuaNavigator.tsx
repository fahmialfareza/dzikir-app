import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

import Dzikir, {
  screenOptions as dzikirScreenOptions,
} from "../screens/dzikirDua/Dzikir";
import MorningAfternoonDzikir, {
  screenOptions as morningAfternoonDzikirScreenOptions,
} from "../screens/dzikirDua/MorningAfternoonDzikir";
import EveryDaysDua, {
  screenOptions as everyDaysDuaScreenOptions,
} from "../screens/dzikirDua/EveryDaysDua";

const defaultDzikirScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const DzikirDuaNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator screenOptions={defaultDzikirScreenOptions}>
      <Stack.Screen
        name="DzikirMenu"
        component={Dzikir}
        options={dzikirScreenOptions}
      />
      <Stack.Screen
        name="MorningAfternoonDzikir"
        component={MorningAfternoonDzikir}
        initialParams={{ mode: colorScheme }}
        options={morningAfternoonDzikirScreenOptions}
      />
      <Stack.Screen
        name="EveryDaysDuaHome"
        component={EveryDaysDua}
        options={everyDaysDuaScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default DzikirDuaNavigator;
