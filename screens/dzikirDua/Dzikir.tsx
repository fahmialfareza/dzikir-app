import React, { useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import screenMode from '../../constants/screenMode';
import ButtonMenu from '../../components/ButtonMenu';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux';
import MorningAfternoonDzikirActions from '../../redux/actions/MorningAfternoonDzikirActions';
import { selectMorningAfternoonDzikir } from '../../redux/reducers/morningAfternoonDzikir';

interface DzikirProps {
  navigation: NavigationProp<any, any>;
}

const Dzikir = ({ navigation }: DzikirProps) => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();

  const { morningDzikir, eveningDzikir } = useSelector(
    selectMorningAfternoonDzikir
  );

  useEffect(() => {
    dispatch(MorningAfternoonDzikirActions.getMorningAfternoonDzikir());
  }, []);

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const selectMenuHandler = (routeName: string, params: any) => {
    navigation.navigate(routeName, params);
  };

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={styles.row}>
        {/* <View style={styles.topRowContent}></View>
        <View style={styles.topRowContent}>
          <HomeAyahImage
            style={styles.imageTopRowContent}
            width={imageTopRowContentWidth}
          />
        </View> */}
      </View>

      <View style={styles.row}>
        <View style={styles.buttonMenu}>
          <ButtonMenu
            backgroundColor='#FF4444'
            color='#FFFFFF'
            text='Dzikir Pagi'
            onPress={() =>
              selectMenuHandler('MorningAfternoonDzikir', {
                title: 'Dzikir Pagi',
                data: morningDzikir,
              })
            }
          >
            {/* <AlQuranIcon
              width={buttonMenuIconWidth}
              style={styles.buttonMenuImage}
            /> */}
          </ButtonMenu>
          <ButtonMenu
            backgroundColor='#FFB648'
            color='#FFFFFF'
            text='Dzikir Petang'
            onPress={() =>
              selectMenuHandler('MorningAfternoonDzikir', {
                title: 'Dzikir Petang',
                data: eveningDzikir,
              })
            }
          >
            {/* <ShalatTimeIcon
              width={buttonMenuIconWidth}
              style={styles.buttonMenuImage}
            /> */}
          </ButtonMenu>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: 'Dzikir & Doa',
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

export default Dzikir;
