import React, { useState, useEffect } from 'react';
import {
  View,
  useColorScheme,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Audio } from 'expo-av';

import DzikirTarget from '../../models/dzikirTarget';

import screenMode from '../../constants/screenMode';
import { DzikirCounterBackgrondImage } from '../../constants/assets';

import TasbihCounter from '../../components/TasbihCounter';

import { RootState } from '../../redux';
import { updateDzikirTarget } from '../../redux/actions/dzikirTarget';

interface DzikirCounterProps {
  route: RouteProp<{ params: { item: DzikirTarget } }, 'params'>;
  updateDzikirTarget: (
    id: number,
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string
  ) => void;
}

interface DispatchProps {
  updateDzikirTarget: (
    id: number,
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string
  ) => void;
}

function DzikirCounter({
  route: { params },
  updateDzikirTarget,
}: DzikirCounterProps) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const [count, setCount] = useState('0000');
  const [addColor, setAddColor] = useState('#FCDDEC');
  const [resetColor, setResetColor] = useState('#FCDDEC');

  // State value of dzikir
  const [oldTarget, setOldTarget] = useState(String(params.item.target));
  const [target, setTarget] = useState(String(params.item.target));

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const addCounterHandler = () => {
    // Set color
    setAddColor(themeContainerStyle.backgroundColor);

    const countNumber = parseInt(count) + 1;
    let result = countNumber.toString();

    if (countNumber < 10) {
      result = `000${countNumber}`;
    } else if (countNumber < 100) {
      result = `00${countNumber}`;
    } else if (countNumber < 1000) {
      result = `0${countNumber}`;
    }

    setTimeout(() => {
      setAddColor('#FCDDEC');
    }, 100);

    setCount(result);
  };

  const resetCounterHandler = () => {
    // Set color
    setResetColor(themeContainerStyle.backgroundColor);

    setTimeout(() => {
      setResetColor('#FCDDEC');
    }, 100);

    setCount('0000');
  };

  const targetChangeTextHandler = (text: string) => {
    if (text === '') {
      setTarget('0');
      return;
    }

    if (target === '0') {
      setTarget(text.split('0').join(''));
      return;
    }

    setTarget(text);
  };

  const submitTargetHandler = async () => {
    try {
      if (target === oldTarget) {
        return;
      }

      await updateDzikirTarget(
        params.item.id,
        params.item.title,
        parseInt(target),
        params.item.arabic || '',
        params.item.background || '',
        params.item.color || ''
      );

      setOldTarget(target);

      Alert.alert('Berhasil Mengganti Target', `Target menjadi ${target}`, [
        { text: 'OK', onPress: () => console.log('Target OK') },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (target !== '0') {
      if (parseInt(count) === parseInt(target)) {
        Alert.alert('Alhamdullah!', 'Anda telah mencapai target dzikir', [
          { text: 'OK', onPress: async () => console.log('Target OK') },
        ]);
        successAudio();
      }
    }
  }, [count, target]);

  const successAudio = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../../assets/sounds/success.wav'));
      await sound.playAsync();
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      // await sound.unloadAsync();
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  };

  return (
    <>
      <DzikirCounterBackgrondImage
        style={{ ...styles.backgroundImage, top: -insets.top }}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.arabicText}>{params.item.arabic}</Text>
          <Text style={styles.dzikirText}>{params.item.title}</Text>
          <View style={styles.targetView}>
            <View>
              <Text style={styles.inputText}>Target </Text>
            </View>
            <View>
              <TextInput
                style={styles.targetInput}
                onChangeText={targetChangeTextHandler}
                onEndEditing={submitTargetHandler}
                value={String(target)}
                keyboardType="number-pad"
                returnKeyType={'done'}
              />
            </View>
          </View>
        </View>

        <TasbihCounter
          count={count}
          addColor={addColor}
          resetColor={resetColor}
          addCounterHandler={addCounterHandler}
          resetCounterHandler={resetCounterHandler}
        />
      </SafeAreaView>
    </>
  );
}

export const screenOptions = {
  headerTitle: 'Dzikir Counter',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  arabicText: {
    fontFamily: 'dubai-regular',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 64,
    color: '#FFFFFF',
  },
  dzikirText: {
    fontFamily: 'dubai-regular',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 32,
    color: '#FFFFFF',
  },
  inputText: {
    fontSize: 24,
    fontFamily: 'dubai-regular',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 10,
    color: '#FFFFFF',
  },
  targetInput: {
    height: 20,
    padding: 10,
    fontFamily: 'dubai-regular',
    justifyContent: 'center',
    alignContent: 'center',
    color: '#FFFFFF',
  },
  targetView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -9999,
    resizeMode: 'cover',
  },
});

const mapStateToProps = (state: RootState) => ({
  dzikirTarget: state.dzikirTarget,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    updateDzikirTarget: async (
      id: number,
      title: string,
      target: number,
      arabic: string,
      background: string,
      color: string
    ) => {
      await dispatch(
        updateDzikirTarget(id, title, target, arabic, background, color)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DzikirCounter);
