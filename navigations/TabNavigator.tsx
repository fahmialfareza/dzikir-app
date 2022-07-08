import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, useColorScheme, StyleProp, ViewStyle } from 'react-native';

import screenMode from '../constants/screenMode';
import {
  AlMatsuratIcon,
  AlQuranIcon,
  DzikirIcon,
  HomeIcon,
  ShalatTimeIcon,
} from '../constants/assets';

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from '../screens/Home';
import AlQuranScreen, {
  screenOptions as alQuranScreenOptions,
} from '../screens/AlQuran';
import ShalatTimeScreen, {
  screenOptions as shalatTimeScreenOptions,
} from '../screens/ShalatTime';

import AlMatsuratNavigator from './AlMatsuratNavigator';
import DzikirNavigator from './DzikirNavigator';

interface TabNavigatorProps {
  routeName?: string;
}

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ({ routeName }: TabNavigatorProps) => {
  const colorScheme = useColorScheme();

  const hiddenRouteName: object = {
    DzikirDetails: true,
  };

  const defaultStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#3D3FB8',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  };

  const [barStyle, setBarStyle] = useState<StyleProp<ViewStyle>>({
    ...defaultStyle,
    display: 'flex',
  });

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  useEffect(() => {
    if (
      hiddenRouteName.hasOwnProperty(routeName || 'Screen Will Never Found')
    ) {
      setBarStyle({
        ...defaultStyle,
        display: 'none',
      });
    } else {
      setBarStyle({
        ...defaultStyle,
        display: 'flex',
      });
    }
  }, [routeName]);

  return (
    <Tab.Navigator
      barStyle={barStyle}
      inactiveColor="#FFF"
      activeColor="#FFF"
      labeled={true}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Al-Qur'an"
        component={AlQuranScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <AlQuranIcon width={24} height={24} color={color} />
            </View>
          ),
          ...alQuranScreenOptions,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Schedule"
        component={ShalatTimeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <ShalatTimeIcon width={24} height={24} color={color} />
            </View>
          ),
          tabBarLabel: 'Jadwal',
          ...shalatTimeScreenOptions,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 60,
                height: 60,
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
                ...themeContainerStyle,
                top: -25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <HomeIcon
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  top: 10,
                }}
              />
            </View>
          ),
          tabBarLabel: '',
          ...homeScreenOptions,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Al-Matsurat"
        component={AlMatsuratNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <AlMatsuratIcon width={24} height={24} />
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Dzikir"
        component={DzikirNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <DzikirIcon width={24} height={24} />
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
