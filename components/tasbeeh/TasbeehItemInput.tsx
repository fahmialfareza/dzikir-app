import React, { useState, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  useColorScheme,
  TextInput,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';

import screenMode from '../../constants/screenMode';
import colorData from '../../constants/data/colorData';

import TasbeehTarget from '../../models/tasbeehTarget';

import TasbeehTextInput from './TasbeehTextInput';
import TasbeehSelectDropdownColors from './TasbeehSelectDropdownColors';
import useKeyboard from '../useKeyboard';

interface TasbeehItemInputProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  actionText: React.ReactElement;
  enableRemoveButton: boolean;
  onSubmitHandler: () => void;
  onDeleteHandler?: () => void;
  state: TasbeehTarget;
  setState: (state: TasbeehTarget) => void;
  colorDefaultValue?: {
    name: string;
    color: string;
  };
}

const TasbeehItemInput = ({
  modalVisible,
  setModalVisible,
  actionText,
  enableRemoveButton,
  onSubmitHandler,
  onDeleteHandler,
  state,
  setState,
  colorDefaultValue,
}: TasbeehItemInputProps) => {
  const colorScheme = useColorScheme();
  const isKeyboardOpen = useKeyboard();

  const titleInput = useRef<TextInput>(null);
  const arabicInput = useRef<TextInput>(null);
  const backgroundInput = useRef<SelectDropdown>(null);
  const targetInput = useRef<TextInput>(null);

  const themeContainerStyle =
    colorScheme === 'light'
      ? screenMode.lightContainer
      : screenMode.darkContainer;

  const justifyContent = isKeyboardOpen ? 'flex-start' : 'center';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
    >
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {isKeyboardOpen && <View style={{ flex: 1 }}></View>}

        <View style={{ ...styles.centeredView, justifyContent }}>
          <View style={[styles.modalView, themeContainerStyle]}>
            <View style={styles.row}>
              <TasbeehTextInput
                label="Judul"
                placeholder="Judul Tasbih"
                returnKeyType="next"
                returnKeyLabel="next"
                reference={titleInput}
                autoFocus={true}
                onSubmitEditing={() => {
                  arabicInput.current?.focus();
                }}
                value={state?.title}
                onChangeText={(text) => {
                  setState({ ...state, title: text });
                }}
              />
            </View>

            <View style={styles.row}>
              <TasbeehTextInput
                label="Teks Arab"
                placeholder="Teks Arab di kanan judul"
                returnKeyType="next"
                returnKeyLabel="next"
                reference={arabicInput}
                onSubmitEditing={() => {
                  backgroundInput.current?.openDropdown();
                }}
                value={state?.arabic || ''}
                onChangeText={(text) => {
                  setState({ ...state, arabic: text });
                }}
              />
            </View>

            <View style={styles.row}>
              <TasbeehSelectDropdownColors
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.name;
                }}
                data={colorData}
                onSelect={(selectedItem, index) => {
                  targetInput.current?.focus();
                  setState({ ...state, background: selectedItem.color });
                }}
                defaultValue={colorDefaultValue || colorData[0]}
                label="Background"
                reference={backgroundInput}
                renderCustomizedButtonChild={(item, index) => {
                  if (item != null) {
                    return (
                      <View
                        style={{
                          backgroundColor: item.color,
                        }}
                      >
                        <Text style={styles.dropdownButtonChildText}>
                          {item.name}
                        </Text>
                      </View>
                    );
                  }
                }}
                renderCustomizedRowChild={(item, index) => {
                  return (
                    <Text
                      style={{
                        color: item.color,
                        ...styles.dropdownRowChild,
                      }}
                    >
                      {item.name}
                    </Text>
                  );
                }}
              />
            </View>

            <View style={styles.row}>
              <TasbeehTextInput
                label="Target"
                keyboardType="number-pad"
                placeholder="Target"
                returnKeyType="done"
                returnKeyLabel="done"
                reference={targetInput}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                value={String(state?.target) || ''}
                onChangeText={(text) => {
                  if (text === '') {
                    setState({ ...state, target: 0 });
                    return;
                  }

                  setState({ ...state, target: parseInt(text) });
                }}
              />
            </View>

            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={onSubmitHandler}
              >
                <Text style={styles.textStyle}>{actionText}</Text>
              </Pressable>

              {enableRemoveButton && (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={onDeleteHandler}
                >
                  <Text style={styles.textStyle}>
                    <Ionicons
                      name={
                        Platform.OS === 'android' ? 'md-trash' : 'ios-trash'
                      }
                      color="white"
                    />{' '}
                    Hapus
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                    color="white"
                  />{' '}
                  Batal
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {isKeyboardOpen && <View style={{ flex: 1 }}></View>}
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 10,
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
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 2,
    fontFamily: 'dubai-regular',
  },
  buttonAdd: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#FF4444',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'dubai-regular',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dropdownRowChild: {
    fontFamily: 'dubai-regular',
    textAlign: 'center',
    fontSize: 16,
  },
  dropdownButtonChildText: {
    color: 'white',
    fontFamily: 'dubai-regular',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonView: {
    flexDirection: 'column',
    marginTop: 10,
  },
});

export default TasbeehItemInput;
