import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { StyleSheet, View, useColorScheme, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import screenMode from '../constants/screenMode';
import {
  DzikirDuaIcon,
  AlQuranIcon,
  TasbeehIcon,
  HomeAyahTopImage,
  HomeAyahBottomImage,
  ShalatTimeIcon,
} from '../constants/assets';

import ButtonMenu from '../components/ButtonMenu';

interface HomeProps {
  navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: HomeProps) => {
  const colorScheme = useColorScheme();

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const imageTopRowContentWidth = Dimensions.get('window').width - 40;
  const buttonMenuIconWidth = Dimensions.get('window').width / 6;

  const selectMenuHandler = (routeName: string) => {
    navigation.navigate(routeName, {});
  };

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={styles.row}>
        <View style={styles.topRowContent}>
          <HomeAyahTopImage
            style={styles.imageTopRowContent}
            width={imageTopRowContentWidth}
          />
        </View>
        <View style={styles.topRowContent}>
          <HomeAyahBottomImage
            style={styles.imageTopRowContent}
            width={imageTopRowContentWidth}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.buttonMenu}>
          <ButtonMenu
            backgroundColor="#FF4444"
            color="#FFFFFF"
            text="Al-Qur'an"
            onPress={() => selectMenuHandler("Al-Qur'an")}
          >
            <AlQuranIcon
              width={buttonMenuIconWidth}
              style={styles.buttonMenuImage}
            />
          </ButtonMenu>
          <ButtonMenu
            backgroundColor="#FFB648"
            color="#FFFFFF"
            text="Jadwal Sholat"
            onPress={() => selectMenuHandler('Schedule')}
          >
            <ShalatTimeIcon
              width={buttonMenuIconWidth}
              style={styles.buttonMenuImage}
            />
          </ButtonMenu>
        </View>
        <View style={styles.buttonMenu}>
          <ButtonMenu
            backgroundColor="#3D3FB8"
            color="#FFFFFF"
            text="Dzikir & Doa"
            onPress={() => selectMenuHandler('DzikirDua')}
          >
            <DzikirDuaIcon
              width={buttonMenuIconWidth}
              style={styles.buttonMenuImage}
            />
          </ButtonMenu>
          <ButtonMenu
            backgroundColor="#7D2DFF"
            color="#FFFFFF"
            text="Tasbih"
            onPress={() => selectMenuHandler('Tasbeeh')}
          >
            <TasbeehIcon
              width={buttonMenuIconWidth}
              style={styles.buttonMenuImage}
            />
          </ButtonMenu>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: 'Home',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
  },
  topRowContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageTopRowContent: {
    borderRadius: 10,
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

export default Home;
