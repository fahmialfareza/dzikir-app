import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { NavigationProp } from '@react-navigation/native';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import screenMode from '../../constants/screenMode';

import ButtonMenu from '../../components/ButtonMenu';

import { getMorningAfternoonDzikir } from '../../redux/actions/morningAfternoonDzikir';
import { RootState } from '../../redux';
import { MorningAfternoonDzikirState } from '../../redux/types';

interface DzikirProps {
  navigation: NavigationProp<any, any>;
  getMorningAfternoonDzikir: () => void;
  morningAfternoonDzikir: MorningAfternoonDzikirState;
}

interface DispatchProps {
  getMorningAfternoonDzikir: () => void;
}

const Dzikir = ({
  navigation,
  getMorningAfternoonDzikir,
  morningAfternoonDzikir,
}: DzikirProps) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    getMorningAfternoonDzikir();
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
            backgroundColor="#FF4444"
            color="#FFFFFF"
            text="Dzikir Pagi"
            onPress={() =>
              selectMenuHandler('MorningAfternoonDzikir', {
                title: 'Dzikir Pagi',
                data: morningAfternoonDzikir.morningDzikir,
              })
            }
          >
            {/* <AlQuranIcon
              width={buttonMenuIconWidth}
              style={styles.buttonMenuImage}
            /> */}
          </ButtonMenu>
          <ButtonMenu
            backgroundColor="#FFB648"
            color="#FFFFFF"
            text="Dzikir Petang"
            onPress={() =>
              selectMenuHandler('MorningAfternoonDzikir', {
                title: 'Dzikir Petang',
                data: morningAfternoonDzikir.eveningDzikir,
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

const mapStateToProps = (state: RootState) => ({
  morningAfternoonDzikir: state.morningAfternoonDzikir,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    getMorningAfternoonDzikir: () => dispatch(getMorningAfternoonDzikir()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dzikir);
