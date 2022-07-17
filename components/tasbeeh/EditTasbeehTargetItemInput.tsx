import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Modal,
  StyleSheet,
  View,
  useColorScheme,
  TextInput,
  Keyboard,
  Pressable,
  Text,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import useKeyboard from '../useKeyboard';
import TasbeehTextInput from './TasbeehTextInput';

import screenMode from '../../constants/screenMode';

interface EditTasbeehTargetItemInputProps {
  modalVisible: boolean;
  target: string;
  setTarget: (target: string) => void;
  setOldTarget: (target: string) => void;
  updateTarget: (targetInput: string) => void;
  actionText: React.ReactElement;
  setModalVisible: (visible: boolean) => void;
}

function EditTasbeehTargetItemInput({
  modalVisible,
  target,
  setTarget,
  setOldTarget,
  updateTarget,
  actionText,
  setModalVisible,
}: EditTasbeehTargetItemInputProps) {
  const colorScheme = useColorScheme();
  const isKeyboardOpen = useKeyboard();

  const [targetInput, setTargetInput] = useState(target);

  const targetInputRef = useRef<TextInput>(null);

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const justifyContent = isKeyboardOpen ? 'flex-start' : 'center';

  const targetChangeTextHandler = (text: string) => {
    if (text === '') {
      setTargetInput('0');
      return;
    }

    if (targetInput === '0') {
      setTargetInput(text.split('0').join(''));
      return;
    }

    setTargetInput(Math.abs(Number(text)).toString());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
    >
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {isKeyboardOpen && <View style={{ flex: 2 }}></View>}

        <View style={{ ...styles.centeredView, justifyContent }}>
          <View style={[styles.modalView, themeContainerStyle]}>
            <View style={styles.row}>
              <TasbeehTextInput
                // label="Target"
                keyboardType="number-pad"
                placeholder="Edit Target"
                returnKeyType="done"
                returnKeyLabel="done"
                autoFocus={true}
                reference={targetInputRef}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                value={targetInput}
                onChangeText={targetChangeTextHandler}
                maxLength={4}
                isHasLabel={false}
              />
            </View>

            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={() => {
                  setTimeout(() => {
                    updateTarget(targetInput);
                    setTarget(targetInput);
                    setModalVisible(false);
                  }, 1000);
                }}
              >
                <Text style={styles.textStyle}>{actionText}</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setTargetInput(target);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Batal</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {isKeyboardOpen && <View style={{ flex: 2 }}></View>}
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 8,
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 36,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  buttonView: {
    flexDirection: 'column',
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    elevation: 2,
    marginVertical: 2,
    fontFamily: 'dubai-regular',
  },
  buttonAdd: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'dubai-regular',
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#FF4444',
  },
});

export default EditTasbeehTargetItemInput;
