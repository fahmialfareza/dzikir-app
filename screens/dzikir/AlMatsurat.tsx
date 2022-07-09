import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { NavigationProp } from '@react-navigation/native';
import { StyleSheet, View, useColorScheme, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import screenMode from '../../constants/screenMode';

import ButtonMenu from '../../components/ButtonMenu';

import { getAlMatsurat } from '../../redux/actions/alMatsurat';
import { RootState } from '../../redux';
import { AlMatsuratState } from '../../redux/types';

interface AlMatsuratProps {
  navigation: NavigationProp<any, any>;
  getAlMatsurat: () => void;
  alMatsurat: AlMatsuratState;
}

interface DispatchProps {
  getAlMatsurat: () => void;
}

const AlMatsurat = ({
  navigation,
  getAlMatsurat,
  alMatsurat,
}: AlMatsuratProps) => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    getAlMatsurat();
  }, []);

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const buttonMenuIconWidth = Dimensions.get('window').width / 6;

  const selectMenuHandler = (routeName: string) => {
    navigation.navigate(routeName, {});
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
            onPress={() => selectMenuHandler('MorningDzikir')}
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
            onPress={() => selectMenuHandler('AfternoonDzikir')}
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
  alMatsurat: state.alMatsurat,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    getAlMatsurat: () => dispatch(getAlMatsurat()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlMatsurat);
