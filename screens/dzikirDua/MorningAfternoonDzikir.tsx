import React, { useState, useEffect } from 'react';
import {
  ColorSchemeName,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import screenMode from '../../constants/screenMode';

import MorningAfternoonDzikirModel from '../../models/morningAfternoonDzikir';

import HeaderDzikirDua from '../../components/dzikirDua/HeaderDzikirDua';
import HeaderDzikirDuaOptions, {
  HeaderDzikirDuaState,
} from '../../components/dzikirDua/HeaderDzikirDuaOptions';
import DzikirDuaItem from '../../components/dzikirDua/DzikirDuaItem';

import { getData, storeData } from '../../helpers/asyncStorage';

interface MorningAfternoonDzikirProps {
  route: RouteProp<
    { params: { title: string; data: MorningAfternoonDzikirModel[] } },
    'params'
  >;
}

function MorningAfternoonDzikir({ route }: MorningAfternoonDzikirProps) {
  const colorScheme = useColorScheme();

  const [optionsState, setOptionsState] = useState<HeaderDzikirDuaState>({
    arabic: true,
    latin: true,
    meaning: true,
  });

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const insect = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const [arabic, latin, meaning] = await Promise.all([
        getData('arabic'),
        getData('latin'),
        getData('meaning'),
      ]);

      if (
        arabic === undefined ||
        latin === undefined ||
        meaning === undefined
      ) {
        await Promise.all([
          storeData('arabic', 'true'),
          storeData('latin', 'true'),
          storeData('meaning', 'true'),
        ]);

        setOptionsState({
          arabic: true,
          latin: true,
          meaning: true,
        });

        return;
      }

      setOptionsState({
        arabic: arabic === 'true',
        latin: latin === 'true',
        meaning: meaning === 'true',
      });
    })();
  }, []);

  useEffect(() => {
    storeData('arabic', String(optionsState.arabic));
    storeData('latin', String(optionsState.latin));
    storeData('meaning', String(optionsState.meaning));
  }, [optionsState]);

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <ScrollView>
        <HeaderDzikirDua title={route.params.title} />

        <HeaderDzikirDuaOptions
          state={optionsState}
          setState={setOptionsState}
        />

        {route?.params?.data?.map((data) => (
          <DzikirDuaItem
            arabic={data.arabic}
            arabic_latin={data.arabic_latin}
            meaning_id={data.translated_id}
            note={data.note}
            state={optionsState}
            key={data.id}
          />
        ))}

        <View style={{ marginBottom: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

export const screenOptions = (props: {
  navigation: any;
  route: RouteProp<{ params: { title: string; mode: ColorSchemeName } }, any>;
}): NativeStackNavigationOptions => {
  return {
    headerTitle: props?.route?.params?.title || 'Dzikir Pagi Petang',
    headerShown: true,
    headerStyle: {
      backgroundColor: '##3D3FB8',
    },
    headerTintColor:
      Platform.OS === 'android'
        ? '#FFFFFF'
        : props.route.params?.mode === 'light'
        ? '#000000'
        : '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'dubai-regular',
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
  },
  buttonMenu: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: -20,
  },
  buttonMenuImage: {
    marginBottom: 4,
  },
});

export default MorningAfternoonDzikir;
