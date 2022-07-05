import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image, View, useColorScheme } from 'react-native';

import screenMode from '../constants/screenMode';

import HomeScreen, {
  screenOptions as homeScreenOptions,
} from '../screens/Home';
import AlQuranScreen, {
  screenOptions as alQuranScreenOptions,
} from '../screens/AlQuran';
import ShalatTimeScreen, {
  screenOptions as shalatTimeScreenOptions,
} from '../screens/ShalatTime';
import AlMatsuratScreen, {
  screenOptions as alMatsuratScreenOptions,
} from '../screens/AlMatsurat';
import DzikirScreen, {
  screenOptions as dzikirScreenOptions,
} from '../screens/Dzikir';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  return (
    <Tab.Navigator
      barStyle={{
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: '#3D3FB8',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
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
              <Image
                source={require('../assets/icons/alquran.png')}
                fadeDuration={0}
                resizeMode="contain"
                style={{ width: 24, height: 24, tintColor: color }}
              />
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
              <Image
                source={require('../assets/icons/shalat-time.png')}
                fadeDuration={0}
                resizeMode="contain"
                style={{ width: 24, height: 24, tintColor: color }}
              />
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
              <Image
                source={require('../assets/icons/home.png')}
                resizeMode="contain"
                fadeDuration={0}
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
        component={AlMatsuratScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={require('../assets/icons/almatsurat.png')}
                fadeDuration={0}
                resizeMode="contain"
                style={{ width: 24, height: 24, tintColor: color }}
              />
            </View>
          ),
          ...alMatsuratScreenOptions,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Dzikir"
        component={DzikirScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Image
                source={require('../assets/icons/dzikir.png')}
                fadeDuration={0}
                resizeMode="contain"
                style={{ width: 24, height: 24, tintColor: color }}
              />
            </View>
          ),
          ...dzikirScreenOptions,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const barStyle = {
  position: 'absolute',
  overflow: 'hidden',
  backgroundColor: '#3D3FB8',
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
};

export default TabNavigator;
