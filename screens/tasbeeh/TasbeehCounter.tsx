import { FontAwesome } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import Ionicons from '@expo/vector-icons/Ionicons';

import TasbeehTarget from '../../models/tasbeehTarget';

import { TasbeehCounterBackgroundImage } from '../../constants/assets';
import screenMode from '../../constants/screenMode';

import TasbihCounter from '../../components/tasbeeh/TasbeehCounter';
import EditTasbeehTargetItemInput from '../../components/tasbeeh/EditTasbeehTargetItemInput';

import { RootState } from '../../redux';
import { updateTasbeehTarget } from '../../redux/actions/tasbeehTarget';

interface TasbeehCounterProps {
  route: RouteProp<{ params: { item: TasbeehTarget } }, 'params'>;
  updateTasbeehTarget: (
    id: number,
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string,
    counter: number
  ) => void;
}

interface DispatchProps {
  updateTasbeehTarget: (
    id: number,
    title: string,
    target: number,
    arabic: string,
    background: string,
    color: string,
    counter: number
  ) => void;
}

function TasbeehCounter({
  route: { params, name },
  updateTasbeehTarget,
}: TasbeehCounterProps) {
  const colorScheme = useColorScheme();
  const [count, setCount] = useState('0000');
  const [addColor, setAddColor] = useState('#FCDDEC');
  const [resetColor, setResetColor] = useState('#FCDDEC');
  const [visible, setVisible] = useState(false);

  // Interval time
  const [intervalTime, setIntervalTime] = useState(0);

  // State value of tasbeeh
  const [oldTarget, setOldTarget] = useState(String(params.item.target));
  const [target, setTarget] = useState(String(params.item.target));

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const updateTasbeeh = (targetInput?: string) => {
    updateTasbeehTarget(
      params.item.id,
      params.item.title,
      targetInput ? parseInt(targetInput) : parseInt(target),
      params.item.arabic || '',
      params.item.background || '',
      params.item.color || '',
      parseInt(count)
    );
  };

  const showDialog = () => {
    setVisible(true);
  };

  const counterFormatter = (countNumber: number) => {
    let result = countNumber.toString();

    if (countNumber < 10) {
      result = `000${countNumber}`;
    } else if (countNumber < 100) {
      result = `00${countNumber}`;
    } else if (countNumber < 1000) {
      result = `0${countNumber}`;
    }

    return result;
  };

  const addCounterHandler = async () => {
    // Set color
    setAddColor(themeContainerStyle.backgroundColor);

    const countNumber = parseInt(count) + 1;
    let result = counterFormatter(countNumber);

    setTimeout(() => {
      setAddColor('#FCDDEC');
    }, 1);

    setCount(result);
  };

  const resetCounterHandler = async () => {
    if (count === '0000') {
      return;
    }

    // Set color
    setResetColor(themeContainerStyle.backgroundColor);

    Alert.alert('Reset hitungan', 'Apakah kamu yakin mau reset hitungan?', [
      {
        text: 'Ya',
        onPress: async () => {
          setTimeout(() => {
            setResetColor('#FCDDEC');
          }, 1);

          setCount('0000');
        },
        style: 'destructive',
      },
      { text: 'Tidak', onPress: () => {} },
    ]);
  };

  const submitTargetHandler = async (targetInput: string) => {
    try {
      if (targetInput !== '0') {
        if (targetInput === oldTarget) {
          return;
        }

        await updateTasbeeh(targetInput);

        setOldTarget(targetInput);

        Alert.alert(
          'Berhasil Mengganti Target',
          `Target menjadi ${targetInput}`,
          [{ text: 'OK', onPress: () => console.log('Target OK') }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCount(counterFormatter(params.item.counter));
  }, [params.item.counter]);

  useEffect(() => {
    if (target !== '0') {
      if (parseInt(count) === parseInt(target)) {
        Alert.alert('Alhamdullah!', 'Kamu telah mencapai target', [
          { text: 'OK', onPress: async () => console.log('Target OK') },
        ]);
        successAudio();
      }
    }
  }, [count, target]);

  var refreshIntervalId: NodeJS.Timeout;

  useEffect(() => {
    refreshIntervalId = setInterval(() => {
      setIntervalTime((oldIntervalTime) => oldIntervalTime + 1);
    }, 1000);

    setTimeout(() => clearInterval(refreshIntervalId), 1100);

    return () => {
      clearInterval(refreshIntervalId);
    };
  }, [count]);

  useEffect(() => {
    if (intervalTime === 1) {
      updateTasbeeh();
      clearInterval(refreshIntervalId);
      setIntervalTime(0);
    }
  }, [intervalTime]);

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
      <TasbeehCounterBackgroundImage
        style={styles.backgroundImage}
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.arabicText}>{params.item.arabic}</Text>
          <Text style={styles.tasbeehText}>{params.item.title}</Text>
          <View style={styles.targetView}>
            <View>
              <Text style={styles.inputText}>Target :</Text>
            </View>
            <View>
              <Text style={styles.targetText}>{String(target)}</Text>
            </View>
            <View style={styles.editButton}>
              <FontAwesome
                name="pencil-square"
                size={32}
                color="white"
                onPress={showDialog}
              />
              <EditTasbeehTargetItemInput
                modalVisible={visible}
                setModalVisible={setVisible}
                actionText={
                  <>
                    <Ionicons
                      name={
                        Platform.OS === 'android' ? 'md-pencil' : 'ios-pencil'
                      }
                      color="white"
                    />{' '}
                    Ubah Target
                  </>
                }
                updateTarget={submitTargetHandler}
                setTarget={setTarget}
                setOldTarget={setOldTarget}
                target={target}
              />
            </View>
          </View>
        </View>

        <View style={styles.tasbihView}>
          <TasbihCounter
            count={count}
            addColor={addColor}
            resetColor={parseInt(count) > 0 ? '#FABF39' : resetColor}
            addCounterHandler={addCounterHandler}
            resetCounterHandler={resetCounterHandler}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export const screenOptions = {
  headerTitle: 'Tasbeeh Counter',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    marginTop: 3,
    marginLeft: 10,
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
  tasbeehText: {
    fontFamily: 'dubai-regular',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 32,
    color: '#FFFFFF',
  },
  targetText: {
    marginTop: 2,
    fontSize: 24,
    fontFamily: 'dubai-regular',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 10,
    color: '#FFFFFF',
  },
  saveTarget: {
    fontSize: 20,
    color: '#FFFFFF',
    backgroundColor: '#00BFFF',
    width: '100%',
    borderRadius: 10,
  },
  resetCounter: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#FF4444',
    width: '100%',
    borderRadius: 10,
  },
  dialogInput: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'dubai-regular',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 10,
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
    borderWidth: 1,
    borderColor: '#777',
    padding: 6,
    margin: 2,
    width: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'ds-digit',
    color: '#3D3FB8',
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
  tasbihView: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  tasbeehTarget: state.tasbeehTarget,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    updateTasbeehTarget: async (
      id: number,
      title: string,
      target: number,
      arabic: string,
      background: string,
      color: string,
      counter: number
    ) => {
      await dispatch(
        updateTasbeehTarget(
          id,
          title,
          target,
          arabic,
          background,
          color,
          counter
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasbeehCounter);
