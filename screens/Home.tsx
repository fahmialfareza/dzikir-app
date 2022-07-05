import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  StyleSheet,
  View,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import screenMode from '../constants/screenMode';

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

  const selectMenuHandler = (routeName: string) => {
    navigation.navigate(routeName, {});
  };

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <StatusBar />

      <View style={styles.row}>
        <View style={styles.topRowContent}></View>
        <View style={styles.topRowContent}>
          <Image
            source={require('../assets/images/home-ayah.png')}
            style={styles.imageTopRowContent}
          ></Image>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.buttonMenu}>
          <ButtonMenu
            backgroundColor="#FF4444"
            color="#FFFFFF"
            text="Al-Qur'an"
            imageSource={require('../assets/icons/alquran.png')}
            onPress={() => selectMenuHandler("Al-Qur'an")}
          />
          <ButtonMenu
            backgroundColor="#FFB648"
            color="#FFFFFF"
            text="Jadwal Sholat"
            imageSource={require('../assets/icons/shalat-time.png')}
            onPress={() => selectMenuHandler('Schedule')}
          />
        </View>
        <View style={styles.buttonMenu}>
          <ButtonMenu
            backgroundColor="#3D3FB8"
            color="#FFFFFF"
            text="Al-Matsurat"
            imageSource={require('../assets/icons/almatsurat.png')}
            onPress={() => selectMenuHandler('Al-Matsurat')}
          />
          <ButtonMenu
            backgroundColor="#7D2DFF"
            color="#FFFFFF"
            text="Dzikir"
            imageSource={require('../assets/icons/dzikir.png')}
            onPress={() => selectMenuHandler('Dzikir')}
          />
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
    width: Dimensions.get('window').width - 40,
    borderRadius: 10,
  },
  buttonMenu: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: -20,
  },
});

export default Home;
